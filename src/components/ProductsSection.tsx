import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import giftBoxCorporate from "@/assets/gift-box-corporate.webp";
import pralinePhoto from "@/assets/ziemassvetku-sokolades-davanas.webp";
import heroChocolate from "@/assets/logo-chocolate-cookie.webp";
import bookBoxPhoto from "@/assets/sokolades-gramata-hero.jpg";
import type { Lang } from "@/i18n/types";
import { products as productsContent } from "@/i18n/content";

const images = [heroChocolate, giftBoxCorporate, pralinePhoto, bookBoxPhoto];

const productLinks: Record<Lang, string> = {
  lv: "/sokolades-gramata",
  en: "/en/chocolate-book-box",
  ru: "/ru/shokoladnaya-kniga",
  et: "/et/sokolaadi-raamat",
  lt: "/lt/sokolado-knyga",
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((product, i) => {
            const isBookBox = i === 3;
            const linkTo = isBookBox ? productLinks[lang] : undefined;
            const Card = (
              <div className="bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 h-full" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="aspect-square overflow-hidden">
                  <img src={images[i]} alt={product.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </div>
            );
            return linkTo ? (
              <Link key={product.title} to={linkTo} className="block">
                {Card}
              </Link>
            ) : (
              <div key={product.title}>{Card}</div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductsSection;
