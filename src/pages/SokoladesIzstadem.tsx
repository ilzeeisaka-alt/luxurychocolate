import SeoLandingLayout from "@/components/SeoLandingLayout";

const SokoladesIzstadem = () => (
  <SeoLandingLayout
    emoji="🍫"
    title="Personalizēti saldumi izstādēm un konferenču stendiem"
    metaDescription="Personalizēti saldumi un šokolāde ar logo izstādēm, konferencēm un biznesa pasākumiem. Premium beļģu šokolāde, cepumi, makarūni un kapkeiki ar Jūsu zīmolu."
    intro="Pārvērtiet savu izstādes stendu par kontaktu magnētu ar personalizētiem premium saldumiem. Šokolāde ar logo, cepumi, makarūni un kapkeiki — stratēģisks mārketinga rīks, kas „lauž ledu" un piesaista vērtīgus biznesa kontaktus."
    benefits={[
      "Šokolāde ar logo — klasiskas tāfelītes un pralinē ar tiešo druku uz šokolādes",
      "Personalizēti cepumi, makarūni un kapkeiki ar Jūsu zīmola dizainu",
      "Laimes cepumi ar individuāliem vēstījumiem — interaktīvs mārketinga rīks",
      "Dizaina maketa izstrāde 24 stundu laikā, ražošana no 3 darba dienām",
      "Minimālais pasūtījums no 50 gab. — piemērots jebkura lieluma pasākumam",
      "Droša piegāde ar temperatūras noturīgu iepakojumu visā Baltijā",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc personalizēti saldumi izstādēs darbojas?</h3>
      <p>Konferenču un izstāžu vidē cīņa par apmeklētāju uzmanību ir milzīga. <strong class="text-foreground">Premium beļģu šokolāde ar logo</strong> rada tūlītēju pozitīvu asociāciju ar Jūsu zīmolu — apmeklētājs apstājas estētikas dēļ un paliek garšas dēļ. Šis mirklis ir Jūsu „zelta logs" sarunai.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Stratēģija: No salduma līdz kontaktam</h3>
      <p>Piedāvājiet ekskluzīvu šokolādes komplektu apmaiņā pret vizītkarti vai QR kodu skenēšanu. Izmantojiet <strong class="text-foreground">laimes cepumus</strong> kā loterijas elementu vai izvietojiet zīmolotus kapkeikus uz daudzstāvu statīviem kā vizuālu magnētu.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Perfekti piemērots</h3>
      <p>Tehnoloģiju uzņēmumiem ar QR kodiem, farmācijas nozarei ar elegantiem individuālajiem iepakojumiem, finanšu sektoram ar ekskluzīvām pralinē kārbām un jaunuzņēmumiem ar radošiem laimes cepumiem.</p>
    `}
    cta="Pasūtiet personalizētus saldumus savam stendam"
    keywords={[
      "personalizēti saldumi izstādēm", "šokolāde ar logo konferencēm", "reklāmas saldumi izstādēm",
      "biznesa dāvanas konferencēm", "personalizēti cepumi ar logo", "laimes cepumi ar logo",
      "makarūni ar logo", "kapkeiki izstādēm", "izstāžu mārketings", "lead generation izstādēs",
      "konferenču stenda saldumi", "premium saldumi biznesa pasākumiem"
    ]}
    faqs={[
      { q: "Cik laicīgi jāveic pasūtījums pirms izstādes?", a: "Iesakām sazināties vismaz 2–3 nedēļas iepriekš. Steidzamos gadījumos spējam apstrādāt arī ātrākus pasūtījumus." },
      { q: "Kāds ir minimālais pasūtījuma apjoms?", a: "Atkarīgs no produkta veida. Šokolāde ar logo pieejama no 50–100 vienībām." },
      { q: "Vai saldumi neizkusīs karstā izstāžu zālē?", a: "Izmantojam speciālu temperatūras noturīgu iepakojumu un sniedzam rekomendācijas uzglabāšanai stendā." },
      { q: "Vai var personalizēt arī iepakojumu?", a: "Jā, piedāvājam gan tiešo druku uz saldumiem, gan pilnībā pielāgotas kārbiņas, etiķetes un lentītes Jūsu zīmola krāsās." },
      { q: "Kādus saldumu veidus piedāvājat izstādēm?", a: "Šokolādes ar logo, personalizētus cepumus, makarūnus, kapkeikus un laimes cepumus ar individuāliem vēstījumiem." },
    ]}
  />
);

export default SokoladesIzstadem;
