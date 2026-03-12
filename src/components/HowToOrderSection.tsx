import { Send, PenTool, CheckCircle, Truck } from "lucide-react";
import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { howToOrder } from "@/i18n/content";

const icons = [Send, PenTool, CheckCircle, Truck];

interface HowToOrderSectionProps { lang?: Lang; }

const HowToOrderSection = ({ lang = "lv" }: HowToOrderSectionProps) => {
  const t = howToOrder[lang];
  return (
    <section className="py-20" aria-labelledby="how-to-order-heading">
      <div className="container mx-auto text-center">
        <motion.h2 id="how-to-order-heading" className="text-3xl sm:text-4xl text-foreground mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }}>
          {t.heading}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {t.steps.map((label, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} className="flex flex-col items-center gap-3" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: i * 0.15 }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <span className="text-2xl font-bold text-primary">{i + 1}</span>
                <p className="text-sm text-foreground/80 max-w-[180px]">{label}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.6 }} dangerouslySetInnerHTML={{ __html: t.footer }} />
        <p className="sr-only">{t.srOnly}</p>
      </div>
    </section>
  );
};

export default HowToOrderSection;
