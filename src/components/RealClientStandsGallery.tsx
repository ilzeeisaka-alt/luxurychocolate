import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Lightbox from "@/components/Lightbox";

import kyberxBanner from "@/assets/exhibitions/kyberx-stand-full-banner.jpg";
import kyberxEdge from "@/assets/exhibitions/kyberx-stand-edge-display.jpg";
import kyberxCookies from "@/assets/exhibitions/kyberx-cookies-closeup.jpg";
import financeBasket from "@/assets/exhibitions/4finance-gingerbread-basket.jpg";

const stands = [
  {
    img: kyberxBanner,
    client: "KYBERX",
    event: "Cyber Security konference",
    description: "Makarūni stikla traukā, individuāli iepakoti cepumi ar logo un šokolādes konfektes — viss vienā stendā",
    alt: "KYBERX kiberdrošības stends ar makarūniem un cepumiem ar logo",
  },
  {
    img: kyberxEdge,
    client: "KYBERX",
    event: "B2B izstāde",
    description: "Krāsainu makarūnu kompozīcija ar baltas šokolādes logo medaljoniem — piesaista uzmanību un sāk sarunu",
    alt: "KYBERX makarūnu displejs izstādes stendā",
  },
  {
    img: kyberxCookies,
    client: "KYBERX",
    event: "Tehnoloģiju forums",
    description: "Tuvplāns: individuāli iepakoti cepumi ar pilnkrāsu logo apdruku stikla servētājā",
    alt: "KYBERX logo cepumi caurspīdīgā iepakojumā",
  },
  {
    img: financeBasket,
    client: "4finance",
    event: "Finanšu nozares pasākums",
    description: "Personalizētas piparkūkas ar šokolādes glazūru un zīmola logo — siltas svētku noskaņas izstādē",
    alt: "4finance piparkūkas ar logo grozā uz zīmola fona",
  },
];

const RealClientStandsGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = stands.map((s) => s.img);

  return (
    <>
      <section className="py-20 bg-background" aria-labelledby="real-stands-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3 text-sm uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              Reālā pasaule
            </span>
            <h2 id="real-stands-heading" className="text-3xl sm:text-4xl text-foreground mb-4">
              Mūsu saldumi reālos izstāžu stendos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bildes no patiesiem klientu pasākumiem — kā KYBERX un 4finance izmantoja personalizētus saldumus,
              lai padarītu savus stendus neaizmirstamus un piesaistītu kvalitatīvus biznesa kontaktus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stands.map((stand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative bg-card rounded-xl overflow-hidden cursor-pointer group h-full"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette photo-gradient-gold">
                    <img
                      src={stand.img}
                      alt={stand.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.15]"
                    />
                    <div className="absolute top-3 left-3 z-[4]">
                      <span className="inline-flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-border">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        Reāls klients
                      </span>
                    </div>
                    <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <h3 className="text-lg font-bold text-foreground">{stand.client}</h3>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{stand.event}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stand.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-sm text-muted-foreground mt-8 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Foto publicēti ar klientu atļauju · Vēlies redzēt savu zīmolu šeit?
          </motion.p>
        </div>
      </section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        title={lightboxIndex !== null ? `${stands[lightboxIndex]?.client} — ${stands[lightboxIndex]?.event}` : undefined}
        description={lightboxIndex !== null ? stands[lightboxIndex]?.description : undefined}
      />
    </>
  );
};

export default RealClientStandsGallery;
