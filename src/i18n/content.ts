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
  et: {
    heading: "Miks valida meid",
    facts: ["Minimaalne tellimus: alates 50 tk", "Tootmine: 3–10 tööpäeva", "Premium Belgia šokolaad", "Individuaalne disain teie logoga"],
  },
  lt: {
    heading: "Kodėl rinktis mus",
    facts: ["Minimalus užsakymas: nuo 50 vnt.", "Gamyba: 3–10 darbo dienų", "Premium belgiškas šokoladas", "Individualus dizainas su jūsų logotipu"],
  },
};

export const clientExamples: Record<Lang, { subtitle: string; heading: string; srOnly: string }> = {
  lv: { subtitle: "Klientu piemēri", heading: "Pasaules zīmoli uzticas mums", srOnly: "Klientu piemēri — pasaules zīmoli, kas uzticas Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
  en: { subtitle: "Client examples", heading: "World brands trust us", srOnly: "Client examples — world brands that trust Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
  ru: { subtitle: "Примеры клиентов", heading: "Мировые бренды доверяют нам", srOnly: "Примеры клиентов — мировые бренды, которые доверяют Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
  et: { subtitle: "Klientide näited", heading: "Maailma brändid usaldavad meid", srOnly: "Klientide näited — maailma brändid, kes usaldavad Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
  lt: { subtitle: "Klientų pavyzdžiai", heading: "Pasaulio prekės ženklai mumis pasitiki", srOnly: "Klientų pavyzdžiai — pasaulio prekės ženklai, kurie pasitiki Luxury Chocolate: MasterCard, Bosch, Chopard, Samsung, Vodafone, Volkswagen." },
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
  et: {
    heading: "Kuidas tellida personaliseeritud šokolaadi",
    steps: ["Saatke oma logo või idee", "Loome disaini eelvaate", "Kinnitage disain", "Toodame ja tarnime"],
    footer: "⏱ Tootmine: <strong>3–10 tööpäeva</strong>",
    srOnly: "Kuidas tellida: 1) Saatke logo, 2) Loome disaini eelvaate, 3) Kinnitage disain, 4) Toodame ja tarnime.",
  },
  lt: {
    heading: "Kaip užsakyti personalizuotą šokoladą",
    steps: ["Atsiųskite savo logotipą ar idėją", "Sukursime dizaino peržiūrą", "Patvirtinkite dizainą", "Pagaminsime ir pristatysime"],
    footer: "⏱ Gamyba: <strong>3–10 darbo dienų</strong>",
    srOnly: "Kaip užsakyti: 1) Atsiųskite logotipą, 2) Sukursime dizaino peržiūrą, 3) Patvirtinkite dizainą, 4) Pagaminsime ir pristatysime.",
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
  et: {
    heading: "Miks kliendid usaldavad meid",
    stats: [{ value: "500+", label: "Täidetud tellimust" }, { value: "10+", label: "Aastat kogemust" }, { value: "98%", label: "Kliendi rahulolu" }, { value: "30+", label: "Riiki" }],
    clientsLabel: "Meid usaldavad juhtivad ettevõtted",
    testimonials: [
      { quote: "Suurepärane kvaliteet ja kiire tarne. Meie kliendid olid personaliseeritud šokolaadist vaimustuses!", author: "Anna K.", company: "SIA MarketPro" },
      { quote: "Luxury Chocolate aitas meil luua unustamatu korporatiivkingituse. Väga professionaalne lähenemine.", author: "Mārtiņš B.", company: "Tech Solutions" },
      { quote: "Kolmandat aastat tellime šokolaadi meie logoga — alati tipptasemel.", author: "Ieva L.", company: "Baltic Events" },
    ],
    guarantees: ["Kvaliteedigarantii", "Sertifitseeritud tootmine", "Tarne üle maailma", "Täitmine 14 päeva jooksul"],
  },
  lt: {
    heading: "Kodėl klientai mumis pasitiki",
    stats: [{ value: "500+", label: "Įvykdytų užsakymų" }, { value: "10+", label: "Metų patirties" }, { value: "98%", label: "Klientų pasitenkinimas" }, { value: "30+", label: "Šalių" }],
    clientsLabel: "Mumis pasitiki pirmaujančios įmonės",
    testimonials: [
      { quote: "Puiki kokybė ir greitas pristatymas. Mūsų klientai buvo sužavėti personalizuotu šokoladu!", author: "Anna K.", company: "SIA MarketPro" },
      { quote: "Luxury Chocolate padėjo mums sukurti neužmirštamą korporatyvinę dovaną. Labai profesionalus požiūris.", author: "Mārtiņš B.", company: "Tech Solutions" },
      { quote: "Trečius metus užsakome šokoladą su mūsų logotipu — visada aukščiausio lygio.", author: "Ieva L.", company: "Baltic Events" },
    ],
    guarantees: ["Kokybės garantija", "Sertifikuota gamykla", "Pristatymas visame pasaulyje", "Įvykdymas per 14 dienų"],
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
      { title: "Šokolādes grāmata", description: "Dāvanu kastīte grāmatas formā ar magnētisku aizdari — ideāla bibliotēkām un pasākumiem.", alt: "Šokolādes grāmata — dāvanu kastīte ar magnētisku aizdari" },
    ],
  },
  en: {
    heading: "Our chocolates",
    subtitle: "Each product is customized to your brand — from design to taste.",
    items: [
      { title: "Chocolate bars", description: "With your company logo and custom packaging.", alt: "Personalized chocolate bar with company logo and custom packaging" },
      { title: "Gift sets", description: "Elegant box with 5 handcrafted pralines.", alt: "Elegant corporate chocolate gift box with pralines" },
      { title: "Chocolate pralines", description: "Pralines with cream filling and personalized design.", alt: "Premium chocolate pralines with cream filling and personalized design" },
      { title: "Chocolate Book Box", description: "Book-shaped gift box with magnetic closure — perfect for libraries and events.", alt: "Chocolate book box with magnetic closure" },
    ],
  },
  ru: {
    heading: "Наш шоколад",
    subtitle: "Каждый продукт адаптируется под ваш бренд — от дизайна до вкуса.",
    items: [
      { title: "Шоколадные плитки", description: "С логотипом вашей компании и индивидуальной упаковкой.", alt: "Персонализированная шоколадная плитка с логотипом компании" },
      { title: "Подарочные наборы", description: "Элегантная коробка с 5 пралине ручной работы.", alt: "Элегантная корпоративная подарочная коробка с шоколадом" },
      { title: "Шоколадные конфеты", description: "Пралине с кремовой начинкой и персонализированным дизайном.", alt: "Премиум шоколадные пралине с кремовой начинкой" },
      { title: "Шоколадная книга", description: "Подарочная коробка в форме книги с магнитной застёжкой — идеально для библиотек и мероприятий.", alt: "Шоколадная книга — подарочная коробка с магнитной застёжкой" },
    ],
  },
  et: {
    heading: "Meie šokolaadid",
    subtitle: "Iga toode kohandatakse teie brändile — disainist maitseni.",
    items: [
      { title: "Šokolaadid", description: "Teie ettevõtte logo ja individuaalse pakendiga.", alt: "Personaliseeritud šokolaad ettevõtte logo ja individuaalse pakendiga" },
      { title: "Kinkekomplektid", description: "Elegantne karp 5 käsitööna valmistatud pralineega.", alt: "Elegantne korporatiivne šokolaadi kinkekarp pralineedega" },
      { title: "Šokolaadipralineed", description: "Pralineed kreemitäidise ja personaliseeritud disainiga.", alt: "Premium šokolaadipralineed kreemitäidise ja personaliseeritud disainiga" },
      { title: "Šokolaadiraamat", description: "Kinkekarp raamatu kujul magnetilise sulguriga — ideaalne raamatukogudele ja üritustele.", alt: "Šokolaadiraamat — kinkekarp magnetilise sulguriga" },
    ],
  },
  lt: {
    heading: "Mūsų šokoladai",
    subtitle: "Kiekvienas produktas pritaikomas jūsų prekės ženklui — nuo dizaino iki skonio.",
    items: [
      { title: "Šokolado plyteliai", description: "Su jūsų įmonės logotipu ir individualia pakuote.", alt: "Personalizuotas šokolado plytelis su įmonės logotipu" },
      { title: "Dovanų rinkiniai", description: "Elegantiškas dėžutė su 5 rankų darbo pralinė.", alt: "Elegantiškas korporatyvinis šokolado dovanų rinkinys" },
      { title: "Šokolado pralinė", description: "Pralinė su kreminio įdaru ir personalizuotu dizainu.", alt: "Premium šokolado pralinė su kreminio įdaru" },
      { title: "Šokolado knyga", description: "Dovanų dėžutė knygos formos su magnetiniu užsegimu — puikiai tinka bibliotekoms ir renginiams.", alt: "Šokolado knyga — dovanų dėžutė su magnetiniu užsegimu" },
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
  et: {
    heading: "Korduma kippuvad küsimused",
    items: [
      { q: "Milline on minimaalne tellimus personaliseeritud šokolaadile?", a: "Minimaalne tellimus on 50 tükki. See on mugav kogus nii väiksematele üritustele kui ka suurtele korporatiivkampaaniatele." },
      { q: "Kui kaua võtab šokolaadi logoga tootmine aega?", a: "Standardne tootmisaeg on 3–10 tööpäeva alates disaini kinnitamisest. Kiireloomulised tellimused on võimalikud." },
      { q: "Millist kvaliteeti šokolaadi kasutatakse?", a: "Kasutame ainult premium Belgia šokolaadi — piima, tumedat ja valget šokolaadi sertifitseeritud tootmisüksustest." },
      { q: "Kas saan tellida šokolaadi täisvärvilise trükiga?", a: "Jah, pakume täisvärvilist trükki otse šokolaadi pinnale — teie logo, disain või mis tahes graafiline motiiv. Trükk on toiduohutu." },
      { q: "Millistele üritustele sobivad korporatiivšokolaadid?", a: "Personaliseeritud šokolaadid sobivad konverentsidele, messidele, klientide kohtumistele, jõulukingitusteks, ettevõtte juubelitele ja VIP-külalislahkusele." },
      { q: "Kas tarnite väljaspool Lätit?", a: "Jah, tarnime personaliseeritud šokolaade üle 30 riiki üle maailma." },
    ],
  },
  lt: {
    heading: "Dažniausiai užduodami klausimai",
    items: [
      { q: "Koks minimalus užsakymas personalizuotam šokoladui?", a: "Minimalus užsakymas — 50 vnt. Tai patogus kiekis tiek mažesniems renginiams, tiek didelėms korporatyvinėms kampanijoms." },
      { q: "Kiek laiko užtrunka šokolado su logotipu gamyba?", a: "Standartinis gamybos laikas — 3–10 darbo dienų nuo dizaino patvirtinimo. Galimi skubūs užsakymai." },
      { q: "Kokios kokybės šokoladas naudojamas?", a: "Naudojame tik premium belgišką šokoladą — pieninį, tamsų ir baltą iš sertifikuotų gamyklų." },
      { q: "Ar galiu užsakyti šokoladą su pilnos spalvos spauda?", a: "Taip, siūlome pilnos spalvos spaudą tiesiog ant šokolado paviršiaus — jūsų logotipas, dizainas ar bet koks grafinis motyvas. Spauda yra maistui saugi." },
      { q: "Kokiems renginiams tinka korporatyvinis šokoladas?", a: "Personalizuotas šokoladas idealus konferencijoms, parodoms, susitikimams su klientais, kalėdinėms dovanoms, įmonės jubiliejams ir VIP svetingumui." },
      { q: "Ar pristatote už Latvijos ribų?", a: "Taip, pristatome personalizuotą šokoladą į daugiau nei 30 šalių visame pasaulyje." },
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
  et: {
    subtitle: "Ideed ja lahendused",
    heading: "Korporatiivkingituste ideed",
    items: [
      { emoji: "🍫", title: "Šokolaad ettevõtte logoga", description: "Personaliseeritud šokolaad teie logoga — elegantne viis brändi esile tõsta.", path: "/et/sokolaad-logoga" },
      { emoji: "🎄", title: "Jõulu korporatiivne šokolaad", description: "Eksklusivsed pühade kingitused klientidele ja partneritele.", path: "/et/joulu-sokolaad" },
      { emoji: "🎁", title: "Reklaamšokolaad", description: "Tõhus reklaamtoode messidele, konverentsidele ja üritustele.", path: "/et/reklaam-sokolaad" },
      { emoji: "🏢", title: "Šokolaad kliendikingitusteks", description: "Premium kinkeideed äripartneritele ja klientidele.", path: "/et/kingitused-klientidele" },
    ],
  },
  lt: {
    subtitle: "Idėjos ir sprendimai",
    heading: "Korporatyvinių dovanų idėjos",
    items: [
      { emoji: "🍫", title: "Šokoladas su įmonės logotipu", description: "Personalizuotas šokoladas su logotipu — elegantiškas būdas pabrėžti prekės ženklą.", path: "/lt/sokoladas-su-logotipu" },
      { emoji: "🎄", title: "Kalėdinis korporatyvinis šokoladas", description: "Eksklusivinės šventinės dovanos klientams ir partneriams.", path: "/lt/kaledinis-sokoladas" },
      { emoji: "🎁", title: "Reklaminis šokoladas", description: "Efektyvus reklaminis produktas parodoms, konferencijoms ir renginiams.", path: "/lt/reklaminis-sokoladas" },
      { emoji: "🏢", title: "Šokoladas dovanoms klientams", description: "Premium dovanų idėjos verslo partneriams ir klientams.", path: "/lt/dovanos-klientams" },
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
  et: {
    subtitle: "Kasutusvõimalused",
    heading: "Kus ettevõtted kasutavad šokolaadi logoga",
    ctaLabel: "Saada päring",
    items: [
      { title: "Kliendikingitused", desc: "Elegantne šokolaad teie logoga — et kliendid mäletaks teie ettevõtet positiivsete emotsioonidega.", link: "/et/kingitused-klientidele", linkLabel: "Loe lähemalt →" },
      { title: "Konverentsid ja üritused", desc: "Kompaktsed šokolaadid logoga — ideaalsed messidele, seminaridele ja äriüritustele.", link: "/et/konverentsi-sokolaad", linkLabel: "Loe lähemalt →" },
      { title: "Partnerite tervitused", desc: "Premium šokolaadi kinkekomplektid, mis tugevdavad ärisuhteid ja loovad professionaalse mulje.", link: "/et/kingitused-partneritele", linkLabel: "Loe lähemalt →" },
      { title: "Jõulukingitused", desc: "Pidulik disain teie logoga — populaarseim korporatiivkingitus aasta lõpus.", link: "/et/joulu-sokolaad", linkLabel: "Loe lähemalt →" },
    ],
  },
  lt: {
    subtitle: "Panaudojimo atvejai",
    heading: "Kur įmonės naudoja šokoladą su logotipu",
    ctaLabel: "Gauti pasiūlymą",
    items: [
      { title: "Dovanos klientams", desc: "Elegantiškas šokoladas su logotipu — kad klientai prisimintų jūsų įmonę su teigiamomis emocijomis.", link: "/lt/dovanos-klientams", linkLabel: "Sužinoti daugiau →" },
      { title: "Konferencijos ir renginiai", desc: "Kompaktiški šokolado plyteliai su logotipu — idealūs parodoms, seminarams ir verslo renginiams.", link: "/lt/sokoladas-konferencijoms", linkLabel: "Sužinoti daugiau →" },
      { title: "Sveikinimas partneriams", desc: "Premium šokolado dovanų rinkiniai, stiprinantys verslo santykius.", link: "/lt/dovanos-partneriams", linkLabel: "Sužinoti daugiau →" },
      { title: "Kalėdinės dovanos", desc: "Šventinis dizainas su logotipu — populiariausia korporatyvinė dovana metų pabaigoje.", link: "/lt/kaledinis-sokoladas", linkLabel: "Sužinoti daugiau →" },
    ],
  },
};

export const ctaContent: Record<Lang, { heading: string; description: string; button: string; inquiryButton: string }> = {
  lv: {
    heading: "Saņemiet bezmaksas dizaina apskati",
    description: "Nosūtiet mums savu logo, un mēs sagatavosim personalizētu šokolādes dizaina apskati 24h laikā — pilnīgi bez maksas.",
    button: "Saņemt bezmaksas apskati",
    inquiryButton: "Aizpildīt pieteikumu",
  },
  en: {
    heading: "Get a free design preview",
    description: "Send us your logo and we'll prepare a personalized chocolate design preview within 24 hours — completely free.",
    button: "Get free preview",
    inquiryButton: "Submit inquiry",
  },
  ru: {
    heading: "Получите бесплатный макет дизайна",
    description: "Отправьте нам свой логотип, и мы подготовим персонализированный макет шоколада в течение 24 часов — совершенно бесплатно.",
    button: "Получить бесплатный макет",
    inquiryButton: "Заполнить заявку",
  },
  et: {
    heading: "Saage tasuta disaini eelvaade",
    description: "Saatke meile oma logo ja me valmistame personaliseeritud šokolaadi disaini eelvaate 24 tunni jooksul — täiesti tasuta.",
    button: "Saada tasuta eelvaade",
    inquiryButton: "Täida taotlus",
  },
  lt: {
    heading: "Gaukite nemokamą dizaino peržiūrą",
    description: "Atsiųskite mums savo logotipą ir mes paruošime personalizuotą šokolado dizaino peržiūrą per 24 valandas — visiškai nemokamai.",
    button: "Gauti nemokamą peržiūrą",
    inquiryButton: "Pildyti užklausą",
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
  et: {
    heading: "Šokolaad logoga ettevõtetele",
    paragraphs: [
      { text: "Meie {link1} on üks populaarsemaid korporatiivkingitusi, mis loovad positiivse mulje klientidele ja partneritele. Personaliseeritud šokolaad ettevõtte logoga ühendab peenkeelset maitset ja tõhusat brändikommunikatsiooni.", links: [{ text: "šokolaad ettevõtte logoga", to: "/et/sokolaad-logoga" }] },
      { text: "Ettevõtted kasutavad sageli bränditud šokolaadi erinevatel äriüritustel — konverentsidel, messidel ja klientide kohtumistel. Eriti populaarsed on {link1} messidele ja üritustele, samuti {link2} pühade hooajal.", links: [{ text: "reklaamšokolaad logoga", to: "/et/reklaam-sokolaad" }, { text: "jõulu korporatiivne šokolaad", to: "/et/joulu-sokolaad" }] },
      { text: "Pakume premium kvaliteediga šokolaadi personaliseeritud trükiga, mis on kohandatud teie ettevõtte logo, värvide ja disainiga. Šokolaade saab kasutada nii reklaamkingitustena kui ka eksklusivsete {link1}.", links: [{ text: "korporatiivkingitustena klientidele ja partneritele", to: "/et/kingitused-klientidele" }] },
      { text: "Šokolaad logoga on tõhus viis muuta oma ettevõtte kingitus unustamatuks ja samal ajal suurendada brändi tuntust." },
    ],
  },
  lt: {
    heading: "Šokoladas su logotipu verslui",
    paragraphs: [
      { text: "Mūsų {link1} — vienas populiariausių korporatyvinių dovanų, kuriančių teigiamą įspūdį klientams ir partneriams. Personalizuotas šokoladas su įmonės logotipu sujungia rafinuotą skonį su efektyvia prekės ženklo komunikacija.", links: [{ text: "šokoladas su įmonės logotipu", to: "/lt/sokoladas-su-logotipu" }] },
      { text: "Įmonės dažnai naudoja firminį šokoladą įvairiuose verslo renginiuose — konferencijose, parodose ir susitikimuose su klientais. Ypač populiarus {link1} parodoms ir renginiams, taip pat {link2} švenčių sezonu.", links: [{ text: "reklaminis šokoladas su logotipu", to: "/lt/reklaminis-sokoladas" }, { text: "kalėdinis korporatyvinis šokoladas", to: "/lt/kaledinis-sokoladas" }] },
      { text: "Siūlome premium kokybės šokoladą su personalizuota spauda, pritaikyta jūsų įmonės logotipui, spalvoms ir dizainui. Šokoladą galima naudoti tiek kaip reklaminę dovaną, tiek kaip eksklusivinę {link1}.", links: [{ text: "korporatyvinę dovaną klientams ir partneriams", to: "/lt/dovanos-klientams" }] },
      { text: "Šokoladas su logotipu — efektyvus būdas padaryti korporatyvinę dovaną neužmirštamą ir kartu padidinti prekės ženklo atpažįstamumą." },
    ],
  },
};

export const heroContent: Record<Lang, { title1: string; title2: string; subtitle: string; ctaButton: string; formButton: string; pricesButton: string }> = {
  lv: { title1: "Šokolādes apdruka ar logo", title2: "uzņēmumiem", subtitle: "Personalizētas reklāmas šokolādes — roku darbs no Beļģu šokolādes", ctaButton: "Bezmaksas dizaina apskate", formButton: "Aizpildīt pieteikumu", pricesButton: "Cenas" },
  en: { title1: "Chocolate Printing with Logo", title2: "for Companies", subtitle: "Personalized Promotional Chocolates — Custom Hand Made from Belgian Chocolate", ctaButton: "Free design preview", formButton: "Fill in the form", pricesButton: "Prices" },
  ru: { title1: "Печать на шоколаде с логотипом", title2: "для компаний", subtitle: "Персонализированный рекламный шоколад — ручная работа из бельгийского шоколада", ctaButton: "Бесплатный макет дизайна", formButton: "Заполнить заявку", pricesButton: "Цены" },
  et: { title1: "Šokolaadi trükk logoga", title2: "ettevõtetele", subtitle: "Personaliseeritud reklaamšokolaad — käsitööna valmistatud Belgia šokolaadist", ctaButton: "Tasuta disaini eelvaade", formButton: "Täida taotlus", pricesButton: "Hinnad" },
  lt: { title1: "Šokolado spauda su logotipu", title2: "įmonėms", subtitle: "Personalizuotas reklaminis šokoladas — rankų darbo iš belgiško šokolado", ctaButton: "Nemokama dizaino peržiūra", formButton: "Užpildyti paraišką", pricesButton: "Kainos" },
};

export const bookBoxContent: Record<Lang, {
  heading: string;
  subtitle: string;
  items: { title: string; description: string; alt: string }[];
}> = {
  lv: {
    heading: "Šokolādes grāmata",
    subtitle: "Ekskluzīva dāvanu kastīte grāmatas formā ar magnētisku aizdari — personalizējama pilnībā.",
    items: [
      { title: "Šokolādes grāmata", description: "Eleganta dāvanu kastīte ar pilnkrāsu apdruku un magnētisku aizdari.", alt: "Šokolādes grāmata — dāvanu kastīte ar personalizētu vāciņu" },
      { title: "Elegants noformējums", description: "Pilnībā personalizējams vāciņa dizains — grāmatas vāks, ilustrācija vai logo.", alt: "Eleganti noformēta šokolādes grāmata ar individuālu dizainu" },
      { title: "Atvērta kastīte", description: "Magnētiskā aizdare rada grāmatas atvēršanas sajūtu — iekšā šokolādes glezniņa vai konfektes.", alt: "Atvērta šokolādes grāmata ar šokolādes saturu iekšpusē" },
      { title: "Konfektes kastītē", description: "Iekšpusē — šokolādes konfektes ar dažādiem pildījumiem premium noformējumā.", alt: "Šokolādes grāmata ar konfektēm iekšpusē" },
      { title: "Konkursa balva", description: "Šokolādes grāmata kā ekskluzīva balva konkursiem un pasākumiem — ar personalizētu dizainu.", alt: "Bērnu grāmatu konkursa balva — šokolādes grāmata ar grāmatas nosaukumu" },
    ],
  },
  en: {
    heading: "Chocolate Book Box",
    subtitle: "Exclusive gift box in book form with magnetic closure — fully customizable.",
    items: [
      { title: "Chocolate Book Box", description: "Elegant gift box with full-color printing and magnetic closure.", alt: "Chocolate book box — gift box with personalized cover" },
      { title: "Elegant design", description: "Fully customizable cover — book cover, illustration or logo.", alt: "Elegantly designed chocolate book box with custom design" },
      { title: "Open box", description: "Magnetic closure creates a book-opening experience — inside: chocolate painting or pralines.", alt: "Open chocolate book box with chocolate content inside" },
      { title: "Pralines inside", description: "Inside — chocolate pralines with various fillings in premium presentation.", alt: "Chocolate book box with pralines inside" },
      { title: "Contest prize", description: "Chocolate book box as an exclusive prize for contests and events — with personalized design.", alt: "Children's book contest prize — chocolate book box with book title" },
    ],
  },
  ru: {
    heading: "Шоколадная книга",
    subtitle: "Эксклюзивная подарочная коробка в форме книги с магнитной застёжкой — полностью персонализируемая.",
    items: [
      { title: "Шоколадная книга", description: "Элегантная подарочная коробка с полноцветной печатью и магнитной застёжкой.", alt: "Шоколадная книга — подарочная коробка с персонализированной обложкой" },
      { title: "Элегантный дизайн", description: "Полностью настраиваемый дизайн обложки — обложка книги, иллюстрация или логотип.", alt: "Элегантно оформленная шоколадная книга с индивидуальным дизайном" },
      { title: "Открытая коробка", description: "Магнитная застёжка создаёт ощущение открытия книги — внутри шоколадная картина или конфеты.", alt: "Открытая шоколадная книга с шоколадным содержимым внутри" },
      { title: "Конфеты внутри", description: "Внутри — шоколадные конфеты с различными начинками в премиум оформлении.", alt: "Шоколадная книга с конфетами внутри" },
      { title: "Приз конкурса", description: "Шоколадная книга как эксклюзивный приз для конкурсов и мероприятий — с персонализированным дизайном.", alt: "Приз конкурса детских книг — шоколадная книга с названием книги" },
    ],
  },
  et: {
    heading: "Šokolaadi raamat",
    subtitle: "Eksklusiivne kingituskarp raamatu kujul magnetilise sulguriga — täielikult kohandatav.",
    items: [
      { title: "Šokolaadi raamat", description: "Elegantne kingituskarp täisvärviprintimise ja magnetilise sulguriga.", alt: "Šokolaadi raamat — kingituskarp personaliseeritud kaanega" },
      { title: "Elegantne disain", description: "Täielikult kohandatav kaanedisain — raamatukaas, illustratsioon või logo.", alt: "Elegantselt disainitud šokolaadi raamat individuaalse disainiga" },
      { title: "Avatud karp", description: "Magnetiline sulgumine loob raamatu avamise kogemuse — sees: šokolaadimaaling või kommid.", alt: "Avatud šokolaadi raamat šokolaadesisuga sees" },
      { title: "Kommid sees", description: "Sees — šokolaadikommid erinevate täidistega premium esitluses.", alt: "Šokolaadi raamat kommidega sees" },
      { title: "Konkursi auhind", description: "Šokolaadi raamat kui eksklusiivne auhind konkurssidele ja üritustele — personaliseeritud disainiga.", alt: "Lasteraamatute konkursi auhind — šokolaadi raamat raamatu pealkirjaga" },
    ],
  },
  lt: {
    heading: "Šokolado knyga",
    subtitle: "Ekskluzivini dovanų dėžutė knygos forma su magnetiniu užsegimu — pilnai personalizuojama.",
    items: [
      { title: "Šokolado knyga", description: "Elegantiška dovanų dėžutė su pilnatvaizdžiu spausdintu ir magnetiniu užsegimu.", alt: "Šokolado knyga — dovanų dėžutė su personalizuotu viršeliu" },
      { title: "Elegantiškas dizainas", description: "Pilnai pritaikomas viršelio dizainas — knygos viršelis, iliustracija ar logotipas.", alt: "Elegantiška šokolado knyga su individualiu dizainu" },
      { title: "Atidaryta dėžutė", description: "Magnetinis uždarymas sukuria knygos atidarymo patirtį — viduje: šokolado paveikslas ar saldainiai.", alt: "Atidaryta šokolado knyga su šokolado turiniu viduje" },
      { title: "Saldainiai viduje", description: "Viduje — šokolado saldainiai su įvairiais įdarais premium pateikime.", alt: "Šokolado knyga su saldainiais viduje" },
      { title: "Konkurso prizas", description: "Šokolado knyga kaip ekskluzivinis prizas konkursams ir renginiams — su personalizuotu dizainu.", alt: "Vaikų knygų konkurso prizas — šokolado knyga su knygos pavadinimu" },
    ],
  },
};

export const cakeChocolateContent: Record<Lang, {
  heading: string;
  subtitle: string;
  items: { title: string; description: string; alt: string }[];
}> = {
  lv: {
    heading: "Šokolādes kūkām un konditorejai",
    subtitle: "Logo šokolādes dekorācijas kūkām, cupcakes, eklēriem un citiem konditorejas izstrādājumiem.",
    items: [
      { title: "Logo cupcakes", description: "Šokolādes dekorācijas ar logo cupcake cepumiem — ideāli pasākumiem un viesmīlībai.", alt: "Cupcakes ar šokolādes logo dekorāciju King's College jubilejas pasākumam" },
      { title: "Mini šokolādes cupcakes", description: "Nelielas šokolādes plāksnītes ar logo vai vārdu — elegants akcents katram cupcake.", alt: "Cupcake ar personalizētu šokolādes mini dekorāciju" },
      { title: "Tartes un kūciņas", description: "Šokolādes logo uz tartēm un kūciņām — kafejnīcu un restorānu zīmola komunikācija.", alt: "Šokolādes tarte ar aveņēm un kafejnīcas logo uz šokolādes" },
      { title: "Premium deserts", description: "Ekskluzīva šokolādes dekorācija ar logo uz premium desertiem.", alt: "Premium deserts ar BackBerry logo šokolādes dekorāciju" },
      { title: "Kūkas ar logo", description: "Šokolādes plāksnīte ar logo kā elegants kūkas akcents.", alt: "Eleganta kūka ar ziediem un Ristiheina kafejnīcas logo šokolādē" },
      { title: "Svētku kūkas", description: "Logo šokolādes dekorācija svētku un svinību kūkām.", alt: "Svētku kūka ar La Mer logo šokolādes dekorāciju" },
      { title: "Šokolādes dekori", description: "Individuālas formas šokolādes ar logo desertiem un konditorejai.", alt: "Šokolādes deserts ar Faceplay logo dekorāciju" },
    ],
  },
  en: {
    heading: "Chocolate for cakes & pastry",
    subtitle: "Logo chocolate decorations for cakes, cupcakes, eclairs, and other pastry products.",
    items: [
      { title: "Logo cupcakes", description: "Chocolate decorations with logo for cupcakes — ideal for events and hospitality.", alt: "Cupcakes with chocolate logo decoration for King's College anniversary event" },
      { title: "Mini chocolate cupcakes", description: "Small chocolate plaques with logo or name — an elegant accent for each cupcake.", alt: "Cupcake with personalized mini chocolate decoration" },
      { title: "Tarts & pastries", description: "Chocolate logo on tarts and pastries — café and restaurant brand communication.", alt: "Chocolate tart with raspberries and café logo on chocolate" },
      { title: "Premium desserts", description: "Exclusive chocolate decoration with logo on premium desserts.", alt: "Premium dessert with BackBerry logo chocolate decoration" },
      { title: "Cakes with logo", description: "Chocolate plaque with logo as an elegant cake accent.", alt: "Elegant cake with flowers and Ristiheina café logo in chocolate" },
      { title: "Celebration cakes", description: "Logo chocolate decoration for celebration and festive cakes.", alt: "Celebration cake with La Mer logo chocolate decoration" },
      { title: "Chocolate décor", description: "Custom-shaped chocolate with logo for desserts and pastry.", alt: "Chocolate dessert with Faceplay logo decoration" },
    ],
  },
  ru: {
    heading: "Шоколад для тортов и кондитерских",
    subtitle: "Шоколадные декорации с логотипом для тортов, капкейков, эклеров и других кондитерских изделий.",
    items: [
      { title: "Логотип-капкейки", description: "Шоколадные декорации с логотипом для капкейков — идеально для мероприятий и гостеприимства.", alt: "Капкейки с шоколадным логотипом для юбилея King's College" },
      { title: "Мини шоколад для капкейков", description: "Небольшие шоколадные плашки с логотипом — элегантный акцент для каждого капкейка.", alt: "Капкейк с персонализированной мини шоколадной декорацией" },
      { title: "Тарты и пирожные", description: "Шоколадный логотип на тартах — брендинг для кафе и ресторанов.", alt: "Шоколадный тарт с малиной и логотипом кафе на шоколаде" },
      { title: "Премиум десерты", description: "Эксклюзивная шоколадная декорация с логотипом на премиум десертах.", alt: "Премиум десерт с логотипом BackBerry на шоколаде" },
      { title: "Торты с логотипом", description: "Шоколадная плашка с логотипом как элегантный акцент торта.", alt: "Элегантный торт с цветами и логотипом кафе Ristiheina на шоколаде" },
      { title: "Праздничные торты", description: "Шоколадная декорация с логотипом для праздничных тортов.", alt: "Праздничный торт с логотипом La Mer на шоколаде" },
      { title: "Шоколадный декор", description: "Шоколад индивидуальной формы с логотипом для десертов и кондитерских.", alt: "Шоколадный десерт с логотипом Faceplay" },
    ],
  },
  et: {
    heading: "Šokolaad tortidele ja kondiitritoodetle",
    subtitle: "Logo šokolaadi dekoratsioonid tortidele, cupcake'idele, eklääridele ja teistele kondiitritoodetele.",
    items: [
      { title: "Logo cupcake'id", description: "Šokolaadi dekoratsioonid logoga cupcake'idele — ideaalsed üritustele ja külalislahkusele.", alt: "Cupcake'id šokolaadi logo dekoratsiooniga King's College juubeli üritusele" },
      { title: "Mini šokolaadi cupcake'id", description: "Väikesed šokolaadi plaadid logo või nimega — elegantne aktsent igale cupcake'ile.", alt: "Cupcake personaliseeritud mini šokolaadi dekoratsiooniga" },
      { title: "Tardid ja koogid", description: "Šokolaadi logo tartidel ja kookidel — kohvikute ja restoranide brändi kommunikatsioon.", alt: "Šokolaadi tart vaarikate ja kohviku logoga šokolaadil" },
      { title: "Premium desserdid", description: "Eksklusiivne šokolaadi dekoratsioon logoga premium dessertidel.", alt: "Premium dessert BackBerry logo šokolaadi dekoratsiooniga" },
      { title: "Tordid logoga", description: "Šokolaadi plaat logoga kui elegantne tordi aktsent.", alt: "Elegantne tort lilledega ja Ristiheina kohviku logoga šokolaadis" },
      { title: "Pidulikud tordid", description: "Logo šokolaadi dekoratsioon pidulikele ja pidutortidele.", alt: "Pidulik tort La Mer logo šokolaadi dekoratsiooniga" },
      { title: "Šokolaadi dekorid", description: "Individuaalsed kujuga šokolaadid logoga dessertidele ja kondiitritoodetle.", alt: "Šokolaadi dessert Faceplay logo dekoratsiooniga" },
    ],
  },
  lt: {
    heading: "Šokoladas tortams ir konditerijos gaminiams",
    subtitle: "Logotipo šokolado dekoracijos tortams, keksiukams, eklėrams ir kitiems konditerijos gaminiams.",
    items: [
      { title: "Logotipo keksiukai", description: "Šokolado dekoracijos su logotipu keksiukams — idealūs renginiams ir svetingumui.", alt: "Keksiukai su šokolado logotipo dekoracija King's College jubiliejaus renginiui" },
      { title: "Mini šokolado keksiukai", description: "Mažos šokolado plokštelės su logotipu ar vardu — elegantiškas akcentas kiekvienam keksiukui.", alt: "Keksiukas su personalizuota mini šokolado dekoracija" },
      { title: "Tartai ir pyragai", description: "Šokolado logotipas ant tartų ir pyragų — kavinių ir restoranų prekės ženklo komunikacija.", alt: "Šokolado tartas su avietėmis ir kavinės logotipu ant šokolado" },
      { title: "Premium desertai", description: "Eksklusivinė šokolado dekoracija su logotipu ant premium desertų.", alt: "Premium desertas su BackBerry logotipo šokolado dekoracija" },
      { title: "Tortai su logotipu", description: "Šokolado plokštelė su logotipu kaip elegantiškas torto akcentas.", alt: "Elegantiškas tortas su gėlėmis ir Ristiheina kavinės logotipu šokolade" },
      { title: "Šventiniai tortai", description: "Logotipo šokolado dekoracija šventiniams ir švenčių tortams.", alt: "Šventinis tortas su La Mer logotipo šokolado dekoracija" },
      { title: "Šokolado dekorai", description: "Individualios formos šokoladas su logotipu desertams ir konditerijos gaminiams.", alt: "Šokolado desertas su Faceplay logotipo dekoracija" },
    ],
  },
};

export const restaurantChocolateContent: Record<Lang, {
  heading: string;
  subtitle: string;
  benefits: string[];
  usageNote: string;
  items: { title: string; description: string; alt: string }[];
}> = {
  lv: {
    heading: "Restorānu šokolādes",
    subtitle: "Iedomājieties — jūsu restorāna logotips vai šefpavāra paraksts šokolādē uz katra deserta, kafijas tases vai šampanieša glāzes. Mēs to darām. Pēc pasūtījuma, jūsu dizainā, jūsu zīmolā.",
    benefits: [
      "Stiprina zīmola atpazīstamību",
      "Pārsteidz viesus ar pārdomātu detaļu",
      "Mudina dalīties ar fotogrāfijām sociālajos tīklos",
    ],
    usageNote: "Tās var likt uz kūkām, desertiem, saldējuma, pie čeka, pie kafijas vai kokteiļa glāzes.",
    items: [
      { title: "Šokolāde desertiem un kūkām", description: "Logo šokolāde uz premium desertiem — izsmalcināts akcents katram šķīvim.", alt: "Premium deserts ar personalizētu logo šokolādi restorānam" },
      { title: "Logo šokolāde VIP dāvanām", description: "Ekskluzīvas šokolādes ar zīmola logo elegantā iepakojumā viesmīlībai.", alt: "Chopard zīmola šokolādes konfektes elegantā zilā kastītē" },
      { title: "Šokolāde pie čeka", description: "Personalizēta šokolāde pie restorāna rēķina — neaizmirstams pēdējais iespaids.", alt: "Fellini restorāna logo šokolādes pie rēķina" },
      { title: "Šokolāde ar aicinājumu atstāt TripAdvisor atsauksmi", description: "Logo šokolādes dekorācija uz desertiem ar TripAdvisor vērtējuma aicinājumu.", alt: "Restorāna deserts ar TripAdvisor logo šokolādi un aicinājumu atstāt atsauksmi" },
      { title: "Šokolāde šampanieša glāzēm", description: "Logo šokolādes medaljons uz šampanieša vai vīna glāzes.", alt: "Olympic Voodoo Casino logo šokolādes uz šampanieša glāzēm" },
      { title: "Šokolāde kokteiļu glāzēm", description: "Personalizēta šokolāde uz kokteiļa vai kafijas glāzes malas.", alt: "Personalizētas logo šokolādes uz kokteiļu glāzēm" },
    ],
  },
  en: {
    heading: "Restaurant chocolates",
    subtitle: "Imagine — your restaurant's logo or chef's signature on chocolate, placed on every dessert, coffee cup, or champagne glass. We make it happen. Custom-made, in your design, in your brand.",
    benefits: [
      "Strengthens brand recognition",
      "Surprises guests with a thoughtful detail",
      "Encourages sharing photos on social media",
    ],
    usageNote: "They can be placed on cakes, desserts, ice cream, with the bill, on coffee or cocktail glasses.",
    items: [
      { title: "Chocolate for desserts & cakes", description: "Logo chocolate on premium desserts — a refined accent for every plate.", alt: "Premium dessert with personalized logo chocolate for restaurants" },
      { title: "Logo chocolate for VIP gifts", description: "Exclusive branded chocolates in elegant packaging for hospitality.", alt: "Chopard branded chocolate pralines in elegant blue box" },
      { title: "Chocolate with the bill", description: "Personalized chocolate with the restaurant bill — an unforgettable last impression.", alt: "Fellini restaurant logo chocolates with the bill" },
      { title: "Chocolate with TripAdvisor review invitation", description: "Logo chocolate decoration on desserts inviting guests to leave a TripAdvisor review.", alt: "Restaurant dessert with TripAdvisor logo chocolate and review invitation" },
      { title: "Chocolate for champagne glasses", description: "Logo chocolate medallion on champagne or wine glasses.", alt: "Olympic Voodoo Casino logo chocolates on champagne glasses" },
      { title: "Chocolate for cocktail glasses", description: "Personalized chocolate on the rim of cocktail or coffee glasses.", alt: "Personalized logo chocolates on cocktail glasses" },
    ],
  },
  ru: {
    heading: "Шоколад для ресторанов",
    subtitle: "Представьте — логотип вашего ресторана или подпись шеф-повара на шоколаде, на каждом десерте, чашке кофе или бокале шампанского. Мы это делаем. На заказ, в вашем дизайне, в вашем бренде.",
    benefits: [
      "Укрепляет узнаваемость бренда",
      "Удивляет гостей продуманной деталью",
      "Мотивирует делиться фото в социальных сетях",
    ],
    usageNote: "Их можно размещать на тортах, десертах, мороженом, у счёта, на кофейных или коктейльных бокалах.",
    items: [
      { title: "Шоколад для десертов", description: "Логотип на шоколаде для премиум десертов — изысканный акцент для каждой тарелки.", alt: "Премиум десерт с персонализированным логотипом на шоколаде" },
      { title: "Логотип-шоколад для VIP подарков", description: "Эксклюзивные брендированные шоколадки в элегантной упаковке.", alt: "Шоколадные конфеты Chopard в элегантной синей коробке" },
      { title: "Шоколад к счёту", description: "Персонализированный шоколад к счёту ресторана — незабываемое последнее впечатление.", alt: "Шоколад с логотипом ресторана Fellini к счёту" },
      { title: "Шоколад для десертов и тортов", description: "Декорация десертов шоколадом с логотипом и ссылкой на TripAdvisor.", alt: "Десерт ресторана с логотипом TripAdvisor на шоколаде" },
      { title: "Шоколад для бокалов шампанского", description: "Шоколадный медальон с логотипом на бокале шампанского или вина.", alt: "Шоколад с логотипом Olympic Voodoo Casino на бокалах шампанского" },
      { title: "Шоколад для коктейльных бокалов", description: "Персонализированный шоколад на краю коктейльного или кофейного бокала.", alt: "Персонализированные шоколадки с логотипом на коктейльных бокалах" },
    ],
  },
  et: {
    heading: "Restoranišokolaadid",
    subtitle: "Kujutage ette — teie restorani logo või peakoka allkiri šokolaadil, igal desserdil, kohvitassil või šampanjaklaasil. Me teeme seda. Tellimusel, teie disainis, teie brändi all.",
    benefits: [
      "Tugevdab brändi tuntust",
      "Üllatab külalisi läbimõeldud detailiga",
      "Innustab jagama fotosid sotsiaalmeedias",
    ],
    usageNote: "Neid saab asetada kookidele, dessertidele, jäätisele, arve juurde, kohvi- või kokteiliklaasidele.",
    items: [
      { title: "Šokolaad dessertidele", description: "Logo šokolaad premium dessertidel — rafineeritud aktsent igale taldrikule.", alt: "Premium dessert personaliseeritud logo šokolaadiga restoranile" },
      { title: "Logo šokolaad VIP kingitusteks", description: "Eksklusiivne bränditud šokolaad elegantsest pakendis külalislahkuseks.", alt: "Chopard bränditud šokolaadipralineed elegantsest sinises karbis" },
      { title: "Šokolaad arve juures", description: "Personaliseeritud šokolaad restoraniarve juures — unustamatu viimane mulje.", alt: "Fellini restorani logo šokolaadid arve juures" },
      { title: "Šokolaad dessertidele ja kookidele", description: "Logo šokolaadi dekoratsioon dessertidel TripAdvisori viitega.", alt: "Restorani dessert TripAdvisori logo šokolaadiga" },
      { title: "Šokolaad šampanjaklaasidele", description: "Logo šokolaadi medaljon šampanja- või veiniklaasil.", alt: "Olympic Voodoo Casino logo šokolaadid šampanjaklaasidel" },
      { title: "Šokolaad kokteiliklaasidele", description: "Personaliseeritud šokolaad kokteili- või kohviklaasi serval.", alt: "Personaliseeritud logo šokolaadid kokteiliklaasidel" },
    ],
  },
  lt: {
    heading: "Restoranų šokoladai",
    subtitle: "Įsivaizduokite — jūsų restorano logotipas arba šefo parašas ant šokolado, ant kiekvieno deserto, kavos puodelio ar šampano taurės. Mes tai darome. Pagal užsakymą, jūsų dizaine, jūsų prekės ženkle.",
    benefits: [
      "Stiprina prekės ženklo atpažįstamumą",
      "Nustebina svečius apgalvota detale",
      "Skatina dalintis nuotraukomis socialiniuose tinkluose",
    ],
    usageNote: "Juos galima dėti ant tortų, desertų, ledų, prie sąskaitos, ant kavos ar kokteilių taurių.",
    items: [
      { title: "Šokoladas desertams", description: "Logotipo šokoladas ant premium desertų — rafinuotas akcentas kiekvienai lėkštei.", alt: "Premium desertas su personalizuotu logotipo šokoladu restoranui" },
      { title: "Logotipo šokoladas VIP dovanoms", description: "Eksklusiviniai firminio šokolado saldainiai elegantiskoje pakuotėje.", alt: "Chopard firminio šokolado pralinė elegantiskoje mėlynoje dėžutėje" },
      { title: "Šokoladas prie sąskaitos", description: "Personalizuotas šokoladas prie restorano sąskaitos — nepamirštamas paskutinis įspūdis.", alt: "Fellini restorano logotipo šokoladai prie sąskaitos" },
      { title: "Šokoladas desertams ir tortams", description: "Logotipo šokolado dekoracija ant desertų su TripAdvisor nuoroda.", alt: "Restorano desertas su TripAdvisor logotipo šokoladu" },
      { title: "Šokoladas šampano taurėms", description: "Logotipo šokolado medalionas ant šampano ar vyno taurės.", alt: "Olympic Voodoo Casino logotipo šokoladai ant šampano taurių" },
      { title: "Šokoladas kokteilių taurėms", description: "Personalizuotas šokoladas ant kokteilių ar kavos taurės krašto.", alt: "Personalizuoti logotipo šokoladai ant kokteilių taurių" },
    ],
  },
};
