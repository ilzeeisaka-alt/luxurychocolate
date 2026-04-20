// Stripe webhook handler — creates orders + order_items after successful payment.
// Auto-registered by Lovable Cloud for both sandbox and live (?env=sandbox|live).
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { type StripeEnv, createStripeClient, verifyWebhook } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const TIER_LABELS: Record<string, string> = {
  cake_choc_small_price: "Mazā kūku šokolāde (3-5 cm)",
  cake_choc_medium_price: "Vidējā kūku šokolāde (5-7 cm)",
  cake_choc_large_price: "Lielā kūku šokolāde (7-9 cm)",
  cake_choc_xl_price: "XL kūku šokolāde (9-12 cm)",
};

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const env = (url.searchParams.get("env") || "sandbox") as StripeEnv;

  try {
    const event = await verifyWebhook(req, env);
    console.log("Webhook event:", event.type, "env:", env);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object, env);
    } else {
      console.log("Unhandled event type:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", (err as Error).message);
    return new Response((err as Error).message, { status: 400 });
  }
});

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  const sessionId: string = session.id;

  // Idempotency — skip if already recorded
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (existing) {
    console.log("Order already exists for session:", sessionId);
    return;
  }

  // Fetch full session with line items + customer details from Stripe
  const stripe = createStripeClient(env);
  const fullSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price", "customer_details"],
  });

  const md = (fullSession.metadata || {}) as Record<string, string>;
  const lineItem = fullSession.line_items?.data?.[0];
  const quantity = lineItem?.quantity || 1;
  const unitPriceCents = lineItem?.price?.unit_amount || 0;
  const totalCents = fullSession.amount_total || 0;
  const subtotalCents = fullSession.amount_subtotal || totalCents;

  const cd = fullSession.customer_details;
  const shipping = (fullSession as any).shipping_details || (fullSession as any).shipping;
  const shippingAddr = shipping?.address || cd?.address;

  // Insert order
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: md.userId || null,
      status: "paid",
      stripe_session_id: sessionId,
      stripe_payment_intent_id:
        typeof fullSession.payment_intent === "string"
          ? fullSession.payment_intent
          : fullSession.payment_intent?.id || null,
      customer_email: cd?.email || fullSession.customer_email || "",
      customer_name: cd?.name || shipping?.name || null,
      customer_phone: cd?.phone || null,
      currency: (fullSession.currency || "eur").toUpperCase(),
      subtotal_cents: subtotalCents,
      total_cents: totalCents,
      tax_cents: fullSession.total_details?.amount_tax || 0,
      shipping_cents: fullSession.total_details?.amount_shipping || 0,
      shipping_address: shippingAddr?.line1
        ? [shippingAddr.line1, shippingAddr.line2].filter(Boolean).join(", ")
        : null,
      shipping_city: shippingAddr?.city || null,
      shipping_postal_code: shippingAddr?.postal_code || null,
      shipping_country: shippingAddr?.country || null,
      paid_at: new Date().toISOString(),
      notes: md.notes || null,
    })
    .select()
    .single();

  if (orderErr || !order) {
    throw new Error(`Failed to insert order: ${orderErr?.message}`);
  }

  // Insert order item
  const tierId = md.tier || "cake_choc_medium_price";
  const productName = TIER_LABELS[tierId] || "Kūku šokolāde";
  const widthMm = md.width_mm ? Number(md.width_mm) : null;
  const heightMm = md.height_mm ? Number(md.height_mm) : null;
  const areaCm2 = md.area_cm2 ? Number(md.area_cm2) : null;

  const { error: itemErr } = await supabase.from("order_items").insert({
    order_id: order.id,
    product_type: md.product_type || "cake_chocolate",
    product_name: productName,
    shape: md.shape || null,
    width_mm: widthMm,
    height_mm: heightMm,
    area_cm2: areaCm2,
    chocolate_type: md.chocolate_type || null,
    quantity,
    unit_price_cents: unitPriceCents,
    total_price_cents: unitPriceCents * quantity,
    logo_url: md.logo_url || null,
    logo_filename: md.logo_filename || null,
    custom_text: md.custom_text || null,
    notes: md.notes || null,
  });

  if (itemErr) throw new Error(`Failed to insert order item: ${itemErr.message}`);

  console.log("Order created:", order.order_number, "id:", order.id);

  // Send confirmation emails (non-blocking — log errors but don't fail webhook)
  try {
    await sendOrderEmails({
      orderNumber: order.order_number,
      customerEmail: order.customer_email,
      customerName: order.customer_name,
      currency: order.currency,
      totalCents: order.total_cents,
      subtotalCents: order.subtotal_cents,
      shippingCents: order.shipping_cents,
      taxCents: order.tax_cents,
      shippingAddress: order.shipping_address,
      shippingCity: order.shipping_city,
      shippingPostalCode: order.shipping_postal_code,
      shippingCountry: order.shipping_country,
      productName,
      shape: md.shape,
      widthMm,
      heightMm,
      chocolateType: md.chocolate_type,
      quantity,
      unitPriceCents,
      logoUrl: md.logo_url,
      customText: md.custom_text,
      notes: md.notes,
    });
  } catch (emailErr) {
    console.error("Email send failed (non-fatal):", (emailErr as Error).message);
  }
}

