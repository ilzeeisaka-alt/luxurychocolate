import SeoLandingLayout from "@/components/SeoLandingLayout";

const KlientuDavanas = () => (
  <SeoLandingLayout
    emoji="🏢"
    title="Šokolādes klientu dāvanām"
    metaDescription="Premium šokolādes dāvanas klientiem un partneriem. Personalizēta apdruka ar logo, elegants iepakojums, piegāde."
    intro="Parādiet saviem klientiem un biznesa partneriem, cik viņi ir svarīgi — ar personalizētu, izsmalcinātu šokolādes dāvanu, kas nes Jūsu uzņēmuma identitāti."
    benefits={[
      "Premium Beļģu šokolāde ekskluzīvā iepakojumā",
      "Personalizēts dizains ar uzņēmuma logo un vēstījumu",
      "Piemērots jebkurai biznesa situācijai — no tikšanās līdz jubilejai",
      "Iespēja pievienot personalizētu kartīti vai vēstuli",
      "Piegāde visā pasaulē — arī starptautiskiem partneriem",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc šokolāde ir labākā klientu dāvana?</h3>
      <p><strong class="text-foreground">Korporatīvās šokolādes dāvanas</strong> ir universālas, elegantas un vienmēr tiek novērtētas. Atšķirībā no standarta suvenīriem, personalizēta šokolāde ar logo ir unikāla un parāda augstu uzmanību detaļām.</p>
      <p>Mūsu klienti pasūta <strong class="text-foreground">šokolādes klientu dāvanām</strong> gan ikdienas biznesa tikšanām, gan nozīmīgiem notikumiem — līgumu parakstīšanai, gada beigu pateicības dāvanām vai uzņēmuma jubileju svinēšanai.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Ko mēs piedāvājam</h3>
      <p>No elegantām šokolādes kastītēm ar 4–24 konfektēm līdz ekskluzīvām VIP dāvanu kolekcijām — mēs izgatavosim ideālu <em>corporate gift</em> Jūsu vajadzībām. Pieejami arī <em>corporate chocolate gifts</em> ar starptautisku piegādi.</p>
    `}
    cta="Pasūtiet klientu dāvanas"
    keywords={[
      "klientu dāvanas", "šokolādes klientu dāvanām", "korporatīvās dāvanas",
      "corporate gifts", "corporate chocolate gifts", "biznesa dāvanas",
      "dāvanas partneriem", "VIP klientu dāvanas", "personalizētas dāvanas uzņēmumiem"
    ]}
  />
);

export default KlientuDavanas;
