import { motion } from "framer-motion";

const facts = [
  "Minimālais pasūtījums: no 50 gab.",
  "Izgatavošana: 3–10 darba dienas",
  "Premium Beļģu šokolāde",
  "Individuāls dizains ar Jūsu logo",
];

const vp = { once: true, margin: "-50px" as const };

const QuickFactsSection = () => {
  return (
    <section className="py-10 bg-secondary/50" aria-label="Ātra informācija">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-10 gap-y-3 text-sm sm:text-base text-foreground/90"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.4 }}
        >
          {facts.map((fact) => (
            <span key={fact} className="flex items-center gap-2">
              <span className="text-primary">✔</span> {fact}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QuickFactsSection;
