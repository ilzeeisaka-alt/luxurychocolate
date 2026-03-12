import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Lang } from "@/i18n/types";
import { seoContent } from "@/i18n/content";

const vp = { once: true, margin: "-50px" as const };

interface SeoContentSectionProps { lang?: Lang; }

const SeoContentSection = ({ lang = "lv" }: SeoContentSectionProps) => {
  const t = seoContent[lang];

  const renderParagraph = (p: typeof t.paragraphs[0], idx: number) => {
    if (!p.links || p.links.length === 0) {
      return <p key={idx}><strong className="text-foreground">{p.text}</strong></p>;
    }

    let text = p.text;
    const parts: (string | JSX.Element)[] = [];
    p.links.forEach((link, li) => {
      const placeholder = `{link${li + 1}}`;
      const splitIdx = text.indexOf(placeholder);
      if (splitIdx !== -1) {
        parts.push(text.substring(0, splitIdx));
        parts.push(
          <Link key={li} to={link.to} className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
            {link.text}
          </Link>
        );
        text = text.substring(splitIdx + placeholder.length);
      }
    });
    parts.push(text);
    return <p key={idx}>{parts}</p>;
  };

  return (
    <section className="py-20 bg-secondary/50" aria-labelledby="seo-content-heading">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <h2 id="seo-content-heading" className="text-3xl sm:text-4xl text-foreground text-center mb-8">{t.heading}</h2>
          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            {t.paragraphs.map((p, i) => renderParagraph(p, i))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeoContentSection;
