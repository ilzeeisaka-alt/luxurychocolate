import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, company, email, phone, size, packaging, purpose, quantity, message, logoUrl } = await req.json();

    if (!name || !company || !email) {
      return new Response(
        JSON.stringify({ error: 'Trūkst obligāto lauku' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    // Build email HTML
    const logoSection = logoUrl 
      ? `<p><strong>Logo fails:</strong> <a href="${logoUrl}">${logoUrl}</a></p>
         <p><img src="${logoUrl}" alt="Klienta logo" style="max-width:300px;max-height:200px;" /></p>`
      : '<p><em>Logo nav pievienots</em></p>';

    const htmlBody = `
      <h2>Jauns piedāvājuma pieprasījums</h2>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px;font-weight:bold;">Vārds:</td><td style="padding:8px;">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Uzņēmums:</td><td style="padding:8px;">${company}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">E-pasts:</td><td style="padding:8px;">${email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Telefons:</td><td style="padding:8px;">${phone || 'Nav norādīts'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Izmērs:</td><td style="padding:8px;">${size || 'Nav norādīts'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Iepakojums:</td><td style="padding:8px;">${packaging || 'Nav norādīts'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Pielietošana:</td><td style="padding:8px;">${purpose || 'Nav norādīts'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Daudzums:</td><td style="padding:8px;">${quantity || 'Nav norādīts'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Ziņojums:</td><td style="padding:8px;">${message || 'Nav norādīts'}</td></tr>
      </table>
      ${logoSection}
    `;

    if (RESEND_API_KEY) {
      // Send via Resend
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Luxury Chocolate <onboarding@resend.dev>',
          to: ['ilze.eisaka@gmail.com'],
          subject: `Jauns pieprasījums no ${company} — ${name}`,
          html: htmlBody,
          reply_to: email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Resend error:', JSON.stringify(data));
        // Don't throw — log the request instead so it's not lost
        console.log('=== FALLBACK LOG (email failed) ===');
        console.log(JSON.stringify({ name, company, email, quantity, message, logoUrl }));
      } else {
        console.log('Email sent successfully:', JSON.stringify(data));
      }
    } else {
      // Log the submission when no email service configured
      console.log('=== NEW OFFER REQUEST (no email service configured) ===');
      console.log('Name:', name);
      console.log('Company:', company);
      console.log('Email:', email);
      console.log('Quantity:', quantity);
      console.log('Message:', message);
      console.log('Logo URL:', logoUrl);
      console.log('========================================');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
