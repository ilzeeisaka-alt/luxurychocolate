import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Handshake, Presentation, Gift } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { useCasesContent } from "@/i18n/content";

const vp = { once: true, margin: "-50px" as const };
const iconMap = [Users, Presentation, Handshake, Gift];

interface UseCasesSectionProps { onCtaClick: () => void; lang?: Lang; }

const UseCasesSection = ({ onCtaClick, lang = "lv" }: UseCasesSectionProps) => {
  const t = useCasesContent[lang];
  return (
    <section className="py-20 bg-background" aria-labelledby="use-cases-heading">
      <div className="container mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">{t.subtitle}</p>
          <h2 id="use-cases-heading" className="text-3xl sm:text-4xl text-foreground">{t.heading}</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {t.items.map((s, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4, delay: i * 0.08 }} className="group rounded-xl border border-border bg-card p-6 flex flex-col text-center hover:border-primary/40 hover:shadow-md transition-all">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4"><Icon className="w-6 h-6 text-primary" /></span>
                <h3 className="text-lg font-medium text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{s.desc}</p>
                <div className="flex flex-col gap-2">
                  <Link to={s.link} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">{s.linkLabel}</Link>
                  <button onClick={onCtaClick} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">{t.ctaLabel}</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
