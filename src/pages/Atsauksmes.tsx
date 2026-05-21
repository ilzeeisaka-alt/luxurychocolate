import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";
import { z } from "zod";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  title: string | null;
  content: string;
  created_at: string;
}

const schema = z.object({
  author_name: z.string().trim().min(1, "Vārds ir obligāts").max(100),
  author_email: z.string().trim().email("Nederīga e-pasta adrese").max(255).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(150).optional(),
  content: z.string().trim().min(3, "Atsauksme ir par īsu").max(2000),
});

const Atsauksmes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    author_name: "",
    author_email: "",
    rating: 5,
    title: "",
    content: "",
  });

  useSeo({
    title: "Atsauksmes par šokolādes apdruku | Luxury Chocolate",
    description: "Mūsu klientu atsauksmes par personalizētu šokolādi ar logo. Pievieno arī savu atsauksmi par Luxury Chocolate pakalpojumiem.",
    path: "/atsauksmes",
  });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("id, author_name, rating, title, content, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(100);
    setReviews(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Lūdzu pārbaudi datus", description: parsed.error.issues[0]?.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user?.id ?? null,
      author_name: parsed.data.author_name,
      author_email: parsed.data.author_email || null,
      rating: parsed.data.rating,
      title: parsed.data.title || null,
      content: parsed.data.content,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Kļūda", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Paldies!", description: "Tava atsauksme tiks publicēta pēc apstiprināšanas." });
    supabase.functions.invoke("notify-admin", {
      body: { type: "review", data: parsed.data },
    }).catch(() => {});
    setForm({ author_name: "", author_email: "", rating: 5, title: "", content: "" });
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <main className="bg-background min-h-screen pt-24 lg:pt-32">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Klientu atsauksmes</h1>
          <p className="text-muted-foreground mb-4">Ko mūsu klienti saka par Luxury Chocolate šokolādes apdruku</p>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-5 h-5 ${i <= Math.round(avg) ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {avg.toFixed(1)} / 5 · {reviews.length} atsauksmes
              </span>
            </div>
          )}
        </header>

        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Pievieno savu atsauksmi</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Vārds *</Label>
                <Input id="author_name" value={form.author_name} maxLength={100} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="author_email">E-pasts (nepublicē)</Label>
                <Input id="author_email" type="email" value={form.author_email} maxLength={255} onChange={(e) => setForm({ ...form, author_email: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Vērtējums *</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} type="button" onClick={() => setForm({ ...form, rating: i })} aria-label={`${i} zvaigznes`}>
                    <Star className={`w-8 h-8 transition ${i <= form.rating ? "fill-primary text-primary" : "text-muted hover:text-primary/50"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="title">Virsraksts</Label>
              <Input id="title" value={form.title} maxLength={150} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="content">Atsauksme *</Label>
              <Textarea id="content" value={form.content} maxLength={2000} rows={5} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
            </div>
            <Button type="submit" disabled={submitting} className="w-full md:w-auto">
              {submitting ? "Sūta..." : "Iesniegt atsauksmi"}
            </Button>
            <p className="text-xs text-muted-foreground">Pirms publicēšanas atsauksme tiek pārbaudīta.</p>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Visas atsauksmes</h2>
          {loading ? (
            <p className="text-muted-foreground">Ielādē...</p>
          ) : reviews.length === 0 ? (
            <p className="text-muted-foreground">Vēl nav atsauksmju. Esi pirmais!</p>
          ) : (
            reviews.map((r) => (
              <article key={r.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`w-4 h-4 ${i <= r.rating ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("lv-LV")}</span>
                </div>
                {r.title && <h3 className="font-semibold text-lg mb-1">{r.title}</h3>}
                <p className="text-foreground/90 whitespace-pre-wrap mb-2">{r.content}</p>
                <p className="text-sm text-muted-foreground">— {r.author_name}</p>
              </article>
            ))
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default Atsauksmes;
