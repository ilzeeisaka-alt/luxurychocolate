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
}
