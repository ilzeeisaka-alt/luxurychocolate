import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { cakeChocolateContent } from "@/i18n/content";

import cupcakesKings from "@/assets/cakes/cupcakes-kings-college.webp";
import cupcakeSofie from "@/assets/cakes/cupcake-sofie.webp";
import tartCafeViva from "@/assets/cakes/tart-cafe-viva.webp";
import cakeBackberry from "@/assets/cakes/cake-backberry.webp";
import cakeRistiheina from "@/assets/cakes/cake-ristiheina.webp";
import cakeLaMer from "@/assets/cakes/cake-la-mer.webp";
import cakeFaceplay from "@/assets/cakes/cake-faceplay.webp";

const images = [
  cupcakesKings,
  cupcakeSofie,
  tartCafeViva,
  cakeBackberry,
  cakeRistiheina,
  cakeLaMer,
  cakeFaceplay,
];

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

interface CakeChocolateSectionProps {
  lang?: Lang;
}

const CakeChocolateSection = ({ lang = "lv" }: CakeChocolateSectionProps) => {
  const t = cakeChocolateContent[lang];

  return (
    <motion.section className="py-24" {...sectionVariants}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-4">
          {t.heading}
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
          {t.subtitle}
        </p>

        {/* Top row: 3 larger items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {t.items.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={images[i]}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row: 4 smaller items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.items.slice(3).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i + 3) * 0.08 }}
              className="bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={images[i + 3]}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CakeChocolateSection;
