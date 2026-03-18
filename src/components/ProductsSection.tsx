import { useState } from "react";
import { motion } from "framer-motion";
import giftBoxCorporate from "@/assets/gift-box-corporate.webp";
import pralinePhoto from "@/assets/ziemassvetku-sokolades-davanas.webp";
import heroChocolate from "@/assets/logo-chocolate-cookie.webp";
import bookBoxPhoto from "@/assets/sokolades-gramata-hero.jpg";
import type { Lang } from "@/i18n/types";
import { products as productsContent } from "@/i18n/content";
import Lightbox from "@/components/Lightbox";

const images = [heroChocolate, giftBoxCorporate, pralinePhoto, bookBoxPhoto];

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

interface ProductsSectionProps { lang?: Lang; }

const ProductsSection = ({ lang = "lv" }: ProductsSectionProps) => {
  const t = productsContent[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section className="py-24" {...sectionVariants}>
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-4">{t.heading}</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">{t.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.items.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative bg-card rounded-xl overflow-hidden h-full cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-square overflow-hidden relative photo-vignette photo-gradient-gold">
                    <img
                      src={images[i]}
                      alt={product.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.15]"
                    />
                    <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-6 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        title={lightboxIndex !== null ? t.items[lightboxIndex]?.title : undefined}
        description={lightboxIndex !== null ? t.items[lightboxIndex]?.description : undefined}
      />
    </>
  );
};

export default ProductsSection;
