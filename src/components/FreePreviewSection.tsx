import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import type { Lang } from "@/i18n/types";
import { uiStrings } from "@/i18n/ui-strings";

const vp = { once: true, margin: "-50px" as const };

interface FreePreviewSectionProps {
  onCtaClick: () => void;
  lang?: Lang;
}

const FreePreviewSection = ({ onCtaClick, lang = "lv" }: FreePreviewSectionProps) => {
  const ui = uiStrings[lang] || uiStrings.lv;

  return (
    <section className="py-20 bg-foreground" aria-labelledby="free-preview-heading">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Palette className="w-7 h-7 text-primary" />
          </span>

          <h2 id="free-preview-heading" className="text-3xl sm:text-4xl text-white mb-4">
            {ui.freePreviewHeading}
          </h2>

          <p className="text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            {ui.freePreviewDesc}
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/50 mb-10">
            <span>{ui.freePreviewBadge1}</span>
            <span>{ui.freePreviewBadge2}</span>
            <span>{ui.freePreviewBadge3}</span>
          </div>

          <button
            onClick={onCtaClick}
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
            style={{
              boxShadow:
                "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
              letterSpacing: "0.12em",
            }}
          >
            {ui.freePreviewButton}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FreePreviewSection;
