import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import img1Asset from "@/assets/kazu-1.jpg.asset.json";
import img2Asset from "@/assets/kazu-2.jpg.asset.json";
import img3Asset from "@/assets/kazu-3.jpg.asset.json";

const images = [img1Asset.url, img2Asset.url, img3Asset.url];

const _NEW = ["de","fr","it","es","ar","nl","pl","cs","pt","el","tr","hu","ro","bg","hr","sk","sl","uk","sr","bs","mk","sq","is","zh","ja","ko","hi","bn","ur","fa","he","th","vi","id","ms","tl","sw","am","ka","az","kk","hy","be","ta","km","mn"] as const;
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
    badge: "Kāzu šokolādes",
    heading: "Personalizētas šokolādes kāzām",
    subtitle: "Eleganti kāzu suvenīri un viesu dāvaniņas ar jaunlaulāto vārdiem, datumu vai fotogrāfiju — neaizmirstams akcents Jūsu īpašajai dienai.",
    items: [
      { title: "Kāzu foto šokolāde rāmītī", description: "Liela šokolādes plāksne ar jaunlaulāto foto eleganti dāvanu kastītē — unikāls kāzu suvenīrs.", alt: "Šokolāde ar jaunlaulāto pāra fotogrāfiju greznā sarkanā kastītē" },
      { title: "Sirsniņas ar vārdiem", description: "Mazas baltās šokolādes sirsniņas ar jaunlaulāto vārdiem un kāzu datumu — ideāla viesu dāvaniņa.", alt: "Baltās šokolādes sirsniņas ar jaunlaulāto vārdiem celofāna maisiņos ar lentītēm" },
      { title: "Kāzu praline ar logo", description: "Tumšās šokolādes praline ar personalizētu apdruku celofāna maisiņā ar lentīti — stilīgs cienasts viesiem.", alt: "Tumšās šokolādes praline ar personalizētu uzdruku rožu ziedlapiņās" },
    ],
    ctaButton: "Pasūtīt kāzu šokolādes",
  },
  en: {
    badge: "Wedding Chocolates",
    heading: "Personalized chocolates for weddings",
    subtitle: "Elegant wedding favors and guest gifts with the bride and groom's names, date, or photo — an unforgettable accent for your special day.",
    items: [
      { title: "Wedding photo chocolate in frame", description: "Large chocolate plaque with the couple's photo elegantly presented in a gift box — a unique wedding souvenir.", alt: "Chocolate with newlyweds' photo in luxurious red gift box" },
      { title: "Hearts with names", description: "Small white chocolate hearts with the couple's names and wedding date — the perfect guest favor.", alt: "White chocolate hearts with newlyweds' names in cellophane bags with ribbons" },
      { title: "Wedding pralines with logo", description: "Dark chocolate pralines with personalized printing in a cellophane bag with ribbon — a stylish treat for guests.", alt: "Dark chocolate pralines with personalized print among rose petals" },
    ],
    ctaButton: "Order wedding chocolates",
  },
  ru: {
    badge: "Свадебный шоколад",
    heading: "Персонализированный шоколад для свадьбы",
    subtitle: "Элегантные свадебные сувениры и подарки гостям с именами молодоженов, датой или фото.",
    items: [
      { title: "Свадебный фото-шоколад в рамке", description: "Большая шоколадная плитка с фото пары в подарочной коробке — уникальный свадебный сувенир.", alt: "Шоколад с фото молодоженов в роскошной красной коробке" },
      { title: "Сердечки с именами", description: "Маленькие белые шоколадные сердечки с именами и датой свадьбы.", alt: "Белые шоколадные сердечки с именами в целлофановых пакетиках" },
      { title: "Свадебные пралине с логотипом", description: "Темные шоколадные пралине с персональной печатью в целлофане с лентой.", alt: "Темные пралине с персональной печатью среди лепестков роз" },
    ],
    ctaButton: "Заказать свадебный шоколад",
  },
  et: {
    badge: "Pulmašokolaad",
    heading: "Personaliseeritud šokolaad pulmadeks",
    subtitle: "Elegantsed pulmameened ja külalistele kingitused noorpaari nimede, kuupäeva või fotoga.",
    items: [
      { title: "Pulma foto-šokolaad raamis", description: "Suur šokolaadiplaat paari fotoga kingituskarbis — ainulaadne pulmasuveniir.", alt: "Šokolaad noorpaari fotoga luksuslikus punases karbis" },
      { title: "Südamed nimedega", description: "Väikesed valge šokolaadi südamed noorpaari nimede ja pulmakuupäevaga.", alt: "Valge šokolaadi südamed nimedega tsellofaankottides paeltega" },
      { title: "Pulmapraliinid logoga", description: "Tumeda šokolaadi praliinid personaliseeritud trükiga tsellofaankotis paelaga.", alt: "Tumedad praliinid personaliseeritud trükiga roosi kroonlehtede vahel" },
    ],
    ctaButton: "Telli pulmašokolaad",
  },
  lt: {
    badge: "Vestuvių šokoladas",
    heading: "Personalizuotas šokoladas vestuvėms",
    subtitle: "Elegantūs vestuvių suvenyrai ir dovanos svečiams su jaunavedžių vardais, data ar nuotrauka.",
    items: [
      { title: "Vestuvių foto šokoladas rėmelyje", description: "Didelė šokolado plokštelė su poros nuotrauka dovanų dėžutėje.", alt: "Šokoladas su jaunavedžių nuotrauka prabangioje raudonoje dėžutėje" },
      { title: "Širdelės su vardais", description: "Mažos baltojo šokolado širdelės su vardais ir vestuvių data.", alt: "Baltojo šokolado širdelės celofano maišeliuose su kaspinėliais" },
      { title: "Vestuvių pralinai su logotipu", description: "Juodojo šokolado pralinai su personalizuotu spaudiniu celofano maišelyje.", alt: "Juodojo šokolado pralinai tarp rožių žiedlapių" },
    ],
    ctaButton: "Užsakyti vestuvių šokoladą",
  },
  sv: {
    badge: "Bröllopschoklad",
    heading: "Personlig choklad till bröllop",
    subtitle: "Eleganta bröllopssouvenirer och gästgåvor med brudparets namn, datum eller foto.",
    items: [
      { title: "Bröllopsfotochoklad i ram", description: "Stor chokladplatta med parets foto i en presentförpackning.", alt: "Choklad med brudparets foto i lyxig röd ask" },
      { title: "Hjärtan med namn", description: "Små vita chokladhjärtan med brudparets namn och bröllopsdatum.", alt: "Vita chokladhjärtan i cellofanpåsar med band" },
      { title: "Bröllopspraliner med logotyp", description: "Mörka chokladpraliner med personlig tryck i cellofanpåse med band.", alt: "Mörka praliner med personligt tryck bland rosenblad" },
    ],
    ctaButton: "Beställ bröllopschoklad",
  },
  no: {
    badge: "Bryllupssjokolade",
    heading: "Personlig sjokolade til bryllup",
    subtitle: "Elegante bryllupssuvenirer og gjestegaver med brudeparets navn, dato eller foto.",
    items: [
      { title: "Bryllupsfotosjokolade i ramme", description: "Stor sjokoladeplate med parets foto i en gaveeske.", alt: "Sjokolade med brudeparets foto i luksuriøs rød eske" },
      { title: "Hjerter med navn", description: "Små hvite sjokoladehjerter med brudeparets navn og bryllupsdato.", alt: "Hvite sjokoladehjerter i cellofanposer med bånd" },
      { title: "Bryllupspraliner med logo", description: "Mørke sjokoladepraliner med personlig trykk i cellofanpose med bånd.", alt: "Mørke praliner med personlig trykk blant rosenblader" },
    ],
    ctaButton: "Bestill bryllupssjokolade",
  },
  fi: {
    badge: "Häät­suklaa",
    heading: "Personoitu suklaa häihin",
    subtitle: "Tyylikkäät hää­muistot ja vieraslahjat hääparin nimillä, päivämäärällä tai valokuvalla.",
    items: [
      { title: "Hääkuva-suklaa kehyksessä", description: "Suuri suklaalevy parin valokuvalla lahjarasiassa.", alt: "Suklaa hääparin kuvalla ylellisessä punaisessa rasiassa" },
      { title: "Sydämet nimillä", description: "Pienet valkosuklaasydämet hääparin nimillä ja häiden päivämäärällä.", alt: "Valkosuklaasydämet sellofaanipusseissa nauhoilla" },
      { title: "Hääpraliinit logolla", description: "Tummasuklaapraliinit personoidulla painatuksella sellofaanipussissa nauhalla.", alt: "Tummat praliinit personoidulla painatuksella ruusunlehtien keskellä" },
    ],
    ctaButton: "Tilaa hääsuklaa",
  },
  da: {
    badge: "Bryllupschokolade",
    heading: "Personlig chokolade til bryllup",
    subtitle: "Elegante bryllupssouvenirs og gæstegaver med brudeparrets navne, dato eller foto.",
    items: [
      { title: "Bryllupsfoto-chokolade i ramme", description: "Stor chokoladeplade med parrets foto i en gaveæske.", alt: "Chokolade med brudeparrets foto i luksuriøs rød æske" },
      { title: "Hjerter med navne", description: "Små hvide chokoladehjerter med brudeparrets navne og bryllupsdato.", alt: "Hvide chokoladehjerter i cellofanposer med bånd" },
      { title: "Bryllupspraliner med logo", description: "Mørke chokoladepraliner med personligt tryk i cellofanpose med bånd.", alt: "Mørke praliner med personligt tryk blandt rosenblade" },
    ],
    ctaButton: "Bestil bryllupschokolade",
  },
});

interface WeddingChocolateSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const WeddingChocolateSection = ({ lang = "lv", onCtaClick }: WeddingChocolateSectionProps) => {
  const t = content[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="kazu"
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Heart className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
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
                <Heart className="w-4 h-4" />
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

export default WeddingChocolateSection;
