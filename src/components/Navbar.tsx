import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn, ShoppingCart, Store, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-seal-clean.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NewsletterSignup from "@/components/NewsletterSignup";
import type { Lang } from "@/i18n/types";
import { expandLangs } from "@/i18n/expandLangs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type InfoLabels = {
  info: string;
  about: string;
  whatWeDo: string;
  prices: string;
  contract: string;
  agent: string;
  angels: string;
  love: string;
  storage: string;
  printingRules: string;
};

const infoLabelsByLang: Record<string, InfoLabels & { thanks?: string }> = {
  lv: { info: "Info", about: "Par mums", whatWeDo: "Ko mēs darām", prices: "Cenu lapa", contract: "Līgums", agent: "Aģents 007", angels: "Eņģeļu Birojs", love: "Mīlestība ir kā uguns", storage: "Glabāšana", printingRules: "Drukāšanas noteikumi", thanks: "Paldies" },
  en: { info: "Info", about: "About us", whatWeDo: "What we do", prices: "Pricing", contract: "Contract", agent: "Agent 007", angels: "Angels Office", love: "Love is like fire", storage: "Storage", printingRules: "Printing rules", thanks: "Thank you" },
  ru: { info: "Инфо", about: "О нас", whatWeDo: "Что мы делаем", prices: "Цены", contract: "Договор", agent: "Агент 007", angels: "Бюро Ангелов", love: "Любовь как огонь", storage: "Хранение", printingRules: "Правила печати", thanks: "Спасибо" },
  et: { info: "Info", about: "Meist", whatWeDo: "Mida me teeme", prices: "Hinnad", contract: "Leping", agent: "Agent 007", angels: "Inglite Büroo", love: "Armastus on kui tuli", storage: "Hoiustamine", printingRules: "Trükireeglid", thanks: "Aitäh" },
  lt: { info: "Info", about: "Apie mus", whatWeDo: "Ką darome", prices: "Kainos", contract: "Sutartis", agent: "Agentas 007", angels: "Angelų biuras", love: "Meilė kaip ugnis", storage: "Laikymas", printingRules: "Spausdinimo taisyklės", thanks: "Ačiū" },
  de: { info: "Info", about: "Über uns", whatWeDo: "Was wir tun", prices: "Preise", contract: "Vertrag", agent: "Agent 007", angels: "Engelsbüro", love: "Liebe wie Feuer", storage: "Lagerung", printingRules: "Druckregeln", thanks: "Danke" },
  fr: { info: "Info", about: "À propos", whatWeDo: "Ce que nous faisons", prices: "Tarifs", contract: "Contrat", agent: "Agent 007", angels: "Bureau des anges", love: "L'amour comme le feu", storage: "Stockage", printingRules: "Règles d'impression", thanks: "Merci" },
  it: { info: "Info", about: "Chi siamo", whatWeDo: "Cosa facciamo", prices: "Prezzi", contract: "Contratto", agent: "Agente 007", angels: "Ufficio degli angeli", love: "L'amore è come il fuoco", storage: "Conservazione", printingRules: "Regole di stampa", thanks: "Grazie" },
  es: { info: "Info", about: "Sobre nosotros", whatWeDo: "Qué hacemos", prices: "Precios", contract: "Contrato", agent: "Agente 007", angels: "Oficina de ángeles", love: "El amor es como el fuego", storage: "Almacenamiento", printingRules: "Reglas de impresión", thanks: "Gracias" },
};

function getInfoPages(lang: string): { label: string; to: string }[] {
  const L = infoLabelsByLang[lang] ?? infoLabelsByLang.en;
  const q = lang && lang !== "lv" ? `?lang=${lang}` : "";
  return [
    { label: L.about, to: `/par-mums${q}` },
    { label: L.whatWeDo, to: `/ko-mes-daram${q}` },
    { label: L.prices, to: `/cenu-lapa${q}` },
    { label: L.contract, to: `/ligums${q}` },
    { label: L.agent, to: `/agents-007${q}` },
    { label: L.angels, to: `/engelu-birojs${q}` },
    { label: L.love, to: `/milestiba-ir-ka-uguns${q}` },
    { label: L.storage, to: `/glabasana${q}` },
    { label: L.printingRules, to: `/drukasanas-noteikumi${q}` },
    { label: L.thanks ?? "Paldies", to: `/paldies${q}` },
  ];
}

