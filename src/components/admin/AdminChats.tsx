import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";

interface Conversation {
  id: string;
  lang: string;
  created_at: string;
  updated_at: string;
  question: string;
}
interface Message { id: string; role: string; content: string; created_at: string }
const date = (iso: string) => new Date(iso).toLocaleString("lv-LV", { timeZone: "Europe/Riga", dateStyle: "short", timeStyle: "short" });

export default function AdminChats() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const selected = params.get("conversation");
  const conversations = useQuery({
    queryKey: ["admin-chats", page],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("ai-chat", { body: { action: "admin-list", page } });
      if (error || data?.error) throw new Error("Neizdevās ielādēt sarunas");
      return data as { conversations: Conversation[]; hasMore: boolean };
    },
    refetchInterval: 30000,
  });
  const messages = useQuery({
    queryKey: ["admin-chat-messages", selected],
    enabled: Boolean(selected),
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("ai-chat", { body: { action: "admin-history", conversationId: selected } });
      if (error || data?.error) throw new Error("Neizdevās ielādēt sarunu");
      return data as { messages: Message[] };
    },
    refetchInterval: 30000,
  });
  const select = (id: string) => setParams((current) => { current.set("tab", "chats"); current.set("conversation", id); return current; });

  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">AI sarunas</h2>
        <Button variant="outline" size="icon" aria-label="Atjaunot sarunas" title="Atjaunot sarunas" onClick={() => { void conversations.refetch(); if (selected) void messages.refetch(); }}><RefreshCw className="h-4 w-4" /></Button>
      </div>
      {conversations.isError && <p role="alert" className="text-destructive">Neizdevās ielādēt sarunas. Mēģiniet vēlreiz.</p>}
      {conversations.isLoading ? <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Ielādē sarunas" /> : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            {!conversations.data?.conversations.length && !conversations.isError && <p className="text-muted-foreground">Pagaidām nav sarunu.</p>}
            <div className="divide-y divide-border">
              {conversations.data?.conversations.map((conversation) => (
                <Button key={conversation.id} variant="ghost" className={`h-auto w-full justify-start whitespace-normal rounded-none py-4 text-left ${selected === conversation.id ? "bg-accent text-accent-foreground" : ""}`} onClick={() => select(conversation.id)}>
                  <span className="block min-w-0 w-full">
                    <span className="block text-xs text-muted-foreground mb-2">{date(conversation.updated_at)} · {conversation.lang.toUpperCase()}</span>
                    <span className="block line-clamp-3 break-words">{conversation.question || "Saruna bez ziņojumiem"}</span>
                  </span>
                </Button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" size="icon" aria-label="Iepriekšējās sarunas" disabled={page === 0} onClick={() => setPage((n) => n - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <span className="text-sm text-muted-foreground">{page + 1}</span>
              <Button variant="outline" size="icon" aria-label="Nākamās sarunas" disabled={!conversations.data?.hasMore} onClick={() => setPage((n) => n + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="min-w-0 lg:border-l lg:border-border lg:pl-6">
            {!selected && <p className="text-muted-foreground">Nav izvēlēta saruna.</p>}
            {messages.isLoading && selected && <Loader2 className="h-6 w-6 animate-spin text-primary" aria-label="Ielādē ziņojumus" />}
            {messages.isError && <p role="alert" className="text-destructive">Neizdevās ielādēt sarunu.</p>}
            <div className="space-y-6">
              {messages.data?.messages.map((message) => (
                <article key={message.id} className="border-b border-border pb-5">
                  <div className="flex flex-wrap justify-between gap-2 text-sm mb-2">
                    <strong className={message.role === "user" ? "text-foreground" : "text-primary"}>{message.role === "user" ? "Klients" : "AI asistents"}</strong>
                    <time className="text-muted-foreground">{date(message.created_at)}</time>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}