// Sends abandoned cart reminder emails.
// Stage 1: cart untouched for >=1h (and <24h) → first reminder
// Stage 2: cart untouched for >=24h (and <7d)  → second reminder
// Runs on a schedule via pg_cron.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

const FROM = "Luxury Chocolate <onboarding@resend.dev>";
const SITE_URL = "https://luxurychocolate.lv";
const CART_URL = `${SITE_URL}/grozs`;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const fmtEur = (cents: number) => `€${(cents / 100).toFixed(2)}`;

const COPY = {
  stage1: {
    subject: "Jūs atstājāt preces grozā 🍫",
    heading: "Jūsu grozā vēl gaida šokolādes",
    intro: "Pamanījām, ka nepabeidzāt pasūtījumu. Jūsu izvēlētās preces vēl ir grozā — turpiniet, kur pārtraucāt!",
    cta: "Pabeigt pasūtījumu",
  },
  stage2: {
    subject: "Vai nevēlaties pabeigt savu šokolādes pasūtījumu?",
    heading: "Jūsu grozs joprojām gaida",
    intro: "Šokolādes Jūsu grozā vēl ir pieejamas. Pabeidziet pasūtījumu jau šodien, lai mēs varam sākt gatavot Jūsu pasūtījumu.",
    cta: "Atgriezties grozā",
  },
};

type Line = {
  name: string;
  quantity: number;
  unit_price_cents: number;
  image?: string | null;
};

