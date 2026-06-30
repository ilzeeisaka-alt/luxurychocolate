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

const SHIPPING_OPTIONS: Record<string, { label: string; ruLabel: string; cents: number }> = {
  pickup: { label: "Izņemt uz vietas — Kandavas iela 29A, Rīga", ruLabel: "Самовывоз — Kandavas iela 29A, Рига", cents: 0 },
  venipak_pakomats: { label: "Venipak pakomāts", ruLabel: "Постамат Venipak", cents: 1000 },
  courier_riga: { label: "Piegāde Rīgā", ruLabel: "Доставка по Риге", cents: 3025 },
  venipak_lv: { label: "Venipak Latvija", ruLabel: "Venipak Латвия", cents: 5500 },
  venipak_baltic: { label: "Venipak Baltija", ruLabel: "Venipak Балтия", cents: 6000 },
  venipak_scandi: { label: "Venipak Skandināvija", ruLabel: "Venipak Скандинавия", cents: 8000 },
  venipak_eu: { label: "Venipak Eiropa", ruLabel: "Venipak Европа", cents: 10000 },
  venipak_world: { label: "Venipak Pasaule", ruLabel: "Venipak по всему миру", cents: 20000 },
};

const pickI18n = (i18n: Record<string, unknown> | null | undefined, lang: string, fallback: string) => {
  if (i18n && typeof i18n === "object") {
    const value = i18n[lang];
    if (typeof value === "string" && value.trim()) return value;
    const lv = i18n.lv;
    if (typeof lv === "string" && lv.trim()) return lv;
    const en = i18n.en;
    if (typeof en === "string" && en.trim()) return en;
  }
  if (lang === "ru" && fallback.trim().toLowerCase() === "sagatavošana šokolādes ražošanai") {
    return "Подготовка шоколадного производства";
  }
  return fallback;
};

