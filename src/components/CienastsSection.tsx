import { motion } from "framer-motion";
import { useState } from "react";
import { GlassWater } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import img1 from "@/assets/cienasts-1.jpg";
import img2 from "@/assets/cienasts-2.jpg";

const images = [img1, img2];

const _NEW = ["de","fr","it","es","ar","nl","pl","cs","pt","el","tr","hu","ro","bg","hr","sk","sl","uk","sr","bs","mk","sq","is"] as const;
type OldLang9 = "lv" | "en" | "ru" | "et" | "lt" | "sv" | "no" | "fi" | "da";
const _addLangs = <T,>(base: Record<OldLang9, T>): Record<Lang, T> => {
  const r: any = { ...base };
  for (const l of _NEW) r[l] = base.en;
  return r;
};

const content: Record<Lang, {
  badge: string;
  heading: string;
  subtitle: string;
  items: { title: string; description: string; alt: string }[];
  ctaButton: string;
}> = _addLangs({
  lv: {
    badge: "Cienasta trauki",
    heading: "Šokolādes cienasta traukos",
    subtitle: "Eleganti noformētas šokolādes konfektes ar logo stikla cienasta traukos — ideāli viesnīcu reģistratūrām, birojiem, konferenču telpām un pasākumiem.",
    items: [
      { title: "Promo šokolādes traukā", description: "Individuāli iesaiņotas šokolādes konfektes ar uzņēmuma logo stikla traukā — elegants risinājums birojam vai pasākumam.", alt: "Promo šokolādes konfektes ar logo stikla cienasta traukā ar oranžām lentītēm" },
      { title: "Ekskluzīvas konfektes traukā", description: "Piena un baltās šokolādes konfektes ar logo zelta iesaiņojumā — izsmalcināts cienasts VIP viesiem.", alt: "Ekskluzīvas šokolādes konfektes ar Mis Latvija logo stikla traukā ar zelta lentītēm" },
    ],
    ctaButton: "Pasūtīt cienasta šokolādes",
  },
  en: {
    badge: "Serving Bowls",
    heading: "Chocolates in serving bowls",
    subtitle: "Elegantly presented chocolate pralines with your logo in glass serving bowls — perfect for hotel receptions, offices, conference rooms and events.",
    items: [
      { title: "Promo chocolates in bowl", description: "Individually wrapped chocolates with company logo in a glass bowl — an elegant solution for offices or events.", alt: "Promo chocolate pralines with logo in glass serving bowl with orange ribbons" },
      { title: "Exclusive pralines in bowl", description: "Milk and white chocolate pralines with logo in gold wrapping — a refined treat for VIP guests.", alt: "Exclusive chocolate pralines with Mis Latvija logo in glass bowl with gold ribbons" },
    ],
    ctaButton: "Order serving chocolates",
  },
  ru: {
    badge: "Вазы для угощения",
    heading: "Шоколад в вазах для угощения",
    subtitle: "Элегантно оформленные шоколадные конфеты с логотипом в стеклянных вазах — идеально для рецепций, офисов и мероприятий.",
    items: [
      { title: "Промо шоколад в вазе", description: "Индивидуально упакованные конфеты с логотипом в стеклянной вазе — элегантное решение для офиса.", alt: "Промо шоколадные конфеты с логотипом в стеклянной вазе с оранжевыми лентами" },
      { title: "Эксклюзивные конфеты в вазе", description: "Молочные и белые шоколадные конфеты с логотипом в золотой упаковке.", alt: "Эксклюзивные шоколадные конфеты с логотипом Mis Latvija в стеклянной вазе" },
    ],
    ctaButton: "Заказать шоколад для угощения",
  },
  et: {
    badge: "Serveerimiskausid",
    heading: "Šokolaadid serveerimiskaussides",
    subtitle: "Elegantselt esitletud šokolaadikommid logoga klaasist serveerimiskaussides — ideaalsed hotellide vastuvõttudele ja üritustele.",
    items: [
      { title: "Promo šokolaadid kausis", description: "Individuaalselt pakitud šokolaadid ettevõtte logoga klaasist kausis.", alt: "Promo šokolaadikommid logoga klaasist serveerimiskausis" },
      { title: "Eksklusiivne maiustus kausis", description: "Piima- ja valge šokolaadi kommid logoga kuldselt pakituna.", alt: "Eksklusiivne šokolaadikommid logoga klaasist kausis" },
    ],
    ctaButton: "Telli serveerimisšokolaadid",
  },
  lt: {
    badge: "Serviravimo indai",
    heading: "Šokoladai serviravimo induose",
    subtitle: "Elegantiškai pateikti šokolado saldainiai su logotipu stikliniuose induose — idealūs viešbučių registratūroms ir renginiams.",
    items: [
      { title: "Promo šokoladai inde", description: "Individualiai supakuoti saldainiai su įmonės logotipu stiklinėje vazoje.", alt: "Promo šokolado saldainiai su logotipu stiklinėje vazoje" },
      { title: "Eksliuzyvūs saldainiai inde", description: "Pieno ir balto šokolado saldainiai su logotipu aukso pakuotėje.", alt: "Ekskliuzyvūs šokolado saldainiai su logotipu stiklinėje vazoje" },
    ],
    ctaButton: "Užsakyti serviravimo šokoladus",
  },
  sv: {
    badge: "Serveringsskålar",
    heading: "Choklad i serveringsskålar",
    subtitle: "Elegant presenterade chokladpraliner med er logotyp i glasskålar — perfekt för hotellreceptioner och evenemang.",
    items: [
      { title: "Kampanjchoklad i skål", description: "Individuellt inslagna choklader med logotyp i glasskål.", alt: "Kampanjchoklader med logotyp i glasserveringsskål" },
      { title: "Exklusiva praliner i skål", description: "Mjölk- och vitchokladpraliner med logotyp i guldförpackning.", alt: "Exklusiva chokladpraliner med logotyp i glasskål" },
    ],
    ctaButton: "Beställ serveringschoklad",
  },
  no: {
    badge: "Serveringsboller",
    heading: "Sjokolade i serveringsboller",
    subtitle: "Elegant presenterte sjokoladepraliner med logo i glassskåler — perfekt for hotellresepsjoner og arrangementer.",
    items: [
      { title: "Kampanjesjokolade i bolle", description: "Individuelt innpakkede sjokolader med logo i glassskål.", alt: "Kampanjesjokolader med logo i glassserveringsbolle" },
      { title: "Eksklusive praliner i bolle", description: "Melke- og hvit sjokoladepraliner med logo i gullinnpakning.", alt: "Eksklusive sjokoladepraliner med logo i glassskål" },
    ],
    ctaButton: "Bestill serveringssjokolade",
  },
  fi: {
    badge: "Tarjoilukulhot",
    heading: "Suklaat tarjoilukulhoissa",
    subtitle: "Elegantisti esitetyt suklaakonvehdit logollanne lasitarjoilukulhoissa — täydellisiä hotellien vastaanotoille ja tapahtumiin.",
    items: [
      { title: "Promosuklaat kulhossa", description: "Yksilöllisesti pakatut suklaat yrityksen logolla lasikulhossa.", alt: "Promosuklaat logolla lasitarjoilukulhossa" },
      { title: "Eksklusiiviset konvehdit kulhossa", description: "Maito- ja valkosuklaakonfektit logolla kultapakkauksessa.", alt: "Eksklusiiviset suklaakonvehdit logolla lasikulhossa" },
    ],
    ctaButton: "Tilaa tarjoilusuklaat",
  },
  da: {
    badge: "Serveringsskåle",
    heading: "Chokolader i serveringsskåle",
    subtitle: "Elegant præsenterede chokoladepraliner med jeres logo i glasskåle — perfekte til hotelreceptioner og events.",
    items: [
      { title: "Kampagnechokolader i skål", description: "Individuelt indpakkede chokolader med logo i glasskål.", alt: "Kampagnechokolader med logo i glasserveringsskål" },
      { title: "Eksklusive praliner i skål", description: "Mælke- og hvid chokoladepraliner med logo i guldindpakning.", alt: "Eksklusive chokoladepraliner med logo i glasskål" },
    ],
    ctaButton: "Bestil serveringschokolader",
  },
});

interface CienastsSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const CienastsSection = ({ lang = "lv", onCtaClick }: CienastsSectionProps) => {
  const t = content[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="cienasts"
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <GlassWater className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {t.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative block bg-card rounded-xl overflow-hidden cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.1]"
                    />
                    <div className="absolute inset-0 rounded-t-xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {onCtaClick && (
            <div className="text-center">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <GlassWater className="w-4 h-4" />
                {t.ctaButton}
              </button>
            </div>
          )}
        </div>
      </motion.section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        title={lightboxIndex !== null ? t.items[lightboxIndex]?.title : undefined}
        description={lightboxIndex !== null ? t.items[lightboxIndex]?.description : undefined}
      />
    </>
  );
};

export default CienastsSection;