interface NavItem {
  label: string;
  to: string;
}

const navItems: Record<Lang, NavItem[]> = expandLangs({
  lv: [
    { label: "Šokolādes ar logo", to: "/sokolades-ar-logo" },
    { label: "Makarūni", to: "#makaruni" },
    { label: "Laimes cepumi", to: "#laimes-cepumi" },
    { label: "Zemenes šokolādē", to: "#zemenes-sokolade" },
    { label: "Ikdienas", to: "#ikdienas" },
    { label: "Klientu dāvanas", to: "/sokolades-klientu-davanam" },
    { label: "Reklāmas šokolāde", to: "/reklamas-sokolade" },
    { label: "Izstādēm", to: "/sokolades-izstadem" },
    { label: "Restorāniem", to: "#restoraniem" },
    { label: "Ziemassvētku", to: "/ziemassvetku-korporativas-sokolades" },
    { label: "Šokolādes grāmata", to: "/sokolades-gramata" },
    { label: "Dāvanu idejas", to: "/korporativo-davanu-idejas" },
    { label: "Blogs", to: "/blogs" },
    { label: "Atsauksmes", to: "/atsauksmes" },
    { label: "Veikals", to: "/veikals" },
    { label: "VIP dāvanas", to: "#vip" },
    { label: "Suvenīri", to: "#suveniri" },
    { label: "Cienasts", to: "#cienasts" },
    { label: "Galda kartes", to: "#galda-kartes" },
    { label: "Tortes", to: "#tortes" },
    { label: "Kastes", to: "#magnets" },
    { label: "Monētas", to: "#monetas" },
    { label: "Partneru programma", to: "/affiliate" },
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
    { label: "Shop", to: "/veikals" },
    { label: "VIP Gifts", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Serving", to: "#cienasts" },
    { label: "Table Cards", to: "#galda-kartes" },
    { label: "Cakes", to: "#tortes" },
    { label: "Gift Boxes", to: "#magnets" },
    { label: "Coins", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Магазин", to: "/veikals" },
    { label: "VIP Подарки", to: "#vip" },
    { label: "Сувениры", to: "#suveniri" },
    { label: "Угощение", to: "#cienasts" },
    { label: "Карточки", to: "#galda-kartes" },
    { label: "Торты", to: "#tortes" },
    { label: "Коробки", to: "#magnets" },
    { label: "Монеты", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "E-pood", to: "/veikals" },
    { label: "VIP Kingitused", to: "#vip" },
    { label: "Suveniirid", to: "#suveniri" },
    { label: "Serveerimine", to: "#cienasts" },
    { label: "Lauakaardid", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Karbid", to: "#magnets" },
    { label: "Mündid", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Parduotuvė", to: "/veikals" },
    { label: "VIP Dovanos", to: "#vip" },
    { label: "Suvenyrai", to: "#suveniri" },
    { label: "Serviravimas", to: "#cienasts" },
    { label: "Kortelės", to: "#galda-kartes" },
    { label: "Tortai", to: "#tortes" },
    { label: "Dėžutės", to: "#magnets" },
    { label: "Monetos", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Butik", to: "/veikals" },
    { label: "VIP Presenter", to: "#vip" },
    { label: "Souvenirer", to: "#suveniri" },
    { label: "Servering", to: "#cienasts" },
    { label: "Bordskort", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Lådor", to: "#magnets" },
    { label: "Mynt", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Butikk", to: "/veikals" },
    { label: "VIP Gaver", to: "#vip" },
    { label: "Suvenirer", to: "#suveniri" },
    { label: "Servering", to: "#cienasts" },
    { label: "Bordkort", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Esker", to: "#magnets" },
    { label: "Mynter", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Kauppa", to: "/veikals" },
    { label: "VIP Lahjat", to: "#vip" },
    { label: "Matkamuistot", to: "#suveniri" },
    { label: "Tarjoilu", to: "#cienasts" },
    { label: "Pöytäkortit", to: "#galda-kartes" },
    { label: "Kakut", to: "#tortes" },
    { label: "Rasiat", to: "#magnets" },
    { label: "Kolikot", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Butik", to: "/veikals" },
    { label: "VIP Gaver", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Servering", to: "#cienasts" },
    { label: "Bordkort", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Æsker", to: "#magnets" },
    { label: "Mønter", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Shop", to: "/veikals" },
    { label: "VIP Geschenke", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Servierung", to: "#cienasts" },
    { label: "Tischkarten", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Geschenkboxen", to: "#magnets" },
    { label: "Münzen", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Boutique", to: "/veikals" },
    { label: "VIP Cadeaux", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Service", to: "#cienasts" },
    { label: "Marque-places", to: "#galda-kartes" },
    { label: "Cakes", to: "#tortes" },
    { label: "Coffrets", to: "#magnets" },
    { label: "Pièces", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Negozio", to: "/veikals" },
    { label: "VIP Regali", to: "#vip" },
    { label: "Souvenir", to: "#suveniri" },
    { label: "Servizio", to: "#cienasts" },
    { label: "Segnaposto", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Scatole", to: "#magnets" },
    { label: "Monete", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Tienda", to: "/veikals" },
    { label: "VIP Regalos", to: "#vip" },
    { label: "Recuerdos", to: "#suveniri" },
    { label: "Servicio", to: "#cienasts" },
    { label: "Tarjetas", to: "#galda-kartes" },
    { label: "Pasteles", to: "#tortes" },
    { label: "Cajas", to: "#magnets" },
    { label: "Monedas", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "متجر", to: "/veikals" },
    { label: "هدايا VIP", to: "#vip" },
    { label: "تذكارات", to: "#suveniri" },
    { label: "تقديم", to: "#cienasts" },
    { label: "بطاقات", to: "#galda-kartes" },
    { label: "كعك", to: "#tortes" },
    { label: "صناديق", to: "#magnets" },
    { label: "عملات", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Winkel", to: "/veikals" },
    { label: "VIP Geschenken", to: "#vip" },
    { label: "Souvenirs", to: "#suveniri" },
    { label: "Serveren", to: "#cienasts" },
    { label: "Tafelkaarten", to: "#galda-kartes" },
    { label: "Cakes", to: "#tortes" },
    { label: "Dozen", to: "#magnets" },
    { label: "Munten", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Sklep", to: "/veikals" },
    { label: "VIP Prezenty", to: "#vip" },
    { label: "Pamiątki", to: "#suveniri" },
    { label: "Serwowanie", to: "#cienasts" },
    { label: "Wizytówki", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Pudełka", to: "#magnets" },
    { label: "Monety", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Obchod", to: "/veikals" },
    { label: "VIP Dárky", to: "#vip" },
    { label: "Suvenýry", to: "#suveniri" },
    { label: "Servírování", to: "#cienasts" },
    { label: "Jmenovky", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Krabičky", to: "#magnets" },
    { label: "Mince", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Loja", to: "/veikals" },
    { label: "VIP Presentes", to: "#vip" },
    { label: "Lembranças", to: "#suveniri" },
    { label: "Serviço", to: "#cienasts" },
    { label: "Marcadores", to: "#galda-kartes" },
    { label: "Pasteles", to: "#tortes" },
    { label: "Caixas", to: "#magnets" },
    { label: "Moedas", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Κατάστημα", to: "/veikals" },
    { label: "VIP Δώρα", to: "#vip" },
    { label: "Σουβενίρ", to: "#suveniri" },
    { label: "Σερβίρισμα", to: "#cienasts" },
    { label: "Καρτελάκια", to: "#galda-kartes" },
    { label: "Τούρτες", to: "#tortes" },
    { label: "Κουτιά", to: "#magnets" },
    { label: "Νομίσματα", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Mağaza", to: "/veikals" },
    { label: "VIP Hediyeler", to: "#vip" },
    { label: "Hediyelik", to: "#suveniri" },
    { label: "Servis", to: "#cienasts" },
    { label: "Masa kartları", to: "#galda-kartes" },
    { label: "Pastalar", to: "#tortes" },
    { label: "Kutular", to: "#magnets" },
    { label: "Madeni para", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Bolt", to: "/veikals" },
    { label: "VIP Ajándékok", to: "#vip" },
    { label: "Szuvenírek", to: "#suveniri" },
    { label: "Tálalás", to: "#cienasts" },
    { label: "Ültetőkártyák", to: "#galda-kartes" },
    { label: "Torták", to: "#tortes" },
    { label: "Dobozok", to: "#magnets" },
    { label: "Érmék", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Magazin", to: "/veikals" },
    { label: "VIP Cadouri", to: "#vip" },
    { label: "Suveniruri", to: "#suveniri" },
    { label: "Servire", to: "#cienasts" },
    { label: "Carduri", to: "#galda-kartes" },
    { label: "Cakes", to: "#tortes" },
    { label: "Cutii", to: "#magnets" },
    { label: "Monede", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Магазин", to: "/veikals" },
    { label: "VIP Подаръци", to: "#vip" },
    { label: "Сувенири", to: "#suveniri" },
    { label: "Сервиране", to: "#cienasts" },
    { label: "Картички", to: "#galda-kartes" },
    { label: "Торти", to: "#tortes" },
    { label: "Кутии", to: "#magnets" },
    { label: "Монети", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Trgovina", to: "/veikals" },
    { label: "VIP Darovi", to: "#vip" },
    { label: "Suveniri", to: "#suveniri" },
    { label: "Posluživanje", to: "#cienasts" },
    { label: "Kartice", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Kutije", to: "#magnets" },
    { label: "Kovanice", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Obchod", to: "/veikals" },
    { label: "VIP Darčeky", to: "#vip" },
    { label: "Suveníry", to: "#suveniri" },
    { label: "Servírovanie", to: "#cienasts" },
    { label: "Menovky", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Krabičky", to: "#magnets" },
    { label: "Mince", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Trgovina", to: "/veikals" },
    { label: "VIP Darila", to: "#vip" },
    { label: "Spominki", to: "#suveniri" },
    { label: "Serviranje", to: "#cienasts" },
    { label: "Kartice", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Škatle", to: "#magnets" },
    { label: "Kovanci", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Магазин", to: "/veikals" },
    { label: "VIP Подарунки", to: "#vip" },
    { label: "Сувеніри", to: "#suveniri" },
    { label: "Сервіровка", to: "#cienasts" },
    { label: "Картки", to: "#galda-kartes" },
    { label: "Торти", to: "#tortes" },
    { label: "Коробки", to: "#magnets" },
    { label: "Монети", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Prodavnica", to: "/veikals" },
    { label: "VIP Поклони", to: "#vip" },
    { label: "Сувенири", to: "#suveniri" },
    { label: "Сервирање", to: "#cienasts" },
    { label: "Картице", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Кутије", to: "#magnets" },
    { label: "Новчићи", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Trgovina", to: "/veikals" },
    { label: "VIP Pokloni", to: "#vip" },
    { label: "Suveniri", to: "#suveniri" },
    { label: "Posluživanje", to: "#cienasts" },
    { label: "Kartice", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Kutije", to: "#magnets" },
    { label: "Kovanice", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Продавница", to: "/veikals" },
    { label: "VIP Подароци", to: "#vip" },
    { label: "Сувенири", to: "#suveniri" },
    { label: "Сервирање", to: "#cienasts" },
    { label: "Картички", to: "#galda-kartes" },
    { label: "Торти", to: "#tortes" },
    { label: "Кутии", to: "#magnets" },
    { label: "Монети", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Dyqan", to: "/veikals" },
    { label: "VIP Dhurata", to: "#vip" },
    { label: "Suvenire", to: "#suveniri" },
    { label: "Servimi", to: "#cienasts" },
    { label: "Kartat", to: "#galda-kartes" },
    { label: "Torte", to: "#tortes" },
    { label: "Kuti", to: "#magnets" },
    { label: "Monedha", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
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
    { label: "Verslun", to: "/veikals" },
    { label: "VIP Gjafir", to: "#vip" },
    { label: "Minjagripir", to: "#suveniri" },
    { label: "Framreiðsla", to: "#cienasts" },
    { label: "Borðspjöld", to: "#galda-kartes" },
    { label: "Tærtur", to: "#tortes" },
    { label: "Kassar", to: "#magnets" },
    { label: "Myntir", to: "#monetas" },
    { label: "Affiliate", to: "/affiliate" },
    { label: "Samband", to: "#kontakti" },
  ],
});

const homePaths: Record<Lang, string> = expandLangs({
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
});

interface NavbarProps {
  lang?: Lang;
}

const Navbar = ({ lang = "lv" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const { user } = useAuth();
  const allItems = navItems[lang];
  const affiliateItem = allItems.find((i) => i.to === "/affiliate");
  const contactItem = allItems.find((i) => i.to === "#kontakti");
  const items = allItems.filter((i) => i.to !== "/affiliate" && i.to !== "#kontakti");
  const homePath = homePaths[lang];
  const shopItem = allItems.find((i) => i.to === "/veikals");
  const infoPages = getInfoPages(lang);
  const infoLabel = (infoLabelsByLang[lang] ?? infoLabelsByLang.en).info;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Cart count
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (!user) { setCartCount(0); return; }
    let cancelled = false;
    const fetchCount = async () => {
      const { data } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);
      if (cancelled) return;
      const total = (data ?? []).reduce((s, r: { quantity: number }) => s + (r.quantity || 0), 0);
      setCartCount(total);
    };
    fetchCount();
    const onUpdate = () => fetchCount();
    window.addEventListener("cart-updated", onUpdate);
    return () => { cancelled = true; window.removeEventListener("cart-updated", onUpdate); };
  }, [user]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-foreground/95 backdrop-blur-md shadow-lg"
          : "bg-foreground"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-3 py-2 px-4 min-h-14">
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
        <div className="hidden lg:flex flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-1 min-w-0">
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
          {(
            <div className="relative" ref={infoRef}>
              <button
                onClick={() => setInfoOpen((v) => !v)}
                onBlur={() => setTimeout(() => setInfoOpen(false), 150)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                aria-haspopup="true"
                aria-expanded={infoOpen}
              >
                {infoLabel} <ChevronDown size={12} />
              </button>
              {infoOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-md bg-foreground border border-white/10 shadow-xl py-2 z-50">
                  {infoPages.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      onClick={() => setInfoOpen(false)}
                      className={`block px-4 py-2 text-xs transition-colors ${
                        pathname === p.to
                          ? "text-primary bg-primary/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side: newsletter + cart + auth + language + mobile toggle */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <div className="hidden xl:flex items-center">
              <NewsletterSignup lang={lang} source="navbar" compact />
            </div>
            <Link
              to="/veikals"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-primary bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
              aria-label={shopItem?.label ?? "Veikals"}
            >
              <Store size={14} />
              <span className="hidden sm:inline">{shopItem?.label ?? "Veikals"}</span>
            </Link>
            <Link
              to="/grozs"
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/15"
              aria-label="Grozs"
            >
              <ShoppingCart size={14} />
              <span className="hidden sm:inline">Grozs</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to={user ? "/account" : "/auth"}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors border border-white/15"
              aria-label={user ? "Mans konts" : "Pieslēgties"}
            >
              {user ? <User size={14} /> : <LogIn size={14} />}
              <span>{user ? "Mans konts" : "Pieslēgties"}</span>
            </Link>
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white/70 hover:text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            {affiliateItem && (
              <Link
                to={affiliateItem.to}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-colors border ${
                  pathname === affiliateItem.to
                    ? "text-primary bg-primary/10 border-primary/40"
                    : "text-primary/90 border-primary/30 hover:bg-primary/10"
                }`}
              >
                {affiliateItem.label}
              </Link>
            )}
            {contactItem && (
              <a
                href={contactItem.to}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium text-white/80 border border-white/15 hover:text-white hover:bg-white/5 transition-colors"
              >
                {contactItem.label}
              </a>
            )}
          </div>
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
          {(
            <div className="mt-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setMobileInfoOpen((v) => !v)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
              >
                <span>{infoLabel}</span>
                <ChevronDown size={14} className={`transition-transform ${mobileInfoOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileInfoOpen && (
                <div className="pl-3">
                  {infoPages.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                        pathname === p.to
                          ? "text-primary bg-primary/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-white/10">
            <NewsletterSignup lang={lang} source="navbar-mobile" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
