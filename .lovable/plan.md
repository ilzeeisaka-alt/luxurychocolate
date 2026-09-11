## Ko rāda audits

Ahrefs ziņo par 4 galvenajām problēmām:

1. **537 "bāreņu" lapas** — produktu lapas, uz kurām neved neviena iekšēja saite (Google tās atrod tikai caur sitemap.xml)
2. **35 kanoniskās adreses bez iekšējām saitēm** — tas pats iemesls
3. **41 dublēta lapa bez kanoniskās adreses** — dažas lapas nepasaka Google, kura ir "īstā" versija
4. **23 lapas ar pārāk garu aprakstu** (meta description virs 160 rakstzīmēm)

Galvenā cēlonis: veikalā produkti ir sadalīti pa lappusēm (24 gab.), tāpēc lielākā daļa no 500+ produktiem nekur nav saistīti ar saiti.

## Risinājums

### 1. Pilnais katalogs (jauna lapa `/katalogs`)
Viena lapa, kur redzamas **visas** kategorijas un **visi** produkti kā parastas saites, sagrupēti pa kategorijām. Saite uz to tiek pievienota kājenē visās valodās, lai Google to atrastu no jebkuras lapas. Tas novērš gan bāreņu lapas, gan kanonisko adrešu problēmu.

### 2. Saistītie produkti produkta lapā
Katrā produkta lapā zem apraksta pievienot 6–8 saites uz citiem tās pašas kategorijas produktiem, lai katram produktam būtu vairāk nekā viena ievadošā saite (Ahrefs brīdinājums "tikai viena dofollow saite" — 205 lapas).

### 3. Kanoniskās adreses
- Pievienot pamata kanonisko adresi `index.html`, lai neviena lapa nepaliktu bez tās
- Nodrošināt, ka `?lang=`, `?page=`, `?category=` un `?q=` varianti vienmēr norāda uz tīro adresi bez parametriem
- Pārbaudīt maršrutus, kas šobrīd neuzstāda savu SEO informāciju

### 4. Apraksti
Automātiski saīsināt meta aprakstu līdz 155 rakstzīmēm (pie vārda robežas) un pārrakstīt garākos aprakstus veikala un satura lapās.

### 5. Sitemap
Atjaunot `public/sitemap.xml` ar jaunajām adresēm un iesniegt Search Console.

## Tehniskās izmaiņas

- Jauna lapa `src/pages/Katalogs.tsx` + maršruts `/katalogs` (`src/App.tsx`)
- Saite kājenē `src/components/FooterSection.tsx`
- Saistīto produktu bloks `src/pages/VeikalsProduct.tsx`
- `src/hooks/useSeo.ts`: apraksta saīsināšana, kanoniskā adrese bez vaicājuma parametriem
- `index.html`: noklusētā kanoniskā adrese
- `public/sitemap.xml` atjaunošana
