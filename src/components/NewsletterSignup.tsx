import { useState } from "react";
import { z } from "zod";
import { Mail, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const emailSchema = z.string().trim().email({ message: "Lūdzu, ievadi derīgu e-pasta adresi" }).max(255);

interface NewsletterSignupProps {
  lang?: string;
  source?: string;
}

const NewsletterSignup = ({ lang = "lv", source = "footer" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.toLowerCase(), lang, source });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.success("Tu jau esi pierakstījies jaunumiem!");
        setDone(true);
        return;
      }
      toast.error("Neizdevās pierakstīties. Mēģini vēlreiz.");
      return;
    }
    toast.success("Paldies! Esi pierakstījies jaunumiem.");
    setDone(true);
    setEmail("");
  };

  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-2">Jaunumi e-pastā</p>
      <p className="text-xs text-muted-foreground mb-3">
        Saņem idejas, akcijas un jaunumus par šokolādes apdruku.
      </p>
      {done ? (
        <div className="inline-flex items-center gap-2 text-sm text-primary">
          <Check size={16} /> Paldies par pierakstīšanos!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tavs@epasts.lv"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground font-medium hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : "Pierakstīties"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
