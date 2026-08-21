import { motion } from "framer-motion";
import { Cake } from "lucide-react";
import type { Lang } from "@/i18n/types";

import video1Asset from "@/assets/kapkeiki-1.mp4.asset.json";
import video2Asset from "@/assets/kapkeiki-2.mp4.asset.json";
import poster1Asset from "@/assets/kapkeiki-poster-1.jpg.asset.json";
import poster2Asset from "@/assets/kapkeiki-poster-2.jpg.asset.json";

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
  items: { title: string; description: string }[];
  ctaButton: string;
}> = _addLangs({
  lv: {
    badge: "Kapkeiki",
    heading: "Kapkeiki ar personalizētu šokolādes apdruku",
    subtitle: "Svaigi cepti kapkeiki ar baltā krēma rozeti un ēdamā apdrukā veidotu logo šokolādes plāksnīti — stilīgs cienasts pasākumiem, komandas svētkiem un klientu dāvanām.",
    items: [
      { title: "Kapkeiki ar logo šokolādi", description: "Katrs kapkeiks rotāts ar šokolādes plāksnīti, uz kuras ir Jūsu logo vai zīmējums, un svaigām ogām." },
      { title: "Personalizēta dāvanu kaste", description: "Kapkeiki tiek piegādāti dizaina kastē ar Jūsu uzrakstu — gatava dāvana bez papildu iepakošanas." },
    ],
    ctaButton: "Pasūtīt kapkeikus",
  },
  en: {
    badge: "Cupcakes",
    heading: "Cupcakes with personalized chocolate printing",
    subtitle: "Freshly baked cupcakes topped with a cream rosette and an edible-printed chocolate plaque carrying your logo — a stylish treat for events, team celebrations and client gifts.",
    items: [
      { title: "Cupcakes with logo chocolate", description: "Each cupcake is decorated with a chocolate plaque printed with your logo or artwork, plus fresh berries." },
      { title: "Personalized gift box", description: "Cupcakes arrive in a designed box with your own message — a ready gift, no extra wrapping needed." },
    ],
    ctaButton: "Order cupcakes",
  },
  ru: {
    badge: "Капкейки",
    heading: "Капкейки с персонализированной шоколадной печатью",
    subtitle: "Свежие капкейки с кремовой розеткой и шоколадной плиткой с вашим логотипом — стильное угощение для мероприятий и подарков клиентам.",
    items: [
      { title: "Капкейки с логотипом", description: "Каждый капкейк украшен шоколадной плиткой с вашим логотипом и свежими ягодами." },
      { title: "Персонализированная коробка", description: "Капкейки доставляются в дизайнерской коробке с вашей надписью — готовый подарок." },
    ],
    ctaButton: "Заказать капкейки",
  },
  et: {
    badge: "Kapkeigid",
    heading: "Kapkeigid personaliseeritud šokolaaditrükiga",
    subtitle: "Värsked kapkeigid kreemiroosi ja teie logoga šokolaaditahvliga — stiilne maiuspala üritustele ja kliendikinkideks.",
    items: [
      { title: "Kapkeigid logošokolaadiga", description: "Iga kapkeik on kaunistatud teie logoga šokolaaditahvli ja värskete marjadega." },
      { title: "Personaliseeritud kinkekarp", description: "Kapkeigid tarnitakse disainkarbis teie tekstiga — valmis kingitus." },
    ],
    ctaButton: "Telli kapkeigid",
  },
  lt: {
    badge: "Keksiukai",
    heading: "Keksiukai su personalizuota šokolado spauda",
    subtitle: "Švieži keksiukai su kreminiu dekoru ir šokolado plokštele su jūsų logotipu — stilingas skanėstas įvykiams ir dovanoms klientams.",
    items: [
      { title: "Keksiukai su logotipo šokoladu", description: "Kiekvienas keksiukas dekoruotas šokolado plokštele su jūsų logotipu ir šviežiomis uogomis." },
      { title: "Personalizuota dovanų dėžutė", description: "Keksiukai pateikiami dizaino dėžutėje su jūsų užrašu — paruošta dovana." },
    ],
    ctaButton: "Užsakyti keksiukus",
  },
  sv: {
    badge: "Cupcakes",
    heading: "Cupcakes med personligt chokladtryck",
    subtitle: "Nybakade cupcakes med gräddrosett och en chokladplatta med din logotyp — en stilfull förfriskning för event och kundgåvor.",
    items: [
      { title: "Cupcakes med logotypchoklad", description: "Varje cupcake dekoreras med en chokladplatta med din logotyp och färska bär." },
      { title: "Personlig presentask", description: "Cupcakes levereras i en designad ask med din text — en färdig gåva." },
    ],
    ctaButton: "Beställ cupcakes",
  },
  no: {
    badge: "Cupcakes",
    heading: "Cupcakes med personlig sjokoladetrykk",
    subtitle: "Nybakte cupcakes med kremrosett og en sjokoladeplate med din logo — en stilig godbit til arrangementer og kundegaver.",
    items: [
      { title: "Cupcakes med logosjokolade", description: "Hver cupcake dekoreres med en sjokoladeplate med din logo og friske bær." },
      { title: "Personlig gaveeske", description: "Cupcakes leveres i en designet eske med din tekst — en ferdig gave." },
    ],
    ctaButton: "Bestill cupcakes",
  },
  fi: {
    badge: "Kuppikakut",
    heading: "Kuppikakut personoidulla suklaapainatuksella",
    subtitle: "Tuoreet kuppikakut kreemiruusukkeella ja logollasi painetulla suklaalevyllä — tyylikäs tarjottava tapahtumiin ja asiakaslahjoiksi.",
    items: [
      { title: "Kuppikakut logosuklaalla", description: "Jokainen kuppikakku on koristeltu logollasi painetulla suklaalevyllä ja tuoreilla marjoilla." },
      { title: "Personoitu lahjarasia", description: "Kuppikakut toimitetaan design-rasiassa omalla tekstilläsi — valmis lahja." },
    ],
    ctaButton: "Tilaa kuppikakut",
  },
  da: {
    badge: "Cupcakes",
    heading: "Cupcakes med personligt chokoladetryk",
    subtitle: "Friskbagte cupcakes med cremerosette og en chokoladeplade med dit logo — en stilfuld lækkerbisken til events og kundegaver.",
    items: [
      { title: "Cupcakes med logochokolade", description: "Hver cupcake er dekoreret med en chokoladeplade med dit logo og friske bær." },
      { title: "Personlig gaveæske", description: "Cupcakes leveres i en designet æske med din tekst — en færdig gave." },
    ],
    ctaButton: "Bestil cupcakes",
  },
});

const videos = [
  { src: video1Asset.url, poster: poster1Asset.url },
  { src: video2Asset.url, poster: poster2Asset.url },
];

interface CupcakeSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const CupcakeSection = ({ lang = "lv", onCtaClick }: CupcakeSectionProps) => {
  const t = content[lang];

  return (
    <motion.section
      id="kapkeiki"
      className="py-24"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
            <Cake className="w-4 h-4" />
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl text-foreground mb-4">{t.heading}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {t.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              <div
                className="bg-card rounded-xl overflow-hidden group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-[9/16] overflow-hidden bg-muted">
                  <video
                    src={videos[i]?.src}
                    poster={videos[i]?.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
              <Cake className="w-4 h-4" />
              {t.ctaButton}
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CupcakeSection;
