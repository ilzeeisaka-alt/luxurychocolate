import { motion } from "framer-motion";
import { useState } from "react";
import { Gift } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import img1 from "@/assets/souvenir-1.jpg";
import img2 from "@/assets/souvenir-2.jpg";
import img3 from "@/assets/souvenir-3.jpg";
import img4 from "@/assets/souvenir-4.jpg";

const images = [img1, img2, img3, img4];

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
    badge: "Suvenīri & Komplimenti",
    heading: "Mazie suvenīri un komplimenti",
    subtitle: "Eleganti un garšīgi suvenīri ar Jūsu logo — ideāli pasākumiem, konferencēm un klientu pārsteigšanai. Individuāli iesaiņoti ar lentīti.",
    items: [
      { title: "Šokolādes suvenīrs ar logo", description: "Individuāli iesaiņota šokolāde ar uzņēmuma logo un zelta lentīti — elegants kompliments.", alt: "Šokolādes suvenīrs ar Neoklasika dizaina studijas logo zelta iesaiņojumā" },
      { title: "Šokolādes cepumi ar apdruku", description: "Baltā šokolāde uz cepuma ar uzņēmuma logo — oriģināls jubilejas vai pasākuma suvenīrs.", alt: "Šokolādes cepumi ar logo svinīgā iesaiņojumā ar sarkanu lentīti" },
      { title: "Mini šokolādes ar logo", description: "Dažādu krāsu un garšu šokolādes ar individuālu logo apdruku — ideāli izdalīšanai.", alt: "Četras mini šokolādes ar dažādu uzņēmumu logo piena un baltajā šokolādē" },
      { title: "Premium šokolādes dāvana", description: "Eleganti iesaiņota šokolāde ar logo starp ziediem — izsmalcināts korporatīvais kompliments.", alt: "Premium šokolādes dāvana ar Gifts & Premiums Dubai logo starp saulespuķēm" },
    ],
    ctaButton: "Pasūtīt suvenīrus",
  },
  en: {
    badge: "Souvenirs & Compliments",
    heading: "Small souvenirs & compliments",
    subtitle: "Elegant and delicious souvenirs with your logo — perfect for events, conferences and delighting clients. Individually wrapped with ribbon.",
    items: [
      { title: "Chocolate souvenir with logo", description: "Individually wrapped chocolate with company logo and gold ribbon — an elegant compliment.", alt: "Chocolate souvenir with Neoklasika design studio logo in gold wrapping" },
      { title: "Chocolate cookies with print", description: "White chocolate on cookie with company logo — original anniversary or event souvenir.", alt: "Chocolate cookies with logo in festive wrapping with red ribbon" },
      { title: "Mini chocolates with logo", description: "Various colors and flavors of chocolate with custom logo print — ideal for distribution.", alt: "Four mini chocolates with various company logos in milk and white chocolate" },
      { title: "Premium chocolate gift", description: "Elegantly wrapped chocolate with logo among flowers — a refined corporate compliment.", alt: "Premium chocolate gift with Gifts & Premiums Dubai logo among sunflowers" },
    ],
    ctaButton: "Order souvenirs",
  },
  ru: {
    badge: "Сувениры и комплименты",
    heading: "Маленькие сувениры и комплименты",
    subtitle: "Элегантные и вкусные сувениры с вашим логотипом — идеальны для мероприятий, конференций и приятных сюрпризов клиентам.",
    items: [
      { title: "Шоколадный сувенир с логотипом", description: "Индивидуально упакованный шоколад с логотипом компании и золотой лентой.", alt: "Шоколадный сувенир с логотипом Neoklasika в золотой упаковке" },
      { title: "Шоколадное печенье с печатью", description: "Белый шоколад на печенье с логотипом компании — оригинальный сувенир.", alt: "Шоколадное печенье с логотипом в праздничной упаковке" },
      { title: "Мини-шоколад с логотипом", description: "Шоколад разных цветов и вкусов с индивидуальной печатью логотипа.", alt: "Четыре мини-шоколада с логотипами разных компаний" },
      { title: "Премиум шоколадный подарок", description: "Элегантно упакованный шоколад с логотипом среди цветов.", alt: "Премиум шоколадный подарок с логотипом среди подсолнухов" },
    ],
    ctaButton: "Заказать сувениры",
  },
  et: {
    badge: "Suveniirid ja komplimendid",
    heading: "Väikesed suveniirid ja komplimendid",
    subtitle: "Elegantsed ja maitsvad suveniirid teie logoga — ideaalsed üritusteks ja klientide üllatamiseks.",
    items: [
      { title: "Šokolaadisuveniir logoga", description: "Individuaalselt pakitud šokolaad ettevõtte logoga ja kuldse lindiga.", alt: "Šokolaadisuveniir Neoklasika logoga kuldselt pakituna" },
      { title: "Šokolaadikeks trükiga", description: "Valge šokolaad küpsisel ettevõtte logoga — originaalne suveniir.", alt: "Šokolaadikeksid logoga pidulikult pakituna" },
      { title: "Mini šokolaadid logoga", description: "Erinevate värvide ja maitsetega šokolaadid logo trükiga.", alt: "Neli mini šokolaadi erinevate ettevõtete logodega" },
      { title: "Premium šokolaadikingitus", description: "Elegantselt pakitud šokolaad logoga lillede seas.", alt: "Premium šokolaadikingitus logoga päevalillede seas" },
    ],
    ctaButton: "Telli suveniirid",
  },
  lt: {
    badge: "Suvenyrai ir komplimentai",
    heading: "Maži suvenyrai ir komplimentai",
    subtitle: "Elegantiški ir skanūs suvenyrai su jūsų logotipu — idealūs renginiams ir klientų nustebinimui.",
    items: [
      { title: "Šokoladinis suvenyras su logotipu", description: "Individualiai supakuotas šokoladas su įmonės logotipu ir aukso juostele.", alt: "Šokoladinis suvenyras su Neoklasika logotipu aukso pakuotėje" },
      { title: "Šokoladiniai sausainiai su spauda", description: "Baltas šokoladas ant sausainio su įmonės logotipu — originalus suvenyras.", alt: "Šokoladiniai sausainiai su logotipu šventinėje pakuotėje" },
      { title: "Mini šokoladai su logotipu", description: "Įvairių spalvų ir skonių šokoladai su individualiu logotipo spaudu.", alt: "Keturi mini šokoladai su skirtingų įmonių logotipais" },
      { title: "Premium šokolado dovana", description: "Elegantiškai supakuotas šokoladas su logotipu tarp gėlių.", alt: "Premium šokolado dovana su logotipu tarp saulėgrąžų" },
    ],
    ctaButton: "Užsakyti suvenyrus",
  },
  sv: {
    badge: "Souvenirer & Komplimanger",
    heading: "Små souvenirer och komplimanger",
    subtitle: "Eleganta och goda souvenirer med er logotyp — perfekta för evenemang och att glädja kunder.",
    items: [
      { title: "Chokladsouvenirer med logotyp", description: "Individuellt inslagna choklader med företagslogotyp och guldband.", alt: "Chokladsouvenirer med logotyp i guldförpackning" },
      { title: "Chokladkakor med tryck", description: "Vit choklad på kaka med logotyp — originell souvenir.", alt: "Chokladkakor med logotyp i festlig förpackning" },
      { title: "Minichoklad med logotyp", description: "Choklader i olika färger och smaker med logotyptryck.", alt: "Fyra minichoklader med olika företagslogotyper" },
      { title: "Premium chokladpresent", description: "Elegant inslagna choklader med logotyp bland blommor.", alt: "Premium chokladpresent med logotyp bland solrosor" },
    ],
    ctaButton: "Beställ souvenirer",
  },
  no: {
    badge: "Suvenirer & Komplimenter",
    heading: "Små suvenirer og komplimenter",
    subtitle: "Elegante og deilige suvenirer med din logo — perfekt for arrangementer og å glede kunder.",
    items: [
      { title: "Sjokoladesuvenirer med logo", description: "Individuelt innpakkede sjokolader med firmalogo og gullbånd.", alt: "Sjokoladesuvenirer med logo i gullinnpakning" },
      { title: "Sjokoladekjeks med trykk", description: "Hvit sjokolade på kjeks med firmalogo — originale suvenirer.", alt: "Sjokoladekjeks med logo i festlig innpakning" },
      { title: "Mini sjokolader med logo", description: "Sjokolader i ulike farger og smaker med logotrykk.", alt: "Fire mini sjokolader med ulike firmalogoer" },
      { title: "Premium sjokoladegave", description: "Elegant innpakkede sjokolader med logo blant blomster.", alt: "Premium sjokoladegave med logo blant solsikker" },
    ],
    ctaButton: "Bestill suvenirer",
  },
  fi: {
    badge: "Matkamuistot & Kohteliaisuudet",
    heading: "Pienet matkamuistot ja kohteliaisuudet",
    subtitle: "Elegantteja ja herkullisia matkamuistoja logollanne — täydellisiä tapahtumiin ja asiakkaiden ilahduttamiseen.",
    items: [
      { title: "Suklaamatkamuisto logolla", description: "Yksilöllisesti pakattu suklaa yrityksen logolla ja kultanauhalla.", alt: "Suklaamatkamuisto logolla kultapakkauksessa" },
      { title: "Suklaakeksit painatuksella", description: "Valkosuklaa keksillä yrityksen logolla — omaperäinen matkamuisto.", alt: "Suklaakeksit logolla juhlapakkauksessa" },
      { title: "Minisuklaat logolla", description: "Eri värejä ja makuja suklaat logo-painatuksella.", alt: "Neljä minisuklaat eri yritysten logoilla" },
      { title: "Premium suklaelahja", description: "Elegantisti pakattu suklaa logolla kukkien keskellä.", alt: "Premium suklaelahja logolla auringonkukkien keskellä" },
    ],
    ctaButton: "Tilaa matkamuistoja",
  },
  da: {
    badge: "Souvenirs & Komplimenter",
    heading: "Små souvenirs og komplimenter",
    subtitle: "Elegante og lækre souvenirs med jeres logo — perfekte til events og at glæde kunder.",
    items: [
      { title: "Chokoladesouvenirs med logo", description: "Individuelt indpakkede chokolader med firmalogo og guldbånd.", alt: "Chokoladesouvenirs med logo i guldindpakning" },
      { title: "Chokoladekager med tryk", description: "Hvid chokolade på kage med firmalogo — originale souvenirs.", alt: "Chokoladekager med logo i festlig indpakning" },
      { title: "Mini chokolader med logo", description: "Chokolader i forskellige farver og smage med logotryk.", alt: "Fire mini chokolader med forskellige firmalogo" },
      { title: "Premium chokoladegave", description: "Elegant indpakkede chokolader med logo blandt blomster.", alt: "Premium chokoladegave med logo blandt solsikker" },
    ],
    ctaButton: "Bestil souvenirs",
  },
});

interface SouvenirSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const SouvenirSection = ({ lang = "lv", onCtaClick }: SouvenirSectionProps) => {
  const t = content[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="suveniri"
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Gift className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                <Gift className="w-4 h-4" />
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

export default SouvenirSection;
