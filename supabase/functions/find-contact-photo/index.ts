import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3'

const MAILBOX = ['gmail.com','googlemail.com','outlook.com','hotmail.com','live.com','yahoo.com','icloud.com','inbox.lv','mail.ru','yandex.ru','proton.me','protonmail.com']
const PATHS = ['', '/par', '/par/', '/par-mums', '/komanda', '/about', '/about-us', '/team', '/our-team', '/kontakti', '/contacts', '/contact', '/en/about', '/en/team']
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const fold = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

async function get(url: string) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 LuxuryChocolateBot' }, redirect: 'follow', signal: AbortSignal.timeout(8000) })
  return r
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const parsed = z.object({ orderId: z.string().uuid(), kind: z.enum(['photo','logo']).default('photo') }).safeParse(await req.json())
    if (!parsed.success) return json({ error: 'Invalid input' }, 400)
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
    if (!token) return json({ error: 'Unauthorized' }, 401)
    const { data: auth } = await db.auth.getUser(token)
    if (!auth?.user) return json({ error: 'Unauthorized' }, 401)
    const { data: roles } = await db.from('user_roles').select('role').eq('user_id', auth.user.id)
    if (!roles?.some((r: { role: string }) => r.role === 'admin')) return json({ error: 'Forbidden' }, 403)

    const { orderId, kind } = parsed.data
    if (kind === 'logo') return await findLogo(db, auth.user.id, orderId)
    const { data: existing } = await db.from('order_contact_photos').select('storage_path').eq('order_id', orderId).maybeSingle()
    if (existing) return json({ found: true, storage_path: existing.storage_path })
    const { data: order } = await db.from('orders').select('customer_name, customer_email').eq('id', orderId).maybeSingle()
    if (!order) return json({ error: 'Not found' }, 404)
    const domain = order.customer_email?.toLowerCase().split('@')[1]
    if (!domain || MAILBOX.includes(domain)) return json({ found: false, reason: 'no_company_website' })
    const words = fold(order.customer_name ?? '').split(/[^a-z]+/).filter(w => w.length > 2)
    const first = words[0], last = words[1]
    if (!first) return json({ found: false, reason: 'no_name' })

    for (const base of [`https://www.${domain}`, `https://${domain}`]) {
      for (const p of PATHS) {
        let html = ''
        let pageUrl = base + p
        try { const r = await get(pageUrl); if (!r.ok) continue; pageUrl = r.url; html = await r.text() } catch { continue }
        const imgs = [...html.matchAll(/<img\b[^>]*>/gi)]
        let best: { src: string; score: number } | null = null
        for (const m of imgs) {
          const tag = m[0]
          const src = (tag.match(/\b(?:data-src|src)=["']([^"']+)["']/i) || [])[1]
          if (!src || src.startsWith('data:') || /\.svg(\?|$)/i.test(src)) continue
          const alt = (tag.match(/\balt=["']([^"']*)["']/i) || [])[1] ?? ''
          const near = html.slice(m.index!, m.index! + 600).replace(/<[^>]+>/g, ' ')
          const hay = fold(`${alt} ${src}`)
          const ctx = fold(near)
          let score = 0
          if (hay.includes(first)) score += 3
          if (last && hay.includes(last)) score += 3
          if (ctx.includes(first)) score += 1
          if (last && ctx.includes(last)) score += 2
          if (score >= 3 && (!best || score > best.score)) best = { src: new URL(src, pageUrl).href, score }
        }
        if (!best) continue
        const img = await get(best.src).catch(() => null)
        const type = img?.headers.get('content-type') ?? ''
        if (!img?.ok || !/^image\/(jpeg|png|webp)/.test(type)) continue
        const bytes = new Uint8Array(await img.arrayBuffer())
        if (bytes.length > 8_000_000 || bytes.length < 2000) continue
        const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg'
        const path = `${auth.user.id}/order-contacts/${orderId}/${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await db.storage.from('customer-logos').upload(path, bytes, { contentType: type.split(';')[0] })
        if (upErr) throw upErr
        const { error: saveErr } = await db.from('order_contact_photos').upsert({ order_id: orderId, storage_path: path })
        if (saveErr) { await db.storage.from('customer-logos').remove([path]); throw saveErr }
        return json({ found: true, storage_path: path, source: pageUrl })
      }
    }
    return json({ found: false, reason: 'not_found' })
  } catch (e) {
    console.error(e)
    return json({ error: e instanceof Error ? e.message : 'error' }, 500)
  }
})

async function saveImage(db: any, userId: string, orderId: string, url: string, table: string, folder: string) {
  const img = await get(url).catch(() => null)
  const type = img?.headers.get('content-type') ?? ''
  if (!img?.ok || !/^image\/(jpeg|png|webp)/.test(type)) return null
  const bytes = new Uint8Array(await img.arrayBuffer())
  if (bytes.length > 8_000_000 || bytes.length < 500) return null
  const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg'
  const path = `${userId}/${folder}/${orderId}/${crypto.randomUUID()}.${ext}`
  const { error } = await db.storage.from('customer-logos').upload(path, bytes, { contentType: type.split(';')[0] })
  if (error) throw error
  const { error: saveErr } = await db.from(table).upsert({ order_id: orderId, storage_path: path })
  if (saveErr) { await db.storage.from('customer-logos').remove([path]); throw saveErr }
  return path
}

async function findLogo(db: any, userId: string, orderId: string) {
  const { data: existing } = await db.from('order_client_logos').select('storage_path').eq('order_id', orderId).maybeSingle()
  if (existing) return json({ found: true, storage_path: existing.storage_path })
  const { data: order } = await db.from('orders').select('customer_email, company_name').eq('id', orderId).maybeSingle()
  if (!order) return json({ error: 'Not found' }, 404)
  const domain = order.customer_email?.toLowerCase().split('@')[1]
  if (!domain || MAILBOX.includes(domain)) return json({ found: false, reason: 'no_company_website' })
  const brand = fold(domain.split('.')[0])
  for (const base of [`https://www.${domain}`, `https://${domain}`]) {
    let html = '', pageUrl = base
    try { const r = await get(base); if (!r.ok) continue; pageUrl = r.url; html = await r.text() } catch { continue }
    const candidates: string[] = []
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = m[0]
      const src = (tag.match(/\bsrc=["']([^"']+)["']/i) || [])[1]
      const alt = fold((tag.match(/\balt=["']([^"']*)["']/i) || [])[1] ?? '')
      if (src && !src.startsWith('data:') && /logo/i.test(`${alt} ${src}`) && fold(`${alt} ${src}`).includes(brand)) candidates.push(src)
    }
    for (const re of [/<link[^>]*rel=["']apple-touch-icon[^"']*["'][^>]*href=["']([^"']+)["']/i, /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']apple-touch-icon/i, /<meta[^>]*property=["']og:logo["'][^>]*content=["']([^"']+)["']/i]) {
      const m = html.match(re); if (m) candidates.push(m[1])
    }
    for (const c of candidates) {
      const path = await saveImage(db, userId, orderId, new URL(c.replace(/&amp;/g, '&'), pageUrl).href, 'order_client_logos', 'order-client-logos')
      if (path) return json({ found: true, storage_path: path, source: pageUrl })
    }
  }
  return json({ found: false, reason: 'not_found' })
}
