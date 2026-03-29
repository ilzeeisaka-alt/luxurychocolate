import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "@/components/Lightbox";
import img1 from "@/assets/daily-chocolate-1.jpg";
import img2 from "@/assets/daily-chocolate-2.jpg";
import img3 from "@/assets/daily-chocolate-3.jpg";
import img4 from "@/assets/daily-chocolate-4.jpg";
import img5 from "@/assets/daily-chocolate-5.jpg";
import img6 from "@/assets/daily-chocolate-6.jpg";
import coffeeHero from "@/assets/daily-chocolate-coffee-hero.jpg";
import cardHero from "@/assets/daily-chocolate-card-hero.jpg";
import cardImg2 from "@/assets/daily-chocolate-card-2.jpg";
import cardImg3 from "@/assets/daily-chocolate-card-3.jpg";
import img7 from "@/assets/daily-chocolate-7.jpg";
import img8 from "@/assets/daily-chocolate-8.jpg";
import img9 from "@/assets/daily-chocolate-9.jpg";
import img10 from "@/assets/daily-chocolate-10.jpg";
import img11 from "@/assets/daily-chocolate-11.jpg";
import type { Lang } from "@/i18n/types";

const images = [coffeeHero, cardHero, cardImg2, cardImg3, img1, img2, img3, img4, img5, img6, img10, img11];

