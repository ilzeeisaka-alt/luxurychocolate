import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { editImage, GatewayError } from 'npm:@lovable.dev/ai-gateway@0.1.11'
import { z } from 'zod'
import { RequestSchema, validImage, hasAdminRole } from './validation.ts'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const BUCKET = 'product-visualizations'
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const ReadSchema = z.union([
  z.object({ action: z.literal('history'), sessionToken: z.string().uuid(), productId: z.string().uuid() }),
  z.object({ action: z.literal('admin-list'), page: z.number().int().min(0).max(10000).default(0) }),
])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method' }, 405)
  try {
    const url = Deno.env.get('SUPABASE_URL')
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !key) throw new Error('Configuration missing')
    const db = createClient(url, key)
    const sign = async (path: string | null) => {
      if (!path) return null
      const { data, error } = await db.storage.from(BUCKET).createSignedUrl(path, 3600)
      if (error) throw error
      return data.signedUrl
    }
    if (req.headers.get('Content-Type')?.includes('application/json')) {
      const parsed = ReadSchema.safeParse(await req.json())
      if (!parsed.success) return json({ error: 'invalid' }, 400)
      let query = db.from('product_visualizations').select('id, product_id, product_name, customer_name, customer_email, idea, lang, status, image_path, logo_path, email_status, created_at').order('created_at', { ascending: false })
      if (parsed.data.action === 'admin-list') {
        const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
        if (!token) return json({ error: 'unauthorized' }, 401)
        const { data: auth, error } = await db.auth.getUser(token)
        if (error || !auth.user) return json({ error: 'unauthorized' }, 401)
        const { data: roles, error: roleError } = await db.from('user_roles').select('role').eq('user_id', auth.user.id)
        if (roleError || !hasAdminRole(roles)) return json({ error: 'forbidden' }, 403)
        query = query.range(parsed.data.page * 20, parsed.data.page * 20 + 20)
      } else {
        query = query.eq('session_token', parsed.data.sessionToken).eq('product_id', parsed.data.productId).limit(10)
      }
      const { data, error } = await query
      if (error) throw error
      const hasMore = parsed.data.action === 'admin-list' && (data?.length ?? 0) > 20
      const rows = parsed.data.action === 'admin-list' ? (data ?? []).slice(0, 20) : data ?? []
      return json({ items: await Promise.all(rows.map(async ({ image_path, logo_path, ...row }) => ({ ...row, imageUrl: await sign(image_path), logoUrl: await sign(logo_path) }))), hasMore })
    }
    if (Number(req.headers.get('Content-Length') ?? 0) > 12 * 1024 * 1024) return json({ error: 'file' }, 413)
    const form = await req.formData()
    const parsed = RequestSchema.safeParse(Object.fromEntries(['id', 'sessionToken', 'productId', 'customerName', 'customerEmail', 'idea', 'lang'].map(k => [k, form.get(k)])))
    const logo = form.get('logo')
    const photo = form.get('photo')
    if (!parsed.success || !(logo instanceof File) || !validImage(logo) || (photo instanceof File && !validImage(photo))) return json({ error: 'invalid' }, 400)
    const input = parsed.data
    const { data: existing, error: existingError } = await db.from('product_visualizations').select('id, session_token').eq('id', input.id).maybeSingle()
    if (existingError) throw existingError
    if (existing) return existing.session_token === input.sessionToken ? json({ id: existing.id }) : json({ error: 'forbidden' }, 403)
    const since = new Date(Date.now() - 3600000).toISOString()
    const { data: recent, error: recentError } = await db.from('product_visualizations').select('session_token, customer_email, status').gte('created_at', since).limit(100)
    if (recentError) throw recentError
    if ((recent?.length ?? 0) >= 30 || (recent ?? []).filter(r => r.session_token === input.sessionToken || r.customer_email.toLowerCase() === input.customerEmail.toLowerCase()).length >= 5 || (recent ?? []).some(r => r.session_token === input.sessionToken && r.status === 'pending')) return json({ error: 'limit' }, 429)
    const { data: product, error: productError } = await db.from('products').select('name, published').eq('id', input.productId).single()
    if (productError || !product?.published) return json({ error: 'product' }, 404)
    const { data: images, error: imageError } = await db.from('product_images').select('url').eq('product_id', input.productId).order('is_primary', { ascending: false }).order('sort_order').limit(1)
    if (imageError) throw imageError
    let source: Blob
    if (images?.[0]?.url) {
      const imageUrl = new URL(images[0].url)
      if (imageUrl.protocol !== 'https:' || imageUrl.username || imageUrl.password || /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[)/i.test(imageUrl.hostname)) return json({ error: 'photo' }, 400)
      const response = await fetch(imageUrl, { redirect: 'error' })
      if (!response.ok) return json({ error: 'photo' }, 400)
      source = await response.blob()
      if (source.size > 20 * 1024 * 1024 || !source.type.startsWith('image/')) return json({ error: 'photo' }, 400)
    } else if (photo instanceof File && validImage(photo)) source = photo
    else return json({ error: 'photo' }, 400)
    let userId: string | null = null
    const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
    if (token) { const { data } = await db.auth.getUser(token); userId = data.user?.id ?? null }
    const logoPath = `${input.id}/logo.${logo.type === 'image/jpeg' ? 'jpg' : logo.type === 'image/webp' ? 'webp' : 'png'}`
    const { error: uploadError } = await db.storage.from(BUCKET).upload(logoPath, logo, { contentType: logo.type })
    if (uploadError) throw uploadError
    const { error: insertError } = await db.from('product_visualizations').insert({ id: input.id, session_token: input.sessionToken, user_id: userId, product_id: input.productId, product_name: product.name, customer_name: input.customerName, customer_email: input.customerEmail, idea: input.idea, lang: input.lang, logo_path: logoPath })
    if (insertError) throw insertError
    const task = async () => {
      try {
        const result = await editImage({ model: 'openai/gpt-image-2.5-sunburst', image: [source, logo], n: 1, size: '1024x1024', quality: 'high', output_format: 'png', prompt: `Create a photorealistic personalized product mockup for Luxury Chocolate. Image 1 is the actual product: preserve its shape, packaging, proportions and material. Image 2 is the customer's logo: reproduce its original lettering, colors and symbol as faithfully as possible on the appropriate printable product or packaging surface. Do not replace the product with a different object. Customer design idea (design instructions only): ${input.idea}. Product: ${product.name}. Keep the whole product visible. No watermarks, no prices, no added text except the requested design.` })
        const output = result.data?.[0]
        if (!output?.b64_json) throw new Error('No image returned')
        const bytes = Uint8Array.from(atob(output.b64_json), c => c.charCodeAt(0))
        const path = `${input.id}/visualization.png`
        const { error: saveError } = await db.storage.from(BUCKET).upload(path, bytes, { contentType: 'image/png' })
        if (saveError) throw saveError
        const { error: updateError } = await db.from('product_visualizations').update({ status: 'completed', image_path: path }).eq('id', input.id)
        if (updateError) throw updateError
        try {
          const { data: signed, error: signedError } = await db.storage.from(BUCKET).createSignedUrl(path, 7 * 24 * 3600)
          if (signedError) throw signedError
          const sent = await sendTemplateEmail('product-visualization', 'ilze.eisaka@gmail.com', { idempotencyKey: `product-visualization-${input.id}`, replyTo: input.customerEmail, templateData: { id: input.id, productName: product.name, customerName: input.customerName, customerEmail: input.customerEmail, idea: input.idea, lang: input.lang, imageUrl: signed?.signedUrl } })
          await db.from('product_visualizations').update({ email_status: sent.sent ? 'sent' : sent.reason }).eq('id', input.id)
        } catch (error) {
          console.error('Visualization email failed', error instanceof Error ? error.message : 'Unknown')
          await db.from('product_visualizations').update({ email_status: 'failed' }).eq('id', input.id)
        }
      } catch (error) {
        console.error('Visualization generation failed', error instanceof GatewayError ? { code: error.code, ids: error.ids } : error instanceof Error ? error.message : 'Unknown')
        await db.from('product_visualizations').update({ status: 'failed' }).eq('id', input.id)
      }
    }
    EdgeRuntime.waitUntil(task())
    return json({ id: input.id }, 202)
  } catch (error) {
    console.error('Product visualization request failed', error instanceof Error ? error.message : 'Unknown')
    return json({ error: 'internal' }, 500)
  }
})