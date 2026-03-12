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
              <strong className="text-foreground">Personalizētas šokolādes ar logo</strong> ir eleganta un efektīva 
              korporatīvā dāvana klientiem, partneriem un darbiniekiem. Premium šokolāde ar individuālu apdruku palīdz 
              uzņēmumiem izcelt savu zīmolu un radīt pozitīvu iespaidu biznesa attiecībās. 
              <strong className="text-foreground">Šokolādes ar uzņēmuma logo</strong> bieži izmanto konferencēs, 
              izstādēs, marketinga pasākumos un svētku dāvanām.
            </p>

            <p>
              Mēs piedāvājam ekskluzīvas šokolādes ar <strong className="text-foreground">personalizētu apdruku</strong>, 
              kas pielāgota Jūsu uzņēmuma dizainam un identitātei. Šokolādes var izmantot gan kā 
              <strong className="text-foreground"> reklāmas dāvanas</strong>, gan kā premium 
              <strong className="text-foreground"> korporatīvās dāvanas</strong> īpašiem klientiem un partneriem. 
              Personalizēta šokolāde ir ne tikai garšīga dāvana, bet arī efektīvs veids, kā palielināt zīmola atpazīstamību.
            </p>

            <p>
              Mūsu piedāvājumā ir dažādi šokolādes veidi un iepakojuma risinājumi, kas piemēroti gan nelielām uzņēmumu 
              dāvanām, gan lielākiem marketinga projektiem. <strong className="text-foreground">Šokolādes ar logo</strong> ir 
              ideāls veids, kā apvienot izsmalcinātu garšu ar uzņēmuma identitāti.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeoContentSection;
