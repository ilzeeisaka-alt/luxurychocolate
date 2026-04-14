import { motion } from "framer-motion";
import { useState } from "react";
import { Gift, Diamond, Star } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { vipGiftContent } from "@/i18n/content";
import Lightbox from "@/components/Lightbox";

import horseshoePullman from "@/assets/vip-horseshoe-pullman.jpeg";
import horseshoeClose from "@/assets/vip-horseshoe-close.jpeg";
import musicChocolate from "@/assets/vip-music-chocolate.jpg";
import musicClose from "@/assets/vip-music-close.jpg";
import strawberryBox from "@/assets/vip-strawberry-box.jpg";
import acrylicBoxImg from "@/assets/vip-gift-acrylic-box.jpg";
import flavorsImg from "@/assets/vip-chocolate-flavors.jpg";
import logoBoxImg from "@/assets/vip-acrylic-logo-box.jpg";

const images = [horseshoePullman, horseshoeClose, musicChocolate, musicClose, strawberryBox, acrylicBoxImg, logoBoxImg, flavorsImg];

interface VipGiftSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const VipGiftSection = ({ lang = "lv", onCtaClick }: VipGiftSectionProps) => {
  const t = vipGiftContent[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Diamond className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* YouTube Video */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <iframe
                src="https://www.youtube.com/embed/KOY8Knb2OaU"
                title="VIP dāvanas — organiskā stikla kastes ar šokolādi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative block bg-card rounded-xl overflow-hidden cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.1]"
                    />
                    <div className="absolute inset-0 rounded-t-xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chocolate types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Standard */}
            <div className="bg-card rounded-xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{t.standardHeading}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t.standardBrand}</p>
              <ul className="space-y-1.5">
                {t.standardFlavors.map((f) => (
                  <li key={f} className="text-sm text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Special */}
            <div className="bg-card rounded-xl p-6 ring-1 ring-primary/20" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{t.specialHeading}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t.specialBrand}</p>
              <ul className="space-y-1.5">
                {t.specialFlavors.map((f) => (
                  <li key={f} className="text-sm text-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          {onCtaClick && (
            <div className="text-center">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Diamond className="w-4 h-4" />
                {t.ctaButton}
              </button>
            </div>
          )}
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

export default VipGiftSection;
