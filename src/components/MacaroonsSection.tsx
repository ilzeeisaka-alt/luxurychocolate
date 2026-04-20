import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Lightbox from "@/components/Lightbox";

import lmtMacaroons from "@/assets/macaroons/lmt-logo-macaroons.jpg";
import kyberxTray from "@/assets/macaroons/kyberx-glass-tray.jpg";
import kyberxSingle from "@/assets/macaroons/kyberx-single-box.jpg";
import kyberxAssorted from "@/assets/macaroons/kyberx-assorted-display.jpg";
import kyberxTower from "@/assets/macaroons/kyberx-tower-display.jpg";

const images = [kyberxTray, lmtMacaroons, kyberxSingle, kyberxAssorted, kyberxTower];

const items = [
  { title: "KYBERX makarūni", description: "Piparmētru zaļš ar pilnkrāsu logo apdruku", alt: "KYBERX logo makarūni stikla traukā" },
  { title: "LMT Viedtelevīzija", description: "Krāsainu makarūnu komplekts ar baltas šokolādes logo medaljoniem", alt: "LMT logo šokolādes uz makarūniem" },
  { title: "Individuāls iepakojums", description: "Caurspīdīga kastīte ar vienu makarūnu — ideāli kā viesu dāvana", alt: "KYBERX makarūns caurspīdīgā kastītē" },
  { title: "Pasākumu displejs", description: "Daudzveidīgas krāsas un garšas lielākiem pasākumiem", alt: "KYBERX makarūnu asortiments uz galda" },
  { title: "Stikla trauks", description: "Elegants premium displejs konferencēm un VIP viesiem", alt: "Makarūni stikla traukā ar caurspīdīgām kastītēm" },
];

const videos = [
  { src: "/video/macaroons-video.mp4", title: "Makarūni ar logo — process" },
  { src: "/video/lmt-logo-macaroons.mp4", title: "LMT logo makarūni" },
  { src: "/video/makaruni-kastite.mp4", title: "Individuālais iepakojums" },
];

const MacaroonsSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="makaruni"
        className="py-24 bg-muted/30"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Jaunums
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              Šokolādes ar logo + Franču makarūni
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Izsmalcināts duets — mīksti franču makarūni kronēti ar Beļģu šokolādes medaljoniem, uz kuriem Jūsu uzņēmuma logo pilnkrāsu apdrukā.
              Ideāli konferencēm, VIP dāvanām un zīmola pasākumiem.
            </p>
          </div>

          {/* Videos row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {videos.map((v, i) => (
              <motion.div
                key={v.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="relative rounded-xl overflow-hidden bg-card"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <video
                  className="w-full aspect-[9/16] md:aspect-video object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  muted
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground">{v.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
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
                  <div className="p-5 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Pilnkrāsu logo", desc: "Uzdruka uz baltas šokolādes medaljona" },
              { title: "Dažādas garšas", desc: "Vaniļa, pistācija, aveņu, šokolāde un citas" },
              { title: "Elegants iepakojums", desc: "Caurspīdīgas kastītes vai stikla trauki" },
            ].map((f) => (
              <div key={f.title} className="bg-card rounded-xl p-5 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
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

export default MacaroonsSection;
