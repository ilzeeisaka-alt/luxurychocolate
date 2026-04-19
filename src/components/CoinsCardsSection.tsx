import { useState } from "react";
import { motion } from "framer-motion";
import { Coins, CreditCard, Banknote } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import coinMonaco from "@/assets/sokolades-monetas-monaco.jpg";
import coinLatvia from "@/assets/sokolades-monetas-latvija.jpg";
import note100eur from "@/assets/sokolade-100-eur.jpg";
import creditCards from "@/assets/sokolades-kreditkartes.jpg";

const images = [coinMonaco, coinLatvia, note100eur, creditCards];

interface ItemContent {
  title: string;
  description: string;
  alt: string;
}

interface CoinsCardsContent {
  badge: string;
  heading: string;
  subtitle: string;
  items: ItemContent[];
  ctaButton: string;
  features: {
    coins: { title: string; desc: string };
    money: { title: string; desc: string };
    cards: { title: string; desc: string };
  };
}

const en: CoinsCardsContent = {
  badge: "Coins, Money & Credit Cards",
  heading: "Chocolate Coins, Banknotes & Credit Cards with Your Logo",
  subtitle: "Original chocolate replicas of coins, banknotes and credit cards — a creative way to delight clients, partners and event guests with edible branded keepsakes.",
  items: [
    { title: "Chocolate Coins", description: "Premium Belgian chocolate coins with full-color print — perfect for anniversaries and themed events", alt: "Chocolate coin with Monaco design" },
    { title: "National Coin Replicas", description: "Edible chocolate replicas of national coins — a unique souvenir or corporate gift", alt: "Chocolate coin with Latvian Republic design" },
    { title: "Chocolate Banknotes", description: "Realistic 100 EUR chocolate banknote in elegant gift packaging", alt: "100 EUR chocolate banknote in green box" },
    { title: "Chocolate Credit Cards", description: "Personalized chocolate credit cards with your bank or company branding", alt: "Personalized chocolate credit cards" },
  ],
  ctaButton: "Order chocolate coins or cards",
  features: {
    coins: { title: "Coins & Medallions", desc: "Detailed full-color print on premium Belgian chocolate" },
    money: { title: "Banknotes", desc: "Realistic chocolate banknotes — a fun and memorable gift" },
    cards: { title: "Credit Cards", desc: "Personalized with your logo, name or message" },
  },
};

const lv: CoinsCardsContent = {
  badge: "Monētas, nauda un kredītkartes",
  heading: "Šokolādes monētas, banknotes un kredītkartes ar Jūsu logo",
  subtitle: "Oriģinālas šokolādes monētu, banknošu un kredītkaršu kopijas — radošs veids, kā iepriecināt klientus, partnerus un pasākumu viesus ar ēdamām zīmola dāvanām.",
  items: [
    { title: "Šokolādes monētas", description: "Premium Beļģu šokolādes monētas ar pilnkrāsu apdruku — ideālas jubilejām un tematiskiem pasākumiem", alt: "Šokolādes monēta ar Monako dizainu" },
    { title: "Nacionālo monētu kopijas", description: "Ēdamas šokolādes monētu kopijas — unikāls suvenīrs vai korporatīvā dāvana", alt: "Šokolādes monēta ar Latvijas Republikas dizainu" },
    { title: "Šokolādes banknotes", description: "Reālistiska 100 EUR šokolādes banknote elegantā dāvanu iepakojumā", alt: "100 EUR šokolādes banknote zaļā kastītē" },
    { title: "Šokolādes kredītkartes", description: "Personalizētas šokolādes kredītkartes ar Jūsu bankas vai uzņēmuma zīmolu", alt: "Personalizētas šokolādes kredītkartes" },
  ],
  ctaButton: "Pasūtīt šokolādes monētas vai kartes",
  features: {
    coins: { title: "Monētas un medaljoni", desc: "Detalizēta pilnkrāsu apdruka uz premium Beļģu šokolādes" },
    money: { title: "Banknotes", desc: "Reālistiskas šokolādes banknotes — jautra un neaizmirstama dāvana" },
    cards: { title: "Kredītkartes", desc: "Personalizētas ar Jūsu logo, vārdu vai vēstījumu" },
  },
};

const ru: CoinsCardsContent = {
  badge: "Монеты, деньги и кредитные карты",
  heading: "Шоколадные монеты, банкноты и кредитные карты с Вашим логотипом",
  subtitle: "Оригинальные шоколадные копии монет, банкнот и кредитных карт — креативный способ порадовать клиентов, партнеров и гостей мероприятий съедобными брендированными подарками.",
  items: [
    { title: "Шоколадные монеты", description: "Премиум бельгийский шоколад с полноцветной печатью — идеально для юбилеев и тематических мероприятий", alt: "Шоколадная монета с дизайном Монако" },
    { title: "Копии национальных монет", description: "Съедобные шоколадные копии монет — уникальный сувенир или корпоративный подарок", alt: "Шоколадная монета с дизайном Латвийской Республики" },
    { title: "Шоколадные банкноты", description: "Реалистичная шоколадная банкнота 100 EUR в элегантной подарочной упаковке", alt: "Шоколадная банкнота 100 EUR в зеленой коробке" },
    { title: "Шоколадные кредитные карты", description: "Персонализированные шоколадные кредитные карты с брендингом Вашего банка или компании", alt: "Персонализированные шоколадные кредитные карты" },
  ],
  ctaButton: "Заказать шоколадные монеты или карты",
  features: {
    coins: { title: "Монеты и медальоны", desc: "Детальная полноцветная печать на премиум бельгийском шоколаде" },
    money: { title: "Банкноты", desc: "Реалистичные шоколадные банкноты — веселый и запоминающийся подарок" },
    cards: { title: "Кредитные карты", desc: "Персонализированы с Вашим логотипом, именем или сообщением" },
  },
};

const coinsCardsContent: Record<Lang, CoinsCardsContent> = {
  lv, en, ru,
  et: en, lt: en, sv: en, no: en, fi: en, da: en, de: en, fr: en, it: en, es: en,
  ar: en, nl: en, pl: en, cs: en, pt: en, el: en, tr: en, hu: en, ro: en, bg: en,
  hr: en, sk: en, sl: en, uk: en, sr: en, bs: en, mk: en, sq: en, is: en,
};

interface CoinsCardsSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const CoinsCardsSection = ({ lang = "lv", onCtaClick }: CoinsCardsSectionProps) => {
  const t = coinsCardsContent[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="monetas"
        className="py-24 bg-card/30"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Coins className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-card rounded-xl p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <Coins className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{t.features.coins.title}</h3>
              <p className="text-sm text-muted-foreground">{t.features.coins.desc}</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <Banknote className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{t.features.money.title}</h3>
              <p className="text-sm text-muted-foreground">{t.features.money.desc}</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <CreditCard className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{t.features.cards.title}</h3>
              <p className="text-sm text-muted-foreground">{t.features.cards.desc}</p>
            </div>
          </div>

          {onCtaClick && (
            <div className="text-center">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Coins className="w-4 h-4" />
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

export default CoinsCardsSection;
