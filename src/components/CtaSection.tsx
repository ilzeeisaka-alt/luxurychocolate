import { motion } from "framer-motion";

interface CtaSectionProps {
  onCtaClick: () => void;
}

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const CtaSection = ({ onCtaClick }: CtaSectionProps) => {
  return (
    <motion.section className="py-24" {...sectionVariants}>
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl text-foreground mb-6">
          Saņemiet bezmaksas dizaina preview
        </h2>
        <p className="text-lg text-muted-foreground text-body mx-auto mb-10">
          Nosūtiet mums savu logo, un mēs sagatavosim personalizētu šokolādes dizaina preview 24h laikā — pilnīgi bez maksas.
        </p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium tracking-wide text-lg transition-all duration-200 active:scale-[0.98]"
          style={{ boxShadow: "var(--shadow-button)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-button-hover)";
            e.currentTarget.style.filter = "brightness(0.92)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-button)";
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          Saņemt piedāvājumu
        </button>
      </div>
    </motion.section>
  );
};

export default CtaSection;
