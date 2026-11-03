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