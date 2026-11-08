import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Download, Loader2, RefreshCw } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { downloadVisualization, type Visualization } from '@/lib/visualizations'
export default function AdminVisualizations() {
  const [page, setPage] = useState(0); const [error, setError] = useState(''); const [params] = useSearchParams()
  const query = useQuery({ queryKey: ['admin-visualizations', page], queryFn: async () => {
    const { data, error } = await supabase.functions.invoke('product-visualization', { body: { action: 'admin-list', page } })
    if (error) throw error
    return data as { items: Visualization[]; hasMore: boolean }
  }, refetchInterval: 30000 })
  return <section>
    <div className="flex justify-between gap-4 mb-6"><h2 className="text-2xl font-semibold">Klientu vizualizācijas</h2><Button size="icon" variant="outline" title="Atjaunot" aria-label="Atjaunot vizualizācijas" onClick={() => void query.refetch()}><RefreshCw className="h-4 w-4" /></Button></div>
    {(query.isError || error) && <p role="alert" className="text-destructive">{error || 'Neizdevās ielādēt vizualizācijas.'}</p>}
    {query.isLoading && <Loader2 className="animate-spin h-6 w-6 text-primary" />}
    {!query.isLoading && !query.isError && !query.data?.items.length && <p className="text-muted-foreground">Pagaidām nav vizualizāciju.</p>}
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{query.data?.items.map(row => <article key={row.id} className={`min-w-0 border rounded-lg overflow-hidden ${params.get('visualization') === row.id ? 'border-primary' : 'border-border'}`}>
      {row.imageUrl && <img src={row.imageUrl} alt={row.product_name} className="aspect-square w-full object-contain bg-muted" />}
      <div className="p-4 space-y-3 break-words"><h3 className="font-semibold">{row.product_name}</h3><p>{row.customer_name}<br /><a className="text-primary underline break-all" href={`mailto:${row.customer_email}`}>{row.customer_email}</a></p><p className="text-sm whitespace-pre-wrap">{row.idea}</p>
        <p className="text-xs text-muted-foreground">{new Date(row.created_at).toLocaleString('lv-LV', { timeZone: 'Europe/Riga' })} · {row.lang.toUpperCase()}</p>
        <p className="text-sm">{row.status === 'completed' ? 'Pabeigta' : row.status === 'failed' ? 'Ģenerēšana neizdevās' : 'Tiek ģenerēta'} · E-pasts: {row.email_status === 'sent' ? 'nosūtīts' : row.email_status === 'failed' ? 'kļūda' : row.email_status === 'recipient_suppressed' ? 'saņēmējs atteicies' : 'gaida'}</p>
        {row.logoUrl && <a className="text-primary text-sm underline" href={row.logoUrl} target="_blank" rel="noreferrer">Klienta logo</a>}
        {row.imageUrl && <Button variant="outline" className="w-full gap-2" onClick={() => { if (row.imageUrl) void downloadVisualization(row.imageUrl, row.id).catch(() => setError('Neizdevās lejupielādēt attēlu.')) }}><Download className="h-4 w-4" />Saglabāt attēlu</Button>}
      </div>
    </article>)}</div>
    <div className="flex items-center justify-center gap-4 mt-6"><Button size="icon" variant="outline" aria-label="Iepriekšējā lapa" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button><span>{page + 1}</span><Button size="icon" variant="outline" aria-label="Nākamā lapa" disabled={!query.data?.hasMore} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button></div>
  </section>
}