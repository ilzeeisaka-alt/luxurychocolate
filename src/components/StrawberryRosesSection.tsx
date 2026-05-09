import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import strawberryImg from "@/assets/strawberries/zemenes-sokolade.jpg";

const images = [strawberryImg];
const items = [
  {
    title: "Zemenes šokolādē ar sarkanām rozēm",
    description: "Svaigas zemenes, pārklātas ar premium Beļģu šokolādi, dekorētas ar Oreo, avenēm, mellenēm un dzīvām sarkanām rozēm — luksusa dāvanu kaste īpašiem mirkļiem.",
    alt: "Zemenes šokolādē ar sarkanām rozēm dāvanu kastē",
  },
];

const StrawberryRosesSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="zemenes-sokolade"
        className="py-24 bg-muted"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Heart className="w-4 h-4" />
              Romantiska dāvana
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              Zemenes šokolādē & sarkanās rozes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Svaigas zemenes pārklātas premium Beļģu šokolādē, kombinētas ar dzīvām sarkanām rozēm —
              ideāla dāvana Valentīndienai, dzimšanas dienām, jubilejām un īpašiem pasākumiem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl overflow-hidden bg-card"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/video/zemenes-sokolade-rozes.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">Zemenes šokolādē & rozes — video</p>
              </div>
            </motion.div>

            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative bg-card rounded-xl overflow-hidden cursor-pointer group h-full"
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
                  <div className="p-5 relative z-[3]">
                    <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Svaigas zemenes", desc: "Atlasītas, sulīgas zemenes pārklātas Beļģu šokolādē" },
              { title: "Dzīvas rozes", desc: "Dekorētas ar īstām sarkanām rozēm — luksusa pieskāriens" },
              { title: "Eleganta kaste", desc: "Premium dāvanu iepakojums īpašiem mirkļiem" },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-5 text-center"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="text-base font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        title={lightboxIndex !== null ? items[lightboxIndex]?.title : undefined}
        description={lightboxIndex !== null ? items[lightboxIndex]?.description : undefined}
      />
    </>
  );
};

export default StrawberryRosesSection;
