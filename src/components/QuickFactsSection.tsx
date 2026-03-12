import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { quickFacts } from "@/i18n/content";

const vp = { once: true, margin: "-50px" as const };

interface QuickFactsSectionProps { lang?: Lang; }

const QuickFactsSection = ({ lang = "lv" }: QuickFactsSectionProps) => {
  const t = quickFacts[lang];
  return (
    <section className="py-12 bg-secondary/50" aria-labelledby="quick-facts-heading">
      <div className="container mx-auto text-center">
        <motion.h2 id="quick-facts-heading" className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.3 }}>
          {t.heading}
        </motion.h2>
        <motion.ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-10 gap-y-3 text-sm sm:text-base text-foreground/90 list-none p-0 m-0" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
          {t.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span className="text-primary" aria-hidden="true">✔</span> {fact}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default QuickFactsSection;
