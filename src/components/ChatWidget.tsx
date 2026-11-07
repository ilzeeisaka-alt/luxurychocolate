import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useCurrentLang } from "@/i18n/useCurrentLang";
import { getChatWidgetStrings } from "@/i18n/chatWidget";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/ai-chat`;
const TOKEN_KEY = "lc_chat_token";

function getSessionToken(): string {
  let token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(TOKEN_KEY, token);
  }
  return token;
}

export default function ChatWidget() {
  const lang = useCurrentLang();
  const t = getChatWidgetStrings(lang);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [navigationHeight, setNavigationHeight] = useState(56);

  useEffect(() => {
    const navigation = document.getElementById("luxury-navigation")?.firstElementChild;
    if (!navigation) return;
    const updatePosition = () => setNavigationHeight(navigation.getBoundingClientRect().height);
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(navigation);
    return () => observer.disconnect();
  }, []);

  // Load saved conversation the first time the widget is opened.
  useEffect(() => {
    if (!open || historyLoaded) return;
    setHistoryLoaded(true);
    fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
      },
      body: JSON.stringify({ action: "history", sessionToken: getSessionToken(), lang }),
    })
      .then((r) => (r.ok ? r.json() : { messages: [] }))
      .then((d: { messages?: ChatMessage[] }) => {
        if (Array.isArray(d.messages)) setMessages(d.messages);
      })
      .catch(() => {});
  }, [open, historyLoaded, lang]);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  // Keep the input focused while chatting.
  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setMessages((prev) => [...prev, { role: "user", content: text }, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({
          action: "message",
          sessionToken: getSessionToken(),
          lang,
          message: text,
        }),
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let failed = false;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const evt = JSON.parse(line.slice(6)) as { type: string; text?: string };
            if (evt.type === "delta" && evt.text) {
              const delta = evt.text;
              setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === "assistant") {
                  next[next.length - 1] = { ...last, content: last.content + delta };
                }
                return next;
              });
            } else if (evt.type === "error") {
              failed = true;
            }
          } catch {
            // ignore malformed keep-alive lines
          }
        }
      }

      if (failed) throw new Error("stream error");
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant" && !last.content) {
          next[next.length - 1] = { ...last, content: t.error };
        }
        return next;
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Assistant entry directly below navigation */}
      {!open && (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.title}
          aria-expanded={false}
          style={{ top: navigationHeight + 12 }}
          className="fixed right-3 z-30 h-11 max-w-[calc(100vw-1.5rem)] gap-2 rounded-md px-4 shadow-lg print:hidden sm:right-5"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{t.title}</span>
        </Button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          style={{ top: navigationHeight + 12, maxHeight: `calc(100dvh - ${navigationHeight + 24}px)` }}
          className="fixed right-3 z-30 flex h-[560px] w-[min(380px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl print:hidden sm:right-5"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs opacity-80">{t.subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="h-8 w-8 shrink-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-background px-3 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{t.greeting}</ReactMarkdown>
            </div>

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                >
                  {m.content}
                </div>
              ) : (
                <div
                  key={i}
                  className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground"
                >
                  {m.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  ) : (
                    busy && i === messages.length - 1 && (
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        {t.typing}
                      </span>
                    )
                  )}
                </div>
              ),
            )}
          </div>

          <div className="flex items-end gap-2 border-t border-border bg-card p-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder={t.placeholder}
              rows={1}
              maxLength={2000}
              className="max-h-28 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              size="icon"
              type="button"
              onClick={() => void send()}
              disabled={busy || !input.trim()}
              aria-label={t.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