const buildHtml = (stage: "stage1" | "stage2", lines: Line[], subtotalCents: number) => {
  const t = COPY[stage];
  const rows = lines.map((l) => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #eee;width:80px;">
        ${l.image ? `<img src="${escapeHtml(l.image)}" alt="" width="72" height="72" style="border-radius:8px;object-fit:cover;display:block;"/>` : ""}
      </td>
      <td style="padding:12px;border-bottom:1px solid #eee;color:#111;font-family:Arial,sans-serif;font-size:14px;">
        <div style="font-weight:600;">${escapeHtml(l.name)}</div>
        <div style="color:#666;font-size:13px;margin-top:4px;">${l.quantity} × ${fmtEur(l.unit_price_cents)}</div>
      </td>
      <td style="padding:12px;border-bottom:1px solid #eee;text-align:right;color:#111;font-family:Arial,sans-serif;font-size:14px;font-weight:600;">
        ${fmtEur(l.unit_price_cents * l.quantity)}
      </td>
    </tr>
  `).join("");

  return `<!doctype html>
<html><body style="margin:0;background:#f6f5f2;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f5f2;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;">
        <tr><td style="padding:28px 32px 8px;">
          <div style="font-size:13px;letter-spacing:2px;color:#b8860b;text-transform:uppercase;">Luxury Chocolate</div>
          <h1 style="margin:12px 0 8px;font-size:22px;color:#111;">${escapeHtml(t.heading)}</h1>
          <p style="color:#444;line-height:1.5;font-size:15px;">${escapeHtml(t.intro)}</p>
        </td></tr>
        <tr><td style="padding:8px 20px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
        </td></tr>
        <tr><td style="padding:16px 32px 8px;text-align:right;color:#111;font-family:Arial,sans-serif;font-size:15px;">
          <strong>Kopā: ${fmtEur(subtotalCents)}</strong>
        </td></tr>
        <tr><td style="padding:16px 32px 32px;text-align:center;">
          <a href="${CART_URL}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;">${escapeHtml(t.cta)}</a>
        </td></tr>
        <tr><td style="padding:0 32px 28px;color:#888;font-size:12px;line-height:1.5;font-family:Arial,sans-serif;">
          Ja pasūtījumu jau esat pabeidzis, atvainojiet par traucējumu. Jautājumu gadījumā rakstiet info@luxurychocolate.lv
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
};

async function processStage(stage: "stage1" | "stage2") {
  const now = Date.now();
  // Windows
  const minAgeH = stage === "stage1" ? 1 : 24;
  const maxAgeH = stage === "stage1" ? 24 : 24 * 7;
  const cutoffMax = new Date(now - minAgeH * 3600 * 1000).toISOString();
  const cutoffMin = new Date(now - maxAgeH * 3600 * 1000).toISOString();

  // Get ALL cart items (we need to compute the true last-activity time per user).
  // A user is only "abandoned" if their MOST RECENT cart activity is older than the threshold.
  // Otherwise (if they added/updated any item within the last hour) they are still active
  // and must NOT receive a reminder.
  const { data: carts, error: cartErr } = await supabase
    .from("cart_items")
    .select("user_id, updated_at");
  if (cartErr) throw cartErr;

  // Compute max(updated_at) per user across their entire cart
  const lastActivity = new Map<string, string>();
  (carts ?? []).forEach((c: any) => {
    const prev = lastActivity.get(c.user_id);
    if (!prev || c.updated_at > prev) lastActivity.set(c.user_id, c.updated_at);
  });

  // Keep only users whose LAST activity falls in the stage window
  const byUser = new Map<string, string>();
  for (const [uid, ts] of lastActivity) {
    if (ts <= cutoffMax && ts >= cutoffMin) byUser.set(uid, ts);
  }
  if (byUser.size === 0) return { stage, sent: 0, skipped: 0 };

  const userIds = [...byUser.keys()];

  // Load existing reminder tracking
  const { data: tracking } = await supabase
    .from("abandoned_cart_reminders")
    .select("user_id, stage1_sent_at, stage2_sent_at, last_cart_updated_at")
    .in("user_id", userIds);
  const trackMap = new Map<string, any>();
  (tracking ?? []).forEach((t: any) => trackMap.set(t.user_id, t));

  let sent = 0, skipped = 0;
  for (const userId of userIds) {
    try {
      const t = trackMap.get(userId);
      const cartUpdatedAt = byUser.get(userId)!;
      // Only treat as "already sent" if the reminder was sent for THIS abandonment cycle
      // (i.e., after the current last cart activity). If the user resumed shopping and
      // abandoned again, allow a fresh reminder.
      const sentAt = stage === "stage1" ? t?.stage1_sent_at : t?.stage2_sent_at;
      const trackedCartTs = t?.last_cart_updated_at;
      const alreadySentForThisCycle =
        !!sentAt && !!trackedCartTs && trackedCartTs >= cartUpdatedAt;
      if (alreadySentForThisCycle) { skipped++; continue; }

      // For stage2, require stage1 already sent (so we don't skip straight to 24h reminder)
      // But if user was already past 24h when first discovered, still send stage2.
      // We'll allow either — the goal is 2 reminders max.

      // Skip if user placed an order after the cart was last updated
      const { data: recentOrder } = await supabase
        .from("orders")
        .select("id")
        .eq("user_id", userId)
        .in("status", ["paid", "in_production", "shipped", "delivered"])
        .gte("created_at", cartUpdatedAt)
        .limit(1)
        .maybeSingle();
      if (recentOrder) { skipped++; continue; }

      // Get user email
      const { data: userRes } = await supabase.auth.admin.getUserById(userId);
      const email = userRes?.user?.email;
      if (!email) { skipped++; continue; }

      // Load cart with product data
      const { data: items } = await supabase
        .from("cart_items")
        .select("quantity, product:products(id, name, price_cents, currency)")
        .eq("user_id", userId);
      const validItems = (items ?? []).filter((i: any) => i.product);
      if (validItems.length === 0) { skipped++; continue; }

      // Load primary images
      const pids = validItems.map((i: any) => i.product.id);
      const { data: imgs } = await supabase
        .from("product_images")
        .select("product_id, url, is_primary, sort_order")
        .in("product_id", pids)
        .order("is_primary", { ascending: false })
        .order("sort_order", { ascending: true });
      const imgMap = new Map<string, string>();
      (imgs ?? []).forEach((i: any) => {
        if (!imgMap.has(i.product_id)) imgMap.set(i.product_id, i.url);
      });

      const lines: Line[] = validItems.map((i: any) => ({
        name: i.product.name,
        quantity: i.quantity,
        unit_price_cents: i.product.price_cents,
        image: imgMap.get(i.product.id) ?? null,
      }));
      const subtotal = lines.reduce((s, l) => s + l.unit_price_cents * l.quantity, 0);

      const html = buildHtml(stage, lines, subtotal);
      const { error: sendErr } = await resend.emails.send({
        from: FROM,
        to: [email],
        subject: COPY[stage].subject,
        html,
      });
      if (sendErr) {
        console.error(`send failed user=${userId}`, sendErr);
        skipped++;
        continue;
      }

      // Update tracking
      const patch: any = { user_id: userId, last_cart_updated_at: cartUpdatedAt };
      if (stage === "stage1") patch.stage1_sent_at = new Date().toISOString();
      else patch.stage2_sent_at = new Date().toISOString();
      await supabase
        .from("abandoned_cart_reminders")
        .upsert(patch, { onConflict: "user_id" });
      sent++;
    } catch (e) {
      console.error("user error", userId, e);
      skipped++;
    }
  }
  return { stage, sent, skipped };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const r1 = await processStage("stage1");
    const r2 = await processStage("stage2");
    return new Response(JSON.stringify({ ok: true, stage1: r1, stage2: r2 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("abandoned-cart error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
