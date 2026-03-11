import { motion } from "framer-motion";
import { Package, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Jūsu logo uz šokolādes",
    description: "Individuāls dizains ar Jūsu uzņēmuma logo, kas atspoguļo zīmola identitāti.",
  },
  {
    icon: Package,
    title: "Sākot no 100 vienībām",
    description: "Elastīgs pasūtījuma apjoms — no nelielas partijas līdz liela mēroga projektiem.",
  },
  {
    icon: Clock,
    title: "Piegāde 14 dienu laikā",
    description: "Ātra izpilde un uzticama piegāde visā Latvijā un Baltijā.",
  },
];

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const FeaturesSection = () => {
  return (
    <motion.section className="py-24 bg-muted" {...sectionVariants}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-16">
          Kāpēc izvēlēties mūs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
