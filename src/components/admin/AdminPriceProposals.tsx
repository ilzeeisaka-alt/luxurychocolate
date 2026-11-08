import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'

export default function AdminPriceProposals() {
  const [page, setPage] = useState(0)
  const query = useQuery({ queryKey: ['admin-price-proposals', page], queryFn: async () => {
    const { data, error } = await supabase.from('product_price_proposals').select('*').order('created_at', { ascending: false }).range(page * 20, page * 20 + 20)
    if (error) throw error
    return { items: (data ?? []).slice(0, 20), hasMore: (data?.length ?? 0) > 20 }
  } })
  return <section>
    <div className="flex items-center justify-between gap-4 mb-6"><h2 className="text-2xl font-semibold">Klientu cenas piedāvājumi</h2><Button variant="outline" size="icon" aria-label="Atjaunot cenas piedāvājumus" title="Atjaunot" onClick={() => void query.refetch()}><RefreshCw className="h-4 w-4" /></Button></div>
    {query.isLoading && <p className="text-muted-foreground">Ielādē…</p>}
    {query.isError && <p role="alert" className="text-destructive">Neizdevās ielādēt piedāvājumus.</p>}
    {!query.isLoading && !query.isError && !query.data?.items.length && <p className="text-muted-foreground">Pagaidām nav cenas piedāvājumu.</p>}
    <div className="divide-y divide-border">{query.data?.items.map(row => {
      const money = (cents: number) => new Intl.NumberFormat('lv-LV', { style: 'currency', currency: row.currency }).format(cents / 100)
      return <article key={row.id} className="py-5 grid md:grid-cols-2 gap-4 break-words">
        <div className="space-y-2"><Link to={`/veikals/${row.product_slug}`} className="font-semibold text-primary underline">{row.product_name}</Link><p>Veikala cena: {money(row.current_price_cents)} / gab.</p><p className="font-semibold">Vēlamā cena: {money(row.proposed_price_cents)} / gab. · {row.quantity} gab.</p>{row.message && <p className="whitespace-pre-wrap text-sm">{row.message}</p>}</div>
        <div className="space-y-2"><p>{row.customer_name}</p><a href={`mailto:${row.customer_email}`} className="text-primary underline break-all">{row.customer_email}</a><p className="text-sm text-muted-foreground">{new Date(row.created_at).toLocaleString('lv-LV', { timeZone: 'Europe/Riga' })} · {row.lang.toUpperCase()}</p><p className="text-sm">E-pasts: {row.email_status === 'sent' ? 'nosūtīts' : row.email_status === 'pending' ? 'gaida' : row.email_status === 'recipient_suppressed' ? 'saņēmējs atteicies' : 'neizdevās nosūtīt'}</p></div>
      </article>
    })}</div>
    <div className="flex justify-center items-center gap-4 mt-6"><Button size="icon" variant="outline" aria-label="Iepriekšējā lapa" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button><span>{page + 1}</span><Button size="icon" variant="outline" aria-label="Nākamā lapa" disabled={!query.data?.hasMore} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button></div>
  </section>
}