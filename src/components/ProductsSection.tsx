import { motion } from "framer-motion";
import giftBox from "@/assets/gift-box.jpg";
import praline from "@/assets/praline.jpg";

const products = [
  {
    image: giftBox,
    title: "Šokolādes komplekts",
    description: "Eleganta dāvanu kastīte ar 12 rokām gatavotām šokolādes konfektēm.",
  },
  {
    image: praline,
    title: "Šokolādes konfektes",
    description: "Individuāli veidotas pralines ar krēma pildījumu un Jūsu logo.",
  },
];

const sectionVariants = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
};

const ProductsSection = () => {
  return (
    <motion.section className="py-24" {...sectionVariants}>
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-16">
          Mūsu produkti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.title}
              className="bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  style={{ outline: "1px solid hsla(20, 14%, 12%, 0.1)", outlineOffset: "-1px" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-body">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductsSection;
