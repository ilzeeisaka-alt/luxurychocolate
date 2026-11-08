import { useEffect, useId, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download, Loader2, Sparkles, Pencil, X } from 'lucide-react'
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
import { logoAccept, prepareLogo, validLogoFile, combineDesignFiles } from '@/lib/logoFiles'

export default function ProductVisualization({ productId, productName, imageUrl, compact = false }: { productId: string; productName: string; imageUrl: string | null; compact?: boolean }) {
  const lang = useCurrentLang(); const t = visualizationText(lang); const prefix = useId()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [idea, setIdea] = useState('')
  const [designFiles, setDesignFiles] = useState<{ id: string; name: string; file: File }[]>([]); const [photo, setPhoto] = useState<File | null>(null)
  const [consent, setConsent] = useState(false); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState('')
  const [active, setActive] = useState<string | null>(null)
  const [revision, setRevision] = useState<Visualization | null>(null)
  const ideaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (!revision) return
    const frame = requestAnimationFrame(() => { ideaRef.current?.scrollIntoView({ block: 'center' }); ideaRef.current?.focus({ preventScroll: true }) })
    return () => cancelAnimationFrame(frame)
  }, [revision])
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
  const current = history.data?.find(r => r.id === active)
  useEffect(() => { if (current && current.status !== 'pending') setActive(null) }, [current])
  const pending = preparingLogo || submitting || Boolean(active) || history.data?.some(r => r.status === 'pending')
  const pickLogo = async (files: File[]) => {
    const selection = ++logoSelection.current
    setError('')
    if (!files.length) return
    setPreparingLogo(true)
    try {
      for (const file of files) {
        if (selection !== logoSelection.current) break
        try {
          if (!validLogoFile(file)) throw new Error('Unsupported file')
          const prepared = await prepareLogo(file)
          if (selection === logoSelection.current) setDesignFiles(previous => [...previous, { id: crypto.randomUUID(), name: file.name, file: prepared }])
        } catch { setError(`${file.name}: ${t.logoError}`) }
      }
    } finally { if (selection === logoSelection.current) setPreparingLogo(false) }
  }
  const pickFile = (file: File | undefined, set: (file: File | null) => void) => {
    setError(''); if (!file) { set(null); return }
    if (!validImage(file)) { setError(t.file); set(null); return }
    set(file)
  }
  const generate = async (event: React.FormEvent) => {
    event.preventDefault(); if ((!designFiles.length && !revision) || !consent || pending) return
    setSubmitting(true); setError('')
    const id = crypto.randomUUID()
    const form = new FormData()
    Object.entries({ id, sessionToken: visualizationSession(), productId, customerName: name, customerEmail: email, idea, lang }).forEach(([k, v]) => form.append(k, v))
    if (revision) form.append('parentId', revision.id)
    try {
      if (designFiles.length) form.append('logo', await combineDesignFiles(designFiles.map(entry => entry.file)))
      if (photo) form.append('photo', photo)
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
            <div className="space-y-2"><Label htmlFor={`${prefix}-logo`}>{t.designFiles}</Label><Input className="h-auto" id={`${prefix}-logo`} type="file" multiple accept={logoAccept} disabled={pending} onChange={e => { const files = Array.from(e.target.files ?? []); e.target.value = ''; void pickLogo(files) }} /><p className="text-xs text-muted-foreground">{t.logoFile}</p>{preparingLogo && <p role="status" className="text-xs text-muted-foreground">{t.preparingLogo}</p>}<ul className="max-h-48 overflow-y-auto space-y-1">{designFiles.map(entry => <li key={entry.id} className="flex items-center gap-2 text-xs"><span className="min-w-0 flex-1 break-all">{entry.name}</span><Button type="button" variant="ghost" size="icon" disabled={pending} aria-label={`${t.removeFile}: ${entry.name}`} title={t.removeFile} onClick={() => setDesignFiles(previous => previous.filter(file => file.id !== entry.id))}><X className="h-4 w-4" /></Button></li>)}</ul>{!designFiles.length && revision?.logoUrl && <img src={revision.logoUrl} alt={t.logo} className="h-20 max-w-full object-contain" />}</div>
            {!imageUrl && !revision && <div className="space-y-1"><Label htmlFor={`${prefix}-photo`}>{t.photo}</Label><Input className="h-auto" id={`${prefix}-photo`} type="file" accept="image/png,image/jpeg,image/webp" required onChange={e => pickFile(e.target.files?.[0], setPhoto)} /></div>}
            {revision && <div className="space-y-2 border-l-2 border-primary pl-3"><p className="text-sm font-medium">{t.editing}</p><p className="text-xs text-muted-foreground break-words">{revision.idea}</p><Button type="button" variant="ghost" size="sm" disabled={pending} onClick={() => { setRevision(null); setIdea('') }}>{t.startOver}</Button></div>}
            <div className="space-y-1"><Label htmlFor={`${prefix}-idea`}>{revision ? t.changes : t.idea}</Label><Textarea ref={ideaRef} id={`${prefix}-idea`} required minLength={3} maxLength={2000} placeholder={t.placeholder} value={idea} onChange={e => setIdea(e.target.value)} /></div>
            <div className="flex items-start gap-2"><Checkbox id={`${prefix}-consent`} checked={consent} onCheckedChange={v => setConsent(v === true)} /><Label className="text-xs leading-relaxed" htmlFor={`${prefix}-consent`}>{t.consent} <a href="/privatuma-politika" target="_blank" rel="noreferrer" className="underline">{t.privacy}</a></Label></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full gap-2 h-auto min-h-11 whitespace-normal" disabled={pending || !consent || (!designFiles.length && !revision) || (!imageUrl && !photo && !revision)}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{pending ? t.loading : revision ? t.generateRevision : t.generate}</Button>
          </form>
          <div className="min-w-0 space-y-4">
            {(revision?.imageUrl || imageUrl) && <img src={revision?.imageUrl ?? imageUrl ?? ''} alt={productName} className="w-full aspect-square object-contain bg-muted" />}
            <p className="text-xs text-muted-foreground">{t.note}</p>
            {history.isError && <p role="alert" className="text-sm text-destructive">{t.error}</p>}
            {(history.data?.length ?? 0) > 0 && <h3 className="font-semibold">{t.history}</h3>}
            {history.data?.map(row => <article key={row.id} className="space-y-2 border-t border-border pt-4">
              <p className="text-sm break-words">{row.idea}</p>
              {row.status === 'pending' && <p role="status" className="text-sm flex gap-2"><Loader2 className="h-4 w-4 animate-spin text-primary" />{t.loading}</p>}
              {row.status === 'failed' && <p className="text-destructive text-sm">{t.failed}</p>}
              {row.status === 'completed' && row.imageUrl && <Button variant="outline" className="w-full gap-2" disabled={pending} onClick={() => { setRevision(row); setName(row.customer_name); setEmail(row.customer_email); setIdea(''); setError(''); setDesignFiles([]) }}><Pencil className="h-4 w-4" />{t.edit}</Button>}
              {row.imageUrl && <><img src={row.imageUrl} alt={t.title} className="w-full aspect-square object-contain" /><Button variant="outline" className="w-full gap-2" onClick={() => { if (row.imageUrl) void downloadVisualization(row.imageUrl, row.id).catch(() => setError(t.error)) }}><Download className="h-4 w-4" />{t.download}</Button><p className="text-xs text-muted-foreground">{row.email_status === 'sent' ? t.saved : row.email_status === 'failed' || row.email_status === 'recipient_suppressed' ? t.emailFailed : ''}</p></>}
            </article>)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
}