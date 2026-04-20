// Sends an email notification to the customer when an order status changes.
// Called from the admin panel after updating order status.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
const FROM = "Luxury Chocolate <onboarding@resend.dev>";

const STATUS_LABELS: Record<string, string> = {
  pending: "Gaida apmaksu",
  paid: "Apmaksāts",
  in_production: "Ražošanā",
  shipped: "Nosūtīts",
  delivered: "Piegādāts",
  cancelled: "Atcelts",
  refunded: "Atmaksāts",
};

const STATUS_MESSAGES: Record<string, { subject: string; intro: string; body: string }> = {
  paid: {
    subject: "Jūsu pasūtījums ir apmaksāts",
    intro: "Paldies! Mēs esam saņēmuši Jūsu apmaksu.",
    body: "Tuvākajā laikā uzsāksim Jūsu pasūtījuma sagatavošanu ražošanai. Informēsim Jūs par katru nākamo soli.",
  },
  in_production: {
    subject: "Jūsu pasūtījums ir nodots ražošanā",
    intro: "Lieliskas ziņas — Jūsu šokolādes ir nodotas ražošanā!",
    body: "Mūsu meistari sāk darbu pie Jūsu pasūtījuma. Standarta ražošanas laiks ir 3 darba dienas. Informēsim Jūs, tiklīdz sūtījums būs gatavs nosūtīšanai.",
  },
  shipped: {
    subject: "Jūsu pasūtījums ir nosūtīts",
    intro: "Jūsu pasūtījums ir ceļā pie Jums!",
    body: "Sūtījums ir nodots kurjeram un drīzumā nonāks pie Jums.",
  },
  delivered: {
    subject: "Jūsu pasūtījums ir piegādāts",
    intro: "Paldies, ka izvēlējāties Luxury Chocolate!",
    body: "Mēs ceram, ka esat apmierināti ar mūsu šokolādēm. Ja Jums radušās jebkādas piezīmes vai vēlaties veikt nākamo pasūtījumu, droši rakstiet mums!",
  },
  cancelled: {
    subject: "Jūsu pasūtījums ir atcelts",
    intro: "Informējam, ka Jūsu pasūtījums ir atcelts.",
    body: "Ja tas noticis kļūdas dēļ vai vēlaties veikt jaunu pasūtījumu, lūdzu, sazinieties ar mums.",
  },
  refunded: {
    subject: "Jūsu pasūtījuma apmaksa ir atgriezta",
    intro: "Apstiprinām, ka esam veikuši apmaksas atgriešanu.",
    body: "Naudas atgriešana var aizņemt 3-5 darba dienas, atkarībā no Jūsu bankas.",
  },
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify the caller is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { orderId, status, trackingNumber } = await req.json();
    if (!orderId || !status) {
      return new Response(JSON.stringify({ error: "Missing orderId or status" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tpl = STATUS_MESSAGES[status];
    if (!tpl) {
      // No notification for this status (e.g. 'pending')
      return new Response(JSON.stringify({ skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();

    if (orderErr || !order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerName = order.customer_name || "Cienījamais klient";
    const orderNum = order.order_number;
    const trackingHtml =
      status === "shipped" && trackingNumber
        ? `
        <div style="margin:24px 0;padding:16px;background:#f8f5f0;border-left:4px solid #c9a55a;border-radius:4px;">
          <div style="font-size:13px;color:#666;margin-bottom:4px;">Izsekošanas numurs</div>
          <div style="font-family:monospace;font-size:18px;font-weight:600;color:#1a1a1a;">${escapeHtml(trackingNumber)}</div>
        </div>`
        : "";

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
        <tr><td style="padding:32px 40px;background:#1a1a1a;text-align:center;">
          <h1 style="margin:0;color:#c9a55a;font-size:24px;letter-spacing:2px;font-weight:300;">LUXURY CHOCOLATE</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <div style="display:inline-block;padding:6px 14px;background:#c9a55a;color:#1a1a1a;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;">
            ${escapeHtml(STATUS_LABELS[status] || status)}
          </div>
          <h2 style="margin:0 0 8px;font-size:22px;color:#1a1a1a;">${escapeHtml(tpl.intro)}</h2>
          <p style="margin:0 0 16px;color:#666;font-size:14px;">Pasūtījums <strong style="color:#1a1a1a;font-family:monospace;">${escapeHtml(orderNum)}</strong></p>
          <p style="margin:24px 0;color:#333;font-size:15px;line-height:1.6;">${escapeHtml(customerName)},</p>
          <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">${escapeHtml(tpl.body)}</p>
          ${trackingHtml}
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
          <p style="margin:0;color:#888;font-size:13px;line-height:1.6;">
            Ja Jums ir kādi jautājumi, droši rakstiet mums uz <a href="mailto:info@luxurychocolate.lv" style="color:#c9a55a;">info@luxurychocolate.lv</a> vai zvaniet +371 26 200 600.
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;background:#fafaf7;text-align:center;border-top:1px solid #eee;">
          <p style="margin:0;color:#999;font-size:12px;">© Luxury Chocolate · luxurychocolate.lv</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const result = await resend.emails.send({
      from: FROM,
      to: order.customer_email,
      subject: `${tpl.subject} · ${orderNum}`,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-order-status-email error:", (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
