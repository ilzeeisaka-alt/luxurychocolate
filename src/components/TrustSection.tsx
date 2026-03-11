import { Shield, Award, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";

const clients = [
  "SEB Banka", "Latvenergo", "Rīgas Dome", "Printful", "Tet", "Maxima"
];

const stats = [
  { value: "500+", label: "Izpildīti pasūtījumi" },
  { value: "10+", label: "Gadu pieredze" },
  { value: "98%", label: "Klientu apmierinātība" },
  { value: "30+", label: "Valstis" },
];

const testimonials = [
  {
    quote: "Izcila kvalitāte un ātra piegāde. Mūsu klienti bija sajūsmā par personalizētajām šokolādēm!",
    author: "Anna K.",
    company: "SIA MarketPro",
  },
  {
    quote: "Luxury Chocolate palīdzēja mums radīt neaizmirstamu korporatīvo dāvanu. Ļoti profesionāla pieeja.",
    author: "Mārtiņš B.",
    company: "Tech Solutions",
  },
  {
    quote: "Jau trešo gadu pasūtām šokolādes ar mūsu logo — vienmēr augstākajā līmenī.",
    author: "Ieva L.",
    company: "Baltic Events",
  },
];

const guarantees = [
  { icon: Shield, label: "Kvalitātes garantija" },
  { icon: Award, label: "Sertificēta ražotne" },
  { icon: Globe, label: "Piegāde visā pasaulē" },
  { icon: Clock, label: "Izpilde 14 dienu laikā" },
];

const vp = { once: true, margin: "-50px" as const };

const TrustSection = () => {
  return (
    <section className="py-20 bg-secondary/50" aria-labelledby="trust-heading">
      <div className="container mx-auto">
        <motion.h2
          id="trust-heading"
          className="text-3xl sm:text-4xl text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          Kāpēc mums uzticas
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" role="list" aria-label="Skaitļi un fakti">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              role="listitem"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Client logos */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">Mums uzticas vadošie uzņēmumi</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4" role="list" aria-label="Klientu uzņēmumi">
            {clients.map((client) => (
              <span key={client} role="listitem" className="text-lg font-medium text-muted-foreground/70 tracking-wide">
                {client}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" role="list" aria-label="Klientu atsauksmes">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              role="listitem"
              className="bg-card rounded-xl p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.45, delay: i * 0.15 }}
            >
              <p className="text-foreground/90 mb-4 italic">"{t.quote}"</p>
              <footer className="text-sm text-muted-foreground">
                <strong>{t.author}</strong>, {t.company}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap justify-center gap-8" role="list" aria-label="Garantijas un sertifikāti">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.label}
              role="listitem"
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.35, delay: i * 0.1 }}
            >
              <g.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium">{g.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="sr-only">
          Uzticības elementi: 500+ izpildīti pasūtījumi, 10+ gadu pieredze, 98% klientu apmierinātība, piegāde 30+ valstīs.
          Mums uzticas: SEB Banka, Latvenergo, Rīgas Dome, Printful, Tet, Maxima.
          Kvalitātes garantija, sertificēta ražotne, piegāde visā pasaulē, izpilde 14 dienu laikā.
        </p>
      </div>
    </section>
  );
};

export default TrustSection;
