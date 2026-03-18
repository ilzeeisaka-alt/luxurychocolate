import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { bookBoxContent } from "@/i18n/content";
import Lightbox from "@/components/Lightbox";

import heroImg from "@/assets/sokolades-gramata-hero.jpg";
import elegantaImg from "@/assets/sokolades-gramata-eleganta.jpg";
import konfektesImg from "@/assets/sokolades-gramata-konfektes.jpg";
import openImg from "@/assets/sokolades-gramata-open.png";
import konkursImg from "@/assets/sokolades-gramata-konkurss.png";

const images = [heroImg, elegantaImg, openImg, konfektesImg, konkursImg];

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      {/* Hero video — half-page width, looping, with sound toggle */}
      <div className="max-w-3xl mx-auto px-4 overflow-hidden relative group">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
          poster={heroImg}
        >
          <source src="/video/sokolades-gramata.mp4" type="video/mp4" />
        </video>
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background/90 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={isMuted ? "Ieslēgt skaņu" : "Izslēgt skaņu"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

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
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative block bg-card rounded-xl overflow-hidden cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-square overflow-hidden relative photo-vignette">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
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

export default BookBoxSection;
