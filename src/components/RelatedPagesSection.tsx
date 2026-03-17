import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pages = [
  { to: "/sokolades-ar-logo", label: "Šokolādes ar logo", desc: "Personalizēta apdruka ar Jūsu uzņēmuma logo uz premium šokolādes" },
  { to: "/ziemassvetku-korporativas-sokolades", label: "Ziemassvētku šokolādes", desc: "Svētku korporatīvās dāvanas ar logo elegantā iepakojumā" },
  { to: "/reklamas-sokolade", label: "Reklāmas šokolāde", desc: "Promo šokolāde izstādēm, konferencēm un pasākumiem" },
  { to: "/sokolades-klientu-davanam", label: "Klientu dāvanas", desc: "Premium šokolādes dāvanas klientiem un partneriem" },
  { to: "/sokolades-gramata", label: "Šokolādes grāmata", desc: "Dāvanu kastīte grāmatas formā ar magnētisku aizdari" },
];

const vp = { once: true, margin: "-50px" as const };

const RelatedPagesSection = () => (
  <section className="py-16 bg-secondary/50">
    <div className="container mx-auto max-w-5xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl text-foreground mb-8 text-center">
          Izpētiet mūsu risinājumus
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pages.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                {page.label}
              </span>
              <span className="block text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {page.desc}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default RelatedPagesSection;
