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
    const { name, company, email, quantity, message, logoUrl } = await req.json();

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
          to: ['info@luxuschocolate.com'],
          subject: `Jauns pieprasījums no ${company} — ${name}`,
          html: htmlBody,
          reply_to: email,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Resend error:', errorText);
        throw new Error(`Email sending failed: ${res.status}`);
      }

      const data = await res.json();
      console.log('Email sent successfully:', data);
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
