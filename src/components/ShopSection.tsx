import { motion } from "framer-motion";
import { ShoppingBag, ExternalLink, Upload } from "lucide-react";
import type { Lang } from "@/i18n/types";

const shopUrls: Record<Lang, string> = {
  lv: "https://www.luxurychocolatesia.lv/interneta-veikals-produkti/",
  en: "https://www.luxurychocolatesia.lv/online-shop-products/",
  ru: "https://www.luxurychocolatesia.lv/internet-magazin-produkti/",
  et: "https://www.luxurychocolatesia.lv/e-pood/",
  lt: "https://www.luxurychocolatesia.lv/internetine-parduotuve/",
  sv: "https://www.luxurychocolatesia.lv/online-shop-products/",
  no: "https://www.luxurychocolatesia.lv/online-shop-products/",
  fi: "https://www.luxurychocolatesia.lv/online-shop-products/",
};

const shopContent: Record<
  Lang,
  { heading: string; subtitle: string; cta: string; badge1: string; badge2: string; badge3: string; uploadBtn: string }
> = {
  lv: {
    heading: "Interneta veikals",
    subtitle: "Izvēlieties no mūsu plašā sortimenta un pasūtiet šokolādes ar savu logo tiešsaistē.",
    cta: "Pasūtīt tagad ar savu logo",
    badge1: "🍫 Premium šokolādes",
    badge2: "🎁 Dāvanu kastes",
    badge3: "🏷️ Ar Jūsu logo",
    uploadBtn: "Augšupielādē savu logo vai foto",
  },
  en: {
    heading: "Online shop",
    subtitle: "Choose from our wide selection and order chocolates with your logo online.",
    cta: "Order now with your logo",
    badge1: "🍫 Premium chocolates",
    badge2: "🎁 Gift boxes",
    badge3: "🏷️ With your logo",
    uploadBtn: "Upload your logo or photo",
  },
  ru: {
    heading: "Интернет-магазин",
    subtitle: "Выберите из нашего широкого ассортимента и закажите шоколад с вашим логотипом онлайн.",
    cta: "Заказать с вашим логотипом",
    badge1: "🍫 Премиум шоколад",
    badge2: "🎁 Подарочные наборы",
    badge3: "🏷️ С вашим логотипом",
    uploadBtn: "Загрузите ваш логотип или фото",
  },
  et: {
    heading: "E-pood",
    subtitle: "Valige meie laiast valikust ja tellige šokolaadid oma logoga veebist.",
    cta: "Telli nüüd oma logoga",
    badge1: "🍫 Premium šokolaadid",
    badge2: "🎁 Kinkekarbid",
    badge3: "🏷️ Teie logoga",
    uploadBtn: "Laadige üles oma logo või foto",
  },
  lt: {
    heading: "Internetinė parduotuvė",
    subtitle: "Pasirinkite iš mūsų plataus asortimento ir užsakykite šokoladą su savo logotipu internetu.",
    cta: "Užsakyti su savo logotipu",
    badge1: "🍫 Premium šokoladai",
    badge2: "🎁 Dovanų rinkiniai",
    badge3: "🏷️ Su jūsų logotipu",
    uploadBtn: "Įkelkite savo logotipą ar nuotrauką",
  },
  sv: {
    heading: "Webbshop",
    subtitle: "Välj från vårt breda sortiment och beställ choklad med din logotyp online.",
    cta: "Beställ nu med din logotyp",
    badge1: "🍫 Premium choklad",
    badge2: "🎁 Presentförpackningar",
    badge3: "🏷️ Med din logotyp",
    uploadBtn: "Ladda upp din logotyp eller bild",
  },
  no: {
    heading: "Nettbutikk",
    subtitle: "Velg fra vårt brede utvalg og bestill sjokolade med din logo på nett.",
    cta: "Bestill nå med din logo",
    badge1: "🍫 Premium sjokolade",
    badge2: "🎁 Gavesett",
    badge3: "🏷️ Med din logo",
    uploadBtn: "Last opp din logo eller bilde",
  },
  fi: {
    heading: "Verkkokauppa",
    subtitle: "Valitse laajasta valikoimastamme ja tilaa suklaat logollasi verkossa.",
    cta: "Tilaa nyt logollasi",
    badge1: "🍫 Premium suklaat",
    badge2: "🎁 Lahjapaketit",
    badge3: "🏷️ Logollasi",
    uploadBtn: "Lataa logosi tai kuva",
  },
  da: {
    heading: "Webshop",
    subtitle: "Vælg fra vores brede sortiment og bestil chokolade med dit logo online.",
    cta: "Bestil nu med dit logo",
    badge1: "🍫 Premium chokolade",
    badge2: "🎁 Gaveæsker",
    badge3: "🏷️ Med dit logo",
    uploadBtn: "Upload dit logo eller billede",
  },
};

interface ShopSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const ShopSection = ({ lang = "lv", onCtaClick }: ShopSectionProps) => {
  const t = shopContent[lang];
  const url = shopUrls[lang];

  return (
    <section className="py-20 bg-primary/5" aria-labelledby="shop-heading">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </span>

          <h2 id="shop-heading" className="text-3xl sm:text-4xl text-foreground mb-4">
            {t.heading}
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground mb-10">
            <span>{t.badge1}</span>
            <span>{t.badge2}</span>
            <span>{t.badge3}</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
                letterSpacing: "0.12em",
              }}
            >
              {t.cta}
              <ExternalLink size={18} />
            </a>

            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 justify-center rounded-lg border border-primary text-primary px-8 py-3.5 font-medium tracking-wide text-sm transition-all duration-200 active:scale-[0.98] hover:bg-primary hover:text-primary-foreground"
            >
              <Upload size={18} />
              {t.uploadBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;
