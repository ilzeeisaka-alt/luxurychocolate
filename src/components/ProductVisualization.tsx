import { useEffect, useId, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download, Loader2, Sparkles } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCurrentLang } from '@/i18n/useCurrentLang'
import { visualizationText } from '@/i18n/visualizations'
import { downloadVisualization, visualizationSession, type Visualization } from '@/lib/visualizations'
import { validImage } from '../../supabase/functions/product-visualization/validation'
import { logoAccept, prepareLogo, validLogoFile } from '@/lib/logoFiles'

export default function ProductVisualization({ productId, productName, imageUrl, compact = false }: { productId: string; productName: string; imageUrl: string | null; compact?: boolean }) {
  const lang = useCurrentLang(); const t = visualizationText(lang); const prefix = useId()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [idea, setIdea] = useState('')
  const [logo, setLogo] = useState<File | null>(null); const [photo, setPhoto] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [consent, setConsent] = useState(false); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState('')
  const [active, setActive] = useState<string | null>(null)
  const [preparingLogo, setPreparingLogo] = useState(false)
  const logoSelection = useRef(0)
  const history = useQuery({
    queryKey: ['visualizations', productId], enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('product-visualization', { body: { action: 'history', productId, sessionToken: visualizationSession() } })
      if (error) throw error
      return data.items as Visualization[]
    },
    refetchInterval: query => query.state.data?.some(r => r.status === 'pending' || (r.status === 'completed' && !r.email_status)) || active ? 4000 : false,
  })
  useEffect(() => {
    if (!logo) { setLogoPreview(null); return }
    const url = URL.createObjectURL(logo); setLogoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [logo])
  const current = history.data?.find(r => r.id === active)
  useEffect(() => { if (current && current.status !== 'pending') setActive(null) }, [current])
  const pending = preparingLogo || submitting || Boolean(active) || history.data?.some(r => r.status === 'pending')
  const pickLogo = async (file: File | undefined) => {
    const selection = ++logoSelection.current
    setLogo(null); setError(''); setPreparingLogo(false)
    if (!file) return
    if (!validLogoFile(file)) { setError(t.logoFile); return }
    setPreparingLogo(true)
    try { const prepared = await prepareLogo(file); if (selection === logoSelection.current) setLogo(prepared) }
    catch { if (selection === logoSelection.current) setError(t.logoError) }
    finally { if (selection === logoSelection.current) setPreparingLogo(false) }
  }
  const pickFile = (file: File | undefined, set: (file: File | null) => void) => {
    setError(''); if (!file) { set(null); return }
    if (!validImage(file)) { setError(t.file); set(null); return }
    set(file)
  }
  const generate = async (event: React.FormEvent) => {
    event.preventDefault(); if (!logo || !consent || pending) return
    setSubmitting(true); setError('')
    const id = crypto.randomUUID()
    const form = new FormData()
    Object.entries({ id, sessionToken: visualizationSession(), productId, customerName: name, customerEmail: email, idea, lang }).forEach(([k, v]) => form.append(k, v))
    form.append('logo', logo); if (photo) form.append('photo', photo)
    try {
      const { data, error } = await supabase.functions.invoke('product-visualization', { body: form })
      if (error || data?.error) {
        const status = error && 'context' in error ? error.context?.status : null
        throw new Error(status === 429 ? t.limit : t.error)
      }
      setActive(data.id); void history.refetch()
    } catch (error) { setError(error instanceof Error ? error.message : t.error) }
    finally { setSubmitting(false) }
  }
  return <>
    <Button variant="outline" size={compact ? 'sm' : 'default'} className="w-full h-auto min-h-10 whitespace-normal gap-2 text-primary" onClick={() => setOpen(true)}><Sparkles className="h-4 w-4 shrink-0" />{t.button}</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl w-[calc(100%-1rem)] max-h-[90dvh] overflow-y-auto">
        <DialogHeader><DialogTitle>{t.title}</DialogTitle><DialogDescription>{productName}</DialogDescription></DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">
          <form className="space-y-4 min-w-0" onSubmit={generate}>
            <div className="space-y-1"><Label htmlFor={`${prefix}-name`}>{t.name}</Label><Input id={`${prefix}-name`} required minLength={2} maxLength={120} autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor={`${prefix}-email`}>{t.email}</Label><Input id={`${prefix}-email`} type="email" required maxLength={254} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor={`${prefix}-logo`}>{t.logo}</Label><Input className="h-auto" id={`${prefix}-logo`} type="file" accept={logoAccept} required onChange={e => void pickLogo(e.target.files?.[0])} /><p className="text-xs text-muted-foreground">{t.logoFile}</p>{preparingLogo && <p role="status" className="text-xs text-muted-foreground">{t.preparingLogo}</p>}{logoPreview && <img src={logoPreview} alt={t.logo} className="h-20 max-w-full object-contain" />}</div>
            {!imageUrl && <div className="space-y-1"><Label htmlFor={`${prefix}-photo`}>{t.photo}</Label><Input className="h-auto" id={`${prefix}-photo`} type="file" accept="image/png,image/jpeg,image/webp" required onChange={e => pickFile(e.target.files?.[0], setPhoto)} /></div>}
            <div className="space-y-1"><Label htmlFor={`${prefix}-idea`}>{t.idea}</Label><Textarea id={`${prefix}-idea`} required minLength={3} maxLength={2000} placeholder={t.placeholder} value={idea} onChange={e => setIdea(e.target.value)} /></div>
            <div className="flex items-start gap-2"><Checkbox id={`${prefix}-consent`} checked={consent} onCheckedChange={v => setConsent(v === true)} /><Label className="text-xs leading-relaxed" htmlFor={`${prefix}-consent`}>{t.consent} <a href="/privatuma-politika" target="_blank" rel="noreferrer" className="underline">{t.privacy}</a></Label></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full gap-2 h-auto min-h-11 whitespace-normal" disabled={pending || !consent || !logo || (!imageUrl && !photo)}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{pending ? t.loading : t.generate}</Button>
          </form>
          <div className="min-w-0 space-y-4">
            {imageUrl && <img src={imageUrl} alt={productName} className="w-full aspect-square object-contain bg-muted" />}
            <p className="text-xs text-muted-foreground">{t.note}</p>
            {history.isError && <p role="alert" className="text-sm text-destructive">{t.error}</p>}
            {(history.data?.length ?? 0) > 0 && <h3 className="font-semibold">{t.history}</h3>}
            {history.data?.map(row => <article key={row.id} className="space-y-2 border-t border-border pt-4">
              <p className="text-sm break-words">{row.idea}</p>
              {row.status === 'pending' && <p role="status" className="text-sm flex gap-2"><Loader2 className="h-4 w-4 animate-spin text-primary" />{t.loading}</p>}
              {row.status === 'failed' && <p className="text-destructive text-sm">{t.failed}</p>}
              {row.imageUrl && <><img src={row.imageUrl} alt={t.title} className="w-full aspect-square object-contain" /><Button variant="outline" className="w-full gap-2" onClick={() => { if (row.imageUrl) void downloadVisualization(row.imageUrl, row.id).catch(() => setError(t.error)) }}><Download className="h-4 w-4" />{t.download}</Button><p className="text-xs text-muted-foreground">{row.email_status === 'sent' ? t.saved : row.email_status === 'failed' || row.email_status === 'recipient_suppressed' ? t.emailFailed : ''}</p></>}
            </article>)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
}