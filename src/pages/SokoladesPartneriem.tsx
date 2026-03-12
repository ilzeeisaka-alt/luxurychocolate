import SeoLandingLayout from "@/components/SeoLandingLayout";

const SokoladesPartneriem = () => (
  <SeoLandingLayout
    emoji="🤝"
    title="Šokolādes dāvanas partneriem"
    metaDescription="Ekskluzīvas šokolādes dāvanas biznesa partneriem ar Jūsu logo. Premium korporatīvā dāvana, kas stiprina biznesa attiecības un pauž profesionālu cieņu."
    intro="Ekskluzīva šokolādes dāvana ar Jūsu uzņēmuma logo — izsmalcināts žests, kas pauž profesionālu cieņu un stiprina ilgtermiņa biznesa attiecības ar Jūsu partneriem."
    benefits={[
      "Premium Beļģu šokolāde luksus dāvanu kastītē",
      "Personalizēta apdruka ar Jūsu uzņēmuma logo un dizainu",
      "Elegants iepakojums — piemērots augstākā līmeņa biznesa dāvanai",
      "Dažādi šokolādes veidi — piena, tumšā, baltā un praļiņu izlase",
      "Piegāde visā pasaulē — ideāli starptautiskiem partneriem",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc šokolāde partneriem?</h3>
      <p><strong class="text-foreground">Biznesa partneriem</strong> dāvana ir vairāk nekā žests — tā ir komunikācija. Personalizēta premium šokolāde ar Jūsu logo pauž kvalitāti, uzmanību detaļām un profesionālu pieeju.</p>
      <p>Atšķirībā no standarta korporatīvajām dāvanām, šokolāde ir universāli novērtēta un <strong class="text-foreground">atstāj pozitīvu garšas atmiņu</strong>, kas asociējas ar Jūsu zīmolu.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Kad dāvināt partneriem?</h3>
      <p>Ideāli piemērotas līguma parakstīšanas svinībām, gada beigu pateicībai, Ziemassvētku apsveikumiem, uzņēmuma jubilejas pasākumiem un kā <em>welcome gift</em> jauniem biznesa partneriem.</p>
    `}
    cta="Pasūtiet dāvanas partneriem"
    keywords={[
      "šokolādes dāvanas partneriem", "korporatīvās dāvanas partneriem",
      "biznesa dāvanas ar logo", "partner gifts chocolate", "corporate partner gifts",
      "premium biznesa dāvanas", "ekskluzīvas dāvanas partneriem", "VIP dāvanas"
    ]}
    faqs={[
      { q: "Kādus dāvanu komplektus piedāvājat partneriem?", a: "Piedāvājam luksus kastītes ar praļiņu izlasi, premium tāfelītes ar logo un individuāli veidotus dāvanu komplektus ar personalizētu iepakojumu." },
      { q: "Vai var piegādāt starptautiskiem partneriem?", a: "Jā, mēs piegādājam uz vairāk nekā 30 valstīm visā pasaulē, ieskaitot ES, UK, ASV un Āziju." },
      { q: "Vai var pievienot personalizētu vēstuli?", a: "Jā, katrai dāvanai var pievienot eleganti noformētu vēstuli ar Jūsu uzņēmuma brendingu un personalizētu tekstu." },
      { q: "Kāds ir piemērots budžets partneru dāvanai?", a: "Piedāvājam risinājumus dažādiem budžetiem — no nelielām elegantām šokolādēm līdz premium luksus komplektiem." },
      { q: "Cik ātri var sagatavot pasūtījumu?", a: "Standarta izgatavošana ir 3–10 darba dienas. VIP pasūtījumiem iespējama prioritāra apstrāde." },
    ]}
  />
);

export default SokoladesPartneriem;
