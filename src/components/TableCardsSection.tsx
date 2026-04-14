import { motion } from "framer-motion";
import { useState } from "react";
import { Utensils } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import img1 from "@/assets/galda-karte-1.jpg";
import img2 from "@/assets/galda-karte-2.jpg";

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
    badge: "Galda kartes",
    heading: "Šokolādes galda kartes",
    subtitle: "Personalizētas šokolādes kā galda kartes banketos, gala vakariņās un svinīgos pasākumos — elegants pārsteigums katram viesim pie galda.",
    items: [
      { title: "Galda karte ar šokolādi", description: "Individuāli iesaiņota šokolāde ar uzrakstu uz svinīga šķīvja — izsmalcināta galda karte banketos un gala vakariņās.", alt: "Šokolādes galda karte ar zelta lentīti uz eleganta šķīvja banketa galdam" },
      { title: "Šokolāde starp kristāla glāzēm", description: "Tumšā šokolāde ar logo caurspīdīgā maisiņā ar zelta lentīti — elegants akcents starp šampanieša glāzēm.", alt: "Šokolāde ar Latvijas Nacionālā teātra logo starp kristāla šampanieša glāzēm" },
    ],
    ctaButton: "Pasūtīt galda kartes",
  },
  en: {
    badge: "Table Cards",
    heading: "Chocolate table cards",
    subtitle: "Personalized chocolates as table cards for banquets, gala dinners and formal events — an elegant surprise for every guest at the table.",
    items: [
      { title: "Table card with chocolate", description: "Individually wrapped chocolate with inscription on an elegant plate — a refined table card for banquets and gala dinners.", alt: "Chocolate table card with gold ribbon on elegant plate for banquet table" },
      { title: "Chocolate among crystal glasses", description: "Dark chocolate with logo in clear wrap with gold ribbon — an elegant accent among champagne glasses.", alt: "Chocolate with National Theatre logo among crystal champagne glasses" },
    ],
    ctaButton: "Order table cards",
  },
  ru: {
    badge: "Именные карточки",
    heading: "Шоколадные именные карточки",
    subtitle: "Персонализированные шоколадки как именные карточки для банкетов, гала-ужинов и торжественных мероприятий.",
    items: [
      { title: "Именная карточка с шоколадом", description: "Индивидуально упакованный шоколад с надписью на элегантной тарелке — изысканная карточка для банкетов.", alt: "Шоколадная именная карточка с золотой лентой на элегантной тарелке" },
      { title: "Шоколад среди хрустальных бокалов", description: "Тёмный шоколад с логотипом в прозрачной упаковке с золотой лентой.", alt: "Шоколад с логотипом Национального театра среди хрустальных бокалов" },
    ],
    ctaButton: "Заказать именные карточки",
  },
  et: {
    badge: "Lauakaardid",
    heading: "Šokolaadist lauakaardid",
    subtitle: "Personaliseeritud šokolaadid lauakaartidena bankettidele, galaõhtusöökidele ja pidulikele üritustele.",
    items: [
      { title: "Lauakaart šokolaadiga", description: "Individuaalselt pakitud šokolaad elegantsel taldrikul — rafineeritud lauakaart bankettidele.", alt: "Šokolaadist lauakaart kuldse lindiga elegantsel taldrikul" },
      { title: "Šokolaad kristallklaaside seas", description: "Tume šokolaad logoga läbipaistvas pakendis kuldse lindiga.", alt: "Šokolaad Rahvusteatri logoga kristall-šampanjaklaaside seas" },
    ],
    ctaButton: "Telli lauakaardid",
  },
  lt: {
    badge: "Stalo kortelės",
    heading: "Šokoladinės stalo kortelės",
    subtitle: "Personalizuoti šokoladai kaip stalo kortelės banketams, iškilmingoms vakarienėms ir renginiams.",
    items: [
      { title: "Stalo kortelė su šokoladu", description: "Individualiai supakuotas šokoladas elegantiškoje lėkštėje — rafinuota stalo kortelė banketams.", alt: "Šokoladinė stalo kortelė su aukso juostele elegantiškoje lėkštėje" },
      { title: "Šokoladas tarp krištolinių taurių", description: "Tamsus šokoladas su logotipu skaidrioje pakuotėje su aukso juostele.", alt: "Šokoladas su Nacionalinio teatro logotipu tarp krištolinių šampano taurių" },
    ],
    ctaButton: "Užsakyti stalo korteles",
  },
  sv: {
    badge: "Bordskort",
    heading: "Chokladbordskort",
    subtitle: "Personaliserade choklader som bordskort för banketter, galamiddagar och formella evenemang.",
    items: [
      { title: "Bordskort med choklad", description: "Individuellt inslagen choklad på en elegant tallrik — ett raffinerat bordskort.", alt: "Chokladbordskort med guldband på elegant tallrik" },
      { title: "Choklad bland kristallglas", description: "Mörk choklad med logotyp i transparent förpackning med guldband.", alt: "Choklad med logotyp bland kristallchampagneglas" },
    ],
    ctaButton: "Beställ bordskort",
  },
  no: {
    badge: "Bordkort",
    heading: "Sjokoladebordkort",
    subtitle: "Personaliserte sjokolader som bordkort for banketter, galamiddager og formelle arrangementer.",
    items: [
      { title: "Bordkort med sjokolade", description: "Individuelt innpakket sjokolade på en elegant tallerken — et raffinert bordkort.", alt: "Sjokoladebordkort med gullbånd på elegant tallerken" },
      { title: "Sjokolade blant krystallglass", description: "Mørk sjokolade med logo i gjennomsiktig innpakning med gullbånd.", alt: "Sjokolade med logo blant krystallchampagneglass" },
    ],
    ctaButton: "Bestill bordkort",
  },
  fi: {
    badge: "Pöytäkortit",
    heading: "Suklaapöytäkortit",
    subtitle: "Personoidut suklaat pöytäkortteina banketeille, gaalaillallisille ja muodollisiin tapahtumiin.",
    items: [
      { title: "Pöytäkortti suklaalla", description: "Yksilöllisesti pakattu suklaa elegantilla lautasella — hienostunut pöytäkortti.", alt: "Suklaapöytäkortti kultanauhalla elegantilla lautasella" },
      { title: "Suklaa kristallilasien keskellä", description: "Tumma suklaa logolla läpinäkyvässä pakkauksessa kultanauhalla.", alt: "Suklaa logolla kristallishampanjalasien keskellä" },
    ],
    ctaButton: "Tilaa pöytäkortit",
  },
  da: {
    badge: "Bordkort",
    heading: "Chokoladebordkort",
    subtitle: "Personaliserede chokolader som bordkort til banketter, galamiddage og formelle begivenheder.",
    items: [
      { title: "Bordkort med chokolade", description: "Individuelt indpakket chokolade på en elegant tallerken — et raffineret bordkort.", alt: "Chokoladebordkort med guldbånd på elegant tallerken" },
      { title: "Chokolade blandt krystalglas", description: "Mørk chokolade med logo i gennemsigtig indpakning med guldbånd.", alt: "Chokolade med logo blandt krystalchampagneglas" },
    ],
    ctaButton: "Bestil bordkort",
  },
});

interface TableCardsSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const TableCardsSection = ({ lang = "lv", onCtaClick }: TableCardsSectionProps) => {
  const t = content[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="galda-kartes"
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Utensils className="w-4 h-4" />
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
                <Utensils className="w-4 h-4" />
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

export default TableCardsSection;
