// Shared UI string translations (header buttons, shop page, newsletter)
import { expandLangs } from "./expandLangs";
import type { Lang } from "./types";

export interface UIStrings {
  signIn: string;
  myAccount: string;
  cart: string;
  subscribe: string;
  email: string;
  thanks: string;
  affiliate: string;
  // Shop page
  catalog: string;
  shopTitle: string;
  productsCount: (n: number) => string;
  shopTagline: string;
  searchProducts: string;
  categories: string;
  allProducts: string;
  nothingFound: string;
  tryAnother: string;
  byCategory: string;
  newest: string;
  priceAsc: string;
  priceDesc: string;
  name: string;
  noImage: string;
  prevPage: string;
  nextPage: string;
  addToCart: string;
  addingToCart: string;
  uploadLogoOrCustom: string;
  backToShop: string;
  inStock: string;
  madeToOrder: string;
  preparationDays: (n: number) => string;
  deliveryDays: (n: number) => string;
  vatIncluded: string;
  description: string;
  addedToCart: string;
  errorTitle: string;
  addToCartError: string;


}

const en: UIStrings = {
  signIn: "Sign in",
  myAccount: "My account",
  cart: "Cart",
  subscribe: "Subscribe",
  email: "Email",
  thanks: "Thanks!",
  affiliate: "Affiliate",
  catalog: "Catalog",
  shopTitle: "Chocolate shop",
  productsCount: (n) => `${n} products`,
  shopTagline: "free sketch within 24h, production from 3 days.",
  searchProducts: "Search products...",
  categories: "Categories",
  allProducts: "All products",
  nothingFound: "Nothing found",
  tryAnother: "Try another category or search term.",
  byCategory: "By category",
  newest: "Newest",
  priceAsc: "Price ↑",
  priceDesc: "Price ↓",
  name: "Name",
  noImage: "No image",
  prevPage: "Previous page",
  nextPage: "Next page",
  addToCart: "Add to cart",
  addingToCart: "Adding...",
  uploadLogoOrCustom: "Upload logo / custom order",
  backToShop: "Back to shop",
  inStock: "In stock",
  madeToOrder: "Made to order",
  preparationDays: (n) => `preparation ${n} d.`,
  deliveryDays: (n) => `delivery ${n} d.`,
  vatIncluded: "VAT included",
  description: "Description",
  addedToCart: "Added to cart",
  errorTitle: "Error",
  addToCartError: "Could not add to cart.",
};


