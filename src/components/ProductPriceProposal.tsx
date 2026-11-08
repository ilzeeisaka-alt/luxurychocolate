import { useId, useState, type FormEvent } from 'react'
import { BadgeEuro, Check, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { supabase } from '@/integrations/supabase/client'
import { useCurrentLang } from '@/i18n/useCurrentLang'
import { priceProposalLabels } from '@/lib/priceProposalLabels'

interface Props { productId: string; productName: string; priceCents: number; currency: string; quantity?: number; compact?: boolean }
export default function ProductPriceProposal({ productId, productName, priceCents, currency, quantity = 1, compact }: Props) {
  const lang = useCurrentLang(), t = priceProposalLabels(lang), prefix = useId()
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false), [success, setSuccess] = useState(false), [error, setError] = useState('')
  const [consent, setConsent] = useState(false), [requestId, setRequestId] = useState<string | null>(null)
  const money = new Intl.NumberFormat(lang, { style: 'currency', currency }).format(priceCents / 100)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!consent || busy) return
    const form = new FormData(event.currentTarget), id = requestId ?? crypto.randomUUID()
    setRequestId(id); setBusy(true); setError('')
    try {
      const { data, error: invocationError } = await supabase.functions.invoke('product-price-proposal', { body: {
        id, productId, customerName: form.get('name'), customerEmail: form.get('email'),
        proposedPriceCents: Math.round(Number(String(form.get('price')).replace(',', '.')) * 100),
        quantity: Number(form.get('quantity')), message: form.get('message'), lang, consent,
      } })
      if (invocationError || !data?.received) throw invocationError ?? new Error('failed')
      setSuccess(true)
    } catch { setError(t.error) } finally { setBusy(false) }
  }
  return <Dialog open={open} onOpenChange={value => { if (!busy) { setOpen(value); if (!value) { setSuccess(false); setConsent(false); setRequestId(null); setError('') } } }}>
    <DialogTrigger asChild><Button variant="outline" size={compact ? 'sm' : 'default'} className="w-full gap-2 whitespace-normal h-auto min-h-9 py-2"><BadgeEuro className="h-4 w-4 shrink-0" />{t.offer}</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] overflow-y-auto w-[calc(100%-2rem)] max-w-lg" onEscapeKeyDown={e => { if (busy) e.preventDefault() }} onInteractOutside={e => { if (busy) e.preventDefault() }}>
      <DialogHeader><DialogTitle>{t.title}</DialogTitle><DialogDescription>{productName}</DialogDescription></DialogHeader>
      {success ? <div className="space-y-4"><p role="status" className="flex items-center gap-2"><Check className="h-5 w-5 text-primary shrink-0" />{t.success}</p><Button className="w-full" onClick={() => { setOpen(false); setSuccess(false); setConsent(false); setRequestId(null); setError('') }}>{t.close}</Button></div> : <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-muted-foreground">{t.current}: <span className="text-foreground font-medium">{money}</span></p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label htmlFor={`${prefix}-price`}>{t.price} ({currency})</Label><Input id={`${prefix}-price`} name="price" type="number" inputMode="decimal" min="0.01" max="1000000" step="0.01" required /></div>
          <div className="space-y-2"><Label htmlFor={`${prefix}-quantity`}>{t.quantity}</Label><Input id={`${prefix}-quantity`} name="quantity" type="number" inputMode="numeric" min="1" max="1000000" step="1" defaultValue={quantity} required /></div>
        </div>
        <div className="space-y-2"><Label htmlFor={`${prefix}-name`}>{t.name}</Label><Input id={`${prefix}-name`} name="name" autoComplete="name" minLength={2} maxLength={120} required /></div>
        <div className="space-y-2"><Label htmlFor={`${prefix}-email`}>{t.email}</Label><Input id={`${prefix}-email`} name="email" type="email" autoComplete="email" maxLength={254} required /></div>
        <div className="space-y-2"><Label htmlFor={`${prefix}-message`}>{t.message}</Label><Textarea id={`${prefix}-message`} name="message" maxLength={2000} rows={2} /></div>
        <div className="flex items-start gap-2"><Checkbox id={`${prefix}-consent`} checked={consent} onCheckedChange={v => setConsent(v === true)} /><Label htmlFor={`${prefix}-consent`} className="text-xs leading-relaxed">{t.consent}</Label></div>
        <p className="text-xs text-muted-foreground">{t.note}</p>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full gap-2" disabled={!consent || busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{t.send}</Button>
      </form>}
    </DialogContent>
  </Dialog>
}