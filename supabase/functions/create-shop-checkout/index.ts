// Creates a Stripe Embedded Checkout session for the user's shop cart.
// 1. Reads cart_items for the authenticated user
// 2. Creates a pending order + order_items in DB
// 3. Creates Stripe session with line_items from cart, metadata.order_id
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const EU_COUNTRIES = [
  "LV","LT","EE","FI","SE","NO","DK","DE","PL","FR","IT","ES","NL","BE","AT",
  "CZ","SK","HU","RO","BG","HR","SI","GR","PT","IE","LU","MT","CY","IS","GB",
];

const SHIPPING_OPTIONS: Record<string, { label: string; cents: number }> = {
  pickup: { label: "Izņemt uz vietas — Kandavas iela 29A, Rīga", cents: 0 },
  venipak_pakomats: { label: "Venipak pakomāts", cents: 1000 },
  courier_riga: { label: "Mūsu piegāde Rīgā", cents: 3000 },
  venipak_lv: { label: "Venipak Latvija", cents: 5500 },
  venipak_baltic: { label: "Venipak Baltija", cents: 6000 },
  venipak_scandi: { label: "Venipak Skandināvija", cents: 8000 },
  venipak_eu: { label: "Venipak Eiropa", cents: 10000 },
  venipak_world: { label: "Venipak Pasaule", cents: 20000 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Authenticate user via JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authErr } = await supabaseAdmin.auth.getUser(token);
    if (authErr || !userData.user) throw new Error("Unauthorized");
    const user = userData.user;

    const { environment, returnUrl, shippingId } = await req.json();
    const env = (environment || "sandbox") as StripeEnv;
    const shipping = SHIPPING_OPTIONS[shippingId as string] ?? SHIPPING_OPTIONS.pickup;
    const isPickup = (shippingId ?? "pickup") === "pickup";

    // Load cart
    const { data: cart, error: cartErr } = await supabaseAdmin
      .from("cart_items")
      .select("id, quantity, product:products(id, slug, name, price_cents, currency, in_stock, published)")
      .eq("user_id", user.id);

    if (cartErr) throw cartErr;
    const lines = (cart ?? []).filter((l: any) =>
      l.product && l.product.published && l.product.in_stock
    );
    if (lines.length === 0) {
      return new Response(JSON.stringify({ error: "Grozs ir tukšs" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get primary images for products
    const productIds = lines.map((l: any) => l.product.id);
    const { data: imgs } = await supabaseAdmin
      .from("product_images")
      .select("product_id, url, is_primary, sort_order")
      .in("product_id", productIds)
      .order("is_primary", { ascending: false })
      .order("sort_order", { ascending: true });
    const imageMap = new Map<string, string>();
    (imgs ?? []).forEach((i: any) => {
      if (!imageMap.has(i.product_id)) imageMap.set(i.product_id, i.url);
    });

    const currency = (lines[0] as any).product.currency || "EUR";
    const subtotalCents = lines.reduce(
      (s: number, l: any) => s + l.product.price_cents * l.quantity, 0,
    );

    // Get profile for shipping defaults
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, last_name, phone, shipping_address, shipping_city, shipping_postal_code, shipping_country")
      .eq("user_id", user.id)
      .maybeSingle();

    const customerName =
      [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() || null;

    // Create pending order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        status: "pending",
        customer_email: user.email || "",
        customer_name: customerName,
        customer_phone: profile?.phone || null,
        currency,
        subtotal_cents: subtotalCents,
        shipping_cents: shipping.cents,
        shipping_method: shipping.label,
        total_cents: subtotalCents + shipping.cents,
      .select()
      .single();

    if (orderErr || !order) throw new Error(`Failed to create order: ${orderErr?.message}`);

    // Create order_items
    const orderItems = lines.map((l: any) => ({
      order_id: order.id,
      product_id: l.product.id,
      product_slug: l.product.slug,
      product_name: l.product.name,
      product_type: "shop_product",
      quantity: l.quantity,
      unit_price_cents: l.product.price_cents,
      total_price_cents: l.product.price_cents * l.quantity,
    }));
    const { error: itemsErr } = await supabaseAdmin.from("order_items").insert(orderItems);
    if (itemsErr) throw new Error(`Failed to create items: ${itemsErr.message}`);

    // Build Stripe line items with price_data (one-off prices)
    const stripe = createStripeClient(env);
    const stripeLineItems = lines.map((l: any) => {
      const image = imageMap.get(l.product.id);
      return {
        price_data: {
          currency: (currency || "EUR").toLowerCase(),
          product_data: {
            name: l.product.name,
            ...(image && { images: [image] }),
          },
          unit_amount: l.product.price_cents,
          // PVN ir iekļauts cenā
          tax_behavior: "inclusive" as const,
        },
        quantity: l.quantity,
      };
    });

    if (shipping.cents > 0) {
      stripeLineItems.push({
        price_data: {
          currency: (currency || "EUR").toLowerCase(),
          product_data: { name: `Piegāde: ${shipping.label}` },
          unit_amount: shipping.cents,
          tax_behavior: "inclusive" as const,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      ui_mode: "embedded",
      ...(isPickup
        ? {}
        : { shipping_address_collection: { allowed_countries: EU_COUNTRIES as any } }),
      phone_number_collection: { enabled: true },
      return_url:
        returnUrl ||
        `${req.headers.get("origin")}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      ...(user.email && { customer_email: user.email }),
      metadata: {
        userId: user.id,
        order_id: order.id,
        product_type: "shop_order",
      },
    });

    // Save session id on order for webhook lookup
    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("create-shop-checkout error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