const content: Record<Lang, {
  sectionTitle: string;
  subtitle: string;
  coffeeTitle: string;
  coffeeDesc: string;
  cardTitle: string;
  cardDesc: string;
  chocolateTitle: string;
  chocolateStandard: string;
  chocolateSpecial: string;
  standardList: string[];
  specialList: string[];
  galleryTitle: string;
  coffeeAlt: string;
  cardAlts: string[];
  galleryAlts: string[];
}> = {
  lv: {
    sectionTitle: "Ikdienas šokolādes uzņēmumiem",
    subtitle: "Padariet kafijas pasniegšanu un vizītkaršu izgatavošanu korporatīvāku, brendotāku, izsmalcinātāku un garšīgāku",
    coffeeTitle: "☕ Logo šokolādes pie kafijas",
    coffeeDesc: "Neliela šokolāde ar jūsu uzņēmuma logo pie katras kafijas tasītes — elegants un neaizmirstams veids, kā izcelt zīmolu ikdienas biznesa tikšanās, konferencēs un viesu uzņemšanā.",
    cardTitle: "💼 Logo šokolādes pie vizītkartes",
    cardDesc: "Pievienojiet šokolādi ar logo savai vizītkartei — tā kļūst par neaizmirstamu komplimentu, kas atšķir jūs no konkurentiem un atstāj garšīgu iespaidu.",
    chocolateTitle: "Beļģijas šokolādes",
    chocolateStandard: "Standarta garšas",
    chocolateSpecial: "Nestandarta garšas",
    standardList: ["Piena šokolāde", "Baltā šokolāde", "Tumšā šokolāde"],
    specialList: ["Vegāniskā", "Apelsīnu", "Laima", "Zemeņu", "Kapučino", "Karameļu", "Medus"],
    galleryTitle: "Mūsu darbu piemēri",
    coffeeAlt: "Brendēta šokolāde ar uzņēmuma logo pie kafijas tasītes — korporatīvā viesmīlība",
    cardAlts: [
      "Šokolāde ar logo pie vizītkartes — elegants biznesa kompliments",
      "Personalizēta šokolādes konfekte ar logo pie vizītkartes",
      "Korporatīvā šokolāde ar logo — vizītkaršu kompliments klientiem",
    ],
    galleryAlts: [
      "Brendēta šokolāde pie kafijas — korporatīvā viesmīlība",
      "Logo šokolāde pie vizītkartes — biznesa kompliments",
      "Personalizēta šokolādes konfekte ar vizītkarti",
      "Korporatīvā šokolāde ar logo — klientu kompliments",
      "Beļģu šokolāde ar uzņēmuma logo — ikdienas dāvana",
      "Šokolādes konfektes ar logo drukas piemērs",
      "Personalizēta šokolāde korporatīvai kafijas pasniegšanai",
      "Brendēta beļģu šokolāde — dāvana partneriem",
      "Šokolāde ar logo — konferenču un pasākumu kompliments",
      "Luksusa šokolādes konfektes ar individuālu logo druku",
      "Korporatīvā šokolāde ar logo — ikdienas biznesa risinājums",
      "Ekskluzīva šokolāde ar logo — premium biznesa dāvana",
    ],
  },
  en: {
    sectionTitle: "Daily Chocolates for Business",
    subtitle: "Make your coffee service and business cards more corporate, branded, refined, and delicious",
    coffeeTitle: "☕ Logo Chocolates with Coffee",
    coffeeDesc: "A small chocolate with your company logo with every coffee cup — an elegant and unforgettable way to highlight your brand at daily meetings, conferences, and hospitality events.",
    cardTitle: "💼 Logo Chocolates with Business Cards",
    cardDesc: "Add a logo chocolate to your business card — it becomes a memorable compliment that sets you apart from competitors and leaves a delicious impression.",
    chocolateTitle: "Belgian Chocolate",
    chocolateStandard: "Standard Flavors",
    chocolateSpecial: "Special Flavors",
    standardList: ["Milk chocolate", "White chocolate", "Dark chocolate"],
    specialList: ["Vegan", "Orange", "Lime", "Strawberry", "Cappuccino", "Caramel", "Honey"],
    galleryTitle: "Our Work Examples",
    coffeeAlt: "Branded chocolate with company logo served with coffee — corporate hospitality",
    cardAlts: [
      "Logo chocolate with business card — elegant corporate compliment",
      "Personalized chocolate with logo paired with business card",
      "Corporate chocolate with logo — business card compliment for clients",
    ],
    galleryAlts: [
      "Branded chocolate with coffee — corporate hospitality",
      "Logo chocolate with business card — business compliment",
      "Personalized chocolate with business card",
      "Corporate chocolate with logo — client compliment",
      "Belgian chocolate with company logo — daily gift",
      "Chocolate with logo print example",
      "Personalized chocolate for corporate coffee service",
      "Branded Belgian chocolate — gift for partners",
      "Logo chocolate — conference and event compliment",
      "Luxury chocolate with custom logo print",
      "Corporate logo chocolate — daily business solution",
      "Exclusive chocolate with logo — premium business gift",
    ],
  },
  ru: {
    sectionTitle: "Ежедневные шоколадки для бизнеса",
    subtitle: "Сделайте подачу кофе и визитные карточки более корпоративными, брендированными, изысканными и вкусными",
    coffeeTitle: "☕ Шоколад с логотипом к кофе",
    coffeeDesc: "Небольшая шоколадка с логотипом вашей компании к каждой чашке кофе — элегантный и незабываемый способ подчеркнуть бренд на деловых встречах, конференциях и приёмах.",
    cardTitle: "💼 Шоколад с логотипом к визиткам",
    cardDesc: "Добавьте шоколадку с логотипом к визитной карточке — она станет запоминающимся комплиментом, который выделит вас среди конкурентов и оставит вкусное впечатление.",
    chocolateTitle: "Бельгийский шоколад",
    chocolateStandard: "Стандартные вкусы",
    chocolateSpecial: "Нестандартные вкусы",
    standardList: ["Молочный шоколад", "Белый шоколад", "Тёмный шоколад"],
    specialList: ["Веганский", "Апельсиновый", "Лаймовый", "Клубничный", "Капучино", "Карамельный", "Медовый"],
    galleryTitle: "Примеры наших работ",
    coffeeAlt: "Брендированный шоколад с логотипом компании к кофе — корпоративное гостеприимство",
    cardAlts: [
      "Шоколад с логотипом к визитке — элегантный деловой комплимент",
      "Персонализированная шоколадная конфета с логотипом к визитке",
      "Корпоративный шоколад с логотипом — комплимент к визиткам для клиентов",
    ],
    galleryAlts: [
      "Брендированный шоколад к кофе", "Шоколад с логотипом к визитке",
      "Персонализированный шоколад с визиткой", "Корпоративный шоколад — комплимент клиентам",
      "Бельгийский шоколад с логотипом", "Печать логотипа на шоколаде",
      "Шоколад для корпоративной подачи кофе", "Брендированный бельгийский шоколад — подарок партнёрам",
      "Шоколад с логотипом для конференций", "Люксовые конфеты с логотипом",
      "Корпоративный шоколад — ежедневное решение", "Эксклюзивный шоколад с логотипом — премиум подарок",
    ],
  },
  et: {
    sectionTitle: "Igapäevane šokolaad ettevõtetele",
    subtitle: "Muutke kohvi serveerimine ja visiitkaardid korporatiivsemaks, bränditumaks, rafineeritumaks ja maitsvamaks",
    coffeeTitle: "☕ Logoga šokolaad kohvi juurde",
    coffeeDesc: "Väike šokolaad teie ettevõtte logoga iga kohvitassi juurde — elegantne ja unustamatu viis oma brändi esile tõsta igapäevastel kohtumistel, konverentsidel ja vastuvõttudel.",
    cardTitle: "💼 Logoga šokolaad visiitkaardi juurde",
    cardDesc: "Lisage oma visiitkaardile logoga šokolaad — see muutub meeldejäävaks komplimendiks, mis eristab teid konkurentidest ja jätab maitsva mulje.",
    chocolateTitle: "Belgia šokolaad",
    chocolateStandard: "Standardmaitsed",
    chocolateSpecial: "Erimaitsed",
    standardList: ["Piimašokolaad", "Valge šokolaad", "Tume šokolaad"],
    specialList: ["Vegan", "Apelsin", "Laim", "Maasikas", "Cappuccino", "Karamell", "Mesi"],
    galleryTitle: "Meie tööde näited",
    coffeeAlt: "Logoga šokolaad kohvi kõrval — korporatiivne külalislahkus",
    cardAlts: [
      "Logoga šokolaad visiitkaardi juures — elegantne ärikompliment",
      "Personaliseeritud šokolaad logoga visiitkaardi kõrval",
      "Korporatiivne logoga šokolaad — visiitkaardi kompliment klientidele",
    ],
    galleryAlts: [
      "Logoga šokolaad kohvi juures", "Logoga šokolaad visiitkaardiga",
      "Personaliseeritud šokolaad visiitkaardiga", "Korporatiivne šokolaad klientidele",
      "Belgia šokolaad ettevõtte logoga", "Logo trükk šokolaadil",
      "Šokolaad korporatiivseks kohviteenuseks", "Brändi šokolaad partneritele",
      "Logoga šokolaad konverentsidel", "Luksusšokolaad logoga",
      "Korporatiivne šokolaad igapäevaseks kasutuseks", "Eksklusiivne logoga šokolaad",
    ],
  },
  lt: {
    sectionTitle: "Kasdieniai šokoladai verslui",
    subtitle: "Padarykite kavos patiekimą ir vizitines korteles korporatyvesnes, firmines, rafinuotesnes ir skanesnes",
    coffeeTitle: "☕ Šokoladas su logotipu prie kavos",
    coffeeDesc: "Nedidelis šokoladas su jūsų įmonės logotipu prie kiekvieno kavos puodelio — elegantiškas ir nepamirštamas būdas išryškinti prekės ženklą kasdieniniuose susitikimuose, konferencijose ir priėmimuose.",
    cardTitle: "💼 Šokoladas su logotipu prie vizitinės",
    cardDesc: "Pridėkite šokoladą su logotipu prie vizitinės kortelės — tai taps įsimintinu komplimentu, kuris išskirs jus iš konkurentų ir paliks skanų įspūdį.",
    chocolateTitle: "Belgiškas šokoladas",
    chocolateStandard: "Standartiniai skoniai",
    chocolateSpecial: "Nestandartiniai skoniai",
    standardList: ["Pieninis šokoladas", "Baltasis šokoladas", "Juodasis šokoladas"],
    specialList: ["Veganiškas", "Apelsinų", "Laimų", "Braškių", "Kapučino", "Karamelės", "Medaus"],
    galleryTitle: "Mūsų darbų pavyzdžiai",
    coffeeAlt: "Šokoladas su logotipu prie kavos — korporatyvinis svetingumas",
    cardAlts: [
      "Šokoladas su logotipu prie vizitinės — elegantiškas verslo komplimentas",
      "Personalizuotas šokoladas su logotipu prie vizitinės kortelės",
      "Korporatyvinis šokoladas su logotipu — komplimentas klientams",
    ],
    galleryAlts: [
      "Šokoladas su logotipu prie kavos", "Šokoladas su logotipu prie vizitinės",
      "Personalizuotas šokoladas su vizitine", "Korporatyvinis šokoladas klientams",
      "Belgiškas šokoladas su logotipu", "Logotipo spauda ant šokolado",
      "Šokoladas korporatyviniam kavos patiekimui", "Firminis šokoladas partneriams",
      "Šokoladas su logotipu konferencijoms", "Prabangus šokoladas su logotipu",
      "Korporatyvinis šokoladas kasdieniam naudojimui", "Ekskluzyvus šokoladas su logotipu",
    ],
  },
  sv: {
    sectionTitle: "Daglig choklad för företag",
    subtitle: "Gör kaffeservering och visitkort mer företagsmässiga, varumärkta, förfinade och smakfulla",
    coffeeTitle: "☕ Logochoklad till kaffe",
    coffeeDesc: "En liten choklad med ditt företagslogotyp till varje kaffekopp — ett elegant och oförglömligt sätt att framhäva ditt varumärke vid dagliga möten, konferenser och mottagningar.",
    cardTitle: "💼 Logochoklad med visitkort",
    cardDesc: "Lägg till en logochoklad till ditt visitkort — det blir en minnesvärd komplimang som skiljer dig från konkurrenterna och lämnar ett smakfullt intryck.",
    chocolateTitle: "Belgisk choklad",
    chocolateStandard: "Standardsmaker",
    chocolateSpecial: "Specialsmaker",
    standardList: ["Mjölkchoklad", "Vit choklad", "Mörk choklad"],
    specialList: ["Vegansk", "Apelsin", "Lime", "Jordgubb", "Cappuccino", "Karamell", "Honung"],
    galleryTitle: "Exempel på våra arbeten",
    coffeeAlt: "Choklad med företagslogotyp serverad med kaffe — företagsgästfrihet",
    cardAlts: [
      "Logochoklad med visitkort — elegant företagskomplimang",
      "Personlig choklad med logotyp vid visitkort",
      "Företagschoklad med logotyp — visitkortskomplimang för kunder",
    ],
    galleryAlts: [
      "Logochoklad till kaffe", "Logochoklad med visitkort",
      "Personlig choklad med visitkort", "Företagschoklad för kunder",
      "Belgisk choklad med företagslogotyp", "Logotyptryck på choklad",
      "Choklad för företagets kaffeservering", "Varumärkeschoklad för partners",
      "Logochoklad för konferenser", "Lyxchoklad med logotyp",
      "Företagschoklad för dagligt bruk", "Exklusiv logochoklad",
    ],
  },
  no: {
    sectionTitle: "Daglig sjokolade for bedrifter",
    subtitle: "Gjør kaffeserveringen og visittkortene mer bedriftsmessige, merkevarebyggende, raffinerte og smakfulle",
    coffeeTitle: "☕ Logosjokolade til kaffe",
    coffeeDesc: "En liten sjokolade med bedriftslogoen din til hver kaffekopp — en elegant og uforglemmelig måte å fremheve merkevaren din i daglige møter, konferanser og mottak.",
    cardTitle: "💼 Logosjokolade med visittkort",
    cardDesc: "Legg til en logosjokolade til visittkortet ditt — det blir en minneverdig kompliment som skiller deg fra konkurrentene og etterlater et smakfullt inntrykk.",
    chocolateTitle: "Belgisk sjokolade",
    chocolateStandard: "Standardsmaker",
    chocolateSpecial: "Spesialsmaker",
    standardList: ["Melkesjokolade", "Hvit sjokolade", "Mørk sjokolade"],
    specialList: ["Vegansk", "Appelsin", "Lime", "Jordbær", "Cappuccino", "Karamell", "Honning"],
    galleryTitle: "Eksempler på våre arbeider",
    coffeeAlt: "Sjokolade med bedriftslogo servert med kaffe — bedriftens gjestfrihet",
    cardAlts: [
      "Logosjokolade med visittkort — elegant bedriftskompliment",
      "Personlig sjokolade med logo ved visittkort",
      "Bedriftssjokolade med logo — visittkort-kompliment for kunder",
    ],
    galleryAlts: [
      "Logosjokolade til kaffe", "Logosjokolade med visittkort",
      "Personlig sjokolade med visittkort", "Bedriftssjokolade for kunder",
      "Belgisk sjokolade med bedriftslogo", "Logotrykk på sjokolade",
      "Sjokolade for bedriftens kaffeservering", "Merkevare-sjokolade for partnere",
      "Logosjokolade for konferanser", "Luksussjokolade med logo",
      "Bedriftssjokolade for daglig bruk", "Eksklusiv logosjokolade",
    ],
  },
  fi: {
    sectionTitle: "Päivittäiset suklaatyrityksille",
    subtitle: "Tee kahvitarjoilusta ja käyntikorteista yritysmäisempiä, brändätympiä, hienostuneempia ja maukkaampia",
    coffeeTitle: "☕ Logosuklaa kahvin kanssa",
    coffeeDesc: "Pieni suklaa yrityksesi logolla jokaisen kahvikupin viereen — elegantti ja unohtumaton tapa korostaa brändiäsi päivittäisissä tapaamisissa, konferensseissa ja vastaanotoissa.",
    cardTitle: "💼 Logosuklaa käyntikortin kanssa",
    cardDesc: "Lisää logosuklaa käyntikorttiisi — siitä tulee mieleenpainuva kohteliaisuus, joka erottaa sinut kilpailijoista ja jättää maukkaan vaikutelman.",
    chocolateTitle: "Belgialainen suklaa",
    chocolateStandard: "Vakiomaut",
    chocolateSpecial: "Erikoismaut",
    standardList: ["Maitosuklaa", "Valkosuklaa", "Tumma suklaa"],
    specialList: ["Vegaaninen", "Appelsiini", "Lime", "Mansikka", "Cappuccino", "Karamelli", "Hunaja"],
    galleryTitle: "Esimerkkejä töistämme",
    coffeeAlt: "Logosuklaa kahvin kanssa — yrityksen vieraanvaraisuus",
    cardAlts: [
      "Logosuklaa käyntikortin kanssa — elegantti yrityskohteliaisuus",
      "Personoitu suklaa logolla käyntikortin vieressä",
      "Yrityssuklaa logolla — käyntikorttikohteliaisuus asiakkaille",
    ],
    galleryAlts: [
      "Logosuklaa kahvin kanssa", "Logosuklaa käyntikortin kanssa",
      "Personoitu suklaa käyntikortin kanssa", "Yrityssuklaa asiakkaille",
      "Belgialainen suklaa yrityksen logolla", "Logopainatus suklaassa",
      "Suklaa yrityksen kahvitarjoiluun", "Brändisuklaa kumppaneille",
      "Logosuklaa konferensseihin", "Luksussuklaa logolla",
      "Yrityssuklaa päivittäiseen käyttöön", "Eksklusiivinen logosuklaa",
    ],
  },
};

