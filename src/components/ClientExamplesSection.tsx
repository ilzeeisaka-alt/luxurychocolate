import { motion } from "framer-motion";

import mastercard from "@/assets/clients/mastercard.jpg";
import bosch from "@/assets/clients/bosch.jpg";
import chopard from "@/assets/clients/chopard.jpg";
import samsung from "@/assets/clients/samsung.jpg";
import vodafone from "@/assets/clients/vodafone.jpg";
import volkswagen from "@/assets/clients/volkswagen.jpg";

const clients = [
  { src: mastercard, alt: "MasterCard logo šokolāde pie kafijas tases", brand: "MasterCard" },
  { src: bosch, alt: "Bosch brendētas šokolādes uz cepuma", brand: "Bosch" },
  { src: chopard, alt: "Chopard premium šokolādes dāvanu kastītē", brand: "Chopard" },
  { src: samsung, alt: "Samsung Galaxy logo uz šokolādes", brand: "Samsung" },
  { src: vodafone, alt: "Vodafone sirds formas šokolāde dāvanu kastē", brand: "Vodafone" },
  { src: volkswagen, alt: "Volkswagen logo cepums ar brendētu lenti", brand: "Volkswagen" },
];

const vp = { once: true, margin: "-50px" as const };

const ClientExamplesSection = () => {
  return (
    <section className="py-20 bg-background" aria-labelledby="client-examples-heading">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Klientu piemēri
          </p>
          <h2 id="client-examples-heading" className="text-3xl sm:text-4xl text-foreground">
            Pasaules zīmoli uzticas mums
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" role="list" aria-label="Klientu piemēri — zīmolu šokolādes">
          {clients.map((client, i) => (
            <motion.figure
              key={client.brand}
              role="listitem"
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
              style={{ boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <img
                src={client.src}
                alt={client.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <figcaption className="absolute bottom-3 left-4 text-sm font-medium text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {client.brand}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* sr-only summary for AI crawlers */}
        <p className="sr-only">
          Klientu piemēri — pasaules zīmoli, kas uzticas Luxury Chocolate: MasterCard logo šokolāde pie kafijas,
          Bosch brendētas šokolādes, Chopard premium šokolādes dāvanu kastītēs, Samsung Galaxy logo uz šokolādes,
          Vodafone sirds formas šokolāde, Volkswagen logo cepums ar brendētu lenti.
          Mēs izgatvojam personalizētas šokolādes ar Jūsu uzņēmuma logo.
        </p>
      </div>
    </section>
  );
};

export default ClientExamplesSection;