export const uiStrings: Record<Lang, UIStrings> = expandLangs<UIStrings>({
  en,
  lv: {
    signIn: "Pieslēgties", myAccount: "Mans konts", cart: "Grozs", subscribe: "Pierakstīties",
    email: "E-pasts", thanks: "Paldies!", affiliate: "Partneru programma",
    catalog: "Katalogs", shopTitle: "Šokolādes veikals",
    productsCount: (n) => `${n} produkti`,
    shopTagline: "bezmaksas skice 24h laikā, ražošana no 3 dienām.",
    searchProducts: "Meklēt produktus...", categories: "Kategorijas",
    allProducts: "Visi produkti", nothingFound: "Nekas netika atrasts",
    tryAnother: "Mēģiniet citu kategoriju vai meklēšanas vārdu.",
    byCategory: "Pēc kategorijas", newest: "Jaunākie",
    priceAsc: "Cena ↑", priceDesc: "Cena ↓", name: "Nosaukums",
    noImage: "Bez attēla", prevPage: "Iepriekšējā lapa", nextPage: "Nākamā lapa",
    addToCart: "Pievienot grozam", addingToCart: "Pievieno...",
    uploadLogoOrCustom: "Augšupielādēt logo / individuāls pasūtījums",
  },
  ru: {
    signIn: "Войти", myAccount: "Мой аккаунт", cart: "Корзина", subscribe: "Подписаться",
    email: "Эл. почта", thanks: "Спасибо!", affiliate: "Партнёрская программа",
    catalog: "Каталог", shopTitle: "Шоколадный магазин",
    productsCount: (n) => `${n} товаров`,
    shopTagline: "бесплатный эскиз за 24 часа, производство от 3 дней.",
    searchProducts: "Поиск товаров...", categories: "Категории",
    allProducts: "Все товары", nothingFound: "Ничего не найдено",
    tryAnother: "Попробуйте другую категорию или поисковое слово.",
    byCategory: "По категориям", newest: "Новинки",
    priceAsc: "Цена ↑", priceDesc: "Цена ↓", name: "Название",
    noImage: "Нет изображения", prevPage: "Предыдущая страница", nextPage: "Следующая страница",
    addToCart: "Добавить в корзину", addingToCart: "Добавляем...",
    uploadLogoOrCustom: "Загрузить логотип / индивидуальный заказ",
  },

  et: { ...en, signIn: "Logi sisse", myAccount: "Minu konto", cart: "Ostukorv", subscribe: "Telli", email: "E-post", thanks: "Aitäh!", affiliate: "Affiliate", catalog: "Kataloog", shopTitle: "Šokolaadipood", productsCount: (n)=>`${n} toodet`, shopTagline: "tasuta visand 24h jooksul, tootmine alates 3 päevast.", searchProducts: "Otsi tooteid...", categories: "Kategooriad", allProducts: "Kõik tooted", nothingFound: "Midagi ei leitud", tryAnother: "Proovi teist kategooriat või otsisõna.", byCategory: "Kategooria järgi", newest: "Uusimad", name: "Nimi", noImage: "Pilt puudub", prevPage: "Eelmine", nextPage: "Järgmine" },
  lt: { ...en, signIn: "Prisijungti", myAccount: "Mano paskyra", cart: "Krepšelis", subscribe: "Užsiprenumeruoti", email: "El. paštas", thanks: "Ačiū!", affiliate: "Partnerių programa", catalog: "Katalogas", shopTitle: "Šokolado parduotuvė", productsCount: (n)=>`${n} prekės`, shopTagline: "nemokamas eskizas per 24h, gamyba nuo 3 dienų.", searchProducts: "Ieškoti prekių...", categories: "Kategorijos", allProducts: "Visos prekės", nothingFound: "Nieko nerasta", tryAnother: "Pabandykite kitą kategoriją ar paieškos žodį.", byCategory: "Pagal kategoriją", newest: "Naujausi", name: "Pavadinimas", noImage: "Nėra nuotraukos", prevPage: "Ankstesnis", nextPage: "Kitas" },
  de: { ...en, signIn: "Anmelden", myAccount: "Mein Konto", cart: "Warenkorb", subscribe: "Abonnieren", email: "E-Mail", thanks: "Danke!", affiliate: "Partnerprogramm", catalog: "Katalog", shopTitle: "Schokoladen-Shop", productsCount: (n)=>`${n} Produkte`, shopTagline: "kostenlose Skizze in 24h, Produktion ab 3 Tagen.", searchProducts: "Produkte suchen...", categories: "Kategorien", allProducts: "Alle Produkte", nothingFound: "Nichts gefunden", tryAnother: "Versuchen Sie eine andere Kategorie oder Suchbegriff.", byCategory: "Nach Kategorie", newest: "Neueste", name: "Name", noImage: "Kein Bild", prevPage: "Vorherige Seite", nextPage: "Nächste Seite" },
  fr: { ...en, signIn: "Se connecter", myAccount: "Mon compte", cart: "Panier", subscribe: "S'abonner", email: "E-mail", thanks: "Merci !", affiliate: "Programme d'affiliation", catalog: "Catalogue", shopTitle: "Boutique de chocolats", productsCount: (n)=>`${n} produits`, shopTagline: "esquisse gratuite sous 24h, production dès 3 jours.", searchProducts: "Rechercher des produits...", categories: "Catégories", allProducts: "Tous les produits", nothingFound: "Aucun résultat", tryAnother: "Essayez une autre catégorie ou recherche.", byCategory: "Par catégorie", newest: "Nouveautés", name: "Nom", noImage: "Pas d'image", prevPage: "Précédent", nextPage: "Suivant" },
  it: { ...en, signIn: "Accedi", myAccount: "Il mio account", cart: "Carrello", subscribe: "Iscriviti", email: "E-mail", thanks: "Grazie!", affiliate: "Programma affiliati", catalog: "Catalogo", shopTitle: "Negozio di cioccolato", productsCount: (n)=>`${n} prodotti`, shopTagline: "bozza gratuita in 24h, produzione da 3 giorni.", searchProducts: "Cerca prodotti...", categories: "Categorie", allProducts: "Tutti i prodotti", nothingFound: "Nessun risultato", tryAnother: "Prova un'altra categoria o termine di ricerca.", byCategory: "Per categoria", newest: "Più recenti", name: "Nome", noImage: "Nessuna immagine", prevPage: "Precedente", nextPage: "Successivo" },
  es: { ...en, signIn: "Iniciar sesión", myAccount: "Mi cuenta", cart: "Carrito", subscribe: "Suscribirse", email: "Correo", thanks: "¡Gracias!", affiliate: "Programa de afiliados", catalog: "Catálogo", shopTitle: "Tienda de chocolate", productsCount: (n)=>`${n} productos`, shopTagline: "boceto gratis en 24h, producción desde 3 días.", searchProducts: "Buscar productos...", categories: "Categorías", allProducts: "Todos los productos", nothingFound: "Sin resultados", tryAnother: "Prueba otra categoría o búsqueda.", byCategory: "Por categoría", newest: "Más recientes", name: "Nombre", noImage: "Sin imagen", prevPage: "Anterior", nextPage: "Siguiente" },
  sv: { ...en, signIn: "Logga in", cart: "Kundvagn", subscribe: "Prenumerera" },
  no: { ...en, signIn: "Logg inn", cart: "Handlekurv", subscribe: "Abonner" },
  fi: { ...en, signIn: "Kirjaudu", cart: "Ostoskori", subscribe: "Tilaa" },
  da: { ...en, signIn: "Log ind", cart: "Kurv", subscribe: "Abonner" },
  nl: { ...en, signIn: "Inloggen", cart: "Winkelwagen", subscribe: "Abonneren" },
  pl: { ...en, signIn: "Zaloguj", cart: "Koszyk", subscribe: "Subskrybuj" },
  cs: { ...en, signIn: "Přihlásit", cart: "Košík", subscribe: "Odebírat" },
  pt: { ...en, signIn: "Entrar", cart: "Carrinho", subscribe: "Assinar" },
  el: { ...en, signIn: "Σύνδεση", cart: "Καλάθι", subscribe: "Εγγραφή" },
  tr: { ...en, signIn: "Giriş", cart: "Sepet", subscribe: "Abone ol" },
  hu: { ...en, signIn: "Belépés", cart: "Kosár", subscribe: "Feliratkozás" },
  ro: { ...en, signIn: "Conectare", cart: "Coș", subscribe: "Abonare" },
  bg: { ...en, signIn: "Вход", cart: "Кошница", subscribe: "Абонирай се" },
  hr: { ...en, signIn: "Prijava", cart: "Košarica", subscribe: "Pretplati se" },
  sk: { ...en, signIn: "Prihlásiť", cart: "Košík", subscribe: "Odoberať" },
  sl: { ...en, signIn: "Prijava", cart: "Košarica", subscribe: "Naroči" },
  uk: { ...en, signIn: "Увійти", cart: "Кошик", subscribe: "Підписатися" },
  sr: { ...en, signIn: "Пријава", cart: "Корпа", subscribe: "Претплата" },
  bs: { ...en, signIn: "Prijava", cart: "Korpa", subscribe: "Pretplata" },
  mk: { ...en, signIn: "Најава", cart: "Корпа", subscribe: "Претплата" },
  sq: { ...en, signIn: "Hyr", cart: "Shporta", subscribe: "Abonohu" },
  is: { ...en, signIn: "Innskráning", cart: "Karfa", subscribe: "Áskrift" },
  ar: { ...en, signIn: "تسجيل الدخول", myAccount: "حسابي", cart: "السلة", subscribe: "اشترك", email: "البريد الإلكتروني", thanks: "شكراً!", affiliate: "برنامج الشراكة" },
});

export function tUI(lang: string): UIStrings {
  return (uiStrings as Record<string, UIStrings>)[lang] ?? uiStrings.en;
}
