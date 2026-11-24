import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { editImage, GatewayError } from 'npm:@lovable.dev/ai-gateway@0.1.11'
import { z } from 'npm:zod@3'

const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const BUCKET = 'customer-logos'

// Puts the client's logo onto our catalog product photo for the Order Sheet main image.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const parsed = z.object({ orderItemId: z.string().uuid() }).safeParse(await req.json())
    if (!parsed.success) return json({ error: 'Invalid input' }, 400)
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
    const { data: auth } = token ? await db.auth.getUser(token) : { data: null }
    if (!auth?.user) return json({ error: 'Unauthorized' }, 401)
    const { data: item } = await db.from('order_items').select('id, order_id, product_id, product_slug, product_name, logos, logo_url').eq('id', parsed.data.orderItemId).maybeSingle()
    if (!item) return json({ error: 'Not found' }, 404)
    const { data: order } = await db.from('orders').select('user_id').eq('id', item.order_id).maybeSingle()
    const { data: roles } = await db.from('user_roles').select('role').eq('user_id', auth.user.id)
    const admin = roles?.some((r: { role: string }) => r.role === 'admin')
    if (!admin && order?.user_id !== auth.user.id) return json({ error: 'Forbidden' }, 403)

    const { data: existing } = await db.from('order_item_mockups').select('storage_path').eq('order_item_id', item.id).maybeSingle()
    if (existing) return json({ found: true, storage_path: existing.storage_path })

    let productId = item.product_id
    if (!productId && item.product_slug) productId = (await db.from('products').select('id').eq('slug', item.product_slug).maybeSingle()).data?.id
    if (!productId) return json({ found: false, reason: 'no_product' })
    const { data: imgs } = await db.from('product_images').select('url, is_primary, sort_order').eq('product_id', productId)
    const photoUrl = [...(imgs ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order)[0]?.url
    if (!photoUrl) return json({ found: false, reason: 'no_photo' })

    let logo: Blob | null = null
    const { data: saved } = await db.from('order_client_logos').select('storage_path').eq('order_id', item.order_id).maybeSingle()
    if (saved) logo = (await db.storage.from(BUCKET).download(saved.storage_path)).data
    if (!logo) {
      const urls = [...(Array.isArray(item.logos) ? item.logos.map((l: { url?: string }) => l?.url) : []), item.logo_url].filter(Boolean) as string[]
      for (const u of urls) {
        const m = u.match(/\/storage\/v1\/object\/(?:public|sign)\/customer-logos\/([^?]+)/)
        logo = m ? (await db.storage.from(BUCKET).download(decodeURIComponent(m[1]))).data : await fetch(u).then(r => r.ok ? r.blob() : null).catch(() => null)
        if (logo && logo.type.startsWith('image/') && !logo.type.includes('svg')) break
        logo = null
      }
    }
    if (!logo) return json({ found: false, reason: 'no_logo' })
    const photo = await fetch(photoUrl).then(r => r.ok ? r.blob() : null)
    if (!photo) return json({ found: false, reason: 'no_photo' })

    const result = await editImage({ model: 'openai/gpt-image-2.5-sunburst', image: [photo, logo], n: 1, size: 'auto', quality: 'high', output_format: 'png',
      prompt: `Image 1 is our Luxury Chocolate catalog product photo (${item.product_name}). Image 2 is the client's logo. Replace every existing logo or print on the chocolates/packaging in image 1 with the client's logo from image 2, reproducing its lettering, colors and symbols faithfully, printed naturally on the chocolate surface. Keep the product, shape, quantity, packaging, background and composition exactly the same. Photorealistic, no extra text, no watermark.` })
    const b64 = result.data?.[0]?.b64_json
    if (!b64) throw new Error('No image returned')
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
    const path = `order-mockups/${item.order_id}/${item.id}.png`
    const { error: upErr } = await db.storage.from(BUCKET).upload(path, bytes, { contentType: 'image/png', upsert: true })
    if (upErr) throw upErr
    const { error: saveErr } = await db.from('order_item_mockups').upsert({ order_item_id: item.id, order_id: item.order_id, storage_path: path })
    if (saveErr) throw saveErr
    return json({ found: true, storage_path: path })
  } catch (e) {
    console.error('order-item-mockup failed', e instanceof GatewayError ? { code: e.code } : e instanceof Error ? e.message : e)
    return json({ error: e instanceof Error ? e.message : 'error' }, 500)
  }
})
