## Mērķis

Izveidot pilnvērtīgu interneta veikalu šajā projektā ar visiem produktiem no www.luxurychocolatesia.lv — produktu katalogs, grozs, kase ar Stripe maksājumiem, viss Lovable Cloud datubāzē.

## Plāns soli pa solim

### 1. Firecrawl konektora pieslēgšana
- Pieslēgt Firecrawl konektoru (vajag tavu apstiprinājumu uznirstošajā logā).
- Tas dod piekļuvi automātiskai vietnes skrāpēšanai bez manuāla darba.

### 2. Datubāzes shēmas izveide
Izveidot tabulas:
- **products** — produkta info (nosaukums, slug, apraksts, cena, kategorija, svars, sastāvs, pieejamība).
- **product_images** — vairākas bildes katram produktam (URL, secība, alt teksts).
- **product_categories** — kategorijas ar tulkojumiem.
- **cart_items** — viesa/lietotāja grozs.
- (Jau eksistē `orders` un `order_items` — papildinām ar produkta atsauci.)
- RLS politikas: produktus visi var lasīt, grozu/pasūtījumus tikai īpašnieks/admin.

### 3. Produktu skrāpēšana ar Firecrawl
Edge funkcija `import-products`:
- Krājas vietnes karti ar Firecrawl `map` (visi produktu URLi).
- Katram URL — `scrape` ar JSON ekstrakciju (nosaukums, cena, apraksts, bildes, kategorija).
- Bildes lejupielādē un saglabā Lovable Cloud Storage (`product-images` bucket).
- Iedzen datus `products` + `product_images` tabulās.
- Atskaite par importētajiem / kļūdu produktiem.
- Palaižam vienu reizi; vēlāk var pārsūknēt atjauninājumus.

### 4. Veikala UI
Jaunas lapas latviešu valodā (citu valodu tulkojumus pievienosim pakāpeniski):
- `/veikals` — produktu katalogs ar filtriem (kategorija, cena, meklēšana).
- `/veikals/:slug` — produkta lapa (galerija, apraksts, daudzums, "Pievienot grozam").
- `/grozs` — grozs ar daudzumu maiņu un kopsummu.
- `/kase` — Stripe Embedded Checkout (izmantojot esošo Stripe maksājumu setup).
- `/checkout/return` — apstiprinājuma lapa (jau eksistē).
- Navbar: pievienot "Veikals" un grozu ar produktu skaitu.

### 5. Maksājumi un pasūtījumi
- Izmantot esošo Stripe integrāciju (`STRIPE_LIVE_API_KEY`, `STRIPE_SANDBOX_API_KEY`).
- Edge funkcija `create-shop-checkout` — veido sesiju no groza satura ar `price_data` (dinamiskās cenas, lai nebūtu jāsinhronizē Stripe katalogs).
- Edge funkcija `payments-webhook` — jau eksistē; papildināt, lai apstrādā shop pasūtījumus un saglabā `orders` + `order_items`.
- Apstiprinājuma e-pasts ar Resend.

### 6. Admin panelis
- Esošais `/admin` papildināts ar produktu pārvaldību (slēpt/parādīt, rediģēt cenu, krājumu).

## Tehniskās piezīmes

- **Cenas** glabāsim centos (`integer`), lai nebūtu peldošā komata kļūdu.
- **Kategorijas** kā `text` ar enum-līdzīgu pieeju (ne app_role enum, lai elastīgi).
- **Bildes** webp formātā storage bucket, optimizēta lapas ielādei.
- **Daudzvalodība**: sākotnēji LV; produktu nosaukumiem/aprakstiem tabulā kolonnas `name_lv`, `name_en`, vai atsevišķa `product_translations` tabula. Iesaku `product_translations` (skalējamāk).
- **Grozs**: viesiem — `localStorage`; pieslēgtiem lietotājiem — `cart_items` tabulā.
- **SEO**: katram produktam dinamisks `useSeo` ar JSON-LD `Product` shēmu.

## Aplēstais laiks / sarežģītība

Šis ir liels projekts (~5–8 atsevišķi soļi). Iesaku darīt **secīgi**, nevis visu uzreiz:
1. **Sākotnējais solis tagad**: Firecrawl pieslēgšana + datubāzes shēma + importa funkcija + viens tests ar dažiem produktiem.
2. **Pēc tam**: pilna importa palaišana, pārbaude, korekcijas.
3. **Pēc tam**: katalogs + produkta lapa.
4. **Pēc tam**: grozs + kase + webhook.
5. **Pēc tam**: admin pārvaldība, e-pasti, daudzvalodība.

## Jautājumi pirms sākt

1. Vai cenas turēt **EUR** ar PVN iekļautu (kā Latvijā parasti), vai bez PVN?
2. Vai gribi **fizisku piegādi** (Latvijas Pasts / Omniva / DPD pakomāti) integrētu jau pirmajā kārtā, vai sākumā tikai pašizvešana + manuāla piegādes vienošanās?
3. Vai esošajai vietnei ir API/eksports (WooCommerce REST API?), kas būtu drošāks par skrāpēšanu? Ja jā — tas dotu 100% precīzus datus bez Firecrawl izmaksām.
4. Vai gribi, lai sāku ar **1. soli** (Firecrawl + DB + tests ar 5 produktiem), un pēc tam pakāpeniski turpinām?
