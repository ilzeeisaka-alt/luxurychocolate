import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { vat } = await req.json();
    if (!vat || typeof vat !== 'string') {
      return new Response(JSON.stringify({ error: 'vat required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const normalized = vat.replace(/[\s-]/g, '').toUpperCase();
    const country = normalized.slice(0, 2);
    const number = normalized.slice(2);
    if (!/^[A-Z]{2}$/.test(country) || number.length < 2) {
      return new Response(JSON.stringify({ valid: false, error: 'invalid format' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // VIES REST API
    const r = await fetch(`https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${country}/vat/${number}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!r.ok) {
      return new Response(JSON.stringify({ valid: false, error: `VIES status ${r.status}` }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const data = await r.json();
    return new Response(JSON.stringify({
      valid: !!data.isValid,
      name: data.name ?? null,
      address: data.address ?? null,
      countryCode: data.userCountryCode ?? country,
      vatNumber: data.vatNumber ?? number,
      requestDate: data.requestDate ?? new Date().toISOString(),
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ valid: false, error: String(e) }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
