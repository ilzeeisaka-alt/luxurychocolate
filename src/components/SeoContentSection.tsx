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
              Mēs piedāvājam <strong className="text-foreground">premium šokolādes ar individuālu apdruku</strong> — 
              ideālas korporatīvās dāvanas klientiem, partneriem un pasākumiem. Katrs izstrādājums tiek izgatavots 
              no augstākās kvalitātes <strong className="text-foreground">Beļģu šokolādes</strong> ar Jūsu uzņēmuma logo vai dizainu.
            </p>

            <p>
              Uzņēmumi visā pasaulē izmanto <strong className="text-foreground">personalizētas šokolādes</strong> kā 
              efektīvu mārketinga rīku — no konferenču viesmīlības līdz VIP klientu dāvanām. 
              Mūsu <strong className="text-foreground">korporatīvās šokolādes</strong> atstāj neaizmirstamu iespaidu.
            </p>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Mūsu iespējas</h3>
              <ul className="space-y-2" role="list">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✔</span>
                  <span><strong className="text-foreground">Šokolādes ar uzņēmuma logo</strong> — apdruka tieši uz šokolādes virsmas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✔</span>
                  <span><strong className="text-foreground">Šokolādes ar reklāmas dizainu</strong> — pilnkrāsu apdruka jebkuram motīvam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✔</span>
                  <span><strong className="text-foreground">Personalizēti šokolādes iepakojumi</strong> — branded kastītes un iesaiņojums</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✔</span>
                  <span><strong className="text-foreground">Reklāmas šokolāde</strong> pasākumiem, izstādēm un konferencēm</span>
                </li>
              </ul>
            </div>

            <p>
              Neatkarīgi no tā, vai meklējat <em>custom chocolate with logo</em>, <em>corporate chocolate gifts</em> vai 
              <em> branded chocolate</em> — mēs piedāvājam pilnu servisu no dizaina izstrādes līdz piegādei visā pasaulē.
              Minimālais pasūtījums — no 50 gab., izgatavošana — 3–10 darba dienas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeoContentSection;
