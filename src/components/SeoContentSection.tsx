import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const vp = { once: true, margin: "-50px" as const };

const SeoContentSection = () => {
  return (
    <section className="py-20 bg-secondary/50" aria-labelledby="seo-content-heading">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          <h2 id="seo-content-heading" className="text-3xl sm:text-4xl text-foreground text-center mb-8">
            Šokolādes ar logo uzņēmumiem
          </h2>

          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Mūsu{" "}
              <Link to="/sokolades-ar-logo" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                šokolādes ar logo uzņēmumiem
              </Link>{" "}
              ir viena no populārākajām korporatīvajām dāvanām, kas vēlas radīt pozitīvu iespaidu uz klientiem un 
              partneriem. Personalizēta šokolāde ar uzņēmuma logo apvieno izsmalcinātu garšu ar efektīvu zīmola 
              komunikāciju, padarot to par lielisku reklāmas un reprezentācijas produktu.
            </p>

            <p>
              Uzņēmumi bieži izmanto <strong className="text-foreground">šokolādes ar apdruku</strong> dažādos biznesa 
              pasākumos — konferencēs, izstādēs, klientu tikšanās reizēs un korporatīvajās svinībās. Īpaši populāras ir{" "}
              <Link to="/reklamas-sokolade" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                reklāmas šokolādes ar logo
              </Link>{" "}
              izstādēm un pasākumiem, kā arī{" "}
              <Link to="/ziemassvetku-korporativas-sokolades" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                Ziemassvētku korporatīvās šokolādes
              </Link>{" "}
              svētku sezonā.
            </p>

            <p>
              Mēs piedāvājam premium kvalitātes šokolādes ar <strong className="text-foreground">personalizētu apdruku</strong>, 
              kas pielāgota Jūsu uzņēmuma logo, krāsām un dizainam. Šokolādes var izmantot gan kā reklāmas dāvanas, gan kā 
              ekskluzīvas{" "}
              <Link to="/sokolades-klientu-davanam" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                korporatīvās dāvanas klientiem un partneriem
              </Link>.
            </p>

            <p>
              <strong className="text-foreground">Šokolādes ar logo</strong> ir efektīvs veids, kā padarīt Jūsu 
              uzņēmuma dāvanu neaizmirstamu un vienlaikus palielināt zīmola atpazīstamību.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeoContentSection;
