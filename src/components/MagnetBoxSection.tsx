import { useState } from "react";
import { motion } from "framer-motion";
import { Magnet, Gift, Sparkles } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import bookBox1 from "@/assets/bookbox-1.jpg";
import bookBox2 from "@/assets/bookbox-2.jpg";
import bookBox3 from "@/assets/bookbox-3.jpg";
import bookBox4 from "@/assets/bookbox-4.jpg";

const images = [bookBox1, bookBox2, bookBox3, bookBox4];

interface MagnetBoxContent {
  badge: string;
  heading: string;
  subtitle: string;
  items: { title: string; description: string; alt: string }[];
  ctaButton: string;
  features: { magnet: { title: string; desc: string }; print: { title: string; desc: string }; pack: { title: string; desc: string } };
}

const magnetBoxContent: Record<Lang, MagnetBoxContent> = {
  lv: {
    badge: "Kastes ar magnētu",
    heading: "Elegantas dāvanu kastes ar magnētisku aizdari",
    subtitle: "Premium kvalitātes dāvanu kastes ar iebūvētu magnētu — elegants un praktisks risinājums korporatīvām dāvanām un svētku komplektiem",
    items: [
      { title: "Ziemassvētku dāvanu kaste", description: "Festīva kaste ar personalizētu apdruku un magnētisku aizdari", alt: "Ziemassvētku dāvanu kaste ar magnētu" },
      { title: "Konfekšu kaste ar lentu", description: "Eleganta balta kaste ar sarkanu lenti un magnētisku aizdari", alt: "Konfekšu kaste ar lentu un magnētu" },
      { title: "Personalizēta dāvana", description: "Trīsvalodu apsveikums ar sniegpārslu dizainu", alt: "Personalizēta šokolādes dāvana" },
      { title: "Luksusa konfekšu kastīte", description: "Balta kaste ar zaļu lenti un korporatīvu logo", alt: "Luksusa konfekšu kastīte" },
    ],
    ctaButton: "Pasūtīt kasti ar magnētu",
    features: {
      magnet: { title: "Magnētiskā aizdare", desc: "Praktiska un eleganta aizdare, kas nodrošina gludu slēgšanu" },
      print: { title: "Personalizācija", desc: "Iespēja apdrukāt kastītes vāku ar Jūsu dizainu vai logo" },
      pack: { title: "Premium iepakojums", desc: "Kvalitatīvs kartons ar lenti un dekoratīviem elementiem" },
    },
  },
  en: {
    badge: "Magnetic Boxes",
    heading: "Elegant Gift Boxes with Magnetic Closure",
    subtitle: "Premium quality gift boxes with built-in magnet — an elegant and practical solution for corporate gifts and holiday sets",
    items: [
      { title: "Christmas Gift Box", description: "Festive box with personalized printing and magnetic closure", alt: "Christmas gift box with magnet" },
      { title: "Confectionery Box", description: "Elegant white box with red ribbon and magnetic closure", alt: "Confectionery box with ribbon and magnet" },
      { title: "Personalized Gift", description: "Trilingual greeting with snowflake design", alt: "Personalized chocolate gift" },
      { title: "Luxury Confectionery Box", description: "White box with green ribbon and corporate logo", alt: "Luxury confectionery box" },
    ],
    ctaButton: "Order a magnetic box",
    features: {
      magnet: { title: "Magnetic Closure", desc: "Practical and elegant closure that ensures smooth sealing" },
      print: { title: "Personalization", desc: "Option to print the box lid with your design or logo" },
      pack: { title: "Premium Packaging", desc: "Quality cardboard with ribbon and decorative elements" },
    },
  },
  ru: {
    badge: "Коробки с магнитом",
    heading: "Элегантные подарочные коробки с магнитным замком",
    subtitle: "Коробки премиум качества со встроенным магнитом — элегантное и практичное решение для корпоративных подарков и праздничных наборов",
    items: [
      { title: "Новогодняя коробка", description: "Праздничная коробка с персонализированной печатью и магнитным замком", alt: "Новогодняя подарочная коробка с магнитом" },
      { title: "Коробка для конфет", description: "Элегантная белая коробка с красной лентой и магнитным замком", alt: "Коробка для конфет с лентой и магнитом" },
      { title: "Персонализированный подарок", description: "Трехъязычное поздравление со снежинками", alt: "Персонализированный шоколадный подарок" },
      { title: "Люксовая коробка", description: "Белая коробка с зеленой лентой и корпоративным логотипом", alt: "Люксовая коробка для конфет" },
    ],
    ctaButton: "Заказать коробку с магнитом",
    features: {
      magnet: { title: "Магнитный замок", desc: "Практичный и элегантный замок, обеспечивающий плавное закрытие" },
      print: { title: "Персонализация", desc: "Возможность нанесения печати на крышку коробки с вашим дизайном или логотипом" },
      pack: { title: "Премиум упаковка", desc: "Качественный картон с лентой и декоративными элементами" },
    },
  },
  et: {
    badge: "Magnetkastid",
    heading: "Elegantsed kingituse kastid magnetlukuga",
    subtitle: "Premium kvaliteediga kingituse kastid sisseehitatud magnetiga — elegantne ja praktiline lahendus ettevõtte kingitustele ja pühade komplektidele",
    items: [
      { title: "Jõulukinkide kast", description: "Pidulik kast personaliseeritud trükise ja magnetlukuga", alt: "Jõulukinkide kast magnetiga" },
      { title: "Kommikarp", description: "Elegantne valge kast punase lipsu ja magnetlukuga", alt: "Kommikarp lipsu ja magnetiga" },
      { title: "Personaliseeritud kingitus", description: "Kolmkeelne tervitus lumepiiskade kujundusega", alt: "Personaliseeritud šokolaadikingitus" },
      { title: "Luksuslik kommikarp", description: "Valge kast rohelise lipsu ja ettevõtte logoga", alt: "Luksuslik kommikarp" },
    ],
    ctaButton: "Telli magnetkast",
    features: {
      magnet: { title: "Magnetlukk", desc: "Praktiline ja elegantne lukk, mis tagab sujuva sulgemise" },
      print: { title: "Personaliseerimine", desc: "Võimalus trükkida karbi kaas oma disaini või logoga" },
      pack: { title: "Premium pakend", desc: "Kvaliteetne papp lipsu ja dekoratiivsete elementidega" },
    },
  },
  lt: {
    badge: "Dėžutės su magnetu",
    heading: "Elegantiškos dovanų dėžutės su magnetiniu užsegimu",
    subtitle: "Premium kokybės dovanų dėžutės su įmontuotu magnetu — elegantiškas ir praktiškas sprendimas įmonių dovanoms ir šventiniams rinkiniams",
    items: [
      { title: "Kalėdinė dovanų dėžutė", description: "Šventinė dėžutė su personalizuota spauda ir magnetiniu užsegimu", alt: "Kalėdinė dovanų dėžutė su magnetu" },
      { title: "Saldainių dėžutė", description: "Elegantiška balta dėžutė su raudona juostele ir magnetiniu užsegimu", alt: "Saldainių dėžutė su juostele ir magnetu" },
      { title: "Personalizuota dovana", description: "Trikalbis sveikinimas su snaigės dizainu", alt: "Personalizuota šokolado dovana" },
      { title: "Prabangi saldainių dėžutė", description: "Balta dėžutė su žalia juostele ir įmonės logotipu", alt: "Prabangi saldainių dėžutė" },
    ],
    ctaButton: "Užsisakyti dėžutę su magnetu",
    features: {
      magnet: { title: "Magnetinis užsegimas", desc: "Praktiškas ir elegantiškas užsegimas, užtikrinantis sklandų uždarymą" },
      print: { title: "Personalizacija", desc: "Galimybė atspausdinti dėžutės dangtėlį su jūsų dizainu ar logotipu" },
      pack: { title: "Premium pakuotė", desc: "Kokybiškas kartonas su juostele ir dekoratyviais elementais" },
    },
  },
  sv: {
    badge: "Magnetlådor",
    heading: "Eleganta presentboxar med magnetisk stängning",
    subtitle: "Premiumkvalitet presentboxar med inbyggd magnet — en elegant och praktisk lösning för företagsgåvor och högtidsset",
    items: [
      { title: "Julklappslåda", description: "Festlig låda med personligt tryck och magnetisk stängning", alt: "Julklappslåda med magnet" },
      { title: "Konfektlåda", description: "Elegant vit låda med rött band och magnetisk stängning", alt: "Konfektlåda med band och magnet" },
      { title: "Personlig present", description: "Trespråkig hälsning med snöflingedesign", alt: "Personlig chokladpresent" },
      { title: "Luxury konfektlåda", description: "Vit låda med grönt band och företagslogotyp", alt: "Lyxig konfektlåda" },
    ],
    ctaButton: "Beställ magnetlåda",
    features: {
      magnet: { title: "Magnetisk stängning", desc: "Praktisk och elegant stängning som säkerställer smidig förslutning" },
      print: { title: "Personalisering", desc: "Möjlighet att trycka locket med din design eller logotyp" },
      pack: { title: "Premium förpackning", desc: "Kvalitetskartong med band och dekorelement" },
    },
  },
  no: {
    badge: "Magnetbokser",
    heading: "Elegante gaveesker med magnetisk lukking",
    subtitle: "Premium kvalitet gaveesker med innebygget magnet — en elegant og praktisk løsning for bedriftsgaver og høytidssett",
    items: [
      { title: "Julegaveeske", description: "Festlig eske med personlig trykk og magnetisk lukking", alt: "Julegaveeske med magnet" },
      { title: "Konfekteske", description: "Elegant hvit eske med rødt bånd og magnetisk lukking", alt: "Konfekteske med bånd og magnet" },
      { title: "Personlig gave", description: "Trespråklig hilsen med snøflokkdesign", alt: "Personlig sjokoladegave" },
      { title: "Luksus konfekteske", description: "Hvit eske med grønt bånd og bedriftslogo", alt: "Luksuriøs konfekteske" },
    ],
    ctaButton: "Bestill eske med magnet",
    features: {
      magnet: { title: "Magnetisk lukking", desc: "Praktisk og elegant lukking som sikrer jevn lukking" },
      print: { title: "Personalisering", desc: "Mulighet for å trykke lokk med ditt design eller logo" },
      pack: { title: "Premium emballasje", desc: "Kvalitetspapp med bånd og dekorative elementer" },
    },
  },
  fi: {
    badge: "Magneettilaatikoit",
    heading: "Elegantit lahjalaatikot magneettisella suljinnalla",
    subtitle: "Premium-laatuiset lahjalaatikot sisäänrakennetulla magneetilla — elegantti ja käytännöllinen ratkaisu yrityslahjoille ja juhlaseteille",
    items: [
      { title: "Joululahjalaatikko", description: "Juhlallinen laatikko personoidulla painatuksella ja magneettisella suljinnalla", alt: "Joululahjalaatikko magneetilla" },
      { title: "Konvehtilaatikko", description: "Elegantti valkoinen laatikko punaisella nauhalla ja magneettisella suljinnalla", alt: "Konvehtilaatikko nauhalla ja magneetilla" },
      { title: "Personoitu lahja", description: "Kolmenkielinen tervehdys lumihiutaledesignilla", alt: "Personoitu suklaalahja" },
      { title: "Luksus konvehtilaatikko", description: "Valkoinen laatikko vihreällä nauhalla ja yrityslogolla", alt: "Luksus konvehtilaatikko" },
    ],
    ctaButton: "Tilaa magneettilaatikko",
    features: {
      magnet: { title: "Magneettinen suljin", desc: "Käytännöllinen ja elegantti suljin, joka varmistaa sulavan sulkemisen" },
      print: { title: "Personointi", desc: "Mahdollisuus painaa kannessa oma design tai logo" },
      pack: { title: "Premium pakkaus", desc: "Laadukas pahvi nauhalla ja koristeellisilla elementeillä" },
    },
  },
  da: {
    badge: "Magnetæsker",
    heading: "Elegante gaveæsker med magnetisk lukning",
    subtitle: "Premium kvalitet gaveæsker med indbygget magnet — en elegant og praktisk løsning til virksomhedsgaver og højtidssæt",
    items: [
      { title: "Julegaveæske", description: "Festlig æske med personligt tryk og magnetisk lukning", alt: "Julegaveæske med magnet" },
      { title: "Konfekteske", description: "Elegant hvid æske med rødt bånd og magnetisk lukning", alt: "Konfekteske med bånd og magnet" },
      { title: "Personlig gave", description: "Tresproget hilsen med sneflagedesign", alt: "Personlig chokoladegave" },
      { title: "Luksus konfekteske", description: "Hvid æske med grønt bånd og virksomhedslogo", alt: "Luksuriøs konfekteske" },
    ],
    ctaButton: "Bestil æske med magnet",
    features: {
      magnet: { title: "Magnetisk lukning", desc: "Praktisk og elegant lukning, der sikrer jævn lukning" },
      print: { title: "Personalisering", desc: "Mulighed for at trykke låg med dit design eller logo" },
      pack: { title: "Premium emballage", desc: "Kvalitetspap med bånd og dekorative elementer" },
    },
  },
  de: {
    badge: "Magnetboxen",
    heading: "Elegante Geschenkboxen mit Magnetverschluss",
    subtitle: "Premium-Qualität Geschenkboxen mit eingebautem Magnet — eine elegante und praktische Lösung für Firmengeschenke und Feiertagssets",
    items: [
      { title: "Weihnachtsbox", description: "Festliche Box mit personalisiertem Druck und Magnetverschluss", alt: "Weihnachtsgeschenkbox mit Magnet" },
      { title: "Pralinenbox", description: "Elegante weiße Box mit rotem Band und Magnetverschluss", alt: "Pralinenbox mit Band und Magnet" },
      { title: "Personalisiertes Geschenk", description: "Dreisprachige Grußkarte mit Schneeflockendesign", alt: "Personalisiertes Schokoladengeschenk" },
      { title: "Luxus Pralinenbox", description: "Weiße Box mit grünem Band und Firmenlogo", alt: "Luxuriöse Pralinenbox" },
    ],
    ctaButton: "Box mit Magnet bestellen",
    features: {
      magnet: { title: "Magnetverschluss", desc: "Praktischer und eleganter Verschluss, der ein reibungsloses Schließen gewährleistet" },
      print: { title: "Personalisierung", desc: "Möglichkeit, den Deckel mit Ihrem Design oder Logo zu bedrucken" },
      pack: { title: "Premium-Verpackung", desc: "Hochwertiger Karton mit Band und dekorativen Elementen" },
    },
  },
  fr: {
    badge: "Boîtes magnétiques",
    heading: "Boîtes cadeaux élégantes avec fermeture magnétique",
    subtitle: "Boîtes cadeaux de qualité premium avec aimant intégré — une solution élégante et pratique pour les cadeaux d'entreprise et les ensembles de fête",
    items: [
      { title: "Boîte cadeau de Noël", description: "Boîte festive avec impression personnalisée et fermeture magnétique", alt: "Boîte cadeau de Noël avec aimant" },
      { title: "Boîte de confiserie", description: "Boîte blanche élégante avec ruban rouge et fermeture magnétique", alt: "Boîte de confiserie avec ruban et aimant" },
      { title: "Cadeau personnalisé", description: "Vœux trilingue avec design flocon de neige", alt: "Cadeau chocolat personnalisé" },
      { title: "Boîte de confiserie luxe", description: "Boîte blanche avec ruban vert et logo d'entreprise", alt: "Boîte de confiserie luxueuse" },
    ],
    ctaButton: "Commander une boîte magnétique",
    features: {
      magnet: { title: "Fermeture magnétique", desc: "Fermeture pratique et élégante assurant une fermeture en douceur" },
      print: { title: "Personnalisation", desc: "Possibilité d'imprimer le couvercle avec votre design ou logo" },
      pack: { title: "Emballage premium", desc: "Carton de qualité avec ruban et éléments décoratifs" },
    },
  },
  it: {
    badge: "Scatole magnetiche",
    heading: "Scatole regalo eleganti con chiusura magnetica",
    subtitle: "Scatole regalo di qualità premium con magnete integrato — una soluzione elegante e pratica per regali aziendali e set festivi",
    items: [
      { title: "Scatola regalo di Natale", description: "Scatola festiva con stampa personalizzata e chiusura magnetica", alt: "Scatola regalo di Natale con magnete" },
      { title: "Scatola di cioccolatini", description: "Scatola bianca elegante con nastro rosso e chiusura magnetica", alt: "Scatola di cioccolatini con nastro e magnete" },
      { title: "Regalo personalizzato", description: "Auguri trilingue con design fiocco di neve", alt: "Regalo cioccolato personalizzato" },
      { title: "Scatola di cioccolatini luxury", description: "Scatola bianca con nastro verde e logo aziendale", alt: "Scatola di cioccolatini di lusso" },
    ],
    ctaButton: "Ordina scatola con magnete",
    features: {
      magnet: { title: "Chiusura magnetica", desc: "Chiusura pratica ed elegante che assicura una chiusura fluida" },
      print: { title: "Personalizzazione", desc: "Possibilità di stampare il coperchio con il tuo design o logo" },
      pack: { title: "Confezione premium", desc: "Cartone di qualità con nastro ed elementi decorativi" },
    },
  },
  es: {
    badge: "Cajas magnéticas",
    heading: "Cajas de regalo elegantes con cierre magnético",
    subtitle: "Cajas de regalo de calidad premium con imán integrado — una solución elegante y práctica para regalos corporativos y conjuntos festivos",
    items: [
      { title: "Caja de regalo navideña", description: "Caja festiva con impresión personalizada y cierre magnético", alt: "Caja de regalo navideña con imán" },
      { title: "Caja de bombones", description: "Caja blanca elegante con cinta roja y cierre magnético", alt: "Caja de bombones con cinta e imán" },
      { title: "Regalo personalizado", description: "Saludo trilingüe con diseño de copo de nieve", alt: "Regalo de chocolate personalizado" },
      { title: "Caja de bombones de lujo", description: "Caja blanca con cinta verde y logo corporativo", alt: "Caja de bombones de lujo" },
    ],
    ctaButton: "Pedir caja magnética",
    features: {
      magnet: { title: "Cierre magnético", desc: "Cierre práctico y elegante que asegura un cierre suave" },
      print: { title: "Personalización", desc: "Posibilidad de imprimir la tapa con tu diseño o logo" },
      pack: { title: "Embalaje premium", desc: "Cartón de calidad con cinta y elementos decorativos" },
    },
  },
  pl: {
    badge: "Pudełka magnetyczne",
    heading: "Eleganckie pudełka prezentowe z magnetycznym zamknięciem",
    subtitle: "Pudełka prezentowe premium z wbudowanym magnesem — eleganckie i praktyczne rozwiązanie dla prezentów firmowych i zestawów świątecznych",
    items: [
      { title: "Świąteczne pudełko", description: "Świąteczne pudełko z personalizowanym nadrukiem i magnetycznym zamknięciem", alt: "Świąteczne pudełko prezentowe z magnesem" },
      { title: "Pudełko na czekoladki", description: "Eleganckie białe pudełko z czerwoną wstążką i magnetycznym zamknięciem", alt: "Pudełko na czekoladki ze wstążką i magnesem" },
      { title: "Spersonalizowany prezent", description: "Trójjęzyczne życzenia z motywem płatka śniegu", alt: "Spersonalizowany prezent czekoladowy" },
      { title: "Luksusowe pudełko", description: "Białe pudełko z zieloną wstążką i logo firmowym", alt: "Luksusowe pudełko na czekoladki" },
    ],
    ctaButton: "Zamów pudełko magnetyczne",
    features: {
      magnet: { title: "Zapięcie magnetyczne", desc: "Praktyczne i eleganckie zapięcie zapewniające płynne zamknięcie" },
      print: { title: "Personalizacja", desc: "Możliwość nadruku na wieczku Twojego projektu lub logo" },
      pack: { title: "Opakowanie premium", desc: "Wysokiej jakości karton ze wstążką i elementami dekoracyjnymi" },
    },
  },
  ar: {
    badge: "Magnetic Boxes",
    heading: "Elegant Gift Boxes with Magnetic Closure",
    subtitle: "Premium quality gift boxes with built-in magnet — an elegant and practical solution for corporate gifts and holiday sets",
    items: [
      { title: "Christmas Gift Box", description: "Festive box with personalized printing and magnetic closure", alt: "Christmas gift box with magnet" },
      { title: "Confectionery Box", description: "Elegant white box with red ribbon and magnetic closure", alt: "Confectionery box with ribbon and magnet" },
      { title: "Personalized Gift", description: "Trilingual greeting with snowflake design", alt: "Personalized chocolate gift" },
      { title: "Luxury Box", description: "White box with green ribbon and corporate logo", alt: "Luxury confectionery box" },
    ],
    ctaButton: "Order magnetic box",
    features: {
      magnet: { title: "Magnetic Closure", desc: "Practical and elegant closure that ensures smooth sealing" },
      print: { title: "Personalization", desc: "Option to print the box lid with your design or logo" },
      pack: { title: "Premium Packaging", desc: "Quality cardboard with ribbon and decorative elements" },
    },
  },
  nl: {
    badge: "Magneetdozen",
    heading: "Elegante geschenkdozen met magnetische sluiting",
    subtitle: "Premium kwaliteit geschenkdozen met ingebouwde magneet — een elegante en praktische oplossing voor zakelijke geschenken en feestelijke sets",
    items: [
      { title: "Kerstgeschenkdoos", description: "Feestelijke doos met gepersonaliseerde bedrukking en magnetische sluiting", alt: "Kerstgeschenkdoos met magneet" },
      { title: "Confectiedoos", description: "Elegante witte doos met rood lint en magnetische sluiting", alt: "Confectiedoos met lint en magneet" },
      { title: "Gepersonaliseerd geschenk", description: "Drie-talige groet met sneeuwvlok ontwerp", alt: "Gepersonaliseerd chocoladegeschenk" },
      { title: "Luxe confectiedoos", description: "Witte doos met groen lint en bedrijfslogo", alt: "Luxe confectiedoos" },
    ],
    ctaButton: "Bestel magneetdoos",
    features: {
      magnet: { title: "Magnetische sluiting", desc: "Praktische en elegante sluiting die zorgt voor soepele sluiting" },
      print: { title: "Personalisatie", desc: "Mogelijkheid om het deksel te bedrukken met uw ontwerp of logo" },
      pack: { title: "Premium verpakking", desc: "Kwaliteit karton met lint en decoratieve elementen" },
    },
  },
  cs: {
    badge: "Magnetické krabičky",
    heading: "Elegantní dárkové krabičky s magnetickým uzávěrem",
    subtitle: "Dárkové krabičky prémiové kvality se zabudovaným magnetem — elegantní a praktické řešení pro firemní dárky a sváteční sady",
    items: [
      { title: "Vánoční dárková krabička", description: "Sváteční krabička s personalizovaným potiskem a magnetickým uzávěrem", alt: "Vánoční dárková krabička s magnetem" },
      { title: "Krabička na cukroví", description: "Elegantní bílá krabička s červenou stuhou a magnetickým uzávěrem", alt: "Krabička na cukroví se stuhou a magnetem" },
      { title: "Personalizovaný dárek", description: "Trojjazyčný pozdrav se sněhovou vločkou", alt: "Personalizovaný čokoládový dárek" },
      { title: "Luxusní krabička", description: "Bílá krabička se zelenou stuhou a firemním logem", alt: "Luxusní krabička na cukroví" },
    ],
    ctaButton: "Objednat magnetickou krabičku",
    features: {
      magnet: { title: "Magnetický uzávěr", desc: "Praktický a elegantní uzávěr zajišťující hladké uzavření" },
      print: { title: "Personalizace", desc: "Možnost potisku víka vaším designem nebo logem" },
      pack: { title: "Premium balení", desc: "Kvalitní karton se stuhou a dekoračními prvky" },
    },
  },
  pt: {
    badge: "Caixas magnéticas",
    heading: "Caixas de presente elegantes com fecho magnético",
    subtitle: "Caixas de presente de qualidade premium com ímã embutido — uma solução elegante e prática para presentes corporativos e conjuntos festivos",
    items: [
      { title: "Caixa de presente natalina", description: "Caixa festiva com impressão personalizada e fecho magnético", alt: "Caixa de presente natalina com ímã" },
      { title: "Caixa de confeitaria", description: "Caixa branca elegante com fita vermelha e fecho magnético", alt: "Caixa de confeitaria com fita e ímã" },
      { title: "Presente personalizado", description: "Saudação trilíngue com design de floco de neve", alt: "Presente de chocolate personalizado" },
      { title: "Caixa de confeitaria de luxo", description: "Caixa branca com fita verde e logo corporativo", alt: "Caixa de confeitaria luxuosa" },
    ],
    ctaButton: "Encomendar caixa magnética",
    features: {
      magnet: { title: "Fecho magnético", desc: "Fecho prático e elegante que assegura um fechamento suave" },
      print: { title: "Personalização", desc: "Possibilidade de imprimir a tampa com seu design ou logo" },
      pack: { title: "Embalagem premium", desc: "Cartão de qualidade com fita e elementos decorativos" },
    },
  },
  el: {
    badge: "Κουτιά με μαγνήτη",
    heading: "Κομψά κουτιά δώρων με μαγνητικό κλείσιμο",
    subtitle: "Κουτιά δώρων υψηλής ποιότητας με ενσωματωμένο μαγνήτη — μια κομψή και πρακτική λύση για εταιρικά δώρα και γιορτινά σετ",
    items: [
      { title: "Χριστουγεννιάτικο κουτί", description: "Γιορτινό κουτί με εξατομικευμένη εκτύπωση και μαγνητικό κλείσιμο", alt: "Χριστουγεννιάτικο κουτί δώρου με μαγνήτη" },
      { title: "Κουτί ζαχαροπλαστικής", description: "Κομψό λευκό κουτί με κόκκινη κορδέλα και μαγνητικό κλείσιμο", alt: "Κουτί ζαχαροπλαστικής με κορδέλα και μαγνήτη" },
      { title: "Εξατομικευμένο δώρο", description: "Τρίγλωσση χαιρετισμός με σχέδιο νιφάδας χιονιού", alt: "Εξατομικευμένο δώρο σοκολάτας" },
      { title: "Πολυτελές κουτί", description: "Λευκό κουτί με πράσινη κορδέλα και εταιρικό λογότυπο", alt: "Πολυτελές κουτί ζαχαροπλαστικής" },
    ],
    ctaButton: "Παραγγείλετε κουτί με μαγνήτη",
    features: {
      magnet: { title: "Μαγνητικό κλείσιμο", desc: "Πρακτικό και κομψό κλείσιμο που διασφαλίζει ομαλό σφράγισμα" },
      print: { title: "Εξατομίκευση", desc: "Δυνατότητα εκτύπωσης του καπακιού με το σχέδιο ή λογότυπό σας" },
      pack: { title: "Premium συσκευασία", desc: "Ποιοτικό χαρτόνι με κορδέλα και διακοσμητικά στοιχεία" },
    },
  },
  tr: {
    badge: "Manyetik Kutular",
    heading: "Manyetik Kapaklı Zarif Hediye Kutuları",
    subtitle: "Premium kalite hediye kutuları, yerleşik mıknatıslı — kurumsal hediyeler ve tatil setleri için zarif ve pratik bir çözüm",
    items: [
      { title: "Yılbaşı Hediye Kutusu", description: "Kişiselleştirilmiş baskı ve manyetik kapaklı şenlikli kutu", alt: "Manyetik kapaklı yılbaşı hediye kutusu" },
      { title: "Şekerleme Kutusu", description: "Kırmızı kurdele ve manyetik kapaklı zarif beyaz kutu", alt: "Kurdele ve mıknatıslı şekerleme kutusu" },
      { title: "Kişiselleştirilmiş Hediye", description: "Kar tanesi tasarımı ile üç dilli tebrik", alt: "Kişiselleştirilmiş çikolata hediyesi" },
      { title: "Lüks Şekerleme Kutusu", description: "Yeşil kurdele ve kurumsal logolu beyaz kutu", alt: "Lüks şekerleme kutusu" },
    ],
    ctaButton: "Manyetik kutu sipariş et",
    features: {
      magnet: { title: "Manyetik kapak", desc: "Sorunsuz kapanmayı sağlayan pratik ve zarif kapak" },
      print: { title: "Kişiselleştirme", desc: "Kapak üzerine tasarımınızı veya logonuzu basma seçeneği" },
      pack: { title: "Premium ambalaj", desc: "Kurdele ve dekoratif elemanlarla kaliteli mukavva" },
    },
  },
  hu: {
    badge: "Mágneses dobozok",
    heading: "Elegáns ajándékdobozok mágneses zárással",
    subtitle: "Prémium minőségű ajándékdobozok beépített mágnessel — egy elegáns és praktikus megoldás vállalati ajándékokhoz és ünnepi szettekhez",
    items: [
      { title: "Karácsonyi ajándékdoboz", description: "Ünnepi doboz személyre szabott nyomtatással és mágneses zárással", alt: "Mágneses karácsonyi ajándékdoboz" },
      { title: "Édességdoboz", description: "Elegáns fehér doboz piros szalaggal és mágneses zárással", alt: "Szalagos és mágneses édességdoboz" },
      { title: "Személyre szabott ajándék", description: "Hópehely mintával háromnyelvű üdvözlés", alt: "Személyre szabott csokoládé ajándék" },
      { title: "Luxus édességdoboz", description: "Zöld szalagos és vállalati logós fehér doboz", alt: "Luxus édességdoboz" },
    ],
    ctaButton: "Rendeljen mágneses dobozt",
    features: {
      magnet: { title: "Mágneses zárás", desc: "Zökkenőmentes záródást biztosító praktikus és elegáns zárás" },
      print: { title: "Személyre szabás", desc: "Lehetőség a doboz fedelének nyomtatására saját dizájnnal vagy logóval" },
      pack: { title: "Prémium csomagolás", desc: "Minőségi karton szalaggal és dekoratív elemekkel" },
    },
  },
  ro: {
    badge: "Cutii magnetice",
    heading: "Cutii cadou elegante cu închidere magnetică",
    subtitle: "Cutii cadou de calitate premium cu magnet încorporat — o soluție elegantă și practică pentru cadouri corporate și seturi de sărbători",
    items: [
      { title: "Cutie cadou de Crăciun", description: "Cutie festivă cu imprimare personalizată și închidere magnetică", alt: "Cutie cadou de Crăciun cu magnet" },
      { title: "Cutie de bomboane", description: "Cutie albă elegantă cu panglică roșie și închidere magnetică", alt: "Cutie de bomboane cu panglică și magnet" },
      { title: "Cadou personalizat", description: "Urare trilingvă cu design fulg de nea", alt: "Cadou de ciocolată personalizat" },
      { title: "Cutie de lux", description: "Cutie albă cu panglică verde și logo corporativ", alt: "Cutie de bomboane de lux" },
    ],
    ctaButton: "Comandă cutie magnetică",
    features: {
      magnet: { title: "Închidere magnetică", desc: "Închidere practică și elegantă care asigură o sigilare lină" },
      print: { title: "Personalizare", desc: "Opțiunea de a imprima capacul cutiei cu designul sau logo-ul dvs." },
      pack: { title: "Ambalaj premium", desc: "Carton de calitate cu panglică și elemente decorative" },
    },
  },
  bg: {
    badge: "Магнитни кутии",
    heading: "Елегантни подаръчни кутии с магнитно закопчаване",
    subtitle: "Подаръчни кутии премиум качество с вграден магнит — елегантно и практично решение за корпоративни подаръци и празнични комплекти",
    items: [
      { title: "Коледна подаръчна кутия", description: "Празнична кутия с персонализиран печат и магнитно закопчаване", alt: "Коледна подаръчна кутия с магнит" },
      { title: "Кутия за бонбони", description: "Елегантна бяла кутия с червена панделка и магнитно закопчаване", alt: "Кутия за бонбони с панделка и магнит" },
      { title: "Персонализиран подарък", description: "Триезично поздравление с дизайн снежинка", alt: "Персонализиран шоколадов подарък" },
      { title: "Луксозна кутия", description: "Бяла кутия със зелена панделка и корпоративно лого", alt: "Луксозна кутия за бонбони" },
    ],
    ctaButton: "Поръчай магнитна кутия",
    features: {
      magnet: { title: "Магнитно закопчаване", desc: "Практично и елегантно закопчаване, осигуряващо плавно затваряне" },
      print: { title: "Персонализация", desc: "Възможност за печат на капака с Вашия дизайн или лого" },
      pack: { title: "Premium опаковка", desc: "Качествен картон с панделка и декоративни елементи" },
    },
  },
  hr: {
    badge: "Magnetne kutije",
    heading: "Elegantne poklon kutije s magnetskim zatvaračem",
    subtitle: "Poklon kutije premium kvalitete s ugrađenim magnetom — elegantno i praktično rješenje za korporativne poklone i blagdanske setove",
    items: [
      { title: "Božićna poklon kutija", description: "Svečana kutija s personaliziranim tiskom i magnetskim zatvaračem", alt: "Božićna poklon kutija s magnetom" },
      { title: "Kutija za slatkiše", description: "Elegantna bijela kutija s crvenom vrpcom i magnetskim zatvaračem", alt: "Kutija za slatkiše s vrpcom i magnetom" },
      { title: "Personalizirani poklon", description: "Trojezična čestitka s dizajnom pahuljice", alt: "Personalizirani čokoladni poklon" },
      { title: "Luksuzna kutija", description: "Bijela kutija sa zelenom vrpcom i korporativnim logom", alt: "Luksuzna kutija za slatkiše" },
    ],
    ctaButton: "Naručite kutiju s magnetom",
    features: {
      magnet: { title: "Magnetski zatvarač", desc: "Praktičan i elegantan zatvarač koji osigurava glatko zatvaranje" },
      print: { title: "Personalizacija", desc: "Mogućnost ispisa poklopca vašim dizajnom ili logom" },
      pack: { title: "Premium pakiranje", desc: "Kvalitetan karton s vrpcom i dekorativnim elementima" },
    },
  },
  sk: {
    badge: "Magnetické krabičky",
    heading: "Elegantné darčekové krabičky s magnetickým uzáverom",
    subtitle: "Darčekové krabičky prémiovej kvality so zabudovaným magnetom — elegantné a praktické riešenie pre firemné darčeky a sviatočné sady",
    items: [
      { title: "Vianočná darčeková krabička", description: "Sviatočná krabička s personalizovanou potlačou a magnetickým uzáverom", alt: "Vianočná darčeková krabička s magnetom" },
      { title: "Krabička na cukrovinky", description: "Elegantná biela krabička s červenou stuhou a magnetickým uzáverom", alt: "Krabička na cukrovinky so stuhou a magnetom" },
      { title: "Personalizovaný darček", description: "Trojjazyčný pozdrav so vločkovým dizajnom", alt: "Personalizovaný čokoládový darček" },
      { title: "Luxusná krabička", description: "Biela krabička so zelenou stuhou a firemným logom", alt: "Luxusná krabička na cukrovinky" },
    ],
    ctaButton: "Objednať magnetickú krabičku",
    features: {
      magnet: { title: "Magnetický uzáver", desc: "Praktický a elegantný uzáver zaisťujúci hladké zatvorenie" },
      print: { title: "Personalizácia", desc: "Možnosť potlače veka vaším dizajnom alebo logom" },
      pack: { title: "Premium balenie", desc: "Kvalitný kartón so stuhou a dekoratívnymi prvkami" },
    },
  },
  sl: {
    badge: "Magnetne škatle",
    heading: "Elegantne darilne škatle z magnetnim zapenjanjem",
    subtitle: "Darilne škatle premium kakovosti z vgrajenim magnetom — elegantna in praktična rešitev za poslovna darila in praznične sete",
    items: [
      { title: "Božična darilna škatla", description: "Praznična škatla s personaliziranim tiskom in magnetnim zapenjanjem", alt: "Božična darilna škatla z magnetom" },
      { title: "Škatla za sladkarije", description: "Elegantna bela škatla z rdečim trakom in magnetnim zapenjanjem", alt: "Škatla za sladkarije s trakom in magnetom" },
      { title: "Personalizirano darilo", description: "Trojezični pozdrav z dizajnom snežinke", alt: "Personalizirano čokoladno darilo" },
      { title: "Luksuzna škatla", description: "Bela škatla z zelenim trakom in poslovnim logotipom", alt: "Luksuzna škatla za sladkarije" },
    ],
    ctaButton: "Naročite škatlo z magnetom",
    features: {
      magnet: { title: "Magnetni zapenjal", desc: "Praktičen in eleganten zapenjal, ki zagotavlja gladko zapiranje" },
      print: { title: "Personalizacija", desc: "Možnost tiskanja pokrova z vašim dizajnom ali logotipom" },
      pack: { title: "Premium embalaža", desc: "Kakovosten karton s trakom in dekorativnimi elementi" },
    },
  },
  uk: {
    badge: "Магнітні коробки",
    heading: "Елегантні подарункові коробки з магнітним замком",
    subtitle: "Подарункові коробки преміум якості з вбудованим магнітом — елегантне та практичне рішення для корпоративних подарунків та святкових наборів",
    items: [
      { title: "Різдвяна подарункова коробка", description: "Святкова коробка з персоналізованим друком і магнітним замком", alt: "Різдвяна подарункова коробка з магнітом" },
      { title: "Коробка для цукерок", description: "Елегантна біла коробка з червоною стрічкою та магнітним замком", alt: "Коробка для цукерок зі стрічкою та магнітом" },
      { title: "Персоналізований подарунок", description: "Трилінгвальне привітання з дизайном сніжинки", alt: "Персоналізований шоколадний подарунок" },
      { title: "Люксова коробка", description: "Біла коробка з зеленою стрічкою та корпоративним логотипом", alt: "Люксова коробка для цукерок" },
    ],
    ctaButton: "Замовити коробку з магнітом",
    features: {
      magnet: { title: "Магнітний замок", desc: "Практичний та елегантний замок, що забезпечує плавне закривання" },
      print: { title: "Персоналізація", desc: "Можливість друку на кришці вашим дизайном або логотипом" },
      pack: { title: "Premium упаковка", desc: "Якісний картон зі стрічкою та декоративними елементами" },
    },
  },
  sr: {
    badge: "Magnetne kutije",
    heading: "Elegantne poklon kutije s magnetskim zatvaračem",
    subtitle: "Poklon kutije premium kvaliteta sa ugrađenim magnetom — elegantno i praktično rešenje za korporativne poklone i praznične setove",
    items: [
      { title: "Božićna poklon kutija", description: "Svečana kutija sa personalizovanim štampom i magnetskim zatvaračem", alt: "Božićna poklon kutija s magnetom" },
      { title: "Kutija za slatkiše", description: "Elegantna bela kutija sa crvenom trakom i magnetskim zatvaračem", alt: "Kutija za slatkiše sa trakom i magnetom" },
      { title: "Personalizovani poklon", description: "Trojezični pozdrav sa dizajnom pahuljice", alt: "Personalizovani čokoladni poklon" },
      { title: "Luksuzna kutija", description: "Bela kutija sa zelenom trakom i korporativnim logom", alt: "Luksuzna kutija za slatkiše" },
    ],
    ctaButton: "Naručite kutiju s magnetom",
    features: {
      magnet: { title: "Magnetski zatvarač", desc: "Praktičan i elegantan zatvarač koji obezbeđuje glatko zatvaranje" },
      print: { title: "Personalizacija", desc: "Mogućnost štampe poklopca vašim dizajnom ili logom" },
      pack: { title: "Premium pakovanje", desc: "Kvalitetan karton sa trakom i dekorativnim elementima" },
    },
  },
  bs: {
    badge: "Magnetne kutije",
    heading: "Elegantne poklon kutije s magnetskim zatvaračem",
    subtitle: "Poklon kutije premium kvaliteta sa ugrađenim magnetom — elegantno i praktično rješenje za korporativne poklone i praznične setove",
    items: [
      { title: "Božićna poklon kutija", description: "Svečana kutija sa personalizovanim štampom i magnetskim zatvaračem", alt: "Božićna poklon kutija s magnetom" },
      { title: "Kutija za slatkiše", description: "Elegantna bijela kutija sa crvenom vrpcom i magnetskim zatvaračem", alt: "Kutija za slatkiše sa vrpcom i magnetom" },
      { title: "Personalizovani poklon", description: "Trojezični pozdrav sa dizajnom pahuljice", alt: "Personalizovani čokoladni poklon" },
      { title: "Luksuzna kutija", description: "Bijela kutija sa zelenom vrpcom i korporativnim logom", alt: "Luksuzna kutija za slatkiše" },
    ],
    ctaButton: "Naručite kutiju s magnetom",
    features: {
      magnet: { title: "Magnetski zatvarač", desc: "Praktičan i elegantan zatvarač koji osigurava glatko zatvaranje" },
      print: { title: "Personalizacija", desc: "Mogućnost ispisa poklopca vašim dizajnom ili logom" },
      pack: { title: "Premium pakiranje", desc: "Kvalitetan karton s vrpcom i dekorativnim elementima" },
    },
  },
  mk: {
    badge: "Магнетни кутии",
    heading: "Елегантни поклон кутии со магнетно затворање",
    subtitle: "Поклон кутии од премиум квалитет со вграден магнет — елегантно и практично решение за корпоративни подароци и празнични сетови",
    items: [
      { title: "Новогодишна поклон кутија", description: "Празнична кутија со персонализиран печат и магнетно затворање", alt: "Новогодишна поклон кутија со магнет" },
      { title: "Кутија за бонбони", description: "Елегантна бела кутија со црвена лента и магнетно затворање", alt: "Кутија за бонбони со лента и магнет" },
      { title: "Персонализиран подарок", description: "Тројазичен поздрав со дизајн на снежинка", alt: "Персонализиран чоколаден подарок" },
      { title: "Луксузна кутија", description: "Бела кутија со зелена лента и корпоративно лого", alt: "Луксузна кутија за бонбони" },
    ],
    ctaButton: "Нарачај кутија со магнет",
    features: {
      magnet: { title: "Магнетно затворање", desc: "Практично и елегантно затворање што обезбедува мазно затворање" },
      print: { title: "Персонализација", desc: "Можност за печатење на капакот со вашиот дизајн или лого" },
      pack: { title: "Premium пакување", desc: "Квалитетен картон со лента и декоративни елементи" },
    },
  },
  sq: {
    badge: "Kutitë magnetike",
    heading: "Kutitë elegante të dhuratave me mbyllje magnetike",
    subtitle: "Kutitë e dhuratave të cilësisë premium me magnet të integruar — një zgjidhje elegante dhe praktike për dhurata korporative dhe setet festive",
    items: [
      { title: "Kutia e dhuratave të Krishtlindjeve", description: "Kuti festive me shtypjen e personalizuar dhe mbyllje magnetike", alt: "Kutia e dhuratave të Krishtlindjeve me magnet" },
      { title: "Kutia e ëmbëlsirave", description: "Kuti e bardhë elegante me shirit të kuq dhe mbyllje magnetike", alt: "Kutia e ëmbëlsirave me shirit dhe magnet" },
      { title: "Dhuratë e personalizuar", description: "Përshëndetje tre-gjuhëshe me dizajn floku bore", alt: "Dhuratë çokollate e personalizuar" },
      { title: "Kuti luksoze", description: "Kuti e bardhë me shirit jeshil dhe logo korporative", alt: "Kuti luksoze për ëmbëlsira" },
    ],
    ctaButton: "Porosit kutinë magnetike",
    features: {
      magnet: { title: "Mbyllje magnetike", desc: "Mbyllje praktike dhe elegante që sigilon mbylljen e butë" },
      print: { title: "Personalizimi", desc: "Mundësia për të shtypur kapakun me dizajnin ose logon tuaj" },
      pack: { title: "Paketim premium", desc: "Karton cilësie me shirit dhe elemente dekorative" },
    },
  },
  is: {
    badge: "Magnetic Boxes",
    heading: "Elegant Gift Boxes with Magnetic Closure",
    subtitle: "Premium quality gift boxes with built-in magnet — an elegant and practical solution for corporate gifts and holiday sets",
    items: [
      { title: "Christmas Gift Box", description: "Festive box with personalized printing and magnetic closure", alt: "Christmas gift box with magnet" },
      { title: "Confectionery Box", description: "Elegant white box with red ribbon and magnetic closure", alt: "Confectionery box with ribbon and magnet" },
      { title: "Personalized Gift", description: "Trilingual greeting with snowflake design", alt: "Personalized chocolate gift" },
      { title: "Luxury Box", description: "White box with green ribbon and corporate logo", alt: "Luxury confectionery box" },
    ],
    ctaButton: "Order magnetic box",
    features: {
      magnet: { title: "Magnetic Closure", desc: "Practical and elegant closure that ensures smooth sealing" },
      print: { title: "Personalization", desc: "Option to print the box lid with your design or logo" },
      pack: { title: "Premium Packaging", desc: "Quality cardboard with ribbon and decorative elements" },
    },
  },
};

interface MagnetBoxSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const MagnetBoxSection = ({ lang = "lv", onCtaClick }: MagnetBoxSectionProps) => {
  const t = magnetBoxContent[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="magnets"
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Magnet className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Images grid */}
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

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-card rounded-xl p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <Magnet className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{t.features.magnet.title}</h3>
              <p className="text-sm text-muted-foreground">{t.features.magnet.desc}</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{t.features.print.title}</h3>
              <p className="text-sm text-muted-foreground">{t.features.print.desc}</p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <Gift className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{t.features.pack.title}</h3>
              <p className="text-sm text-muted-foreground">{t.features.pack.desc}</p>
            </div>
          </div>

          {/* CTA */}
          {onCtaClick && (
            <div className="text-center">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Magnet className="w-4 h-4" />
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

export default MagnetBoxSection;
