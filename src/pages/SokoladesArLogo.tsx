import SeoLandingLayout from "@/components/SeoLandingLayout";

const SokoladesArLogo = () => (
  <SeoLandingLayout
    emoji="🍫"
    title="Šokolādes ar logo"
    metaDescription="Šokolādes ar uzņēmuma logo – personalizētas korporatīvās dāvanas klientiem, partneriem un konferencēm. Premium šokolāde ar individuālu apdruku."
    intro="Personalizētas šokolādes ar Jūsu uzņēmuma logo — elegants veids, kā izcelt savu zīmolu un atstāt neaizmirstamu iespaidu uz klientiem un partneriem."
    benefits={[
      "Premium Beļģu šokolāde ar individuālu apdruku",
      "Pilnkrāsu logo apdruka tieši uz šokolādes virsmas",
      "Izgatavošana no 50 gab. — ideāli arī mazākiem pasūtījumiem",
      "Dažādas formas: klasiskā tāfelīte, konfektes, medaljoni",
      "Elegants iepakojums ar Jūsu brendingu",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kā izskatās šokolāde ar logo?</h3>
      <p>Jūsu uzņēmuma logo tiek uzdrukāts tieši uz <strong class="text-foreground">šokolādes virsmas</strong>, izmantojot pārtikas drošu apdruku. Rezultāts — izsmalcināta, garšīga un vizuāli iespaidīga korporatīvā dāvana.</p>
      <p>Mūsu klienti izmanto <strong class="text-foreground">šokolādes ar logo</strong> konferencēs, klientu tikšanās, uzņēmuma jubileju pasākumos un kā VIP viesmīlības elementu.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Ideāli piemērots</h3>
      <p>Šokolādes ar uzņēmuma logo ir lieliska izvēle gan <em>corporate chocolate gifts</em>, gan <em>branded chocolate</em> vajadzībām — neatkarīgi no tā, vai tas ir mazs pasākums vai starptautiska kampaņa.</p>
    `}
    cta="Pasūtiet šokolādes ar Jūsu logo"
    keywords={[
      "šokolāde ar logo", "šokolādes ar apdruku", "šokolādes ar uzņēmuma logo",
      "custom chocolate with logo", "branded chocolate", "logo chocolate",
      "personalizētas šokolādes", "korporatīvās šokolādes"
    ]}
    faqs={[
      { q: "Kā logo tiek uzdrukāts uz šokolādes?", a: "Logo tiek uzdrukāts ar pārtikas drošu pilnkrāsu apdruku tieši uz šokolādes virsmas. Apdruka ir bez garšas un pilnībā droša." },
      { q: "Kādas šokolādes formas ir pieejamas?", a: "Piedāvājam klasiskās tāfelītes, konfektes, medaljonus un individuālas formas. Katru var papildināt ar Jūsu logo." },
      { q: "Kāds ir minimālais pasūtījums?", a: "Minimālais pasūtījums ir no 50 gab. — piemērots gan mazākiem pasākumiem, gan lielām kampaņām." },
      { q: "Cik ilgi aizņem izgatavošana?", a: "Standarta izgatavošanas laiks ir 3–10 darba dienas no dizaina apstiprināšanas brīža." },
      { q: "Vai var pievienot arī personalizētu iepakojumu?", a: "Jā, piedāvājam pilnībā personalizētus iepakojumus ar Jūsu brendingu — kastītes, lentītes un iesaiņojumu." },
    ]}
  />
);

export default SokoladesArLogo;
