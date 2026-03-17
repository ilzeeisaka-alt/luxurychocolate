import SeoLandingLayout from "@/components/SeoLandingLayout";

const SokoladesGramata = () => (
  <SeoLandingLayout
    emoji="📖"
    title="Šokolādes grāmata — dāvanu kastīte ar magnētisku aizdari"
    metaDescription="Šokolādes dāvanu kastīte grāmatas formā ar magnētisku aizdari. Personalizēta šokolāde bibliotēkām, grāmatu konkursiem un literatūras pasākumiem. Premium Beļģu šokolāde."
    intro="Unikāla šokolādes dāvanu kastīte, kas veidota kā grāmata ar magnētisku aizdari — ideāli piemērota bibliotēkām, grāmatu konkursiem un ar literatūru saistītiem pasākumiem. Tā ne tikai iepriecina ar garšu, bet arī rada īpašu pieredzi."
    benefits={[
      "Magnētiskā aizdare — rada \"grāmatas atvēršanas\" sajūtu",
      "Pilnībā personalizējams vāciņš — grāmatas vāks, ilustrācija vai jebkurš dizains",
      "Iekšpusē — šokolādes glezniņa ar detalizētu apdruku, konfektes vai tāfelītes",
      "Plašs garšu klāsts: baltā, piena, tumšā, apelsīnu, zemeņu, karameļu, medus, laima u.c.",
      "Kastīti var atkārtoti aizvērt un saglabāt kā piemiņas priekšmetu",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kas ir šokolādes grāmata?</h3>
      <p>Šī ir īpaša <strong class="text-foreground">šokolādes dāvanu kastīte</strong>, kas ar magnētisku aizdari veidota grāmatas formā. Atvērot kastīti, saņēmējs piedzīvo "grāmatas atvēršanas" sajūtu — eleganti, pārsteidzoši un neaizmirstami.</p>
      <p>Kastītes vāciņu var noformēt kā <strong class="text-foreground">konkrētas grāmatas vāku</strong>, ilustrāciju vai jebkuru citu dizainu. Iekšpusē iespējams ievietot šokolādes glezniņu ar detalizētu apdruku, konfektes ar pildījumu vai šokolādes tāfelītes.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Kam piemērota šokolādes grāmata?</h3>
      <p>Šī formāta šokolāde ir ideāla kā <strong class="text-foreground">balva grāmatu konkursos</strong> un lasīšanas veicināšanas iniciatīvās, kur svarīga ir gan ideja, gan estētika, gan paliekoša vērtība. Tā lieliski piemērota arī bibliotēku pasākumiem, rakstnieku vakariem un literāru festivālu dāvanām.</p>
      <p>Šokolādes grāmata kļūst par <strong class="text-foreground">daļu no stāsta</strong> — dāvanu, ko saņēmējs vēlas saglabāt un rādīt citiem.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Garšu daudzveidība</h3>
      <p>Piedāvājam klasiskās šokolādes — baltā, piena un tumšā, kā arī <strong class="text-foreground">īpašas garšas</strong>: apelsīnu, zemeņu, karameļu, medus, laima un citas, kas ļauj radīt vēl individuālāku un pārsteidzošāku dāvanu.</p>
    `}
    cta="Pasūtiet šokolādes grāmatu savam pasākumam"
    keywords={[
      "šokolādes grāmata", "šokolādes kastīte grāmata", "šokolāde bibliotēkām",
      "dāvana grāmatu konkursam", "personalizēta šokolādes kastīte",
      "chocolate book box", "book shaped chocolate box", "šokolādes dāvana literatūras pasākumam",
      "magnētiskā šokolādes kastīte", "šokolādes grāmatiņa"
    ]}
    faqs={[
      { q: "Kā izskatās šokolādes grāmata?", a: "Tā ir dāvanu kastīte ar magnētisku aizdari, kas veidota kā grāmata. Vāciņu var pilnībā personalizēt — noformēt kā konkrētas grāmatas vāku, ilustrāciju vai jebkuru citu dizainu." },
      { q: "Ko var ievietot kastītes iekšpusē?", a: "Iekšpusē var ievietot šokolādes glezniņu ar detalizētu apdruku, šokolādes konfektes ar pildījumu vai šokolādes tāfelītes — saturu pielāgojam pasākumam vai mērķim." },
      { q: "Kādas garšas ir pieejamas?", a: "Piedāvājam klasiskās — baltā, piena un tumšā šokolāde, kā arī īpašas garšas: apelsīnu, zemeņu, karameļu, medus, laima u.c." },
      { q: "Vai piemērots grāmatu konkursiem un bibliotēkām?", a: "Jā, šis ir viens no populārākajiem formātiem grāmatu un lasīšanas veicināšanas iniciatīvām — tā ir gan balva, gan piemiņas priekšmets." },
      { q: "Kāds ir minimālais pasūtījums?", a: "Minimālais pasūtījums ir no 50 gab. Izgatavošanas laiks — 3–10 darba dienas no dizaina apstiprināšanas." },
      { q: "Vai kastīti var saglabāt kā piemiņu?", a: "Jā, magnētiskā aizdare nodrošina ērtu atkārtotu atvēršanu un aizvēršanu. Daudzi saņēmēji saglabā kastīti kā dekoratīvu piemiņas priekšmetu." },
    ]}
    priceFrom="5.00"
  />
);

export default SokoladesGramata;
