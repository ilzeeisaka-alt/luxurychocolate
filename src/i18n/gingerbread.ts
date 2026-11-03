type GingerbreadContent = { title: string; description: string; shop: string };

const content: Record<string, GingerbreadContent> = {
  lv: { title: "Piparkūkas", description: "Piparkūkas ar apdrukātu šokolādi un Jūsu uzņēmuma logo. Ziemassvētku un Jaunā gada dāvanām.", shop: "Apskatīt piparkūkas veikalā" },
  en: { title: "Gingerbread", description: "Gingerbread with printed chocolate and your company logo. For Christmas and New Year gifts.", shop: "Shop gingerbread" },
  ru: { title: "Пряники", description: "Пряники с печатью на шоколаде и логотипом вашей компании. Для рождественских и новогодних подарков.", shop: "Посмотреть пряники в магазине" },
  et: { title: "Piparkoogid", description: "Piparkoogid trükitud šokolaadi ja teie ettevõtte logoga. Jõulu- ja uusaastakingitusteks.", shop: "Vaata piparkooke e-poes" },
  lt: { title: "Meduoliai", description: "Meduoliai su spausdintu šokoladu ir jūsų įmonės logotipu. Kalėdų ir Naujųjų metų dovanoms.", shop: "Peržiūrėti meduolius parduotuvėje" },
  de: { title: "Lebkuchen", description: "Lebkuchen mit bedruckter Schokolade und Ihrem Firmenlogo. Für Weihnachts- und Neujahrsgeschenke.", shop: "Lebkuchen im Shop ansehen" },
  fr: { title: "Pain d’épices", description: "Pain d’épices avec chocolat imprimé et votre logo. Pour les cadeaux de Noël et du Nouvel An.", shop: "Voir les pains d’épices" },
  it: { title: "Pan di zenzero", description: "Biscotti di pan di zenzero con cioccolato stampato e il vostro logo. Per regali di Natale e Capodanno.", shop: "Vedi i biscotti nel negozio" },
  es: { title: "Pan de jengibre", description: "Galletas de jengibre con chocolate impreso y su logotipo. Para regalos de Navidad y Año Nuevo.", shop: "Ver galletas en la tienda" },
};

export const gingerbreadContent = (lang: string): GingerbreadContent => content[lang] ?? content.en;

const photoCaptions: Record<string, { title: string; description: string }[]> = {
  lv: [
    { title: "Piparkūkas ar uzņēmuma logo", description: "Apaļas piparkūkas ar apdrukātu šokolādi un personalizētu logo uz sarkana svētku fona." },
    { title: "Salds mirklis pie kafijas", description: "Piparkūkas ar logo un sarkana kafijas krūze — svētku noskaņa pie kafijas galda." },
    { title: "Svētku piparkūkas ar lentīti", description: "Egles, zvaigznes un mājiņas formas piparkūkas caurspīdīgos maisiņos ar sarkanām lentītēm." },
    { title: "Piparkūku zvaigzne", description: "Zvaigznes formas piparkūka ar baltu glazūru un uzņēmuma logo centrā." },
    { title: "Krāsaina piparkūku eglīte", description: "Egles formas piparkūka ar krāsainu glazūras rotājumu un personalizētu logo." },
    { title: "Piparkūkas svētku galdam", description: "Sarkanā un zaļā krāsā dekorētas, iesaiņotas piparkūkas blakus svinīgai dzēriena krūzei." },
    { title: "Individuāli iesaiņotas piparkūkas", description: "Divas piparkūkas ar apdrukātu šokolādi un WOW air logo caurspīdīgā iepakojumā." },
  ],
  en: [
    { title: "Gingerbread with your company logo", description: "Round gingerbread cookies with printed chocolate and a personalised logo on a red festive background." },
    { title: "A sweet coffee moment", description: "Logo gingerbread and a red coffee cup bring a festive touch to the coffee table." },
    { title: "Ribbon-wrapped festive gingerbread", description: "Tree, star and house-shaped gingerbread in clear bags tied with red ribbons." },
    { title: "Gingerbread star", description: "A star-shaped gingerbread cookie with white icing and a company logo in the centre." },
    { title: "Colourful gingerbread tree", description: "Tree-shaped gingerbread decorated with colourful icing and a personalised logo." },
    { title: "Gingerbread for the festive table", description: "Wrapped gingerbread decorated in red and green beside a festive drinks cup." },
    { title: "Individually wrapped gingerbread", description: "Two gingerbread cookies with printed chocolate and the WOW air logo in clear packaging." },
  ],
  ru: [
    { title: "Пряники с логотипом компании", description: "Круглые пряники с печатью на шоколаде и персональным логотипом на красном праздничном фоне." },
    { title: "Сладкий момент за кофе", description: "Пряники с логотипом и красная чашка кофе создают праздничное настроение." },
    { title: "Праздничные пряники с лентой", description: "Пряники в форме ёлки, звезды и домика в прозрачных пакетах с красными лентами." },
    { title: "Пряничная звезда", description: "Пряник в форме звезды с белой глазурью и логотипом компании в центре." },
    { title: "Красочная пряничная ёлка", description: "Пряник в форме ёлки с разноцветной глазурью и персональным логотипом." },
    { title: "Пряники для праздничного стола", description: "Упакованные пряники с красным и зелёным декором рядом с праздничной чашкой." },
    { title: "Пряники в индивидуальной упаковке", description: "Два пряника с печатью на шоколаде и логотипом WOW air в прозрачной упаковке." },
  ],
};

export const gingerbreadPhotoCaptions = (lang: string) => photoCaptions[lang] ?? photoCaptions.en;