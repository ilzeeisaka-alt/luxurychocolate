import { useState } from "react";
import { motion } from "framer-motion";
import mastercard from "@/assets/clients/mastercard.webp";
import bosch from "@/assets/clients/bosch.webp";
import chopard from "@/assets/clients/chopard.webp";
import samsung from "@/assets/clients/samsung.webp";
import vodafone from "@/assets/clients/vodafone.webp";
import volkswagen from "@/assets/clients/volkswagen.webp";
import type { Lang } from "@/i18n/types";
import { clientExamples } from "@/i18n/content";
import Lightbox from "@/components/Lightbox";

const clients = [
  { src: mastercard, alt: "MasterCard logo chocolate", brand: "MasterCard" },
  { src: bosch, alt: "Bosch branded chocolate", brand: "Bosch" },
  { src: chopard, alt: "Chopard premium chocolate gift box", brand: "Chopard" },
  { src: samsung, alt: "Samsung Galaxy logo on chocolate", brand: "Samsung" },
  { src: vodafone, alt: "Vodafone heart-shaped chocolate", brand: "Vodafone" },
  { src: volkswagen, alt: "Volkswagen logo chocolate", brand: "Volkswagen" },
];

const vp = { once: true, margin: "-50px" as const };

const images = clients.map(c => c.src);

interface ClientExamplesSectionProps { lang?: Lang; }

const ClientExamplesSection = ({ lang = "lv" }: ClientExamplesSectionProps) => {
  const t = clientExamples[lang];
  return (
    <section className="py-20 bg-background" aria-labelledby="client-examples-heading">
      <div className="container mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">{t.subtitle}</p>
          <h2 id="client-examples-heading" className="text-3xl sm:text-4xl text-foreground">{t.heading}</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" role="list">
          {clients.map((client, i) => (
            <motion.figure
              key={client.brand}
              role="listitem"
              className="photo-card group relative overflow-hidden rounded-xl aspect-[4/3]"
              style={{ boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative w-full h-full photo-vignette photo-gradient-gold">
                <img
                  src={client.src}
                  alt={client.alt}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.15]"
                  loading="lazy"
                />
                {/* Golden ring on hover */}
                <div className="absolute inset-0 rounded-xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
              </div>
              {/* Brand label with golden accent */}
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 z-[4] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <span className="text-sm font-bold text-white drop-shadow-lg tracking-wide">{client.brand}</span>
                <div className="w-8 h-0.5 bg-primary mt-1 rounded-full" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="sr-only">{t.srOnly}</p>
      </div>
    </section>
  );
};

export default ClientExamplesSection;
