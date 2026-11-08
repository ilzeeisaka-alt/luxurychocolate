import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { ProposalSchema } from './validation.ts'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method' }, 405)
  if (Number(req.headers.get('Content-Length') ?? 0) > 20000) return json({ error: 'invalid' }, 413)
  try {
    const parsed = ProposalSchema.safeParse(await req.json())
    if (!parsed.success) return json({ error: 'invalid' }, 400)
    const input = parsed.data
    const url = Deno.env.get('SUPABASE_URL'), key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !key) throw new Error('Configuration missing')
    const db = createClient(url, key)
    const { data: product, error: productError } = await db.from('products').select('id, name, slug, price_cents, currency').eq('id', input.productId).eq('published', true).maybeSingle()
    if (productError) throw productError
    if (!product) return json({ error: 'product' }, 404)
    const { count, error: countError } = await db.from('product_price_proposals').select('id', { count: 'exact', head: true }).eq('customer_email', input.customerEmail).gte('created_at', new Date(Date.now() - 3600000).toISOString())
    if (countError) throw countError
    if ((count ?? 0) >= 5) return json({ error: 'rate_limited' }, 429)
    const { error: insertError } = await db.from('product_price_proposals').insert({
      id: input.id, product_id: product.id, product_name: product.name, product_slug: product.slug,
      current_price_cents: product.price_cents, currency: product.currency,
      proposed_price_cents: input.proposedPriceCents, quantity: input.quantity,
      customer_name: input.customerName, customer_email: input.customerEmail, message: input.message, lang: input.lang,
    })
    if (insertError?.code === '23505') return json({ received: true })
    if (insertError) throw insertError
    let emailStatus = 'failed'
    try {
      const money = (cents: number) => new Intl.NumberFormat('lv-LV', { style: 'currency', currency: product.currency }).format(cents / 100)
      const result = await sendTemplateEmail('product-price-proposal', 'ilze.eisaka@gmail.com', {
        idempotencyKey: `product-price-proposal-${input.id}`, replyTo: input.customerEmail,
        templateData: { productName: product.name, productSlug: product.slug, currentPrice: money(product.price_cents), proposedPrice: money(input.proposedPriceCents), quantity: input.quantity, customerName: input.customerName, customerEmail: input.customerEmail, message: input.message, lang: input.lang },
      })
      emailStatus = result.sent ? 'sent' : result.reason
    } catch (error) { console.error('Price proposal notification failed', error instanceof Error ? error.name : 'unknown') }
    const { error: updateError } = await db.from('product_price_proposals').update({ email_status: emailStatus }).eq('id', input.id)
    if (updateError) console.error('Price proposal email status update failed')
    return json({ received: true })
  } catch (error) {
    console.error('Price proposal failed', error instanceof Error ? error.name : 'unknown')
    return json({ error: 'failed' }, 500)
  }
})