import SeoLandingLayout from "@/components/SeoLandingLayout";

const SokoladesKonferencem = () => (
  <SeoLandingLayout
    emoji="🎤"
    title="Šokolādes konferencēm un pasākumiem"
    metaDescription="Personalizētas šokolādes konferencēm, semināriem un biznesa pasākumiem. Premium šokolāde ar Jūsu logo — ideāla dāvana dalībniekiem."
    intro="Personalizētas šokolādes ar Jūsu uzņēmuma logo vai pasākuma dizainu — elegants veids, kā izcelt konferenci un atstāt paliekošu iespaidu uz dalībniekiem."
    benefits={[
      "Mazas šokolādes tāfelītes (5–10g) — ideālas izdalīšanai reģistrācijā",
      "Pilnkrāsu apdruka ar konferences logo vai tematisko dizainu",
      "Individuāli iepakojumi ar pasākuma programmu vai QR kodu",
      "Ātra izgatavošana — 3–10 darba dienas",
      "Minimālais pasūtījums no 50 gab. — piemērots jebkura lieluma pasākumam",
    ]}
    body={`
      <h3 class="text-xl font-medium text-foreground mb-3">Kāpēc šokolāde konferencēm?</h3>
      <p>Konferences un biznesa pasākumi ir vieta, kur <strong class="text-foreground">Jūsu zīmols</strong> tiekas ar potenciālajiem klientiem un partneriem. Personalizēta šokolāde ar logo ir neliela, bet iespaidīga detaļa, kas padara pasākumu neaizmirstamu.</p>
      <p>Dalībnieki bieži paņem šokolādi līdzi — tā kļūst par <strong class="text-foreground">miniatro reklāmas nesēju</strong>, kas ceļo tālāk par konferences zāli.</p>
      <h3 class="text-xl font-medium text-foreground mb-3 mt-6">Populāri izmantošanas veidi</h3>
      <p>Mūsu klienti izmanto personalizētās šokolādes kā <em>welcome gift</em> reģistrācijas laikā, kafijas paužu uzkodu, VIP dāvanu komplektu daļu un kā pateicību runātājiem un sponsoriem.</p>
    `}
    cta="Pasūtiet šokolādes savam pasākumam"
    keywords={[
      "šokolādes konferencēm", "šokolāde biznesa pasākumiem", "dāvanas konferences dalībniekiem",
      "conference chocolate gifts", "event branded chocolate", "pasākumu šokolāde ar logo",
      "šokolāde semināriem", "personalizēta šokolāde pasākumiem"
    ]}
    faqs={[
      { q: "Cik mazas šokolādes tāfelītes var pasūtīt konferencei?", a: "Piedāvājam šokolādes no 5g — ideālas izdalīšanai lielos pasākumos. Minimālais pasūtījums ir 50 gab." },
      { q: "Vai var uzdrukāt konferences logo, nevis uzņēmuma logo?", a: "Jā, varam uzdrukāt jebkuru dizainu — konferences logo, tematisko grafiku vai pat QR kodu." },
      { q: "Cik ātri var sagatavot pasūtījumu konferencei?", a: "Standarta izgatavošana ir 3–10 darba dienas. Steidzamiem pasūtījumiem iespējama ātrāka izpilde." },
      { q: "Vai var pievienot individuālu iepakojumu ar pasākuma info?", a: "Jā, piedāvājam pilnībā personalizētus iepakojumus — ar konferences programmu, datumu vai QR kodu." },
      { q: "Kādas šokolādes garšas ir pieejamas?", a: "Piedāvājam piena, tumšo un balto premium Beļģu šokolādi. Iespējamas arī īpašas garšas pēc pieprasījuma." },
    ]}
  />
);

export default SokoladesKonferencem;
