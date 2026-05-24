## Konteksts

Avota lapa `www.luxurychocolatesia.lv` satur:
- **~40 produktu kategorijas** (LV)
- **~150–200 unikālus produktus** (atkārtoti 20 valodās zem dažādiem URL — pavisam 560+ produkta saites)
- **Satura sadaļas:** Par mums (about-us), Apdruka, Ko mēs darām, Cenu lapa, Beļģu šokolāde, Drukāšana, Līgums, Aģents 007, Eņģeļu Birojs, MĪLESTĪBA IR KĀ UGUNS, Blogs, Noteikumi, Privātums, Glabāšana
- **20 valodu versijas** (LV, ENG, RUS, EST, LIT, DEU, FRA, ITA, SPA, ARA, JPN, NOR, SWE, FIN, ZHO, DAN, HEB, HIN, CZE, GRE) — avota lapā NAV pieejamas visās 55, ko šī lapa atbalsta
- Lapa renderē produktu sarakstu ar JavaScript, tāpēc Firecrawl jāizmanto ar `waitFor` katrai kategoriju lapai

## Realitātes pārbaude

- Pilna 200 produktu × 20 valodu skrēpēšana = ~4000 Firecrawl pieprasījumu + tūkstošiem bilžu lejupielāžu. Tas pārsniedz vienas atbildes apjomu un patērē daudz kredītu.
- 35 no 55 valodām (piem., portugāļu, holandiešu, ungāru, turku, korejiešu utt.) avotā **vispār neeksistē** — tām būs jāizmanto auto-fallback uz angļu vai LV.

## Piedāvātais plāns (fāzēs)

### Fāze 1 — Pamats: LV produkti un kategorijas (šī atbilde)
1. Iztīrīt esošās `product_categories` un `products` ierakstus (vai izveidot importa karogu lai izvairītos no dublikātiem)
2. Skrēpēt katras 40 LV kategorijas lapu ar `waitFor: 3000`
3. Saglabāt kategorijas tabulā `product_categories` (slug, name, sort_order)
4. Katram unikālajam produktam:
   - Skrēpēt produkta lapu (nosaukums, cena, apraksts, bildes)
   - Lejupielādēt bildes uz `product-images` storage
   - Ievietot rindu `products` + ierakstus `product_images`
5. Atgriezt importa kopsavilkumu (cik kategoriju, produktu, bilžu)

### Fāze 2 — Satura sadaļas (nākamā ziņa)
1. Skrēpēt 14 LV satura lapas
2. Pārveidot par React komponentēm `src/pages/` ar lokalizāciju (LV avots, EN fallback)
3. Pievienot maršrutus un navigāciju

### Fāze 3 — Tulkojumi (nākamā ziņa)
1. Skrēpēt 19 papildu valodu produktu nosaukumus/aprakstus
2. Saglabāt `products.metadata->translations` JSON laukā
3. Frontendā nolasīt valodai specifisko nosaukumu, ar fallback uz EN→LV
4. Pārējām 35 valodām — automātisks fallback uz EN

### Tehniskās izmaiņas šajā fāzē
- **Migrācija:** pievienot `products.metadata.translations` (jau ir `metadata jsonb`, izmantosim to), `products.source_external_id` (text, lai novērstu dublikātus pārimporta laikā), `product_categories.image_url` (kategorijas attēls)
- **Storage:** izmantot esošo `product-images` publisko bucket
- **Skripts:** rakstīts `/tmp/import.py`, neizmaina lietotnes kodu šajā fāzē

## Vai apstiprini Fāzi 1?

Pēc apstiprinājuma izpildīšu importu (var aizņemt 5–10 minūtes Firecrawl izsaukumiem). Pēc tam ziņošu, cik kategoriju/produktu/bilžu ievests, un tu vari teikt "turpini ar Fāzi 2".
