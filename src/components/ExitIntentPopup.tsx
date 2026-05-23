import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2, Gift, Copy, Check } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "exit-intent-shown";
const DISCOUNT_CODE = "SVEIKS10";
const DISCOUNT_PERCENT = 10;
const emailSchema = z.string().trim().email({ message: "Lūdzu, ievadi derīgu e-pasta adresi" }).max(255);

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    const armTimer = window.setTimeout(() => { armed = true; }, 8000); // arm after 8s

    const trigger = () => {
      if (!armed) return;
      if (localStorage.getItem(STORAGE_KEY)) return;
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
    };

    // Desktop: mouse leaves through top
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    // Mobile fallback: fast scroll up after scrolling down
    let lastY = window.scrollY;
    let maxY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > maxY) maxY = y;
      if (maxY > 600 && lastY - y > 80) trigger();
      lastY = y;
    };

    // Mobile fallback: page becomes hidden (switching tab / closing)
    const onVisibility = () => {
      if (document.visibilityState === "hidden") trigger();
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    if (!consent) {
      toast.error("Lūdzu, apstiprini piekrišanu e-pasta saņemšanai.");
      return;
    }
    setLoading(true);
    const normalized = parsed.data.toLowerCase();
    const lang = window.location.pathname.split("/")[1] || "lv";
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: normalized, lang, source: "exit-intent", gdpr_consent: true });
    setLoading(false);

    if (error && error.code !== "23505") {
      toast.error("Neizdevās nosūtīt. Mēģini vēlreiz.");
      return;
    }
    setSuccess(true);
    supabase.functions.invoke("notify-admin", {
      body: {
        type: "newsletter",
        data: { email: normalized, lang, source: "exit-intent", discount: `${DISCOUNT_PERCENT}% (${DISCOUNT_CODE})` },
      },
    }).catch(() => {});
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      toast.success("Kods nokopēts!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-card p-7 sm:p-8 shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:bg-accent transition"
              aria-label="Aizvērt"
            >
              <X size={18} />
            </button>

            {!success ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/15 text-primary">
                    <Gift size={28} />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-2">
                  Pagaidi! Saņem -{DISCOUNT_PERCENT}% atlaidi
                </h3>
                <p className="text-sm text-center text-muted-foreground mb-6 leading-relaxed">
                  Ievadi savu e-pastu un saņem <span className="text-primary font-semibold">-{DISCOUNT_PERCENT}% atlaidi</span> savam pirmajam pasūtījumam ar logo apdruku.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tavs@epasts.lv"
                      className="w-full pl-10 pr-3 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : `Saņemt -${DISCOUNT_PERCENT}% atlaides kodu`}
                  </button>
                </form>
                <p className="text-[11px] text-center text-muted-foreground mt-4">
                  Bez spama. Vari atrakstīties jebkurā brīdī.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check size={28} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Paldies!</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Tavs personīgais atlaides kods:
                </p>
                <button
                  onClick={copyCode}
                  className="w-full py-4 rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 text-primary text-2xl font-bold tracking-widest hover:bg-primary/15 transition flex items-center justify-center gap-3"
                >
                  {DISCOUNT_CODE}
                  {copied ? <Check size={20} /> : <Copy size={18} />}
                </button>
                <p className="text-xs text-muted-foreground mt-4">
                  Izmanto šo kodu, sazinoties ar mums, lai saņemtu -{DISCOUNT_PERCENT}% atlaidi.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-5 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  Aizvērt
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
