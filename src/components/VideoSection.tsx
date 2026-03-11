import { motion } from "framer-motion";

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const VideoSection = () => {
  return (
    <motion.section className="py-24 bg-muted" {...sectionVariants}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-16">
          Mūsu process
        </h2>
        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <video
            className="w-full aspect-video"
            controls
            playsInline
            preload="metadata"
            poster=""
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </motion.section>
  );
};

export default VideoSection;