const vp = { once: true, margin: "-50px" as const };

interface DailyChocolateSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const DailyChocolateSection = ({ lang = "lv" }: DailyChocolateSectionProps) => {
  const t = content[lang];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <section id="ikdienas" className="py-16 sm:py-24 bg-secondary/50" aria-labelledby="daily-choc-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="daily-choc-heading" className="text-3xl sm:text-4xl text-foreground mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Two use cases */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl border border-border p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-foreground mb-3">{t.coffeeTitle}</h3>
            <p className="text-muted-foreground leading-relaxed">{t.coffeeDesc}</p>
            <div className="mt-6">
              <img
                src={coffeeHero}
                alt="Logo chocolate with coffee"
                className="rounded-xl w-full h-56 object-cover cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setLightboxIdx(0)}
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-foreground mb-3">{t.cardTitle}</h3>
            <p className="text-muted-foreground leading-relaxed">{t.cardDesc}</p>
            <div className="mt-6">
              <img
                src={cardHero}
                alt="Chocolate business card"
                className="rounded-xl w-full h-56 object-cover cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setLightboxIdx(1)}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Chocolate types */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl border border-border p-8 mb-16 shadow-sm"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">{t.chocolateTitle}</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-foreground mb-3">{t.chocolateStandard}</h4>
              <ul className="space-y-2">
                {t.standardList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary">●</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-foreground mb-3">{t.chocolateSpecial}</h4>
              <ul className="space-y-2">
                {t.specialList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-accent-foreground">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">{t.galleryTitle}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Daily chocolate example ${i + 1}`}
                className="rounded-xl w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform border border-border"
                onClick={() => setLightboxIdx(i)}
                loading="lazy"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onChangeIndex={setLightboxIdx}
        />
      )}
    </section>
  );
};

export default DailyChocolateSection;
