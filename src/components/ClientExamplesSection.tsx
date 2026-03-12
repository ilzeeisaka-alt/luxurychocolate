import { motion } from "framer-motion";
import mastercard from "@/assets/clients/mastercard.webp";
import bosch from "@/assets/clients/bosch.webp";
import chopard from "@/assets/clients/chopard.webp";
import samsung from "@/assets/clients/samsung.webp";
import vodafone from "@/assets/clients/vodafone.webp";
import volkswagen from "@/assets/clients/volkswagen.webp";
import type { Lang } from "@/i18n/types";
import { clientExamples } from "@/i18n/content";

const clients = [
  { src: mastercard, alt: "MasterCard logo chocolate", brand: "MasterCard" },
  { src: bosch, alt: "Bosch branded chocolate", brand: "Bosch" },
  { src: chopard, alt: "Chopard premium chocolate gift box", brand: "Chopard" },
  { src: samsung, alt: "Samsung Galaxy logo on chocolate", brand: "Samsung" },
  { src: vodafone, alt: "Vodafone heart-shaped chocolate", brand: "Vodafone" },
  { src: volkswagen, alt: "Volkswagen logo chocolate", brand: "Volkswagen" },
];

const vp = { once: true, margin: "-50px" as const };

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
            <motion.figure key={client.brand} role="listitem" className="group relative overflow-hidden rounded-xl aspect-[4/3]" style={{ boxShadow: "var(--shadow-card)" }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.45, delay: i * 0.08 }}>
              <img src={client.src} alt={client.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <figcaption className="absolute bottom-3 left-4 text-sm font-medium text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">{client.brand}</figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="sr-only">{t.srOnly}</p>
      </div>
    </section>
  );
};

export default ClientExamplesSection;
