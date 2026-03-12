import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { ideasContent } from "@/i18n/content";

const vp = { once: true, margin: "-50px" as const };

interface IdeasSectionProps { lang?: Lang; }

const IdeasSection = ({ lang = "lv" }: IdeasSectionProps) => {
  const t = ideasContent[lang];
  return (
    <section className="py-20 bg-background" aria-labelledby="ideas-heading">
      <div className="container mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">{t.subtitle}</p>
          <h2 id="ideas-heading" className="text-3xl sm:text-4xl text-foreground">{t.heading}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((idea, i) => (
            <motion.div key={idea.path} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <Link to={idea.path} className="block h-full rounded-xl bg-card p-6 transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
                <span className="text-3xl block mb-4" aria-hidden="true">{idea.emoji}</span>
                <h3 className="text-lg font-medium text-foreground mb-2">{idea.title}</h3>
                <p className="text-sm text-muted-foreground">{idea.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeasSection;
