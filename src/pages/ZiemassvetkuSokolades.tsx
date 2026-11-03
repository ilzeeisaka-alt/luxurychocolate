import SeoLandingLayout from "@/components/SeoLandingLayout";
import MagnetBoxSection from "@/components/MagnetBoxSection";

const ZiemassvētkuŠokolādes = () => (
  <SeoLandingLayout
    emoji="🎄"
    title="Ziemassvētku un Jaunā Gada Šokolādes Dāvanas"
    metaDescription="Ziemassvētku un Jaunā Gada Šokolādes Dāvanas ar uzņēmuma logo. Personalizēta Beļģu šokolāde elegantās kastēs klientiem, partneriem un darbiniekiem."
    intro="Ziemassvētku un Jaunā Gada Šokolādes Dāvanas ar uzņēmuma logo — personalizēta Beļģu šokolāde elegantās dāvanu kastēs. Pateicībai klientiem, partneriem un darbiniekiem par veiksmīgu sadarbību."
    benefits={[
      "Svētku tematisks dizains ar Jūsu uzņēmuma logo",
      "Premium Beļģu šokolāde elegantā svētku iepakojumā",
      "Piemērots kā korporatīvā Ziemassvētku dāvana klientiem",
      "Piegāde visā Latvijā un Eiropā",
      "Iespēja pievienot personalizētu apsveikuma kartīti",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc šokolāde ir ideāla Ziemassvētku dāvana?</h3>
      <p><strong class="text-foreground">Personalizētas šokolādes ar logo</strong> ir eleganta un universāla dāvana, kas apvieno svētku noskaņu ar uzņēmuma identitāti. Premium šokolādes ar personalizētu apdruku ir populāra izvēle uzņēmumiem, kas vēlas radīt īpašu iespaidu.</p>
      <p>Šādas dāvanas bieži tiek izmantotas <strong class="text-foreground">klientu dāvanām</strong>, partneru sveicieniem un uzņēmuma svētku komplektiem.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Ziemassvētku šokolādes ar logo</h3>
      <p><strong class="text-foreground">Ziemassvētku šokolādes ar logo</strong> var būt lielisks risinājums gan nelielām dāvanām, gan lielākiem korporatīvajiem projektiem. Personalizēta šokolāde palīdz uzņēmumiem radīt siltu svētku atmosfēru un vienlaikus stiprināt zīmola atpazīstamību.</p>
      <p>Mēs piedāvājam īpašus <strong class="text-foreground">svētku kolekcijas iepakojumus</strong> — no elegantām kastītēm līdz adventes kalendāriem ar Jūsu brendingu.</p>
    `}
    extraSection={<MagnetBoxSection />}
    extraSectionPosition="after-hero"
    introPosition="after-extra"
    cta="Pasūtiet Ziemassvētku šokolādes"
    keywords={[
      "Ziemassvētku un Jaunā Gada Šokolādes Dāvanas", "Jaunā gada šokolādes dāvanas",
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
