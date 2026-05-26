import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_RECIPIENTS = ["info@luxurychocolate.lv", "ilze.eisaka@gmail.com"];

const esc = (v: unknown) =>
  String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { type, data } = await req.json();
    const apiKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("RESEND_FROM_EMAIL") ?? "Luxury Chocolate <onboarding@resend.dev>";

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "email_not_configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let subject = "Jauns notikums mājaslapā";
    let html = "";

    if (type === "newsletter") {
      subject = `Jauns newsletter pierakstītājs — ${esc(data?.email)}`;
      html = `
        <h2>Jauns newsletter pierakstītājs</h2>
        <p><strong>E-pasts:</strong> ${esc(data?.email)}</p>
        <p><strong>Valoda:</strong> ${esc(data?.lang || "lv")}</p>
        <p><strong>Avots:</strong> ${esc(data?.source || "nezināms")}</p>
        <p><strong>Laiks:</strong> ${new Date().toLocaleString("lv-LV", { timeZone: "Europe/Riga" })}</p>
      `;
    } else if (type === "review") {
      subject = `Jauna atsauksme (${esc(data?.rating)}★) no ${esc(data?.author_name)}`;
      html = `
        <h2>Jauna atsauksme — gaida apstiprināšanu</h2>
        <p><strong>Autors:</strong> ${esc(data?.author_name)}</p>
        <p><strong>E-pasts:</strong> ${esc(data?.author_email || "nav norādīts")}</p>
        <p><strong>Vērtējums:</strong> ${esc(data?.rating)} / 5</p>
        <p><strong>Virsraksts:</strong> ${esc(data?.title || "—")}</p>
        <p><strong>Saturs:</strong></p>
        <blockquote style="border-left:3px solid #c9a84c;padding-left:12px;color:#444;">${esc(data?.content)}</blockquote>
        <p style="margin-top:16px;"><a href="https://luxurychocolate.lv/admin">Atvērt admin paneli</a></p>
      `;
    } else if (type === "order_confirmed") {
      const items = Array.isArray(data?.items) ? data.items : [];
      subject = `Jauns pasūtījums ${esc(data?.orderNumber)} — ${esc(data?.company)}`;
      html = `
        <h2>Jauns pasūtījums apstiprināts</h2>
        <p><strong>Pasūtījuma nr.:</strong> ${esc(data?.orderNumber)}</p>
        <p><strong>Rēķina nr.:</strong> ${esc(data?.invoiceNumber)}</p>
        <hr style="margin:16px 0;border:0;border-top:1px solid #ddd;" />
        <p><strong>Uzņēmums:</strong> ${esc(data?.company)}</p>
        <p><strong>Reģ. Nr.:</strong> ${esc(data?.regNr || "—")}</p>
        <p><strong>PVN:</strong> ${esc(data?.vat || "—")}</p>
        <p><strong>Adrese:</strong> ${esc(data?.address)}</p>
        <p><strong>E-pasts:</strong> ${esc(data?.email)}</p>
        <p><strong>Tel.:</strong> ${esc(data?.phone || "—")}</p>
        <p><strong>Piegāde:</strong> ${esc(data?.shipping)}</p>
        <hr style="margin:16px 0;border:0;border-top:1px solid #ddd;" />
        <p><strong>Preces:</strong></p>
        <ul>
          ${items.map((i: any) => `<li>${esc(i.name)} — ${esc(String(i.qty))} gab. x ${esc(String(i.price))} EUR</li>`).join("")}
        </ul>
        <p style="margin-top:12px;font-size:18px;"><strong>Kopā: ${esc(String(data?.total))} ${esc(data?.currency)}</strong></p>
        <p style="margin-top:16px;"><a href="https://luxurychocolate.lv/admin">Atvērt admin paneli</a></p>
      `;
    } else {
      subject = `Jauns notikums: ${esc(type)}`;
      html = `<pre>${esc(JSON.stringify(data, null, 2))}</pre>`;
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ from, to: ADMIN_RECIPIENTS, subject, html }),
    });

    const body = await resp.json();
    if (!resp.ok) {
      console.error("notify-admin send failed", body);
      // Fallback: try ilze only if Resend test-mode restriction
      const fallback = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ from, to: ["ilze.eisaka@gmail.com"], subject, html }),
      });
      const fb = await fallback.json();
      return new Response(JSON.stringify({ success: fallback.ok, fallback: true, body: fb }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
