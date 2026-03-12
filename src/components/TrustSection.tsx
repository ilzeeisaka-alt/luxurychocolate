import { Shield, Award, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { trust as trustContent } from "@/i18n/content";

const localClients = ["SEB Banka", "Latvenergo", "Rīgas Dome", "Printful", "Tet", "Maxima"];
const guaranteeIcons = [Shield, Award, Globe, Clock];
const vp = { once: true, margin: "-50px" as const };

interface TrustSectionProps { lang?: Lang; }

const TrustSection = ({ lang = "lv" }: TrustSectionProps) => {
  const t = trustContent[lang];
  return (
    <section className="py-20 bg-secondary/50" aria-labelledby="trust-heading">
      <div className="container mx-auto">
        <motion.h2 id="trust-heading" className="text-3xl sm:text-4xl text-foreground text-center mb-16" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          {t.heading}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" role="list">
          {t.stats.map((stat, i) => (
            <motion.div key={stat.label} role="listitem" className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">{t.clientsLabel}</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4" role="list">
            {localClients.map((client) => (
              <span key={client} role="listitem" className="text-lg font-medium text-muted-foreground/70 tracking-wide">{client}</span>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" role="list">
          {t.testimonials.map((te, i) => (
            <motion.blockquote key={te.author} role="listitem" className="bg-card rounded-xl p-6" style={{ boxShadow: "var(--shadow-card)" }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.45, delay: i * 0.15 }}>
              <p className="text-foreground/90 mb-4 italic">"{te.quote}"</p>
              <footer className="text-sm text-muted-foreground"><strong>{te.author}</strong>, {te.company}</footer>
            </motion.blockquote>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8" role="list">
          {t.guarantees.map((label, i) => {
            const Icon = guaranteeIcons[i];
            return (
              <motion.div key={label} role="listitem" className="flex items-center gap-2 text-muted-foreground" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.35, delay: i * 0.1 }}>
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