const stripeLocale = (locale: unknown, lang: unknown) => {
  const requested = typeof locale === "string" ? locale : typeof lang === "string" ? lang : "auto";
  return ["lv", "ru", "en"].includes(requested) ? requested : "auto";
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

    const { environment, returnUrl, shippingId, affiliateCode, agencyDiscountOn, agencyDiscountPct, lang = "lv", locale = "auto" } = await req.json();
    const env = (environment || "sandbox") as StripeEnv;
    const shipping = SHIPPING_OPTIONS[shippingId as string] ?? SHIPPING_OPTIONS.pickup;
    const currentLang = typeof lang === "string" ? lang : "lv";
    const shippingLabel = currentLang === "ru" ? shipping.ruLabel : shipping.label;
    const isPickup = (shippingId ?? "pickup") === "pickup";

    // Validate affiliate code (if any)
    let affiliate: { id: string; code: string; customer_discount_rate: number } | null = null;
    if (affiliateCode && typeof affiliateCode === "string") {
      const { data: a } = await supabaseAdmin
        .from("affiliates")
        .select("id, code, customer_discount_rate, status")
        .ilike("code", affiliateCode.trim())
        .eq("status", "active")
        .maybeSingle();
      if (a) affiliate = a as typeof affiliate;
    }

    // Load cart
    const { data: cart, error: cartErr } = await supabaseAdmin
      .from("cart_items")
      .select("id, quantity, logo_url, logo_filename, product:products(id, slug, name, name_i18n, price_cents, currency, in_stock, published)")
      .eq("user_id", user.id);

    if (cartErr) throw cartErr;
    const lines = (cart ?? []).filter((l: any) =>
      l.product && l.product.published && l.product.in_stock
    );
    if (lines.length === 0) {
      return new Response(JSON.stringify({ error: currentLang === "ru" ? "Корзина пуста" : "Grozs ir tukšs" }), {
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

    const affDiscountCents = affiliate
      ? Math.round(subtotalCents * (Number(affiliate.customer_discount_rate) / 100))
      : 0;
    const rawAgencyPct = Number(agencyDiscountPct);
    const agencyPct = Math.max(0, Math.min(100, Number.isFinite(rawAgencyPct) ? rawAgencyPct : 0));
    const agencyDiscountCents = agencyDiscountOn ? Math.round(subtotalCents * (agencyPct / 100)) : 0;
    const totalCents = subtotalCents - affDiscountCents - agencyDiscountCents + shipping.cents;
    if (totalCents < 50) {
      return new Response(
        JSON.stringify({
          error: currentLang === "ru"
            ? "Сумма заказа слишком мала (минимум €0.50). Добавьте товары или выберите доставку."
            : "Pasūtījuma summa ir pārāk maza (minimums €0.50). Lūdzu pievienojiet vairāk preču vai izvēlieties piegādes veidu.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

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
        subtotal_cents: subtotalCents - agencyDiscountCents,
        shipping_cents: shipping.cents,
        shipping_method: shippingLabel,
        total_cents: totalCents,
        affiliate_id: affiliate?.id ?? null,
        affiliate_code: affiliate?.code ?? null,
        affiliate_discount_cents: affDiscountCents,
        ...(agencyDiscountCents > 0 ? {
          notes: `Agency discount: ${agencyPct}% (-${(agencyDiscountCents / 100).toFixed(2)} ${currency})`,
        } : {}),
      })
      .select()
      .single();

    if (orderErr || !order) throw new Error(`Failed to create order: ${orderErr?.message}`);

    // Create order_items
    const orderItems = lines.map((l: any) => ({
      order_id: order.id,
      product_id: l.product.id,
      product_slug: l.product.slug,
      product_name: pickI18n(l.product.name_i18n, currentLang, l.product.name),
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
      const productImage = imageMap.get(l.product.id);
      const image = l.logo_url || productImage;
      const productName = pickI18n(l.product.name_i18n, currentLang, l.product.name);
      const name = l.logo_url
        ? `${productName} (${currentLang === "ru" ? "с вашим логотипом" : "ar Jūsu logo"})`
        : productName;
      const description = l.logo_filename ? `${currentLang === "ru" ? "Логотип" : "Logo"}: ${l.logo_filename}` : undefined;
      return {
        price_data: {
          currency: (currency || "EUR").toLowerCase(),
          product_data: {
            name,
            ...(description && { description }),
            ...(image && { images: [image] }),
          },
          unit_amount: l.product.price_cents,
          tax_behavior: "inclusive" as const,
        },
        quantity: l.quantity,
      };
    });

    if (shipping.cents > 0) {
      stripeLineItems.push({
        price_data: {
          currency: (currency || "EUR").toLowerCase(),
          product_data: { name: `${currentLang === "ru" ? "Доставка" : "Piegāde"}: ${shippingLabel}` },
          unit_amount: shipping.cents,
          tax_behavior: "inclusive" as const,
        },
        quantity: 1,
      });
    }

    // Optional discounts — create one-off Stripe coupons for partner and agency discounts
    const coupons: { coupon: string }[] = [];
    if (affiliate && affDiscountCents > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: affDiscountCents,
        currency: (currency || "EUR").toLowerCase(),
        duration: "once",
        name: `Partnera atlaide ${affiliate.code}`,
        max_redemptions: 1,
      });
      coupons.push({ coupon: coupon.id });
    }
    if (agencyDiscountCents > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: agencyDiscountCents,
        currency: (currency || "EUR").toLowerCase(),
        duration: "once",
        name: currentLang === "ru"
          ? `Агентская скидка ${agencyPct}%`
          : currentLang === "et"
          ? `Agentuuri allahindlus ${agencyPct}%`
          : `Aģentūras atlaide ${agencyPct}%`,
        max_redemptions: 1,
      });
      coupons.push({ coupon: coupon.id });
    }
    const discountsArg = coupons.length > 0 ? coupons : undefined;

    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      ui_mode: "embedded",
      locale: stripeLocale(locale, currentLang) as any,
      ...(isPickup
        ? {}
        : { shipping_address_collection: { allowed_countries: EU_COUNTRIES as any } }),
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      tax_id_collection: { enabled: true, required: "if_supported" },
      invoice_creation: { enabled: true },
      ...(discountsArg && { discounts: discountsArg }),
      return_url:
        returnUrl ||
        `${req.headers.get("origin")}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      ...(user.email && { customer_email: user.email }),
      metadata: {
        userId: user.id,
        order_id: order.id,
        product_type: "shop_order",
        shipping_id: shippingId ?? "pickup",
        shipping_label: shippingLabel,
        ...(affiliate && {
          affiliate_id: affiliate.id,
          affiliate_code: affiliate.code,
          affiliate_discount_cents: String(affDiscountCents),
        }),
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
