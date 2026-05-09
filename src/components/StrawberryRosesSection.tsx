import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import strawberryImg from "@/assets/strawberries/zemenes-sokolade.jpg";

const images = [strawberryImg];
const items = [
  {
    title: "Zemenes šokolādē ar sarkanām rozēm",
    description: "Svaigas zemenes, pārklātas ar premium Beļģu šokolādi, dekorētas ar Oreo, avenēm, mellenēm un dzīvām sarkanām rozēm — luksusa dāvanu kaste īpašiem mirkļiem.",
    alt: "Zemenes šokolādē ar sarkanām rozēm dāvanu kastē",
  },
];

const StrawberryRosesSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="zemenes-sokolade"
        className="py-24 bg-muted"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Heart className="w-4 h-4" />
              Romantiska dāvana
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              Zemenes šokolādē & sarkanās rozes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Svaigas zemenes pārklātas premium Beļģu šokolādē, kombinētas ar dzīvām sarkanām rozēm —
              ideāla dāvana Valentīndienai, dzimšanas dienām, jubilejām un īpašiem pasākumiem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl overflow-hidden bg-card"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/video/zemenes-sokolade-rozes.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">Zemenes šokolādē & rozes — video</p>
              </div>
            </motion.div>

            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative bg-card rounded-xl overflow-hidden cursor-pointer group h-full"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette photo-gradient-gold">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.15]"
                    />
                    <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3]">
                    <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Svaigas zemenes", desc: "Atlasītas, sulīgas zemenes pārklātas Beļģu šokolādē" },
              { title: "Dzīvas rozes", desc: "Dekorētas ar īstām sarkanām rozēm — luksusa pieskāriens" },
              { title: "Eleganta kaste", desc: "Premium dāvanu iepakojums īpašiem mirkļiem" },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-5 text-center"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="text-base font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Story / Copywriting */}
          <div className="max-w-4xl mx-auto mt-20 space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl text-foreground mb-3">
                🍓 Dāvanu kastes ar Grieķu svaigām zemenēm Beļģu piena šokolādē
                <br />
                <span className="text-primary">🌹 & sarkani Kenijas / Ekvadoras rožu pušķi</span>
              </h3>
              <p className="text-lg text-muted-foreground italic">
                Zemene + Šokolāde + Roze = Matemātika, kas strādā
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  text: "Mūsu dāvanu kaste ir kā supervaroņa apmetnis — izskatās lieliski, glābj situāciju un padara tevi par iecienītāko cilvēku telpā.",
                },
                {
                  text: "Brīdinājums: Pēc šīs kastes pasniegšanas vari sagaidīt apmulsušu smaidu, pāris asaras un jautājumu „Kur tu to dabūji?!\"",
                },
                {
                  text: "Blakusparādības: Neizbēgama mīlestība, pacilāts garastāvoklis un vēlme pasūtīt vēlreiz. Mātes dienai. Dzimšanas/vārda dienai. Vai vienkārši — jo vari. 🎁",
                },
                {
                  text: "Viņa gaida kaut ko īpašu. Tu zini, ko darīt. Sulīga zemene, kas kūst šokolādē, un roze, kas smaržo pēc tālas saules. Tas vienkārši jājūt.",
                },
              ].map((q, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-6"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <p className="text-foreground leading-relaxed">{q.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h4 className="text-xl font-bold text-foreground mb-2">🍓 Grieķu zemenes</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Svaigākās zemenes no Grieķijas saulainajiem laukiem, iemērktas Beļģijas piena
                  šokolādē tā, ka pat Grieķu dievi gribētu pieteikties uz abonementu.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h4 className="text-xl font-bold text-foreground mb-2">🌹 Kenijas & Ekvadoras rozes</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Audzētas tur, kur neviens netaisa selfijus ar laistīšanas kannu. Nogādātas šeit,
                  lai tas svarīgais cilvēks zinātu: tu pēcpusdienu pavadīji domājot par viņu, nevis
                  Netflix.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl text-foreground text-center mb-2">
                Ko saka tie, kas jau pasniedza
              </h3>
              <p className="text-center text-muted-foreground mb-8 italic">
                Dāvana, ko sajutīs ar visām maņām — svaigums, smarža un baudījums.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    quote:
                      "Iedevu kastīti ar zemenēm šokolādē. Viņa teica: „Tu esi labākais.\" Nekad nav bijis labākais. Zemenes Šokolādē darbojas.",
                    author: "Raimonds, 41 g., pārliecināts skeptiķis (bija)",
                  },
                  {
                    quote:
                      "Rozes no Ekvadoras. Partnere jautāja, vai esmu pats audzējis. Teicu — gandrīz. Attiecības uzlabojās.",
                    author: "Jānis, projektmenedžeris, pilsētas cilvēks",
                  },
                  {
                    quote:
                      "Pasūtīju sev pašai. Nav kauna. Beļģu šokolāde + grieķu zemenes = vakara plāns ar grāmatu. Ieteicams.",
                    author: "Kristīne, 34 g., neatkarīga domātāja",
                  },
                  {
                    quote:
                      "Māte atvēra kastīti, ieraudzīja zemenes šokolādē un rozes — un teica: „Tu beidzot esi pieaudzis.\" 38 gadus gaidīju šos vārdus. Paldies jums.",
                    author: "Edgars, 38 g., beidzot pieaudzis dēls",
                  },
                  {
                    quote:
                      "Iedevu mammai rozes un zemenes šokolādē. Viņa raudāja. Es raudāju. Kaķis skatījās. Mātes diena izdevās.",
                    author: "Lauma, 31 g., sentimentāla, bet neatzīst to",
                  },
                  {
                    quote:
                      "Katru gadu pirku ziedus no veikala pie izejas. Šogad — rozes no Kenijas un zemenes Beļģu šokolādē. Māte jautāja, vai esmu mainījis darbu uz labāku. Nē. Vienkārši zināju, kur pasūtīt.",
                    author: "Kārlis, 44 g., optimizē visu, arī mīlestību",
                  },
                  {
                    quote:
                      "Mamma teica: „Nekādas dāvanas nevajag, man neko nevajag.\" Tad apēda pusi kastes viena pati. Vajadzēja pasūtīt divas.",
                    author: "Ilze, 29 g., iemācījusies pasūtīt rezerves kastīti",
                  },
                  {
                    quote:
                      "Biju muļķis. Rozes to zina. Zemenes šokolādē arī. Ceru, ka tu arī drīz zināsi.",
                    author: "Mārtiņš, 35 g., mācās no kļūdām (lēni, bet mācās)",
                  },
                  {
                    quote:
                      "Teicu „atvainojos\" trīs reizes. Nepalīdzēja. Iedevu kastīti ar zemenēm un rozēm. Viņa teica — „nu labi.\" Divas kastes — un mēs atkal runājam normāli. Šokolāde ir labāka diplomāte nekā es.",
                    author: "Roberts, 41 g., atklājis, ka beļģi saprot attiecības",
                  },
                  {
                    quote:
                      "Viņa man teica: „Man no Tevis vairs neko nevajag.\" Es tomēr pasūtīju. Viņa apēda visas zemenes. Tad teica: „Nu labi, piedodu.\" Nekad neesmu bijis tik priecīgs par to, ka kāds saka „nevajag.\"",
                    author: "Andris, 37 g., iemācījies lasīt starp rindiņām",
                  },
                  {
                    quote: "Vārdi beigušies. Rozes — nav. Zemenes šokolādē — arī nav. Bet piedošana — ir.",
                    author: "Toms, 29 g., lakonisks, bet nopietns",
                  },
                ].map((t, i) => (
                  <figure
                    key={i}
                    className="bg-card rounded-xl p-6 flex flex-col justify-between"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <blockquote className="text-foreground leading-relaxed italic mb-3">
                      „{t.quote}"
                    </blockquote>
                    <figcaption className="text-sm text-primary font-medium">— {t.author}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="text-foreground text-lg mb-2">
                Uzmanību: Ražotājs neuzņemas atbildību par pārāk ilgu smaidu, mēmām sajūsmām vai
                nekontrolējamu vēlmi apskaut dāvinātāju.
              </p>
              <p className="text-primary text-xl font-semibold mt-4">
                Dāvini tā, lai atceras. 🌹🍫
              </p>
              <p className="text-muted-foreground mt-2">
                Mātes dienai. Dzimšanas/vārda dienai. Vai tad, kad vārdi nepietiek.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <a
                  href="https://www.zemenessokolade-sarkanasrozes.lv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                >
                  Pasūtīt mājaslapā
                </a>
                <a
                  href="https://wolt.com/lv/lva/riga/venue/zemenes-okold"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition"
                >
                  Wolt
                </a>
                <a
                  href="https://food.bolt.eu/lv-lv/3-riga/p/46277-zemenes-sokolade/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition"
                >
                  Bolt Food
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        title={lightboxIndex !== null ? items[lightboxIndex]?.title : undefined}
        description={lightboxIndex !== null ? items[lightboxIndex]?.description : undefined}
      />
    </>
  );
};

export default StrawberryRosesSection;
