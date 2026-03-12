import SeoLandingLayout from "@/components/SeoLandingLayout";

const SokoladesDarbiniekiem = () => (
  <SeoLandingLayout
    emoji="👥"
    title="Šokolādes dāvanas darbiniekiem"
    metaDescription="Personalizētas šokolādes dāvanas darbiniekiem — ar uzņēmuma logo vai individuālu dizainu. Ideālas Ziemassvētkiem, jubilejai un ikdienas pateicībai."
    intro="Pateicieties saviem darbiniekiem ar ekskluzīvu, personalizētu šokolādes dāvanu — elegants žests, kas stiprina komandas garu un parāda, ka novērtējat viņu ieguldījumu."
    benefits={[
      "Premium Beļģu šokolāde elegantā dāvanu iepakojumā",
      "Personalizēta apdruka ar uzņēmuma logo vai individuālu vēlējumu",
      "Piemērota Ziemassvētkiem, darba jubilejai, Team building pasākumiem",
      "Dažādi formāti — no nelielas šokolādes līdz luksus dāvanu kastītēm",
      "Piegāde uz biroju vai individuāli katram darbiniekam",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc šokolāde darbiniekiem?</h3>
      <p><strong class="text-foreground">Darbinieku novērtēšana</strong> ir viens no svarīgākajiem faktoriem komandas lojalitātei. Personalizēta šokolādes dāvana ar uzņēmuma logo vai individuālu apsveikumu ir neliels, bet nozīmīgs žests.</p>
      <p>Pētījumi rāda, ka darbinieki, kuri jūtas novērtēti, ir <strong class="text-foreground">produktīvāki un lojālāki</strong>. Šokolādes dāvana ir vienkāršs veids, kā to parādīt.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populāri gadījumi</h3>
      <p>Mūsu klienti pasūta personalizētās šokolādes <em>Ziemassvētku dāvanām</em>, darba jubileju atzīmēšanai, jaunu darbinieku welcome kit komplektiem un ikdienas pateicībai par izciliem rezultātiem.</p>
    `}
    cta="Pasūtiet dāvanas savai komandai"
    keywords={[
      "šokolādes dāvanas darbiniekiem", "korporatīvās dāvanas darbiniekiem",
      "darbinieku dāvanas ar logo", "employee chocolate gifts", "corporate employee gifts",
      "Ziemassvētku dāvanas darbiniekiem", "team gifts chocolate", "darbinieku novērtēšana"
    ]}
    faqs={[
      { q: "Vai var piegādāt šokolādi katram darbiniekam individuāli?", a: "Jā, piedāvājam individuālu piegādi katram darbiniekam uz mājas adresi vai biroju." },
      { q: "Vai var pievienot personalizētu apsveikuma kartīti?", a: "Jā, katrai dāvanai var pievienot personalizētu kartīti ar Jūsu vēlējumu un darbinieka vārdu." },
      { q: "Kādi dāvanu komplekti ir pieejami?", a: "Piedāvājam no nelielām šokolādes tāfelītēm līdz luksus dāvanu kastītēm ar praļiņu izlasi un personalizētu iepakojumu." },
      { q: "Vai piemērots arī nelielām komandām?", a: "Jā, minimālais pasūtījums ir no 50 gab., bet varam piedāvāt risinājumus arī mazākām komandām." },
      { q: "Cik ilgi pirms Ziemassvētkiem jāpasūta?", a: "Iesakām pasūtīt vismaz 2–3 nedēļas pirms svētkiem, lai nodrošinātu savlaicīgu piegādi." },
    ]}
  />
);

export default SokoladesDarbiniekiem;
