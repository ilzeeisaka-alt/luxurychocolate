import { useState } from "react";
import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { restaurantChocolateContent } from "@/i18n/content";
import Lightbox from "@/components/Lightbox";

import cakeLogo from "@/assets/restaurant/cake-logo-chocolate.jpg";
import chopard from "@/assets/restaurant/chopard-chocolate.jpg";
import billChocolate from "@/assets/restaurant/restaurant-bill-chocolate.jpg";
import dessertTripadvisor from "@/assets/restaurant/dessert-tripadvisor.jpg";
import champagneGlass from "@/assets/restaurant/champagne-glass-chocolate.jpg";
import cocktailGlass from "@/assets/restaurant/cocktail-glass-chocolate.jpg";

const images = [cakeLogo, chopard, billChocolate, dessertTripadvisor, champagneGlass, cocktailGlass];

const vp = { once: true, margin: "-50px" as const };

interface RestaurantChocolateSectionProps {
  lang?: Lang;
}

const RestaurantChocolateSection = ({ lang = "lv" }: RestaurantChocolateSectionProps) => {
  const t = restaurantChocolateContent[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section id="restoraniem" className="py-24 bg-secondary/50 scroll-mt-16" aria-labelledby="restaurant-chocolate-heading">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            <h2 id="restaurant-chocolate-heading" className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {t.benefits.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-sm text-foreground bg-card border border-border rounded-full px-4 py-2" style={{ boxShadow: "var(--shadow-card)" }}>
                ✓ {b}
              </span>
            ))}
          </motion.div>

          {/* Top row: 3 images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {t.items.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={vp}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  className="photo-card relative bg-card rounded-xl overflow-hidden cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette photo-gradient-gold">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.15]"
                    />
                    <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: 3 images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.items.slice(3).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: (i + 3) * 0.08 }}
              >
                <div
                  className="photo-card relative bg-card rounded-xl overflow-hidden cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i + 3)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette">
                    <img
                      src={images[i + 3]}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.1]"
                    />
                    <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3]">
                    <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Usage note */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {t.usageNote}
          </motion.p>
        </div>
      </section>

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

export default RestaurantChocolateSection;
