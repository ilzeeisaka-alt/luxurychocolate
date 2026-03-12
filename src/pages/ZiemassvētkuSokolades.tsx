import SeoLandingLayout from "@/components/SeoLandingLayout";

const ZiemassvētkuŠokolādes = () => (
  <SeoLandingLayout
    emoji="🎄"
    title="Ziemassvētku korporatīvās šokolādes ar logo"
    metaDescription="Ziemassvētku korporatīvās šokolādes ar Jūsu logo. Eleganta dāvana klientiem un partneriem svētku sezonā."
    intro="Svētku laiks ir ideāla iespēja pateikt paldies saviem klientiem un partneriem ar ekskluzīvu, personalizētu šokolādes dāvanu ar Jūsu uzņēmuma logo."
    benefits={[
      "Svētku tematisks dizains ar Jūsu logo",
      "Premium Beļģu šokolāde elegantā svētku iepakojumā",
      "Piemērots kā korporatīvā Ziemassvētku dāvana klientiem",
      "Piegāde visā Latvijā un Eiropā",
      "Iespēja pievienot personalizētu apsveikuma kartīti",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc šokolāde ir ideāla Ziemassvētku dāvana?</h3>
      <p><strong class="text-foreground">Korporatīvās Ziemassvētku šokolādes</strong> ir universāla un izsmalcināta dāvana, kas vienmēr atstāj pozitīvu iespaidu. Atšķirībā no standarta suvenīriem, personalizēta šokolāde ar logo izceļ Jūsu zīmolu un parāda rūpes par saņēmēju.</p>
      <p>Mēs piedāvājam īpašus <strong class="text-foreground">svētku kolekcijas iepakojumus</strong> — no elegantām kastītēm līdz adventes kalendāriem ar Jūsu brendingu.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populārākie varianti</h3>
      <p>Uzņēmumi visbiežāk izvēlas svētku šokolādes komplektus ar 6–24 konfektēm, šokolādes tāfelītes ar logo vai personalizētus adventes kalendārus — ideālas <em>corporate Christmas gifts</em> un <em>holiday corporate chocolate</em> vajadzībām.</p>
    `}
    cta="Pasūtiet Ziemassvētku šokolādes"
    keywords={[
      "Ziemassvētku korporatīvās dāvanas", "Ziemassvētku šokolādes ar logo",
      "korporatīvās Ziemassvētku šokolādes", "corporate Christmas gifts",
      "holiday corporate chocolate", "svētku dāvanas uzņēmumiem",
      "Christmas chocolate with logo"
    ]}
    faqs={[
      { q: "Kad jāpasūta Ziemassvētku šokolādes?", a: "Iesakām pasūtīt vismaz 2–3 nedēļas pirms svētkiem. Sezonas laikā pieprasījums ir liels, tāpēc agrāka pasūtīšana garantē savlaicīgu piegādi." },
      { q: "Vai pieejami svētku tematiski dizaini?", a: "Jā, piedāvājam gatavus svētku dizainus vai izstrādājam individuālu noformējumu ar Jūsu logo un svētku elementiem." },
      { q: "Vai var pasūtīt adventes kalendārus ar logo?", a: "Jā, personalizēti adventes kalendāri ar premium šokolādi un Jūsu brendingu ir viens no populārākajiem svētku produktiem." },
      { q: "Kāds ir minimālais pasūtījums svētku šokolādēm?", a: "Minimālais pasūtījums ir no 50 gab. Lielākiem pasūtījumiem piedāvājam atlaides." },
      { q: "Vai piegādājat arī ārpus Latvijas?", a: "Jā, piegādājam visā Eiropā un uz vairāk nekā 30 valstīm pasaulē." },
    ]}
  />
);

export default ZiemassvētkuŠokolādes;
