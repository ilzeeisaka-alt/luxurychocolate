export interface Visualization {
  id: string; product_id: string; product_name: string; customer_name: string; customer_email: string;
  idea: string; lang: string; status: string; imageUrl: string | null; logoUrl: string | null; email_status: string | null; created_at: string;
}
export function visualizationSession() {
  const key = 'luxury-visualization-session'
  const saved = localStorage.getItem(key)
  if (saved && /^[0-9a-f-]{36}$/i.test(saved)) return saved
  const id = crypto.randomUUID(); localStorage.setItem(key, id); return id
}
export async function downloadVisualization(url: string, id: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Download failed')
  const local = URL.createObjectURL(await response.blob())
  const link = document.createElement('a'); link.href = local; link.download = `LuxuryChocolate_Visualization_${id}.png`; link.click()
  setTimeout(() => URL.revokeObjectURL(local), 1000)
}