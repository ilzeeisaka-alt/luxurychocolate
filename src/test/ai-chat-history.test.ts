import { describe, expect, it } from 'vitest'
import { HISTORY_LIMIT, loadRecentChatHistory } from '../../supabase/functions/ai-chat/history'

describe('AI chat recent context', () => {
  it('includes question 11 after ten completed exchanges, in chronological order', async () => {
    const messages = Array.from({ length: 21 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: i === 20 ? 'Question 11: can you print my logo?' : `Message ${i + 1}`,
    }))
    const query = {
      order: (_column: string, { ascending }: { ascending: boolean }) => ({
        limit: async (count: number) => ({
          data: (ascending ? messages : [...messages].reverse()).slice(0, count),
          error: null,
        }),
      }),
    }
    const context = await loadRecentChatHistory(query)
    expect(context).toHaveLength(HISTORY_LIMIT)
    expect(context[0].content).toBe('Message 2')
    expect(context.at(-1)).toEqual({ role: 'user', content: 'Question 11: can you print my logo?' })
  })
})