export const HISTORY_LIMIT = 20

interface ChatMessage {
  role: string
  content: string
}

interface HistoryQuery {
  order: (column: string, options: { ascending: boolean }) => {
    limit: (count: number) => PromiseLike<{ data: ChatMessage[] | null; error: unknown }>
  }
}

export async function loadRecentChatHistory(query: HistoryQuery) {
  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(HISTORY_LIMIT)
  if (error) throw error
  return (data ?? []).slice().reverse()
}