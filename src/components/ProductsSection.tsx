import { motion } from "framer-motion";
import giftBoxCorporate from "@/assets/gift-box-corporate.webp";
import praline from "@/assets/praline.webp";
import heroChocolate from "@/assets/hero-chocolate.webp";
import type { Lang } from "@/i18n/types";
import { products as productsContent } from "@/i18n/content";

const images = [heroChocolate, giftBoxCorporate, praline];

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

interface ProductsSectionProps { lang?: Lang; }

const ProductsSection = ({ lang = "lv" }: ProductsSectionProps) => {
  const t = productsContent[lang];
  return (
    <motion.section className="py-24" {...sectionVariants}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-4">{t.heading}</h2>
        <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">{t.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((product, i) => (
            <div key={product.title} className="bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="aspect-square overflow-hidden">
                <img src={images[i]} alt={product.alt} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductsSection;
