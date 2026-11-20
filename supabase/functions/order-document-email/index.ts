import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { sendOrderDocuments } from '../_shared/order-documents.ts';
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version' };
Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
  if (req.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return respond({ error: 'Service unavailable' }, 503);
  const db = createClient(url, serviceKey);
  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return respond({ error: 'Unauthorized' }, 401);
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) return respond({ error: 'Unauthorized' }, 401);
  try {
    const { orderId } = await req.json();
    if (typeof orderId !== 'string' || !/^[0-9a-f-]{36}$/i.test(orderId)) return respond({ error: 'Invalid order' }, 400);
    return respond(await sendOrderDocuments(db, orderId, data.user.id));
  } catch (error) {
    console.error('Order document email failed:', error instanceof Error ? error.message : 'Unknown error');
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) :
      error instanceof Error && error.message === 'Order not available' ? 'order_not_available' :
      error instanceof Error && error.message === 'Order is incomplete' ? 'order_incomplete' : 'send_failed';
    return respond({ error: 'Could not send order documents', code }, 400);
  }
});
