import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Lang } from "@/i18n/types";
import { bookBoxContent } from "@/i18n/content";

import heroImg from "@/assets/sokolades-gramata-hero.jpg";
import elegantaImg from "@/assets/sokolades-gramata-eleganta.jpg";
import konfektesImg from "@/assets/sokolades-gramata-konfektes.jpg";
import openImg from "@/assets/sokolades-gramata-open.png";

const images = [heroImg, elegantaImg, openImg, konfektesImg];

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

  return (
    <motion.section className="py-24" {...sectionVariants}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-4">
          {t.heading}
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={link}
                className="block bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 h-full"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={images[i]}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BookBoxSection;
