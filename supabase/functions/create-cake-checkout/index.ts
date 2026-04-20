// Creates a Stripe Embedded Checkout session for a cake-chocolate order.
// Uses pre-defined price tiers (S/M/L/XL) and quantity.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_PRICE_IDS = new Set([
  "cake_choc_small_price",
  "cake_choc_medium_price",
  "cake_choc_large_price",
  "cake_choc_xl_price",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      priceId,
      quantity,
      customerEmail,
      userId,
      returnUrl,
      environment,
      metadata,
    } = await req.json();

    if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
      return new Response(JSON.stringify({ error: "Invalid priceId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 1 || qty > 10000) {
      return new Response(JSON.stringify({ error: "Invalid quantity" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const env = (environment || "sandbox") as StripeEnv;
    const stripe = createStripeClient(env);

    const prices = await stripe.prices.list({ lookup_keys: [priceId] });
    if (!prices.data.length) {
      return new Response(JSON.stringify({ error: "Price not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const stripePrice = prices.data[0];

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: qty }],
      mode: "payment",
      ui_mode: "embedded",
      shipping_address_collection: {
        allowed_countries: [
          "LV", "LT", "EE", "FI", "SE", "NO", "DK", "DE", "PL", "FR",
          "IT", "ES", "NL", "BE", "AT", "CZ", "SK", "HU", "RO", "BG",
          "HR", "SI", "GR", "PT", "IE", "LU", "MT", "CY", "IS",
        ],
      },
      phone_number_collection: { enabled: true },
      return_url:
        returnUrl ||
        `${req.headers.get("origin")}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      ...(customerEmail && { customer_email: customerEmail }),
      metadata: {
        ...(userId && { userId }),
        product_type: "cake_chocolate",
        ...(metadata || {}),
      },
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("create-cake-checkout error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
