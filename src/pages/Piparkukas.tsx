import SeoLandingLayout from "@/components/SeoLandingLayout";
import GingerbreadSection from "@/components/GingerbreadSection";

const Piparkukas = () => (
  <SeoLandingLayout
    emoji="🎄"
    title="Piparkūkas ar logo — Ziemassvētku piparkūkas ar apdruku"
    metaDescription="Ziemassvētku piparkūkas ar uzņēmuma logo un personalizētu apdruku. Piparkūku kārbas un maisiņi ar lentīti korporatīvajām dāvanām. Piegāde Latvijā un ES."
    intro="Personalizētas Ziemassvētku piparkūkas ar Jūsu logo vai apsveikumu — garšīga un svētku noskaņas pilna dāvana klientiem, partneriem un darbiniekiem."
    benefits={[
      "Piparkūkas ar apdrukātu logo vai svētku tekstu",
      "Kārbas un maisiņi ar lentīti, 3 cm un 9 cm izmēri",
      "Bezmaksas dizaina skice 24 stundu laikā",
      "Pasūtījumi jau no 1 gabala",
      "Piegāde visā Latvijā un Eiropā",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Piparkūkas ar logo korporatīvajām dāvanām</h3>
      <p><strong class="text-foreground">Piparkūkas ar apdruku</strong> ir tradicionāla un mīļa Ziemassvētku dāvana, kas lieliski izceļ uzņēmuma zīmolu. Katru piparkūku var apdrukāt ar Jūsu logo, apsveikumu vai svētku tematiku.</p>
      <p>Piedāvājam <strong class="text-foreground">piparkūku kārbas</strong> un maisiņus ar lentīti — gatavas pasniegšanai klientiem un darbiniekiem.</p>
    `}
    cta="Pasūtiet piparkūkas ar logo"
    keywords={["piparkūkas ar logo", "piparkūkas ar apdruku", "Ziemassvētku piparkūkas", "personalizētas piparkūkas", "korporatīvās Ziemassvētku dāvanas", "gingerbread with logo"]}
    extraSection={<GingerbreadSection showHeading={false} />}
    extraSectionPosition="after-hero"
    faqs={[
      { q: "Vai uz piparkūkām var apdrukāt logo?", a: "Jā, apdrukājam logo, tekstu vai svētku zīmējumu ar pārtikas krāsām." },
      { q: "Kad jāpasūta Ziemassvētku piparkūkas?", a: "Iesakām pasūtīt vismaz 2–3 nedēļas pirms svētkiem." },
    ]}
  />
);

export default Piparkukas;