const escapeHtml = (v: unknown) =>
  String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatPrice = (cents: number, currency: string) =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

interface OrderEmailData {
  orderNumber: string;
  customerEmail: string;
  customerName: string | null;
  currency: string;
  totalCents: number;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string | null;
  productName: string;
  shape?: string;
  widthMm: number | null;
  heightMm: number | null;
  chocolateType?: string;
  quantity: number;
  unitPriceCents: number;
  logoUrl?: string;
  customText?: string;
  notes?: string;
}

async function sendOrderEmails(d: OrderEmailData) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not set — skipping emails");
    return;
  }
  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") ?? "Luxury Chocolate <onboarding@resend.dev>";

  const itemHtml = `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <tr><td style="padding:6px 0;color:#666;">Produkts:</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(d.productName)}</td></tr>
      ${d.shape ? `<tr><td style="padding:6px 0;color:#666;">Forma:</td><td style="padding:6px 0;">${escapeHtml(d.shape)}</td></tr>` : ""}
      ${d.widthMm && d.heightMm ? `<tr><td style="padding:6px 0;color:#666;">Izmērs:</td><td style="padding:6px 0;">${d.widthMm}×${d.heightMm} mm</td></tr>` : ""}
      ${d.chocolateType ? `<tr><td style="padding:6px 0;color:#666;">Šokolāde:</td><td style="padding:6px 0;">${escapeHtml(d.chocolateType)}</td></tr>` : ""}
      ${d.customText ? `<tr><td style="padding:6px 0;color:#666;">Teksts:</td><td style="padding:6px 0;">"${escapeHtml(d.customText)}"</td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#666;">Daudzums:</td><td style="padding:6px 0;">${d.quantity} × ${formatPrice(d.unitPriceCents, d.currency)}</td></tr>
    </table>
  `;

  const totalsHtml = `
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;padding-top:12px;margin-top:12px;">
      <tr><td style="padding:4px 0;color:#666;">Starpsumma:</td><td style="padding:4px 0;text-align:right;">${formatPrice(d.subtotalCents, d.currency)}</td></tr>
      ${d.shippingCents > 0 ? `<tr><td style="padding:4px 0;color:#666;">Piegāde:</td><td style="padding:4px 0;text-align:right;">${formatPrice(d.shippingCents, d.currency)}</td></tr>` : ""}
      ${d.taxCents > 0 ? `<tr><td style="padding:4px 0;color:#666;">PVN:</td><td style="padding:4px 0;text-align:right;">${formatPrice(d.taxCents, d.currency)}</td></tr>` : ""}
      <tr><td style="padding:8px 0 0;font-weight:700;font-size:16px;">Kopā:</td><td style="padding:8px 0 0;text-align:right;font-weight:700;font-size:16px;">${formatPrice(d.totalCents, d.currency)}</td></tr>
    </table>
  `;

  const shippingHtml = d.shippingAddress
    ? `<p style="margin:16px 0 0;color:#666;font-size:14px;"><strong>Piegādes adrese:</strong><br>${escapeHtml(d.shippingAddress)}${d.shippingCity ? `, ${escapeHtml(d.shippingCity)}` : ""}${d.shippingPostalCode ? `, ${escapeHtml(d.shippingPostalCode)}` : ""}${d.shippingCountry ? `, ${escapeHtml(d.shippingCountry)}` : ""}</p>`
    : "";

  // Customer confirmation
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222;">
      <h1 style="color:#c4a35a;margin:0 0 8px;">Paldies par pasūtījumu!</h1>
      <p style="margin:0 0 16px;color:#666;">Pasūtījums Nr. <strong style="color:#222;">${escapeHtml(d.orderNumber)}</strong></p>
      <p>Sveiki${d.customerName ? `, ${escapeHtml(d.customerName)}` : ""}!</p>
      <p>Mēs esam saņēmuši Jūsu pasūtījumu un apmaksu. Sāksim ražošanu tuvākajā laikā un sazināsimies par piegādes detaļām.</p>
      ${itemHtml}
      ${totalsHtml}
      ${shippingHtml}
      <p style="margin:24px 0 0;color:#666;font-size:14px;">Ja Jums ir jautājumi, atbildiet uz šo e-pastu vai rakstiet uz info@luxurychocolate.lv.</p>
      <p style="margin:24px 0 0;color:#999;font-size:12px;">Luxury Chocolate — ekskluzīvas korporatīvās šokolādes ar logo</p>
    </div>
  `;

  // Admin notification
  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222;">
      <h2 style="color:#c4a35a;margin:0 0 8px;">Jauns apmaksāts pasūtījums</h2>
      <p style="margin:0 0 16px;color:#666;">Nr. <strong style="color:#222;">${escapeHtml(d.orderNumber)}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr><td style="padding:4px 0;color:#666;">Klients:</td><td style="padding:4px 0;">${escapeHtml(d.customerName || "—")}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">E-pasts:</td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(d.customerEmail)}">${escapeHtml(d.customerEmail)}</a></td></tr>
      </table>
      ${itemHtml}
      ${totalsHtml}
      ${shippingHtml}
      ${d.logoUrl ? `<p style="margin:16px 0 0;"><strong>Logo fails:</strong><br><a href="${escapeHtml(d.logoUrl)}">${escapeHtml(d.logoUrl)}</a></p><p><img src="${escapeHtml(d.logoUrl)}" alt="Klienta logo" style="max-width:300px;max-height:200px;border:1px solid #eee;padding:8px;background:#fff;" /></p>` : ""}
      ${d.notes ? `<p style="margin:16px 0 0;"><strong>Klienta piezīmes:</strong><br>${escapeHtml(d.notes)}</p>` : ""}
    </div>
  `;

  const send = async (to: string[], subject: string, html: string, replyTo?: string) => {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
      body: JSON.stringify({ from: fromEmail, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    const data = await r.json();
    if (!r.ok) console.error(`Email to ${to.join(",")} failed:`, JSON.stringify(data));
    else console.log(`Email sent to ${to.join(",")}`);
    return r.ok;
  };

  // Send to customer
  if (d.customerEmail) {
    await send([d.customerEmail], `Pasūtījuma apstiprinājums ${d.orderNumber} — Luxury Chocolate`, customerHtml);
  }
  // Send to admin
  await send(["ilze.eisaka@gmail.com", "info@luxurychocolate.lv"], `Jauns pasūtījums ${d.orderNumber}`, adminHtml, d.customerEmail || undefined);
}
