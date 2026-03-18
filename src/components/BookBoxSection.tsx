import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { bookBoxContent } from "@/i18n/content";
import heroImg from "@/assets/sokolades-gramata-hero.jpg";
import elegantaImg from "@/assets/sokolades-gramata-eleganta.jpg";
import konfektesImg from "@/assets/sokolades-gramata-konfektes.jpg";
import openImg from "@/assets/sokolades-gramata-open.png";
import konkursImg from "@/assets/sokolades-gramata-konkurss.png";

const images = [heroImg, elegantaImg, openImg, konfektesImg, konkursImg];

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

interface BookBoxSectionProps {
  lang?: Lang;
}

const BookBoxSection = ({ lang = "lv" }: BookBoxSectionProps) => {
  const t = bookBoxContent[lang];
  const link = productLinks[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section className="py-24" {...sectionVariants}>
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
            {t.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="block bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 h-full cursor-pointer"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Previous */}
            <button
              className="absolute left-4 text-white/70 hover:text-white text-4xl font-light transition-colors z-10 select-none"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
              }}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex]}
              alt={t.items[lightboxIndex]?.alt || ""}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-16 text-white/70 hover:text-white text-4xl font-light transition-colors z-10 select-none"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % images.length);
              }}
              aria-label="Next"
            >
              ›
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 text-center text-white">
              <p className="text-lg font-semibold">{t.items[lightboxIndex]?.title}</p>
              <p className="text-sm text-white/60 mt-1">{t.items[lightboxIndex]?.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookBoxSection;
