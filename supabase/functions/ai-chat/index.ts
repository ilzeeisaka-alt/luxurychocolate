import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { streamResponse, GatewayError } from 'npm:@lovable.dev/ai-gateway'
import { z } from 'npm:zod@3'

const BodySchema = z.object({
  action: z.enum(['history', 'message']),
  sessionToken: z.string().uuid(),
  lang: z.string().min(2).max(5).default('lv'),
  message: z.string().min(1).max(2000).optional(),
})

const MAX_MESSAGES_PER_CONVERSATION = 60
const HISTORY_LIMIT = 20

const SYSTEM_PROMPT = `You are the AI assistant of Luxury Chocolate SIA (luxurychocolate.lv), a Latvian company making personalized Belgian chocolate with printed logos, photos and designs.

Key facts:
- Products: personalized chocolate with company logos, printed cake chocolates (circles, squares 1.5–8 cm), gingerbread with print, special-shape chocolates (hearts, keys, Oscar statuettes, bricks), chocolate with printed paper (e.g. Karl Fazer 200 g), corporate gift boxes with magnetic closure, wedding chocolates, macarons, cupcakes.
- Chocolate: premium Belgian chocolate (Belcolade, Callebaut) — dark, milk, white.
- Ordering: minimum order from 1 piece. Free design sketch within 24 hours. Fast production in 3 days.
- Prices on the website include 21% VAT. Custom shapes/moulds creation costs 302.50 €.
- Shop: luxurychocolate.lv/veikals — hundreds of products in many categories.
- Company: Luxury Chocolate SIA, VAT LV40103921954, Kandavas iela 29a, Rīga, LV-1083, Latvia.
- Contact: Ilze Eisaka, phone +371 26177853, email ilze.eisaka@gmail.com.
- The website is available in 55 languages.

Rules:
- Always answer in the same language the user writes in.
- Be friendly, brief and concrete. Use short paragraphs or bullet points.
- If you don't know an exact price or detail, say so and suggest contacting Ilze (+371 26177853, ilze.eisaka@gmail.com) or using the offer form on the website.
- Never invent prices, discounts or delivery terms that are not listed above.
- For individual price quotes, large orders or deadlines, direct the user to the contacts above.`

function sse(obj: unknown): string {
  return `data: ${JSON.stringify(obj)}\n\n`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const { action, sessionToken, lang, message } = parsed.data

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Find or create the conversation for this browser session.
    let { data: convo } = await supabase
      .from('chat_conversations')
      .select('id')
      .eq('session_token', sessionToken)
      .maybeSingle()

    if (!convo) {
      const { data: created, error: createErr } = await supabase
        .from('chat_conversations')
        .insert({ session_token: sessionToken, lang })
        .select('id')
        .single()
      if (createErr) throw createErr
      convo = created
    }
    const conversationId = convo!.id

    if (action === 'history') {
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('role, content, created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(100)
      if (error) throw error
      return new Response(JSON.stringify({ messages: messages ?? [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Basic abuse guard: cap messages per conversation.
    const { count } = await supabase
      .from('chat_messages')
      .select('id', { count: 'exact', head: true })
      .eq('conversation_id', conversationId)
    if ((count ?? 0) >= MAX_MESSAGES_PER_CONVERSATION) {
      return new Response(JSON.stringify({ error: 'Message limit reached' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { error: insertErr } = await supabase
      .from('chat_messages')
      .insert({ conversation_id: conversationId, role: 'user', content: message })
    if (insertErr) throw insertErr

    const { data: history, error: histErr } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(HISTORY_LIMIT)
    if (histErr) throw histErr

    const input = (history ?? []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    const stream = await streamResponse({
      model: 'openai/gpt-6-astra',
      instructions: SYSTEM_PROMPT,
      input,
      reasoning: { effort: 'low' },
    })

    const encoder = new TextEncoder()
    let fullText = ''

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'response.output_text.delta' && 'delta' in event) {
              const delta = String((event as { delta: unknown }).delta ?? '')
              if (delta) {
                fullText += delta
                controller.enqueue(encoder.encode(sse({ type: 'delta', text: delta })))
              }
            }
          }
          if (fullText.trim()) {
            await supabase
              .from('chat_messages')
              .insert({ conversation_id: conversationId, role: 'assistant', content: fullText })
            await supabase
              .from('chat_conversations')
              .update({ updated_at: new Date().toISOString(), lang })
              .eq('id', conversationId)
          }
          controller.enqueue(encoder.encode(sse({ type: 'done' })))
        } catch (err) {
          if (err instanceof GatewayError) {
            console.error('Gateway error:', err.code, err.message)
          } else {
            console.error('Stream error:', err)
          }
          controller.enqueue(encoder.encode(sse({ type: 'error' })))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('ai-chat error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
