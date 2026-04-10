import type { PageContent } from "./types";

export const daPages: Record<string, PageContent> = {
  "chokolade-med-logo": {
    slug: "chokolade-med-logo",
    emoji: "🍫",
    title: "Tilpasset chokolade med firmalogo",
    metaDescription: "Tilpasset chokolade med firmalogo — premium firmagaver til kunder, partnere og arrangementer. Belgisk chokolade med personligt fuldfarvetryk.",
    intro: "Personlig chokolade med dit firmalogo — en elegant måde at fremhæve dit brand og efterlade et uforglemmeligt indtryk hos kunder og partnere.",
    benefits: [
      "Premium belgisk chokolade med personligt tryk",
      "Fuldfarvologotryk direkte på chokoladeoverfladen",
      "Mindste bestilling fra 50 stk — perfekt også til mindre arrangementer",
      "Forskellige former: klassiske plader, praliner, medaljer",
      "Elegant emballage med dit brand",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvordan ser chokolade med logo ud?</h3>
      <p>Firmalogoen trykkes direkte på <strong class="text-foreground">chokoladeoverfladen</strong> med fødevaresikker trykteknik. Resultatet — en raffineret, lækker og visuelt imponerende firmapresent.</p>
      <p>Vores kunder bruger <strong class="text-foreground">logochokolade</strong> til konferencer, kundemøder, firmajubilæer og som VIP-gæstfrihedselement.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Perfekt til</h3>
      <p>Chokolade med firmalogo er et fremragende valg til både firmapresenter og branding — uanset om det er et lille arrangement eller en international kampagne.</p>
    `,
    cta: "Bestil chokolade med dit logo",
    keywords: ["chokolade med logo", "firmachokolade", "tilpasset chokolade", "logochokolade", "personlig chokolade"],
    faqs: [
      { q: "Hvordan trykkes logoet på chokoladen?", a: "Logoet trykkes med fødevaresikkert fuldfarveTryk direkte på chokoladeoverfladen. Trykket er smagsløst og helt sikkert." },
      { q: "Hvilke chokoladeformer er tilgængelige?", a: "Vi tilbyder klassiske plader, praliner, medaljer og specialformer. Alle kan have dit logo." },
      { q: "Hvad er mindste bestilling?", a: "Mindste bestilling er 50 stk — passer til både små arrangementer og store kampagner." },
      { q: "Hvor lang tid tager produktionen?", a: "Standard produktionstid er 3–10 arbejdsdage fra designgodkendelse." },
      { q: "Kan jeg tilføje personlig emballage?", a: "Ja, vi tilbyder fuldt tilpasset emballage med dit brand — æsker, bånd og indpakning." },
    ],
  },
  "julechokolade-firma": {
    slug: "julechokolade-firma",
    emoji: "🎄",
    title: "Julechokolade til virksomheder med logo",
    metaDescription: "Julechokolade med firmalogo. Festlig belgisk chokolade i elegant juleemballage — den perfekte årsafslutningsgave.",
    intro: "Højtidssæsonen er den perfekte tid til at takke kunder og partnere med en eksklusiv personlig chokoladegave med firmalogo.",
    benefits: [
      "Festligt design med firmalogo",
      "Premium belgisk chokolade i elegant juleemballage",
      "Perfekt som firmaets julegave",
      "Levering i Europa og verden",
      "Mulighed for personligt lykønskningskort",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvorfor julechokoladegaver?</h3>
      <p><strong class="text-foreground">Jul</strong> er den bedste tid til at vise taknemmelighed over for kunder, partnere og team. En personlig chokoladegave med logo kombinerer julestemning med professionel elegance.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populære formater</h3>
      <p>Adventskalendere med logo, festlige gaveæsker med pralinésortering og individuelle chokoladeplader i juleemballage.</p>
    `,
    cta: "Bestil julechokolade",
    keywords: ["julechokolade firma", "firmajulegaver", "julechokolade med logo", "julegaver kunder"],
    faqs: [
      { q: "Hvornår bør jeg bestille julechokolade?", a: "Vi anbefaler at bestille mindst 2–3 uger før jul for at sikre rettidig levering." },
      { q: "Findes der festlige designmuligheder?", a: "Ja, vi tilbyder færdige festdesigns eller kan lave et tilpasset design efter dit brand." },
      { q: "Kan jeg bestille adventskalendere med logo?", a: "Ja, personlige adventskalendere er en af vores mest populære juleprodukter." },
      { q: "Leverer I uden for Letland?", a: "Ja, vi leverer til over 30 lande verden over." },
      { q: "Kan jeg tilføje personligt lykønskningskort?", a: "Ja, hver gave kan inkludere et tilpasset kort med din besked og brand." },
    ],
  },
  "reklamechokolade": {
    slug: "reklamechokolade",
    emoji: "🎁",
    title: "Reklamechokolade med logo",
    metaDescription: "Reklamechokolade med firmalogo. Personligt chokoladetryk til messer, konferencer og markedsføringsarrangementer.",
    intro: "Reklamechokolade med dit logo eller design — en af de mest effektive reklameartikler, der fanger opmærksomhed og efterlader et lækkert indtryk.",
    benefits: [
      "FuldfarveTryk på chokolade — ethvert design",
      "Perfekt til messer, konferencer og præsentationer",
      "Individuel emballage med reklamemateriale",
      "Hurtig produktion — 3–10 arbejdsdage",
      "Fødevaresikkert tryk fra certificeret anlæg",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvorfor virker reklamechokolade?</h3>
      <p><strong class="text-foreground">Reklamechokolade med tryk</strong> er en af få reklameartikler, der ikke blot modtages, men også huskes.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populære formater</h3>
      <p>Små chokoladeplader (5–10g) med logo er det mest populære valg til uddeling, sammen med større gavesæt til VIP-kunder.</p>
    `,
    cta: "Bestil reklamechokolade",
    keywords: ["reklamechokolade", "reklamechokolade med logo", "promotionchokolade", "chokolade messer"],
    faqs: [
      { q: "Hvilken type tryk bruges?", a: "Vi bruger fødevaresikkert fuldfarveTryk — enhver logo, design eller grafik direkte på chokoladen." },
      { q: "Passer reklamechokolade til messer?", a: "Ja, små chokoladeplader (5–10g) med logo er blandt de mest populære reklameartikler på messer." },
      { q: "Hvor hurtigt kan reklamechokolade produceres?", a: "Standard produktion er 3–10 arbejdsdage. Hastebestillinger kan arrangeres." },
      { q: "Findes der tilpasset emballage?", a: "Ja, vi tilbyder fuldt tilpasset emballage med dit reklamedesign, logo og kontaktoplysninger." },
      { q: "Hvad er mindste kvantitet?", a: "Mindste bestilling er 50 stk, passer også til små arrangementer." },
    ],
  },
  "gaver-kunder": {
    slug: "gaver-kunder",
    emoji: "💼",
    title: "Premium chokoladegaver til kunder",
    metaDescription: "Premium chokoladegaver til kunder med firmalogo. Eksklusive firmapresenter der styrker forretningsrelationer.",
    intro: "Premium chokoladegaver med firmalogo — en udsøgt måde at vise taknemmelighed og styrke langvarige forretningsrelationer.",
    benefits: [
      "Premium belgisk chokolade i luksusemballage",
      "Personligt tryk med firmalogo og design",
      "Elegant emballage til forretningsgaver på højt niveau",
      "Forskellige chokoladetyper — mælk, mørk, hvid og pralinésortering",
      "Verdensomspændende levering",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvorfor chokoladegaver til kunder?</h3>
      <p><strong class="text-foreground">Kundegaver</strong> er mere end en gestus — det er kommunikation.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Hvornår give kundegaver</h3>
      <p>Kontraktunderskrivning, årsafslutning, helligdagshilsener, firmajubilæer og velkomstgaver til nye forretningsrelationer.</p>
    `,
    cta: "Bestil gaver til dine kunder",
    keywords: ["chokoladegaver kunder", "firmapresenter kunder", "forretningsgaver med logo", "premium kundegaver"],
    faqs: [
      { q: "Hvilke gavesæt tilbyder I til kunder?", a: "Vi tilbyder luksusæsker med pralinésortering, premiumplader med logo og individuelt udformede gavesæt." },
      { q: "Kan I levere til internationale kunder?", a: "Ja, vi leverer til over 30 lande." },
      { q: "Kan der tilføjes et personligt brev?", a: "Ja, hver gave kan inkludere et elegant udformet brev med dit brand." },
      { q: "Hvilket budget passer til en kundegave?", a: "Vi tilbyder løsninger til forskellige budgetter." },
      { q: "Hvor hurtigt kan bestillinger forberedes?", a: "Standard produktion er 3–10 arbejdsdage. VIP-bestillinger kan prioriteres." },
    ],
  },
  "konference-chokolade": {
    slug: "konference-chokolade",
    emoji: "🎤",
    title: "Chokolade til konferencer og arrangementer",
    metaDescription: "Personlig chokolade til konferencer, seminarer og forretningsarrangementer. Premium chokolade med logo.",
    intro: "Personlig chokolade med firmalogo eller arrangementsdesign — en elegant måde at løfte din konference.",
    benefits: [
      "Små chokoladeplader (5–10g) — perfekt til uddeling ved registrering",
      "Fuldfarvemtryk med konferencelogo eller temadesign",
      "Individuel emballage med arrangementsprogram eller QR-kode",
      "Hurtig produktion — 3–10 arbejdsdage",
      "Mindste bestilling fra 50 stk",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvorfor chokolade til konferencer?</h3>
      <p>Konferencer og forretningsarrangementer er, hvor <strong class="text-foreground">dit brand</strong> møder potentielle kunder og partnere.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populære anvendelsesområder</h3>
      <p>Velkomstgave ved registrering, kaffepause, VIP-gavesæt og tak til talere og sponsorer.</p>
    `,
    cta: "Bestil chokolade til dit arrangement",
    keywords: ["chokolade konferencer", "konferencechokolade", "arrangementschokolade", "forretningsarrangement chokolade"],
    faqs: [
      { q: "Hvilke små chokoladestørrelser findes til konferencer?", a: "Vi tilbyder chokolade fra 5g. Mindste bestilling er 50 stk." },
      { q: "Kan konferencelogoet trykkes i stedet for firmalogo?", a: "Ja, vi kan trykke ethvert design — konferencelogo, temagrafik eller QR-kode." },
      { q: "Hvor hurtigt kan en konferencebestilling forberedes?", a: "Standard produktion er 3–10 arbejdsdage. Hastebestillinger kan arrangeres." },
      { q: "Kan individuel emballage med arrangementsinfo tilføjes?", a: "Ja, vi tilbyder fuldt tilpasset emballage med konferenceprogram, dato eller QR-kode." },
      { q: "Hvilke chokoladesmage findes?", a: "Vi tilbyder mælke-, mørk og hvid premium belgisk chokolade. Specialsmage på forespørgsel." },
    ],
  },
  "gaver-medarbejdere": {
    slug: "gaver-medarbejdere",
    emoji: "👥",
    title: "Chokoladegaver til medarbejdere",
    metaDescription: "Personlige chokoladegaver til medarbejdere — med firmalogo. Perfekt til jul, jubilæer og daglig anerkendelse.",
    intro: "Tak dine medarbejdere med en eksklusiv personlig chokoladegave — en elegant gestus, der styrker teamånden.",
    benefits: [
      "Premium belgisk chokolade i elegant gaveemballage",
      "Personligt tryk med firmalogo eller individuelt budskab",
      "Passer til jul, arbejdsjubilæer og teambuilding",
      "Forskellige formater — fra små chokolader til luksus gaveæsker",
      "Levering til kontoret eller individuelt til hver medarbejder",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvorfor chokoladegaver til medarbejdere?</h3>
      <p><strong class="text-foreground">Medarbejderanerkendelse</strong> er en af de vigtigste faktorer for teamloyalitet.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populære anledninger</h3>
      <p>Julegaver, arbejdsjubilæer, velkomstpakker til nye medarbejdere og daglig anerkendelse.</p>
    `,
    cta: "Bestil gaver til dit team",
    keywords: ["chokoladegaver medarbejdere", "firmapresenter medarbejdere", "teamgaver chokolade", "julegaver medarbejdere"],
    faqs: [
      { q: "Kan chokoladen leveres individuelt til hver medarbejder?", a: "Ja, vi tilbyder individuel levering til hver medarbejders hjemmeadresse eller kontor." },
      { q: "Kan et personligt lykønskningskort tilføjes?", a: "Ja, hver gave kan inkludere et personligt kort med din besked og medarbejderens navn." },
      { q: "Hvilke gavesæt findes?", a: "Vi tilbyder alt fra små chokoladeplader til luksus gaveæsker med pralinésortering." },
      { q: "Passer det til små teams også?", a: "Ja, mindste bestilling er 50 stk, men vi kan tilbyde løsninger til mindre teams." },
      { q: "Hvor tidligt bør jeg bestille til jul?", a: "Vi anbefaler at bestille mindst 2–3 uger før helligdagene." },
    ],
  },
  "gaver-partnere": {
    slug: "gaver-partnere",
    emoji: "🤝",
    title: "Chokoladegaver til forretningspartnere",
    metaDescription: "Eksklusive chokoladegaver til forretningspartnere med logo. Premium firmapresenter der styrker forretningsrelationer.",
    intro: "En eksklusiv chokoladegave med firmalogo — en raffineret gestus, der formidler professionel respekt.",
    benefits: [
      "Premium belgisk chokolade i luksus gaveæsker",
      "Personligt tryk med firmalogo og design",
      "Elegant emballage til topniveau forretningsgaver",
      "Forskellige chokoladetyper — mælk, mørk, hvid og pralinésortering",
      "Verdensomspændende levering",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvorfor chokoladegaver til partnere?</h3>
      <p>En gave til <strong class="text-foreground">forretningspartnere</strong> er mere end en gestus — det er kommunikation.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Hvornår give partnergaver</h3>
      <p>Kontraktunderskrivning, årsafslutning, julehilsener, firmajubilæer og velkomstgaver til nye partnere.</p>
    `,
    cta: "Bestil gaver til dine partnere",
    keywords: ["chokoladegaver partnere", "firmapresenter partnere", "forretningspartnergaver", "premium forretningsgaver"],
    faqs: [
      { q: "Hvilke gavesæt tilbyder I til partnere?", a: "Vi tilbyder luksusæsker med pralinésortering, premiumplader med logo og individuelt udformede gavesæt." },
      { q: "Kan I levere til internationale partnere?", a: "Ja, vi leverer til over 30 lande." },
      { q: "Kan et personligt brev tilføjes?", a: "Ja, hver gave kan inkludere et elegant udformet brev med dit brand." },
      { q: "Hvilket budget passer til en partnergave?", a: "Vi tilbyder løsninger til forskellige budgetter." },
      { q: "Hvor hurtigt kan bestillinger forberedes?", a: "Standard produktion er 3–10 arbejdsdage. VIP-bestillinger kan prioriteres." },
    ],
  },
  "chokoladebog": {
    slug: "chokoladebog",
    emoji: "📖",
    title: "Chokoladebog — gaveæske med magnetlås",
    metaDescription: "Chokoladegaveæske formet som en bog med magnetlås. Personlig chokolade til biblioteker, bogkonkurrencer og litterære arrangementer.",
    intro: "En unik chokoladegaveæske designet som en bog med magnetlås — perfekt til biblioteker, bogkonkurrencer og litterære arrangementer.",
    benefits: [
      "Magnetlås — skaber en 'bogåbnings'-følelse",
      "Fuldt tilpasseligt omslag — bogomslag, illustration eller ethvert design",
      "Indeni — chokolademaleri med detaljeret tryk, praliner eller plader",
      "Bredt smagssortiment: hvid, mælk, mørk, appelsin, jordbær, karamel, honning, lime m.fl.",
      "Æsken kan lukkes igen og gemmes som souvenir",
    ],
    body: `
      <h3 class="text-xl font-medium text-foreground mb-3">Hvad er en chokoladebog?</h3>
      <p>Det er en speciel <strong class="text-foreground">chokoladegaveæske</strong> formet som en bog med magnetlås.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Hvem er det til?</h3>
      <p>Formatet er ideelt som <strong class="text-foreground">præmie i bogkonkurrencer</strong> og læsefremmende initiativer.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Smagsvariationer</h3>
      <p>Klassisk — hvid, mælk og mørk chokolade, samt <strong class="text-foreground">specialsmage</strong>: appelsin, jordbær, karamel, honning, lime med flere.</p>
    `,
    cta: "Bestil chokoladebøger til dit arrangement",
    keywords: ["chokoladebog", "bogformet chokolade", "chokolade biblioteker", "bogkonkurrencepræmie"],
    faqs: [
      { q: "Hvordan ser en chokoladebog ud?", a: "Det er en gaveæske med magnetlås formet som en bog. Omslaget kan fuldt tilpasses." },
      { q: "Hvad kan lægges i æsken?", a: "Indeni kan man placere et chokolademaleri med tryk, fyldte praliner eller chokoladeplader." },
      { q: "Hvilke smage findes?", a: "Klassisk — hvid, mælk og mørk chokolade, samt specialsmage." },
      { q: "Hvad er mindste bestilling?", a: "Mindste bestilling er 10 stk for chokoladebøger." },
      { q: "Kan omslaget tilpasses?", a: "Ja, omslaget kan fuldt tilpasses med ethvert design, billede eller tekst." },
    ],
  },
};
