import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-transparent.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Lang } from "@/i18n/types";

interface NavItem {
  label: string;
  to: string;
}

const navItems: Record<Lang, NavItem[]> = {
  lv: [
    { label: "Šokolādes ar logo", to: "/sokolades-ar-logo" },
    { label: "Ikdienas", to: "#ikdienas" },
    { label: "Klientu dāvanas", to: "/sokolades-klientu-davanam" },
    { label: "Reklāmas šokolāde", to: "/reklamas-sokolade" },
    { label: "Izstādēm", to: "/sokolades-izstadem" },
    { label: "Restorāniem", to: "#restoraniem" },
    { label: "Ziemassvētku", to: "/ziemassvetku-korporativas-sokolades" },
    { label: "Šokolādes grāmata", to: "/sokolades-gramata" },
    { label: "Dāvanu idejas", to: "/korporativo-davanu-idejas" },
    { label: "Blogs", to: "/blogs" },
    { label: "Veikals", to: "https://www.luxurychocolatesia.lv/interneta-veikals-produkti/" },
    { label: "VIP dāvanas", to: "#vip" },
    { label: "Suvenīri", to: "#suveniri" },
    { label: "Kontakti", to: "#kontakti" },
  ],
  en: [
    { label: "Chocolate with Logo", to: "/en/chocolate-with-logo" },
    { label: "Daily", to: "#ikdienas" },
    { label: "Client Gifts", to: "/en/client-gifts" },
    { label: "Promotional", to: "/en/promotional-chocolate" },
    { label: "Exhibitions", to: "/en/exhibition-stand-chocolate" },
    { label: "For Restaurants", to: "#restoraniem" },
    { label: "Christmas", to: "/en/christmas-corporate-chocolate" },
    { label: "Book Box", to: "/en/chocolate-book-box" },
    { label: "Gift Ideas", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/en/blog" },
    { label: "Shop", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Gifts", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Contact", to: "#kontakti" },
  ],
  ru: [
    { label: "Шоколад с логотипом", to: "/ru/shokolad-s-logotipom" },
    { label: "Ежедневные", to: "#ikdienas" },
    { label: "Подарки клиентам", to: "/ru/podarki-klientam" },
    { label: "Рекламный", to: "/ru/reklamniy-shokolad" },
    { label: "Выставки", to: "/ru/sladosti-dlya-vystavok" },
    { label: "Для ресторанов", to: "#restoraniem" },
    { label: "Рождественский", to: "/ru/rozhdestvenskij-shokolad" },
    { label: "Шоколадная книга", to: "/ru/shokoladnaya-kniga" },
    { label: "Идеи подарков", to: "/ru/idei-korporativnyh-podarkov" },
    { label: "Блог", to: "/ru/blog" },
    { label: "Магазин", to: "https://www.luxurychocolatesia.lv/internet-magazin-produkti/" },
    { label: "VIP Подарки", to: "#vip" },
    { label: "Сувениры", to: "#suveniri" },
    { label: "Контакты", to: "#kontakti" },
  ],
  et: [
    { label: "Šokolaad logoga", to: "/et/sokolaad-logoga" },
    { label: "Igapäevane", to: "#ikdienas" },
    { label: "Kliendikingitused", to: "/et/kingitused-klientidele" },
    { label: "Reklaamšokolaad", to: "/et/reklaam-sokolaad" },
    { label: "Messidele", to: "/et/maiustused-messidele" },
    { label: "Restoranidele", to: "#restoraniem" },
    { label: "Jõulušokolaad", to: "/et/joulu-sokolaad" },
    { label: "Šokolaadiraamat", to: "/et/sokolaadi-raamat" },
    { label: "Kinkeideed", to: "/et/korporatiiv-kingituste-ideed" },
    { label: "Blogi", to: "/et/blogi" },
    { label: "E-pood", to: "https://www.luxurychocolatesia.lv/e-pood/" },
    { label: "VIP Kingitused", to: "#vip" },
    { label: "Suveniirid", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  lt: [
    { label: "Šokoladas su logotipu", to: "/lt/sokoladas-su-logotipu" },
    { label: "Kasdieniai", to: "#ikdienas" },
    { label: "Dovanos klientams", to: "/lt/dovanos-klientams" },
    { label: "Reklaminis", to: "/lt/reklaminis-sokoladas" },
    { label: "Parodoms", to: "/lt/saldainiai-parodoms" },
    { label: "Restoranams", to: "#restoraniem" },
    { label: "Kalėdinis", to: "/lt/kaledinis-sokoladas" },
    { label: "Šokolado knyga", to: "/lt/sokolado-knyga" },
    { label: "Dovanų idėjos", to: "/lt/korporatyviniu-dovanu-idejos" },
    { label: "Blogas", to: "/lt/blogas" },
    { label: "Parduotuvė", to: "https://www.luxurychocolatesia.lv/internetine-parduotuve/" },
    { label: "VIP Dovanos", to: "#vip" },
    { label: "Suvenyrai", to: "#suveniri" },
    { label: "Kontaktai", to: "#kontakti" },
  ],
  sv: [
    { label: "Choklad med logotyp", to: "/en/chocolate-with-logo" },
    { label: "Daglig", to: "#ikdienas" },
    { label: "Kundpresenter", to: "/en/client-gifts" },
    { label: "Reklam", to: "/en/promotional-chocolate" },
    { label: "Mässor", to: "/en/exhibition-stand-chocolate" },
    { label: "Restauranger", to: "#restoraniem" },
    { label: "Jul", to: "/en/christmas-corporate-chocolate" },
    { label: "Chokladbok", to: "/en/chocolate-book-box" },
    { label: "Presentidéer", to: "/en/corporate-gift-ideas" },
    { label: "Blogg", to: "/sv/blogg" },
    { label: "Butik", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Presenter", to: "#vip" },
    { label: "Souvenirer", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  no: [
    { label: "Sjokolade med logo", to: "/en/chocolate-with-logo" },
    { label: "Daglig", to: "#ikdienas" },
    { label: "Kundegaver", to: "/en/client-gifts" },
    { label: "Reklame", to: "/en/promotional-chocolate" },
    { label: "Messer", to: "/en/exhibition-stand-chocolate" },
    { label: "Restauranter", to: "#restoraniem" },
    { label: "Jul", to: "/en/christmas-corporate-chocolate" },
    { label: "Sjokoladebok", to: "/en/chocolate-book-box" },
    { label: "Gaveidéer", to: "/en/corporate-gift-ideas" },
    { label: "Blogg", to: "/no/blogg" },
    { label: "Butikk", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Gaver", to: "#vip" },
    { label: "Suvenirer", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  fi: [
    { label: "Suklaa logolla", to: "/en/chocolate-with-logo" },
    { label: "Päivittäiset", to: "#ikdienas" },
    { label: "Asiakaslahjat", to: "/en/client-gifts" },
    { label: "Mainonta", to: "/en/promotional-chocolate" },
    { label: "Messut", to: "/en/exhibition-stand-chocolate" },
    { label: "Ravintolat", to: "#restoraniem" },
    { label: "Joulu", to: "/en/christmas-corporate-chocolate" },
    { label: "Suklaakirja", to: "/en/chocolate-book-box" },
    { label: "Lahjaideat", to: "/en/corporate-gift-ideas" },
    { label: "Blogi", to: "/fi/blogi" },
    { label: "Kauppa", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Lahjat", to: "#vip" },
    { label: "Matkamuistot", to: "#suveniri" },
    { label: "Yhteystiedot", to: "#kontakti" },
  ],
  da: [
    { label: "Chokolade med logo", to: "/en/chocolate-with-logo" },
    { label: "Daglig", to: "#ikdienas" },
    { label: "Kundegaver", to: "/en/client-gifts" },
    { label: "Reklame", to: "/en/promotional-chocolate" },
    { label: "Messer", to: "/en/exhibition-stand-chocolate" },
    { label: "Restauranter", to: "#restoraniem" },
    { label: "Jul", to: "/en/christmas-corporate-chocolate" },
    { label: "Chokoladebog", to: "/en/chocolate-book-box" },
    { label: "Gaveidéer", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/da/blog" },
    { label: "Butik", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Gaver", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  de: [
    { label: "Schokolade mit Logo", to: "/en/chocolate-with-logo" },
    { label: "Täglich", to: "#ikdienas" },
    { label: "Kundengeschenke", to: "/en/client-gifts" },
    { label: "Werbung", to: "/en/promotional-chocolate" },
    { label: "Messen", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurants", to: "#restoraniem" },
    { label: "Weihnachten", to: "/en/christmas-corporate-chocolate" },
    { label: "Schokoladenbuch", to: "/en/chocolate-book-box" },
    { label: "Geschenkideen", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/de/blog" },
    { label: "Shop", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Geschenke", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  fr: [
    { label: "Chocolat avec logo", to: "/en/chocolate-with-logo" },
    { label: "Quotidien", to: "#ikdienas" },
    { label: "Cadeaux clients", to: "/en/client-gifts" },
    { label: "Promotionnel", to: "/en/promotional-chocolate" },
    { label: "Salons", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurants", to: "#restoraniem" },
    { label: "Noël", to: "/en/christmas-corporate-chocolate" },
    { label: "Livre chocolat", to: "/en/chocolate-book-box" },
    { label: "Idées cadeaux", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/fr/blog" },
    { label: "Boutique", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Cadeaux", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Contact", to: "#kontakti" },
  ],
  it: [
    { label: "Cioccolato con logo", to: "/en/chocolate-with-logo" },
    { label: "Quotidiano", to: "#ikdienas" },
    { label: "Regali clienti", to: "/en/client-gifts" },
    { label: "Promozionale", to: "/en/promotional-chocolate" },
    { label: "Fiere", to: "/en/exhibition-stand-chocolate" },
    { label: "Ristoranti", to: "#restoraniem" },
    { label: "Natale", to: "/en/christmas-corporate-chocolate" },
    { label: "Libro cioccolato", to: "/en/chocolate-book-box" },
    { label: "Idee regalo", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/it/blog" },
    { label: "Negozio", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Regali", to: "#vip" },
    { label: "Souvenir", to: "#suveniri" },
    { label: "Contatti", to: "#kontakti" },
  ],
  es: [
    { label: "Chocolate con logo", to: "/en/chocolate-with-logo" },
    { label: "Diario", to: "#ikdienas" },
    { label: "Regalos clientes", to: "/en/client-gifts" },
    { label: "Promocional", to: "/en/promotional-chocolate" },
    { label: "Ferias", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurantes", to: "#restoraniem" },
    { label: "Navidad", to: "/en/christmas-corporate-chocolate" },
    { label: "Libro chocolate", to: "/en/chocolate-book-box" },
    { label: "Ideas regalo", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/es/blog" },
    { label: "Tienda", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Regalos", to: "#vip" },
    { label: "Recuerdos", to: "#suveniri" },
    { label: "Contacto", to: "#kontakti" },
  ],
  ar: [
    { label: "شوكولاتة بالشعار", to: "/en/chocolate-with-logo" },
    { label: "يومي", to: "#ikdienas" },
    { label: "هدايا العملاء", to: "/en/client-gifts" },
    { label: "ترويجي", to: "/en/promotional-chocolate" },
    { label: "المعارض", to: "/en/exhibition-stand-chocolate" },
    { label: "مطاعم", to: "#restoraniem" },
    { label: "عيد الميلاد", to: "/en/christmas-corporate-chocolate" },
    { label: "كتاب الشوكولاتة", to: "/en/chocolate-book-box" },
    { label: "أفكار هدايا", to: "/en/corporate-gift-ideas" },
    { label: "مدونة", to: "/ar/blog" },
    { label: "متجر", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "هدايا VIP", to: "#vip" },
    { label: "تذكارات", to: "#suveniri" },
    { label: "اتصل بنا", to: "#kontakti" },
  ],
  nl: [
    { label: "Chocolade met logo", to: "/en/chocolate-with-logo" },
    { label: "Dagelijks", to: "#ikdienas" },
    { label: "Klantengeschenken", to: "/en/client-gifts" },
    { label: "Promotie", to: "/en/promotional-chocolate" },
    { label: "Beurzen", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurants", to: "#restoraniem" },
    { label: "Kerst", to: "/en/christmas-corporate-chocolate" },
    { label: "Chocoladeboek", to: "/en/chocolate-book-box" },
    { label: "Cadeauideeën", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/nl/blog" },
    { label: "Winkel", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Geschenken", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Contact", to: "#kontakti" },
  ],
  pl: [
    { label: "Czekolada z logo", to: "/en/chocolate-with-logo" },
    { label: "Codzienne", to: "#ikdienas" },
    { label: "Prezenty", to: "/en/client-gifts" },
    { label: "Promocja", to: "/en/promotional-chocolate" },
    { label: "Targi", to: "/en/exhibition-stand-chocolate" },
    { label: "Restauracje", to: "#restoraniem" },
    { label: "Boże Narodzenie", to: "/en/christmas-corporate-chocolate" },
    { label: "Książka", to: "/en/chocolate-book-box" },
    { label: "Pomysły", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/pl/blog" },
    { label: "Sklep", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Prezenty", to: "#vip" },
    { label: "Pamiątki", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  cs: [
    { label: "Čokoláda s logem", to: "/en/chocolate-with-logo" },
    { label: "Denní", to: "#ikdienas" },
    { label: "Dárky", to: "/en/client-gifts" },
    { label: "Promo", to: "/en/promotional-chocolate" },
    { label: "Veletrhy", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurace", to: "#restoraniem" },
    { label: "Vánoce", to: "/en/christmas-corporate-chocolate" },
    { label: "Kniha", to: "/en/chocolate-book-box" },
    { label: "Nápady", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/cs/blog" },
    { label: "Obchod", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Dárky", to: "#vip" },
    { label: "Suvenýry", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  pt: [
    { label: "Chocolate com logo", to: "/en/chocolate-with-logo" },
    { label: "Diário", to: "#ikdienas" },
    { label: "Presentes", to: "/en/client-gifts" },
    { label: "Promoção", to: "/en/promotional-chocolate" },
    { label: "Feiras", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurantes", to: "#restoraniem" },
    { label: "Natal", to: "/en/christmas-corporate-chocolate" },
    { label: "Livro", to: "/en/chocolate-book-box" },
    { label: "Ideias", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/pt/blog" },
    { label: "Loja", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Presentes", to: "#vip" },
    { label: "Lembranças", to: "#suveniri" },
    { label: "Contacto", to: "#kontakti" },
  ],
  el: [
    { label: "Σοκολάτα με λογότυπο", to: "/en/chocolate-with-logo" },
    { label: "Καθημερινά", to: "#ikdienas" },
    { label: "Δώρα", to: "/en/client-gifts" },
    { label: "Προωθητικά", to: "/en/promotional-chocolate" },
    { label: "Εκθέσεις", to: "/en/exhibition-stand-chocolate" },
    { label: "Εστιατόρια", to: "#restoraniem" },
    { label: "Χριστούγεννα", to: "/en/christmas-corporate-chocolate" },
    { label: "Βιβλίο", to: "/en/chocolate-book-box" },
    { label: "Ιδέες", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/el/blog" },
    { label: "Κατάστημα", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Δώρα", to: "#vip" },
    { label: "Σουβενίρ", to: "#suveniri" },
    { label: "Επικοινωνία", to: "#kontakti" },
  ],
  tr: [
    { label: "Logolu çikolata", to: "/en/chocolate-with-logo" },
    { label: "Günlük", to: "#ikdienas" },
    { label: "Hediyeler", to: "/en/client-gifts" },
    { label: "Promosyon", to: "/en/promotional-chocolate" },
    { label: "Fuarlar", to: "/en/exhibition-stand-chocolate" },
    { label: "Restoranlar", to: "#restoraniem" },
    { label: "Noel", to: "/en/christmas-corporate-chocolate" },
    { label: "Kitap", to: "/en/chocolate-book-box" },
    { label: "Fikirler", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/tr/blog" },
    { label: "Mağaza", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Hediyeler", to: "#vip" },
    { label: "Hediyelik", to: "#suveniri" },
    { label: "İletişim", to: "#kontakti" },
  ],
  hu: [
    { label: "Logós csokoládé", to: "/en/chocolate-with-logo" },
    { label: "Napi", to: "#ikdienas" },
    { label: "Ajándékok", to: "/en/client-gifts" },
    { label: "Promóció", to: "/en/promotional-chocolate" },
    { label: "Kiállítások", to: "/en/exhibition-stand-chocolate" },
    { label: "Éttermek", to: "#restoraniem" },
    { label: "Karácsony", to: "/en/christmas-corporate-chocolate" },
    { label: "Könyv", to: "/en/chocolate-book-box" },
    { label: "Ötletek", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/hu/blog" },
    { label: "Bolt", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Ajándékok", to: "#vip" },
    { label: "Szuvenírek", to: "#suveniri" },
    { label: "Kapcsolat", to: "#kontakti" },
  ],
  ro: [
    { label: "Ciocolată cu logo", to: "/en/chocolate-with-logo" },
    { label: "Zilnic", to: "#ikdienas" },
    { label: "Cadouri", to: "/en/client-gifts" },
    { label: "Promoție", to: "/en/promotional-chocolate" },
    { label: "Expoziții", to: "/en/exhibition-stand-chocolate" },
    { label: "Restaurante", to: "#restoraniem" },
    { label: "Crăciun", to: "/en/christmas-corporate-chocolate" },
    { label: "Carte", to: "/en/chocolate-book-box" },
    { label: "Idei", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/ro/blog" },
    { label: "Magazin", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Cadouri", to: "#vip" },
    { label: "Suveniruri", to: "#suveniri" },
    { label: "Contact", to: "#kontakti" },
  ],
  bg: [
    { label: "Шоколад с лого", to: "/en/chocolate-with-logo" },
    { label: "Ежедневни", to: "#ikdienas" },
    { label: "Подаръци", to: "/en/client-gifts" },
    { label: "Промо", to: "/en/promotional-chocolate" },
    { label: "Изложения", to: "/en/exhibition-stand-chocolate" },
    { label: "Ресторанти", to: "#restoraniem" },
    { label: "Коледа", to: "/en/christmas-corporate-chocolate" },
    { label: "Книга", to: "/en/chocolate-book-box" },
    { label: "Идеи", to: "/en/corporate-gift-ideas" },
    { label: "Блог", to: "/bg/blog" },
    { label: "Магазин", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Подаръци", to: "#vip" },
    { label: "Сувенири", to: "#suveniri" },
    { label: "Контакти", to: "#kontakti" },
  ],
  hr: [
    { label: "Čokolada s logom", to: "/en/chocolate-with-logo" },
    { label: "Dnevno", to: "#ikdienas" },
    { label: "Darovi", to: "/en/client-gifts" },
    { label: "Promocija", to: "/en/promotional-chocolate" },
    { label: "Sajmovi", to: "/en/exhibition-stand-chocolate" },
    { label: "Restorani", to: "#restoraniem" },
    { label: "Božić", to: "/en/christmas-corporate-chocolate" },
    { label: "Knjiga", to: "/en/chocolate-book-box" },
    { label: "Ideje", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/hr/blog" },
    { label: "Trgovina", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Darovi", to: "#vip" },
    { label: "Suveniri", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  sk: [
    { label: "Čokoláda s logom", to: "/en/chocolate-with-logo" },
    { label: "Denné", to: "#ikdienas" },
    { label: "Darčeky", to: "/en/client-gifts" },
    { label: "Promo", to: "/en/promotional-chocolate" },
    { label: "Veľtrhy", to: "/en/exhibition-stand-chocolate" },
    { label: "Reštaurácie", to: "#restoraniem" },
    { label: "Vianoce", to: "/en/christmas-corporate-chocolate" },
    { label: "Kniha", to: "/en/chocolate-book-box" },
    { label: "Nápady", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/sk/blog" },
    { label: "Obchod", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Darčeky", to: "#vip" },
    { label: "Suveníry", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  sl: [
    { label: "Čokolada z logotipom", to: "/en/chocolate-with-logo" },
    { label: "Dnevno", to: "#ikdienas" },
    { label: "Darila", to: "/en/client-gifts" },
    { label: "Promocija", to: "/en/promotional-chocolate" },
    { label: "Sejmi", to: "/en/exhibition-stand-chocolate" },
    { label: "Restavracije", to: "#restoraniem" },
    { label: "Božič", to: "/en/christmas-corporate-chocolate" },
    { label: "Knjiga", to: "/en/chocolate-book-box" },
    { label: "Ideje", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/sl/blog" },
    { label: "Trgovina", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Darila", to: "#vip" },
    { label: "Spominki", to: "#suveniri" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  uk: [
    { label: "Шоколад з логотипом", to: "/en/chocolate-with-logo" },
    { label: "Щоденні", to: "#ikdienas" },
    { label: "Подарунки", to: "/en/client-gifts" },
    { label: "Промо", to: "/en/promotional-chocolate" },
    { label: "Виставки", to: "/en/exhibition-stand-chocolate" },
    { label: "Ресторани", to: "#restoraniem" },
    { label: "Різдво", to: "/en/christmas-corporate-chocolate" },
    { label: "Книга", to: "/en/chocolate-book-box" },
    { label: "Ідеї", to: "/en/corporate-gift-ideas" },
    { label: "Блог", to: "/uk/blog" },
    { label: "Магазин", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Подарунки", to: "#vip" },
    { label: "Сувеніри", to: "#suveniri" },
    { label: "Контакти", to: "#kontakti" },
  ],
  sr: [
    { label: "Čokolada sa logom", to: "/en/chocolate-with-logo" },
    { label: "Dnevno", to: "#ikdienas" },
    { label: "Pokloni", to: "/en/client-gifts" },
    { label: "Promocija", to: "/en/promotional-chocolate" },
    { label: "Sajmovi", to: "/en/exhibition-stand-chocolate" },
    { label: "Restorani", to: "#restoraniem" },
    { label: "Božić", to: "/en/christmas-corporate-chocolate" },
    { label: "Knjiga", to: "/en/chocolate-book-box" },
    { label: "Ideje", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/sr/blog" },
    { label: "Prodavnica", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Поклони", to: "#vip" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  bs: [
    { label: "Čokolada sa logom", to: "/en/chocolate-with-logo" },
    { label: "Dnevno", to: "#ikdienas" },
    { label: "Pokloni", to: "/en/client-gifts" },
    { label: "Promocija", to: "/en/promotional-chocolate" },
    { label: "Sajmovi", to: "/en/exhibition-stand-chocolate" },
    { label: "Restorani", to: "#restoraniem" },
    { label: "Božić", to: "/en/christmas-corporate-chocolate" },
    { label: "Knjiga", to: "/en/chocolate-book-box" },
    { label: "Ideje", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/bs/blog" },
    { label: "Trgovina", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Pokloni", to: "#vip" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  mk: [
    { label: "Чоколадо со лого", to: "/en/chocolate-with-logo" },
    { label: "Дневни", to: "#ikdienas" },
    { label: "Подароци", to: "/en/client-gifts" },
    { label: "Промо", to: "/en/promotional-chocolate" },
    { label: "Саеми", to: "/en/exhibition-stand-chocolate" },
    { label: "Ресторани", to: "#restoraniem" },
    { label: "Божиќ", to: "/en/christmas-corporate-chocolate" },
    { label: "Книга", to: "/en/chocolate-book-box" },
    { label: "Идеи", to: "/en/corporate-gift-ideas" },
    { label: "Блог", to: "/mk/blog" },
    { label: "Продавница", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Подароци", to: "#vip" },
    { label: "Контакт", to: "#kontakti" },
  ],
  sq: [
    { label: "Çokollatë me logo", to: "/en/chocolate-with-logo" },
    { label: "Ditore", to: "#ikdienas" },
    { label: "Dhurata", to: "/en/client-gifts" },
    { label: "Promovim", to: "/en/promotional-chocolate" },
    { label: "Panaire", to: "/en/exhibition-stand-chocolate" },
    { label: "Restorante", to: "#restoraniem" },
    { label: "Krishtlindje", to: "/en/christmas-corporate-chocolate" },
    { label: "Libër", to: "/en/chocolate-book-box" },
    { label: "Ide", to: "/en/corporate-gift-ideas" },
    { label: "Blog", to: "/sq/blog" },
    { label: "Dyqan", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Dhurata", to: "#vip" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  is: [
    { label: "Súkkulaði með merki", to: "/en/chocolate-with-logo" },
    { label: "Daglegt", to: "#ikdienas" },
    { label: "Gjafir", to: "/en/client-gifts" },
    { label: "Kynning", to: "/en/promotional-chocolate" },
    { label: "Sýningar", to: "/en/exhibition-stand-chocolate" },
    { label: "Veitingastaðir", to: "#restoraniem" },
    { label: "Jól", to: "/en/christmas-corporate-chocolate" },
    { label: "Bók", to: "/en/chocolate-book-box" },
    { label: "Hugmyndir", to: "/en/corporate-gift-ideas" },
    { label: "Blogg", to: "/is/blog" },
    { label: "Verslun", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "VIP Gjafir", to: "#vip" },
    { label: "Samband", to: "#kontakti" },
  ],
};

const homePaths: Record<Lang, string> = {
  lv: "/",
  en: "/en",
  ru: "/ru",
  et: "/et",
  lt: "/lt",
  sv: "/sv",
  no: "/no",
  fi: "/fi",
  da: "/da",
  de: "/de",
  fr: "/fr",
  it: "/it",
  es: "/es",
  ar: "/ar",
  nl: "/nl",
  pl: "/pl",
  cs: "/cs",
  pt: "/pt",
  el: "/el",
  tr: "/tr",
  hu: "/hu",
  ro: "/ro",
  bg: "/bg",
  hr: "/hr",
  sk: "/sk",
  sl: "/sl",
  uk: "/uk",
  sr: "/sr",
  bs: "/bs",
  mk: "/mk",
  sq: "/sq",
  is: "/is",
};

interface NavbarProps {
  lang?: Lang;
}

const Navbar = ({ lang = "lv" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const items = navItems[lang];
  const homePath = homePaths[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-foreground/95 backdrop-blur-md shadow-lg"
          : "bg-foreground"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <Link to={homePath} className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="Luxury Chocolate"
            className="h-9 w-9 rounded-full bg-white object-contain p-0.5"
          />
          <span className="text-white font-medium text-sm tracking-wide hidden sm:inline">
            Luxury Chocolate
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {items.map((item) =>
            item.to.startsWith("#") ? (
              <a
                key={item.to}
                href={item.to}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors text-white/70 hover:text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ) : item.to.startsWith("http") ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors text-white/70 hover:text-white hover:bg-white/5"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === item.to
                    ? "text-primary bg-primary/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right side: language + mobile toggle */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white/70 hover:text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-foreground border-t border-white/10 px-4 pb-4">
          {items.map((item) =>
            item.to.startsWith("#") ? (
              <a
                key={item.to}
                href={item.to}
                className="block py-2.5 px-3 rounded-md text-sm font-medium transition-colors text-white/70 hover:text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ) : item.to.startsWith("http") ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 px-3 rounded-md text-sm font-medium transition-colors text-white/70 hover:text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`block py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.to
                    ? "text-primary bg-primary/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
