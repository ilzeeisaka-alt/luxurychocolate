import type { Lang } from "./types";

export const quickFacts: Record<Lang, { heading: string; facts: string[] }> = {
  lv: {
    heading: "Kāpēc izvēlēties mūs",
    facts: ["Minimālais pasūtījums: no 50 gab.", "Izgatavošana: 3–10 darba dienas", "Premium Beļģu šokolāde", "Individuāls dizains ar Jūsu logo"],
  },
  en: {
    heading: "Why choose us",
    facts: ["Minimum order: from 50 pcs", "Production: 3–10 business days", "Premium Belgian chocolate", "Custom design with your logo"],
  },
  ru: {
    heading: "Почему выбирают нас",
    facts: ["Минимальный заказ: от 50 шт.", "Изготовление: 3–10 рабочих дней", "Премиум бельгийский шоколад", "Индивидуальный дизайн с вашим логотипом"],
  },
};

export const clientExamples: Record<Lang, { subtitle: string; heading: string; srOnly: string }> = {
  lv: { subtitle: "Klientu piemēri", heading: "Pasaules zīmoli uzticas mums", srOnly: "Klientu piemēri — pasaules zīmoli, kas uzticas Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
  en: { subtitle: "Client examples", heading: "World brands trust us", srOnly: "Client examples — world brands that trust Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
  ru: { subtitle: "Примеры клиентов", heading: "Мировые бренды доверяют нам", srOnly: "Примеры клиентов — мировые бренды, которые доверяют Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
};

export const howToOrder: Record<Lang, { heading: string; steps: string[]; footer: string; srOnly: string }> = {
  lv: {
    heading: "Kā pasūtīt personalizētās šokolādes",
    steps: ["Atsūtiet savu logo vai ideju", "Mēs izveidosim dizaina paraugu", "Apstipriniet dizainu", "Mēs izgatavosim un piegādāsim"],
    footer: "⏱ Izgatavošana: <strong>3–10 darba dienas</strong>",
    srOnly: "Kā pasūtīt personalizētās šokolādes: 1) Atsūtiet savu logo vai ideju, 2) Mēs izveidosim dizaina paraugu, 3) Apstipriniet dizainu, 4) Mēs izgatavosim un piegādāsim.",
  },
  en: {
    heading: "How to order personalized chocolate",
    steps: ["Send your logo or idea", "We'll create a design preview", "Approve the design", "We produce and deliver"],
    footer: "⏱ Production: <strong>3–10 business days</strong>",
    srOnly: "How to order personalized chocolate: 1) Send your logo, 2) We create a design preview, 3) Approve the design, 4) We produce and deliver.",
  },
  ru: {
    heading: "Как заказать персонализированный шоколад",
    steps: ["Отправьте свой логотип или идею", "Мы создадим макет дизайна", "Утвердите дизайн", "Мы изготовим и доставим"],
    footer: "⏱ Изготовление: <strong>3–10 рабочих дней</strong>",
    srOnly: "Как заказать: 1) Отправьте логотип, 2) Мы создадим макет, 3) Утвердите дизайн, 4) Мы изготовим и доставим.",
  },
};

export const trust: Record<Lang, {
  heading: string;
  stats: { value: string; label: string }[];
  clientsLabel: string;
  testimonials: { quote: string; author: string; company: string }[];
  guarantees: string[];
}> = {
  lv: {
    heading: "Kāpēc mums uzticas",
    stats: [{ value: "500+", label: "Izpildīti pasūtījumi" }, { value: "10+", label: "Gadu pieredze" }, { value: "98%", label: "Klientu apmierinātība" }, { value: "30+", label: "Valstis" }],
    clientsLabel: "Mums uzticas vadošie uzņēmumi",
    testimonials: [
      { quote: "Izcila kvalitāte un ātra piegāde. Mūsu klienti bija sajūsmā par personalizētajām šokolādēm!", author: "Anna K.", company: "SIA MarketPro" },
      { quote: "Luxury Chocolate palīdzēja mums radīt neaizmirstamu korporatīvo dāvanu. Ļoti profesionāla pieeja.", author: "Mārtiņš B.", company: "Tech Solutions" },
      { quote: "Jau trešo gadu pasūtām šokolādes ar mūsu logo — vienmēr augstākajā līmenī.", author: "Ieva L.", company: "Baltic Events" },
    ],
    guarantees: ["Kvalitātes garantija", "Sertificēta ražotne", "Piegāde visā pasaulē", "Izpilde 14 dienu laikā"],
  },
  en: {
    heading: "Why clients trust us",
    stats: [{ value: "500+", label: "Orders completed" }, { value: "10+", label: "Years of experience" }, { value: "98%", label: "Client satisfaction" }, { value: "30+", label: "Countries" }],
    clientsLabel: "Trusted by leading companies",
    testimonials: [
      { quote: "Excellent quality and fast delivery. Our clients were delighted with the personalized chocolates!", author: "Anna K.", company: "SIA MarketPro" },
      { quote: "Luxury Chocolate helped us create an unforgettable corporate gift. Very professional approach.", author: "Mārtiņš B.", company: "Tech Solutions" },
      { quote: "Third year ordering chocolates with our logo — always top quality.", author: "Ieva L.", company: "Baltic Events" },
    ],
    guarantees: ["Quality guarantee", "Certified facility", "Worldwide delivery", "Fulfillment within 14 days"],
  },
  ru: {
    heading: "Почему нам доверяют",
    stats: [{ value: "500+", label: "Выполненных заказов" }, { value: "10+", label: "Лет опыта" }, { value: "98%", label: "Удовлетворённость клиентов" }, { value: "30+", label: "Стран" }],
    clientsLabel: "Нам доверяют ведущие компании",
    testimonials: [
      { quote: "Отличное качество и быстрая доставка. Наши клиенты были в восторге от персонализированного шоколада!", author: "Анна К.", company: "SIA MarketPro" },
      { quote: "Luxury Chocolate помог нам создать незабываемый корпоративный подарок. Очень профессиональный подход.", author: "Мартиньш Б.", company: "Tech Solutions" },
      { quote: "Третий год заказываем шоколад с нашим логотипом — всегда на высшем уровне.", author: "Иева Л.", company: "Baltic Events" },
    ],
    guarantees: ["Гарантия качества", "Сертифицированное производство", "Доставка по всему миру", "Выполнение в течение 14 дней"],
  },
};

export const products: Record<Lang, { heading: string; subtitle: string; items: { title: string; description: string; alt: string }[] }> = {
  lv: {
    heading: "Mūsu šokolādes",
    subtitle: "Katrs produkts tiek pielāgots Jūsu zīmolam — no dizaina līdz garšai.",
    items: [
      { title: "Šokolādes tāfelītes", description: "Ar Jūsu uzņēmuma logo un individuālu iepakojumu.", alt: "Personalizēta šokolādes tāfelīte ar uzņēmuma logo un individuālu iepakojumu" },
      { title: "Dāvanu komplekti", description: "Eleganta kastīte ar 5 rokām gatavotām konfektēm.", alt: "Eleganta korporatīvā šokolādes dāvanu kastīte ar konfektēm" },
      { title: "Šokolādes konfektes", description: "Pralines ar krēma pildījumu un personalizētu dizainu.", alt: "Premium šokolādes pralines ar krēma pildījumu un personalizētu dizainu" },
    ],
  },
  en: {
    heading: "Our chocolates",
    subtitle: "Each product is customized to your brand — from design to taste.",
    items: [
      { title: "Chocolate bars", description: "With your company logo and custom packaging.", alt: "Personalized chocolate bar with company logo and custom packaging" },
      { title: "Gift sets", description: "Elegant box with 5 handcrafted pralines.", alt: "Elegant corporate chocolate gift box with pralines" },
      { title: "Chocolate pralines", description: "Pralines with cream filling and personalized design.", alt: "Premium chocolate pralines with cream filling and personalized design" },
    ],
  },
  ru: {
    heading: "Наш шоколад",
    subtitle: "Каждый продукт адаптируется под ваш бренд — от дизайна до вкуса.",
    items: [
      { title: "Шоколадные плитки", description: "С логотипом вашей компании и индивидуальной упаковкой.", alt: "Персонализированная шоколадная плитка с логотипом компании" },
      { title: "Подарочные наборы", description: "Элегантная коробка с 5 пралине ручной работы.", alt: "Элегантная корпоративная подарочная коробка с шоколадом" },
      { title: "Шоколадные конфеты", description: "Пралине с кремовой начинкой и персонализированным дизайном.", alt: "Премиум шоколадные пралине с кремовой начинкой" },
    ],
  },
};

export const faqContent: Record<Lang, { heading: string; items: { q: string; a: string }[] }> = {
  lv: {
    heading: "Biežāk uzdotie jautājumi",
    items: [
      { q: "Kāds ir minimālais pasūtījums personalizētām šokolādēm?", a: "Minimālais pasūtījums ir no 50 gab. Tas ir ērts apjoms gan mazākiem pasākumiem, gan lielām korporatīvajām kampaņām." },
      { q: "Cik ilgi aizņem šokolādes ar logo izgatavošana?", a: "Standarta izgatavošanas laiks ir 3–10 darba dienas no dizaina apstiprināšanas brīža. Steidzamiem pasūtījumiem iespējama ātrāka izpilde." },
      { q: "Kāda kvalitātes šokolāde tiek izmantota?", a: "Mēs izmantojam tikai premium Beļģu šokolādi — piena, tumšo un balto šokolādi no sertificētām ražotnēm." },
      { q: "Vai ir iespējams pasūtīt šokolādes ar pilnkrāsu apdruku?", a: "Jā, mēs piedāvājam pilnkrāsu apdruku tieši uz šokolādes virsmas — Jūsu logo, dizains vai jebkurš grafisks motīvs. Apdruka ir pārtikas droša." },
      { q: "Kādiem pasākumiem piemērotas korporatīvās šokolādes?", a: "Personalizētas šokolādes ir ideālas konferencēm, izstādēm, klientu tikšanām, Ziemassvētku dāvanām, uzņēmuma jubileju pasākumiem, produktu prezentācijām un VIP viesmīlībai." },
      { q: "Vai piedāvājat piegādi ārpus Latvijas?", a: "Jā, mēs piegādājam personalizētās šokolādes uz vairāk nekā 30 valstīm visā pasaulē." },
    ],
  },
  en: {
    heading: "Frequently asked questions",
    items: [
      { q: "What is the minimum order for personalized chocolates?", a: "The minimum order is 50 pieces. This is a convenient quantity for both smaller events and large corporate campaigns." },
      { q: "How long does it take to produce chocolate with a logo?", a: "Standard production time is 3–10 business days from design approval. Rush orders are available." },
      { q: "What quality chocolate is used?", a: "We use only premium Belgian chocolate — milk, dark, and white chocolate from certified facilities." },
      { q: "Can I order chocolates with full-color printing?", a: "Yes, we offer full-color printing directly on the chocolate surface — your logo, design, or any graphic motif. The print is food-safe." },
      { q: "What events are corporate chocolates suitable for?", a: "Personalized chocolates are ideal for conferences, exhibitions, client meetings, Christmas gifts, company anniversaries, product presentations, and VIP hospitality." },
      { q: "Do you deliver outside Latvia?", a: "Yes, we deliver personalized chocolates to over 30 countries worldwide." },
    ],
  },
  ru: {
    heading: "Часто задаваемые вопросы",
    items: [
      { q: "Какой минимальный заказ для персонализированного шоколада?", a: "Минимальный заказ от 50 штук. Это удобный объём как для небольших мероприятий, так и для крупных корпоративных кампаний." },
      { q: "Сколько времени занимает изготовление шоколада с логотипом?", a: "Стандартный срок изготовления — 3–10 рабочих дней с момента утверждения дизайна. Возможны срочные заказы." },
      { q: "Какой шоколад используется?", a: "Мы используем только премиум бельгийский шоколад — молочный, тёмный и белый от сертифицированных производителей." },
      { q: "Можно заказать шоколад с полноцветной печатью?", a: "Да, мы предлагаем полноцветную печать прямо на поверхности шоколада — логотип, дизайн или любой графический мотив. Печать пищевая безопасная." },
      { q: "Для каких мероприятий подходит корпоративный шоколад?", a: "Персонализированный шоколад идеален для конференций, выставок, встреч с клиентами, рождественских подарков, юбилеев компании и VIP-гостеприимства." },
      { q: "Доставляете ли вы за пределы Латвии?", a: "Да, мы доставляем персонализированный шоколад в более чем 30 стран мира." },
    ],
  },
};

export const ideasContent: Record<Lang, { subtitle: string; heading: string; items: { emoji: string; title: string; description: string; path: string }[] }> = {
  lv: {
    subtitle: "Idejas un risinājumi",
    heading: "Idejas korporatīvajām dāvanām",
    items: [
      { emoji: "🍫", title: "Šokolādes ar logo uzņēmumiem", description: "Personalizētas šokolādes ar Jūsu uzņēmuma logo — elegants veids izcelt zīmolu.", path: "/sokolades-ar-logo" },
      { emoji: "🎄", title: "Ziemassvētku korporatīvās šokolādes", description: "Ekskluzīvas svētku dāvanas klientiem un partneriem ar Jūsu logo.", path: "/ziemassvetku-korporativas-sokolades" },
      { emoji: "🎁", title: "Reklāmas šokolāde ar apdruku", description: "Efektīvs promo produkts izstādēm, konferencēm un pasākumiem.", path: "/reklamas-sokolade" },
      { emoji: "🏢", title: "Šokolādes klientu dāvanām", description: "Premium dāvanu idejas Jūsu biznesa partneriem un klientiem.", path: "/sokolades-klientu-davanam" },
    ],
  },
  en: {
    subtitle: "Ideas and solutions",
    heading: "Corporate gift ideas",
    items: [
      { emoji: "🍫", title: "Chocolate with company logo", description: "Personalized chocolate with your logo — an elegant way to highlight your brand.", path: "/en/chocolate-with-logo" },
      { emoji: "🎄", title: "Christmas corporate chocolate", description: "Exclusive holiday gifts for clients and partners with your logo.", path: "/en/christmas-corporate-chocolate" },
      { emoji: "🎁", title: "Promotional chocolate", description: "Effective promo product for exhibitions, conferences, and events.", path: "/en/promotional-chocolate" },
      { emoji: "🏢", title: "Chocolate for client gifts", description: "Premium gift ideas for your business partners and clients.", path: "/en/client-gifts" },
    ],
  },
  ru: {
    subtitle: "Идеи и решения",
    heading: "Идеи корпоративных подарков",
    items: [
      { emoji: "🍫", title: "Шоколад с логотипом компании", description: "Персонализированный шоколад с логотипом — элегантный способ выделить бренд.", path: "/ru/shokolad-s-logotipom" },
      { emoji: "🎄", title: "Рождественский корпоративный шоколад", description: "Эксклюзивные праздничные подарки клиентам и партнёрам с логотипом.", path: "/ru/rozhdestvenskij-shokolad" },
      { emoji: "🎁", title: "Рекламный шоколад", description: "Эффективный промо-продукт для выставок, конференций и мероприятий.", path: "/ru/reklamniy-shokolad" },
      { emoji: "🏢", title: "Шоколад для подарков клиентам", description: "Премиум идеи подарков для бизнес-партнёров и клиентов.", path: "/ru/podarki-klientam" },
    ],
  },
};

export const useCasesContent: Record<Lang, { subtitle: string; heading: string; ctaLabel: string; items: { title: string; desc: string; link: string; linkLabel: string }[] }> = {
  lv: {
    subtitle: "Lietojuma scenāriji",
    heading: "Kur uzņēmumi izmanto šokolādes ar logo",
    ctaLabel: "Saņemt piedāvājumu",
    items: [
      { title: "Klientu dāvanām", desc: "Eleganta šokolāde ar Jūsu logo — lai klienti atceras Jūsu uzņēmumu ar pozitīvām emocijām.", link: "/sokolades-klientu-davanam", linkLabel: "Uzzināt vairāk →" },
      { title: "Konferencēm un pasākumiem", desc: "Kompaktas šokolādes tāfelītes ar logo — ideālas izstādēm, semināriem un biznesa pasākumiem.", link: "/sokolades-konferencem", linkLabel: "Uzzināt vairāk →" },
      { title: "Partneru sveicieniem", desc: "Premium šokolādes dāvanu komplekti, kas stiprina biznesa attiecības un rada profesionālu iespaidu.", link: "/sokolades-partneru-davanam", linkLabel: "Uzzināt vairāk →" },
      { title: "Ziemassvētku dāvanām", desc: "Svētku dizains ar Jūsu logo — populārākā korporatīvā dāvana gada nogalē klientiem un darbiniekiem.", link: "/ziemassvetku-korporativas-sokolades", linkLabel: "Uzzināt vairāk →" },
    ],
  },
  en: {
    subtitle: "Use cases",
    heading: "Where companies use chocolate with logo",
    ctaLabel: "Get a quote",
    items: [
      { title: "Client gifts", desc: "Elegant chocolate with your logo — so clients remember your company with positive emotions.", link: "/en/client-gifts", linkLabel: "Learn more →" },
      { title: "Conferences and events", desc: "Compact chocolate bars with logo — ideal for exhibitions, seminars, and business events.", link: "/en/conference-chocolate", linkLabel: "Learn more →" },
      { title: "Partner greetings", desc: "Premium chocolate gift sets that strengthen business relationships and create a professional impression.", link: "/en/partner-gifts", linkLabel: "Learn more →" },
      { title: "Christmas gifts", desc: "Festive design with your logo — the most popular corporate gift at year-end for clients and employees.", link: "/en/christmas-corporate-chocolate", linkLabel: "Learn more →" },
    ],
  },
  ru: {
    subtitle: "Сценарии использования",
    heading: "Где компании используют шоколад с логотипом",
    ctaLabel: "Получить предложение",
    items: [
      { title: "Подарки клиентам", desc: "Элегантный шоколад с логотипом — чтобы клиенты запомнили вашу компанию с позитивными эмоциями.", link: "/ru/podarki-klientam", linkLabel: "Узнать больше →" },
      { title: "Конференции и мероприятия", desc: "Компактные шоколадные плитки с логотипом — идеальны для выставок, семинаров и деловых мероприятий.", link: "/ru/shokolad-dlya-konferencij", linkLabel: "Узнать больше →" },
      { title: "Поздравления партнёрам", desc: "Премиум шоколадные подарочные наборы, укрепляющие деловые отношения и создающие профессиональное впечатление.", link: "/ru/podarki-partneram", linkLabel: "Узнать больше →" },
      { title: "Рождественские подарки", desc: "Праздничный дизайн с логотипом — самый популярный корпоративный подарок на конец года.", link: "/ru/rozhdestvenskij-shokolad", linkLabel: "Узнать больше →" },
    ],
  },
};

export const ctaContent: Record<Lang, { heading: string; description: string; button: string }> = {
  lv: {
    heading: "Saņemiet bezmaksas dizaina preview",
    description: "Nosūtiet mums savu logo, un mēs sagatavosim personalizētu šokolādes dizaina preview 24h laikā — pilnīgi bez maksas.",
    button: "Saņemt bezmaksas preview",
  },
  en: {
    heading: "Get a free design preview",
    description: "Send us your logo and we'll prepare a personalized chocolate design preview within 24 hours — completely free.",
    button: "Get free preview",
  },
  ru: {
    heading: "Получите бесплатный макет дизайна",
    description: "Отправьте нам свой логотип, и мы подготовим персонализированный макет шоколада в течение 24 часов — совершенно бесплатно.",
    button: "Получить бесплатный макет",
  },
};

export const seoContent: Record<Lang, { heading: string; paragraphs: { text: string; links?: { text: string; to: string }[] }[] }> = {
  lv: {
    heading: "Šokolādes ar logo uzņēmumiem",
    paragraphs: [
      { text: "Mūsu {link1} ir viena no populārākajām korporatīvajām dāvanām, kas vēlas radīt pozitīvu iespaidu uz klientiem un partneriem. Personalizēta šokolāde ar uzņēmuma logo apvieno izsmalcinātu garšu ar efektīvu zīmola komunikāciju.", links: [{ text: "šokolādes ar logo uzņēmumiem", to: "/sokolades-ar-logo" }] },
      { text: "Uzņēmumi bieži izmanto šokolādes ar apdruku dažādos biznesa pasākumos — konferencēs, izstādēs, klientu tikšanās reizēs. Īpaši populāras ir {link1} izstādēm un pasākumiem, kā arī {link2} svētku sezonā.", links: [{ text: "reklāmas šokolādes ar logo", to: "/reklamas-sokolade" }, { text: "Ziemassvētku korporatīvās šokolādes", to: "/ziemassvetku-korporativas-sokolades" }] },
      { text: "Mēs piedāvājam premium kvalitātes šokolādes ar personalizētu apdruku, kas pielāgota Jūsu uzņēmuma logo, krāsām un dizainam. Šokolādes var izmantot gan kā reklāmas dāvanas, gan kā ekskluzīvas {link1}.", links: [{ text: "korporatīvās dāvanas klientiem un partneriem", to: "/sokolades-klientu-davanam" }] },
      { text: "Šokolādes ar logo ir efektīvs veids, kā padarīt Jūsu uzņēmuma dāvanu neaizmirstamu un vienlaikus palielināt zīmola atpazīstamību." },
    ],
  },
  en: {
    heading: "Custom chocolate with logo for businesses",
    paragraphs: [
      { text: "Our {link1} are one of the most popular corporate gifts to create a positive impression on clients and partners. Personalized chocolate with your company logo combines exquisite taste with effective brand communication.", links: [{ text: "custom chocolates with logo", to: "/en/chocolate-with-logo" }] },
      { text: "Companies frequently use branded chocolate at various business events — conferences, exhibitions, and client meetings. Especially popular are {link1} for exhibitions and events, as well as {link2} during the holiday season.", links: [{ text: "promotional chocolate with logo", to: "/en/promotional-chocolate" }, { text: "Christmas corporate chocolate", to: "/en/christmas-corporate-chocolate" }] },
      { text: "We offer premium quality chocolate with personalized printing, customized to your company logo, colors, and design. Chocolates can be used both as promotional gifts and as exclusive {link1}.", links: [{ text: "corporate gifts for clients and partners", to: "/en/client-gifts" }] },
      { text: "Chocolate with logo is an effective way to make your corporate gift unforgettable while increasing brand recognition." },
    ],
  },
  ru: {
    heading: "Шоколад с логотипом для бизнеса",
    paragraphs: [
      { text: "Наш {link1} — один из самых популярных корпоративных подарков для создания позитивного впечатления на клиентов и партнёров. Персонализированный шоколад с логотипом компании сочетает изысканный вкус с эффективной коммуникацией бренда.", links: [{ text: "шоколад с логотипом компании", to: "/ru/shokolad-s-logotipom" }] },
      { text: "Компании часто используют брендированный шоколад на деловых мероприятиях — конференциях, выставках и встречах с клиентами. Особенно популярен {link1} для выставок и мероприятий, а также {link2} в праздничный сезон.", links: [{ text: "рекламный шоколад с логотипом", to: "/ru/reklamniy-shokolad" }, { text: "рождественский корпоративный шоколад", to: "/ru/rozhdestvenskij-shokolad" }] },
      { text: "Мы предлагаем премиум шоколад с персонализированной печатью — логотип, цвета и дизайн вашей компании. Шоколад можно использовать как рекламные подарки и как эксклюзивные {link1}.", links: [{ text: "корпоративные подарки клиентам и партнёрам", to: "/ru/podarki-klientam" }] },
      { text: "Шоколад с логотипом — эффективный способ сделать корпоративный подарок незабываемым и повысить узнаваемость бренда." },
    ],
  },
};

export const heroContent: Record<Lang, { title1: string; title2: string; subtitle: string; ctaButton: string }> = {
  lv: { title1: "Šokolādes ar logo", title2: "uzņēmumiem", subtitle: "Saņemiet bezmaksas dizaina preview ar Jūsu logo.", ctaButton: "Bezmaksas dizaina preview" },
  en: { title1: "Custom Chocolate", title2: "with Your Logo", subtitle: "Get a free design preview with your logo.", ctaButton: "Free design preview" },
  ru: { title1: "Шоколад с логотипом", title2: "для компаний", subtitle: "Получите бесплатный макет дизайна с вашим логотипом.", ctaButton: "Бесплатный макет дизайна" },
};
