import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, ChevronLeft, Loader2, Download, CreditCard } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/hooks/use-toast";
import { pickI18n, useCurrentLang } from "@/i18n/useCurrentLang";
import { tUI } from "@/i18n/uiStrings";
import logoUrl from "@/assets/luxury-chocolate-logo.jpg";
import chocoTimeUrl from "@/assets/its-choco-time.png";
import { Check } from "lucide-react";

interface LogoRef { url: string; filename: string; quantity?: number }
interface CartLine {
  id: string;
  quantity: number;
  logo_url: string | null;
  logo_filename: string | null;
  logos: LogoRef[] | null;
  product: {
    id: string;
    name: string;
    name_i18n: Record<string, unknown> | null;
    price_cents: number;
    currency: string;
    weight_grams: number | null;
  } | null;
}

const SHIPPING_OPTIONS: Record<string, { labelKey: keyof ReturnType<typeof tUI>; lvLabel: string; cents: number }> = {
  pickup: { labelKey: "shipPickup", lvLabel: "Izņemt uz vietas — Kandavas iela 29A, Rīga", cents: 0 },
  venipak_pakomats: { labelKey: "shipVenipakPakomats", lvLabel: "Venipak pakomāts", cents: 1000 },
  courier_riga: { labelKey: "shipCourierRiga", lvLabel: "Piegāde Rīgā", cents: 3025 },
  venipak_lv: { labelKey: "shipVenipakLv", lvLabel: "Venipak Latvija", cents: 5500 },
  venipak_baltic: { labelKey: "shipVenipakBaltic", lvLabel: "Venipak Baltija", cents: 6000 },
  venipak_scandi: { labelKey: "shipVenipakScandi", lvLabel: "Venipak Skandināvija", cents: 8000 },
  venipak_eu: { labelKey: "shipVenipakEu", lvLabel: "Venipak Eiropa", cents: 10000 },
  venipak_world: { labelKey: "shipVenipakWorld", lvLabel: "Venipak Pasaule", cents: 20000 },
};

const INVOICE_TEXT = {
  en: {
    backToCart: "Back to cart",
    print: "Print",
    savePdf: "Save PDF",
    saveInvoice: "Save invoice",
    payNow: "Pay now",
    payInvoice: "Pay invoice",
    confirmOrder: "Confirm order",
    buyerDetails: "Invoice recipient details",
    companyPlaceholder: "Company / person name",
    regPlaceholder: "Registration number",
    contactPlaceholder: "Contact person (name, surname)",
    vatPlaceholder: "VAT number (optional)",
    phonePlaceholder: "Phone",
    addressPlaceholder: "Legal address",
    emailPlaceholder: "Email",
    shippingMethod: "Shipping method",
    proformaTitle: "Prepayment invoice",
    invoiceNo: "No.",
    issued: "Issued",
    due: "Payment due",
    legalAddress: "Legal address",
    actualAddress: "Office address",
    seller: "Seller",
    buyer: "Buyer",
    vatReg: "VAT reg. no.",
    boardMember: "Board member",
    regNo: "Reg. No.",
    contactPerson: "Contact person",
    itemName: "Name",
    quantity: "Qty.",
    price: "Price",
    sum: "Sum",
    withYourLogo: "with your logo",
    withLogos: (n: number) => `with ${n} logos`,
    shipping: "Shipping",
    subtotalExVat: "Amount excl. VAT",
    vat: "VAT 21%",
    vatReverse: "VAT 21% (reverse charge — 0%)",
    reverseNote: "Reverse charge — VAT is accounted for by the recipient (Art. 196 of EU VAT Directive 2006/112/EC).",
    viesChecking: "Checking VIES…",
    viesValid: "Verified in VIES",
    viesInvalid: "Not found in VIES",
    viesSource: "Source: ec.europa.eu/taxation_customs/vies",
    totalPayable: "Total payable",
    totalWeight: "Total weight",
    weightPerPiece: "Weight/pc",
    bankTransfer: "Payment by bank transfer",
    recipient: "Recipient",
    companyRegNo: "Reg. no.",
    bank: "Bank",
    account: "Account",
    productionAfterPayment: "We will start preparing the order after payment is received. For questions: info@luxurychocolate.lv",
    productionTerms: "Production lead time by agreement, standard production time 1–2 weeks.",
    proformaNote: "This is a prepayment (proforma) invoice. The final invoice will be issued after payment.",
    cartEmpty: "Cart is empty.",
    goToShop: "Go to shop",
    missingDetailsTitle: "Missing details",
    missingDetailsDesc: "Please fill in at least the company name and email.",
    orderConfirmedTitle: "Order confirmed",
    orderConfirmedDesc: (n: string) => `Order no. ${n}. We will send payment instructions to your email.`,
    errorTitle: "Error",
    confirmError: "Could not confirm the order. Please try again.",
    prepChocolate: "Preparation for chocolate production",
    agencyDiscount: "Agency discount",
    agencyDiscountApply: "Apply agency discount",
  },

  lv: {
    backToCart: "Atpakaļ uz grozu",
    print: "Drukāt",
    savePdf: "Saglabāt PDF",
    saveInvoice: "Saglabāt rēķinu",
    payNow: "Maksāt tagad",
    payInvoice: "Apmaksāt rēķinu",
    confirmOrder: "Apstiprināt pasūtījumu",
    buyerDetails: "Rēķina saņēmēja rekvizīti",
    companyPlaceholder: "Uzņēmuma / personas nosaukums",
    regPlaceholder: "Reģistrācijas numurs",
    contactPlaceholder: "Kontaktpersona (vārds, uzvārds)",
    vatPlaceholder: "PVN numurs (neobligāti)",
    phonePlaceholder: "Telefons",
    addressPlaceholder: "Juridiskā adrese",
    emailPlaceholder: "E-pasts",
    shippingMethod: "Piegādes veids",
    proformaTitle: "Priekšapmaksas rēķins",
    invoiceNo: "Nr.",
    issued: "Izrakstīts",
    due: "Apmaksas termiņš",
    legalAddress: "Jur. adrese",
    actualAddress: "Fakt. adrese",
    seller: "Pārdevējs",
    buyer: "Pircējs",
    vatReg: "PVN Reģ.nr.",
    boardMember: "Valdes locekle",
    regNo: "Reģ. Nr.",
    contactPerson: "Kontaktpersona",
    itemName: "Nosaukums",
    quantity: "Daudz.",
    price: "Cena",
    sum: "Summa",
    withYourLogo: "ar Jūsu logo",
    withLogos: (n: number) => `ar ${n} logo`,
    shipping: "Piegāde",
    subtotalExVat: "Summa bez PVN",
    vat: "PVN 21%",
    vatReverse: "PVN 21% (apgrieztā maksāšanas kārtība — 0%)",
    reverseNote: "Apgrieztā PVN maksāšanas kārtība — PVN aprēķina un maksā pakalpojuma saņēmējs (PVN direktīvas 2006/112/EK 196. pants).",
    viesChecking: "Pārbauda VIES…",
    viesValid: "Verificēts VIES sistēmā",
    viesInvalid: "Nav atrasts VIES sistēmā",
    viesSource: "Avots: ec.europa.eu/taxation_customs/vies",
    totalPayable: "Kopā apmaksai",
    totalWeight: "Kopējais svars",
    weightPerPiece: "Svars/gab.",
    bankTransfer: "Apmaksa ar pārskaitījumu",
    recipient: "Saņēmējs",
    companyRegNo: "Reģ.nr.",
    bank: "Banka",
    account: "Konts",
    productionAfterPayment: "Pasūtījumu sāksim gatavot pēc apmaksas saņemšanas. Jautājumu gadījumā: info@luxurychocolate.lv",
    productionTerms: "Izgatavošanas termiņš pēc vienošanās, standarta izgatavošanas termiņš 1–2 nedēļas.",
    proformaNote: "Šis ir priekšapmaksas (proforma) rēķins. Galīgais rēķins tiks izsniegts pēc apmaksas.",
    cartEmpty: "Grozs ir tukšs.",
    goToShop: "Doties uz veikalu",
    missingDetailsTitle: "Trūkst rekvizītu",
    missingDetailsDesc: "Lūdzu, aizpildi vismaz uzņēmuma nosaukumu un e-pastu.",
    orderConfirmedTitle: "Pasūtījums apstiprināts",
    orderConfirmedDesc: (n: string) => `Pasūtījuma nr. ${n}. Nosūtīsim apmaksas instrukcijas uz e-pastu.`,
    errorTitle: "Kļūda",
    confirmError: "Neizdevās apstiprināt pasūtījumu. Lūdzu, mēģini vēlreiz.",
    prepChocolate: "Sagatavošana šokolādes ražošanai",
    agencyDiscount: "Aģentūras atlaide",
    agencyDiscountApply: "Pielietot aģentūras atlaidi",
  },

  ru: {
    backToCart: "Назад в корзину",
    print: "Печать",
    savePdf: "Сохранить PDF",
    saveInvoice: "Сохранить счёт",
    payNow: "Оплатить сейчас",
    payInvoice: "Оплатить счёт",
    confirmOrder: "Подтвердить заказ",
    buyerDetails: "Реквизиты получателя счёта",
    companyPlaceholder: "Название компании / имя частного лица",
    regPlaceholder: "Регистрационный номер",
    contactPlaceholder: "Контактное лицо (имя, фамилия)",
    vatPlaceholder: "Номер НДС (необязательно)",
    phonePlaceholder: "Телефон",
    addressPlaceholder: "Юридический адрес",
    emailPlaceholder: "Эл. почта",
    shippingMethod: "Способ доставки",
    proformaTitle: "Счёт на предоплату",
    invoiceNo: "№",
    issued: "Выписан",
    due: "Срок оплаты",
    legalAddress: "Юр. адрес",
    actualAddress: "Факт. адрес",
    seller: "Продавец",
    buyer: "Покупатель",
    vatReg: "Рег. № НДС",
    boardMember: "Член правления",
    regNo: "Рег. №",
    contactPerson: "Контактное лицо",
    itemName: "Наименование",
    quantity: "Кол-во",
    price: "Цена",
    sum: "Сумма",
    withYourLogo: "с вашим логотипом",
    withLogos: (n: number) => `с ${n} логотипами`,
    shipping: "Доставка",
    subtotalExVat: "Сумма без НДС",
    vat: "НДС 21%",
    vatReverse: "НДС 21% (обратное начисление — 0%)",
    reverseNote: "Обратное начисление НДС — НДС уплачивает получатель (ст. 196 Директивы ЕС 2006/112/EC).",
    viesChecking: "Проверка в VIES…",
    viesValid: "Подтверждён в VIES",
    viesInvalid: "Не найден в VIES",
    viesSource: "Источник: ec.europa.eu/taxation_customs/vies",
    totalPayable: "Итого к оплате",
    totalWeight: "Общий вес",
    weightPerPiece: "Вес/шт.",
    bankTransfer: "Оплата банковским переводом",
    recipient: "Получатель",
    companyRegNo: "Рег. №",
    bank: "Банк",
    account: "Счёт",
    productionAfterPayment: "Мы начнём подготовку заказа после получения оплаты. По вопросам: info@luxurychocolate.lv",
    productionTerms: "Срок изготовления по согласованию, стандартный срок изготовления 1–2 недели.",
    proformaNote: "Это счёт на предоплату (proforma). Окончательный счёт будет выдан после оплаты.",
    cartEmpty: "Корзина пуста.",
    goToShop: "Перейти в магазин",
    missingDetailsTitle: "Не хватает реквизитов",
    missingDetailsDesc: "Пожалуйста, заполните как минимум название компании и эл. почту.",
    orderConfirmedTitle: "Заказ подтверждён",
    orderConfirmedDesc: (n: string) => `Номер заказа ${n}. Мы отправим инструкции по оплате на вашу эл. почту.`,
    errorTitle: "Ошибка",
    confirmError: "Не удалось подтвердить заказ. Пожалуйста, попробуйте ещё раз.",
    prepChocolate: "Подготовка шоколадного производства",
    agencyDiscount: "Агентская скидка",
    agencyDiscountApply: "Применить агентскую скидку",
  },

  et: {
    backToCart: "Tagasi ostukorvi",
    print: "Prindi",
    savePdf: "Salvesta PDF",
    saveInvoice: "Salvesta arve",
    payNow: "Maksa kohe",
    payInvoice: "Maksa arve",
    confirmOrder: "Kinnita tellimus",
    buyerDetails: "Arve saaja andmed",
    companyPlaceholder: "Ettevõtte / isiku nimi",
    regPlaceholder: "Registrinumber",
    contactPlaceholder: "Kontaktisik (eesnimi, perekonnanimi)",
    vatPlaceholder: "KMKR number (valikuline)",
    phonePlaceholder: "Telefon",
    addressPlaceholder: "Juriidiline aadress",
    emailPlaceholder: "E-post",
    shippingMethod: "Tarneviis",
    proformaTitle: "Ettemaksuarve",
    invoiceNo: "Nr.",
    issued: "Väljastatud",
    due: "Maksetähtaeg",
    legalAddress: "Jur. aadress",
    actualAddress: "Tegelik aadress",
    seller: "Müüja",
    buyer: "Ostja",
    vatReg: "KMKR nr.",
    boardMember: "Juhatuse liige",
    regNo: "Reg. nr.",
    contactPerson: "Kontaktisik",
    itemName: "Nimetus",
    quantity: "Kogus",
    price: "Hind",
    sum: "Summa",
    withYourLogo: "teie logoga",
    withLogos: (n: number) => `${n} logoga`,
    shipping: "Tarne",
    subtotalExVat: "Summa ilma käibemaksuta",
    vat: "Käibemaks 21%",
    vatReverse: "Käibemaks 21% (pöördmaksustamine — 0%)",
    reverseNote: "Pöördmaksustamine — käibemaksu arvestab ja tasub saaja (EL käibemaksudirektiivi 2006/112/EÜ art. 196).",
    viesChecking: "VIES kontroll…",
    viesValid: "Kinnitatud VIES-is",
    viesInvalid: "Ei leitud VIES-ist",
    viesSource: "Allikas: ec.europa.eu/taxation_customs/vies",
    totalPayable: "Kokku tasumisele",
    totalWeight: "Kogukaal",
    weightPerPiece: "Kaal/tk",
    bankTransfer: "Tasumine pangaülekandega",
    recipient: "Saaja",
    companyRegNo: "Reg. nr.",
    bank: "Pank",
    account: "Konto",
    productionAfterPayment: "Alustame tellimuse ettevalmistamist pärast makse laekumist. Küsimuste korral: info@luxurychocolate.lv",
    productionTerms: "Tootmise tähtaeg kokkuleppel, standardne tootmisaeg 1–2 nädalat.",
    proformaNote: "See on ettemaksuarve (proforma). Lõplik arve väljastatakse pärast makse laekumist.",
    cartEmpty: "Ostukorv on tühi.",
    goToShop: "Mine poodi",
    missingDetailsTitle: "Andmed puuduvad",
    missingDetailsDesc: "Palun täida vähemalt ettevõtte nimi ja e-post.",
    orderConfirmedTitle: "Tellimus kinnitatud",
    orderConfirmedDesc: (n: string) => `Tellimuse nr. ${n}. Saadame maksejuhised teie e-postile.`,
    errorTitle: "Viga",
    confirmError: "Tellimuse kinnitamine ebaõnnestus. Palun proovi uuesti.",
    prepChocolate: "Šokolaadi tootmise ettevalmistus",
    agencyDiscount: "Agentuuri allahindlus",
    agencyDiscountApply: "Rakenda agentuuri allahindlus",
  },

};

const getInvoiceText = (lang: string) => INVOICE_TEXT[lang as keyof typeof INVOICE_TEXT] ?? INVOICE_TEXT.en;

const fmt = (cents: number, currency = "EUR", lang = "lv") =>
  new Intl.NumberFormat(lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : lang === "et" ? "et-EE" : "lv-LV", { style: "currency", currency }).format(cents / 100);

const localizeProductName = (name: string, lang: string, tx: ReturnType<typeof getInvoiceText>) => {
  const norm = name.trim().toLowerCase().replace(/\.$/, "");
  if ((lang === "ru" || lang === "et") && norm === "sagatavošana šokolādes ražošanai") return tx.prepChocolate;
  return name;
};

const Rekins = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const lang = useCurrentLang();
  const t = tUI(lang);
  const tx = getInvoiceText(lang);
  const withLang = useCallback((path: string) => {
    if (!lang || lang === "lv") return path;
    return `${path}${path.includes("?") ? "&" : "?"}lang=${lang}`;
  }, [lang]);
  const [items, setItems] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);

  // Buyer (customer) details — persisted in localStorage so they survive reloads / navigation
  const STORAGE_KEY = "invoice_buyer_form";
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  })();
  const [buyerCompany, setBuyerCompany] = useState<string>(saved.company ?? "");
  const [buyerContact, setBuyerContact] = useState<string>(saved.contact ?? "");
  const [buyerVat, setBuyerVat] = useState<string>(saved.vat ?? "");
  const [buyerRegNr, setBuyerRegNr] = useState<string>(saved.regNr ?? "");
  const [buyerAddress, setBuyerAddress] = useState<string>(saved.address ?? "");
  const [buyerEmail, setBuyerEmail] = useState<string>(saved.email ?? "");
  const [buyerPhone, setBuyerPhone] = useState<string>(saved.phone ?? "");
  const [shippingId, setShippingId] = useState<string>(
    () => sessionStorage.getItem("shipping_id") || "pickup",
  );
  const [agencyDiscountOn, setAgencyDiscountOn] = useState<boolean>(saved.agencyOn ?? false);
  const [agencyDiscountPct, setAgencyDiscountPct] = useState<number>(typeof saved.agencyPct === "number" ? saved.agencyPct : 20);


  // Persist on every change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        company: buyerCompany, contact: buyerContact, vat: buyerVat, regNr: buyerRegNr,
        address: buyerAddress, email: buyerEmail, phone: buyerPhone,
        agencyOn: agencyDiscountOn, agencyPct: agencyDiscountPct,
      }),
    );
  }, [buyerCompany, buyerContact, buyerVat, buyerRegNr, buyerAddress, buyerEmail, buyerPhone, agencyDiscountOn, agencyDiscountPct]);


  const invoiceNumber = useMemo(() => {
    const d = new Date();
    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    return `PRO-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }, []);
  const dateLocale = lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "lv-LV";
  const today = useMemo(() => new Date().toLocaleDateString(dateLocale), [dateLocale]);
  const dueDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString(dateLocale);
  }, [dateLocale]);

  useSeo({
    title: `${tx.proformaTitle} — Luxury Chocolate`,
    description: lang === "ru" ? "Создайте, сохраните и оплатите счёт." : "Izveido un saglabā rēķinu pirms apmaksas.",
    path: "/rekins",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate(`/auth?redirect=${encodeURIComponent(withLang("/rekins"))}${lang !== "lv" ? `&lang=${lang}` : ""}`, { replace: true });
  }, [authLoading, user, navigate, withLang, lang]);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("id, quantity, logo_url, logo_filename, logos, product:products(id, name, name_i18n, price_cents, currency, weight_grams)")
      .eq("user_id", user.id);
    setItems((data ?? []) as unknown as CartLine[]);
    // Prefill from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("company_name, vat_number, registration_number, legal_address, legal_city, legal_postal_code, legal_country, phone, email, first_name, last_name")
      .eq("user_id", user.id)
      .maybeSingle();
    if (profile) {
      setBuyerCompany((v) => v || profile.company_name || "");
      setBuyerVat((v) => v || profile.vat_number || "");
      setBuyerRegNr((v) => v || profile.registration_number || "");
      const contact = [profile.first_name, profile.last_name].filter(Boolean).join(" ");
      setBuyerContact((v) => v || contact);
      const addr = [profile.legal_address, profile.legal_city, profile.legal_postal_code, profile.legal_country]
        .filter(Boolean).join(", ");
      setBuyerAddress((v) => v || addr);
      setBuyerPhone((v) => v || profile.phone || "");
      setBuyerEmail((v) => v || profile.email || user.email || "");
    } else {
      setBuyerEmail((v) => v || user.email || "");
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { if (user) load(); }, [user, load]);

  const validItems = items.filter((i) => i.product);
  const currency = validItems[0]?.product?.currency ?? "EUR";
  const subtotal = validItems.reduce((s, i) => s + (i.product?.price_cents ?? 0) * i.quantity, 0);
  const totalWeightGrams = validItems.reduce((s, i) => s + (i.product?.weight_grams ?? 0) * i.quantity, 0);
  const fmtKg = (g: number) => {
    const loc = lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "lv-LV";
    return `${(g / 1000).toLocaleString(loc, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} kg`;
  };
  const shipping = SHIPPING_OPTIONS[shippingId] ?? SHIPPING_OPTIONS.pickup;
  const shippingLabel = String(t[shipping.labelKey] ?? shipping.lvLabel);
  // Agency discount (applied to products subtotal, VAT-inclusive)
  const agencyPctClamped = Math.max(0, Math.min(100, Number.isFinite(agencyDiscountPct) ? agencyDiscountPct : 0));
  const agencyDiscountCents = agencyDiscountOn ? Math.round(subtotal * (agencyPctClamped / 100)) : 0;
  const subtotalAfterDiscount = subtotal - agencyDiscountCents;
  // VAT included (21%) — show breakdown
  const vatRate = 0.21;
  // EU VAT number prefixes (excluding LV — domestic sales keep 21% VAT)
  const EU_VAT_PREFIXES = ["AT","BE","BG","CY","CZ","DE","DK","EE","EL","GR","ES","FI","FR","HR","HU","IE","IT","LT","LU","MT","NL","PL","PT","RO","SE","SI","SK","XI"];
  const normalizedVat = buyerVat.replace(/[\s-]/g, "").toUpperCase();
  const vatPrefix = normalizedVat.slice(0, 2);
  const isReverseCharge = EU_VAT_PREFIXES.includes(vatPrefix) && normalizedVat.length >= 4;
  const grossTotal = subtotalAfterDiscount + shipping.cents;
  const totalExVat = Math.round(grossTotal / (1 + vatRate));
  const vatAmount = isReverseCharge ? 0 : grossTotal - totalExVat;
  const total = isReverseCharge ? totalExVat : grossTotal;


  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [savingPdf, setSavingPdf] = useState(false);
  const [paying, setPaying] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // VIES verification of buyer VAT number
  type ViesResult = { valid: boolean; name?: string | null; address?: string | null; requestDate?: string } | null;
  const [viesStatus, setViesStatus] = useState<"idle" | "checking" | "done">("idle");
  const [viesResult, setViesResult] = useState<ViesResult>(null);
  useEffect(() => {
    const v = buyerVat.replace(/[\s-]/g, "").toUpperCase();
    if (v.length < 4 || !/^[A-Z]{2}/.test(v)) {
      setViesStatus("idle"); setViesResult(null); return;
    }
    let cancelled = false;
    setViesStatus("checking");
    const handle = setTimeout(async () => {
      try {
        const { data, error } = await supabase.functions.invoke("vies-check", { body: { vat: v } });
        if (cancelled) return;
        if (error) { setViesStatus("done"); setViesResult({ valid: false }); return; }
        setViesStatus("done");
        setViesResult(data as ViesResult);
      } catch {
        if (!cancelled) { setViesStatus("done"); setViesResult({ valid: false }); }
      }
    }, 600);
    return () => { cancelled = true; clearTimeout(handle); };
  }, [buyerVat]);

  const handlePrint = () => window.print();

  const handleSavePdf = async () => {
    if (!invoiceRef.current) return;
    setSavingPdf(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let heightLeft = imgH;
      let y = 0;
      pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        y = heightLeft - imgH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, y, imgW, imgH);
        heightLeft -= pageH;
      }
      pdf.save(`${lang === "ru" ? "Schet" : "Rekins"}_${invoiceNumber}.pdf`);
    } finally {
      setSavingPdf(false);
    }
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      sessionStorage.setItem("invoice_buyer", JSON.stringify({
        company: buyerCompany, vat: buyerVat, regNr: buyerRegNr,
        address: buyerAddress, email: buyerEmail, phone: buyerPhone,
        invoiceNumber,
      }));
      navigate(withLang("/kase"));
    } finally {
      setPaying(false);
    }
  };

  const handleConfirm = async () => {
    if (!buyerCompany || !buyerEmail) {
      toast({ title: tx.missingDetailsTitle, description: tx.missingDetailsDesc, variant: "destructive" });
      return;
    }
    if (!user) return;
    setConfirming(true);
    try {
      // 1. Create order
      const { data: orderData, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          customer_email: buyerEmail,
          customer_name: buyerContact || buyerCompany,
          customer_phone: buyerPhone,
          company_name: buyerCompany,
          vat_number: buyerVat,
          shipping_address: buyerAddress,
          shipping_method: shippingLabel,
          subtotal_cents: subtotalAfterDiscount,
          shipping_cents: shipping.cents,
          tax_cents: vatAmount,
          total_cents: total,
          currency,
          status: "pending",
        })
        .select("id, order_number")
        .single();
      if (orderErr || !orderData) throw orderErr || new Error(tx.confirmError);

      // 2. Create order items
      const orderItems = validItems.map((i) => ({
        order_id: orderData.id,
        product_id: i.product?.id ?? null,
        product_name: localizeProductName(pickI18n(i.product?.name_i18n, lang, i.product?.name ?? ""), lang, tx),
        product_type: "product",
        quantity: i.quantity,
        unit_price_cents: i.product?.price_cents ?? 0,
        total_price_cents: (i.product?.price_cents ?? 0) * i.quantity,
        logo_url: i.logo_url,
        logo_filename: i.logo_filename,
        logos: i.logos ?? [],
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems as never);
      if (itemsErr) console.error("order_items insert error", itemsErr);

      // 3. Clear cart
      await supabase.from("cart_items").delete().eq("user_id", user.id);

      // 4. Notify admin
      await supabase.functions.invoke("notify-admin", {
        body: {
          type: "order_confirmed",
          data: {
            orderNumber: orderData.order_number,
            invoiceNumber,
            company: buyerCompany,
            contact: buyerContact,
            regNr: buyerRegNr,
            vat: buyerVat,
            address: buyerAddress,
            email: buyerEmail,
            phone: buyerPhone,
            shipping: shippingLabel,
            shippingCost: shipping.cents / 100,
            total: total / 100,
            currency,
            items: [
              ...validItems.map((i) => ({ name: localizeProductName(pickI18n(i.product!.name_i18n, lang, i.product!.name), lang, tx), qty: i.quantity, price: i.product!.price_cents / 100 })),
              ...(shipping.cents > 0 ? [{ name: `${tx.shipping}: ${shippingLabel}`, qty: 1, price: shipping.cents / 100 }] : []),
            ],
          },
        },
      });

      toast({ title: tx.orderConfirmedTitle, description: tx.orderConfirmedDesc(orderData.order_number) });
      navigate(withLang("/account"));
    } catch (e) {
      toast({ title: tx.errorTitle, description: tx.confirmError, variant: "destructive" });
      console.error(e);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { box-shadow: none !important; border: none !important; }
          body { background: white !important; }
        }
      `}</style>
      <div className="no-print"><Navbar /></div>
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <div className="no-print flex items-center justify-between mb-6">
          <button onClick={() => navigate(withLang("/grozs"))} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" /> {tx.backToCart}
          </button>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg border border-border bg-card text-foreground px-4 py-2.5 text-sm font-medium hover:bg-muted"
            >
              <Printer className="w-4 h-4" /> {tx.print}
            </button>
            <button
              onClick={handleSavePdf}
              disabled={savingPdf || validItems.length === 0}
              className="flex items-center gap-2 rounded-lg border border-border bg-card text-foreground px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              {savingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {tx.savePdf}
            </button>
            <button
              onClick={handlePay}
              disabled={paying || validItems.length === 0}
              className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:brightness-110 disabled:opacity-50"
            >
              {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
              {tx.payNow}
            </button>
          </div>
        </div>

        {/* Buyer details form */}
        <section className="no-print bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-medium text-foreground mb-4">{tx.buyerDetails}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.companyPlaceholder} value={buyerCompany} onChange={(e) => setBuyerCompany(e.target.value)} />
            <input className="rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.regPlaceholder} value={buyerRegNr} onChange={(e) => setBuyerRegNr(e.target.value)} />
            <input className="md:col-span-2 rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.contactPlaceholder} value={buyerContact} onChange={(e) => setBuyerContact(e.target.value)} />
            <input className="rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.vatPlaceholder} value={buyerVat} onChange={(e) => setBuyerVat(e.target.value)} />
            <input className="rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.phonePlaceholder} value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} />
            <input className="md:col-span-2 rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.addressPlaceholder} value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} />
            <input className="md:col-span-2 rounded-md bg-background border border-border px-3 py-2 text-sm" placeholder={tx.emailPlaceholder} value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">{tx.shippingMethod}</label>
            <select
              value={shippingId}
              onChange={(e) => { setShippingId(e.target.value); sessionStorage.setItem("shipping_id", e.target.value); }}
              className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm"
            >
              {Object.entries(SHIPPING_OPTIONS).map(([id, o]) => (
                <option key={id} value={id}>
                  {String(t[o.labelKey] ?? o.lvLabel)} — {o.cents === 0 ? t.free : fmt(o.cents, currency, lang)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={agencyDiscountOn}
                onChange={(e) => setAgencyDiscountOn(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              {tx.agencyDiscountApply}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={agencyDiscountPct}
                disabled={!agencyDiscountOn}
                onChange={(e) => setAgencyDiscountPct(Number(e.target.value))}
                className="w-20 rounded-md bg-background border border-border px-3 py-2 text-sm disabled:opacity-50"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </section>


        {/* Printable invoice */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : validItems.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
            {tx.cartEmpty} <button onClick={() => navigate(withLang("/veikals"))} className="text-primary underline">{tx.goToShop}</button>
          </div>
        ) : (
          <div ref={invoiceRef} className="print-area bg-white text-black rounded-xl border border-border p-10 shadow-sm">
            <div className="flex justify-between items-start mb-8 gap-6">
              <div className="flex items-start gap-4">
                <img src={logoUrl} alt="Luxury Chocolate" className="w-20 h-20 object-contain" crossOrigin="anonymous" />
                <img src={chocoTimeUrl} alt="It's choco time" className="w-20 h-20 object-contain" crossOrigin="anonymous" />
                <div>
                  <h1 className="text-2xl font-bold">{tx.proformaTitle}</h1>
                  <p className="text-sm mt-1">{tx.invoiceNo} {invoiceNumber}</p>
                  <p className="text-sm">{tx.issued}: {today}</p>
                  <p className="text-sm">{tx.due}: {dueDate}</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="font-bold text-base">Luxury Chocolate SIA</p>
                <p>{tx.vatReg} LV40103921954</p>
                <p>{tx.legalAddress}: Vircavas iela 9-8, Rīga, LV-1083</p>
                <p>{tx.actualAddress}: Kandavas iela 29a-85, Rīga, LV-1083</p>
                <p>info@luxurychocolate.lv · +371 26 177 853</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
              <div>
                <p className="font-bold mb-1 text-xs uppercase text-gray-500">{tx.seller}</p>
                <p className="font-medium">Luxury Chocolate SIA</p>
                <p>{tx.legalAddress}: Vircavas iela 9-8, Rīga, LV-1083</p>
                <p>{tx.actualAddress}: Kandavas iela 29a-85, Rīga, LV-1083</p>
                <p>{tx.vatReg} LV40103921954</p>
                <p>{tx.boardMember}: Ilze Eisaka</p>
              </div>

              <div>
                <p className="font-bold mb-1 text-xs uppercase text-gray-500">{tx.buyer}</p>
                <p className="font-medium">{buyerCompany || "—"}</p>
                {buyerRegNr && <p>{tx.regNo} {buyerRegNr}</p>}
                {buyerVat && (
                  <p>
                    {tx.vatReg}: {buyerVat}
                    {viesStatus === "checking" && (
                      <span className="ml-2 text-xs text-gray-500">· {tx.viesChecking}</span>
                    )}
                    {viesStatus === "done" && viesResult && (
                      viesResult.valid ? (
                        <span className="ml-2 text-xs font-medium text-green-700">· ✓ {tx.viesValid}</span>
                      ) : (
                        <span className="ml-2 text-xs font-medium text-red-700">· ✗ {tx.viesInvalid}</span>
                      )
                    )}
                  </p>
                )}
                {viesStatus === "done" && viesResult?.valid && (viesResult.name || viesResult.address) && (
                  <p className="text-xs text-gray-500">
                    {viesResult.name}{viesResult.name && viesResult.address ? " · " : ""}{viesResult.address?.replace(/\n/g, ", ")}
                  </p>
                )}
                {viesStatus === "done" && viesResult && (
                  <p className="text-[10px] text-gray-400 italic">{tx.viesSource}</p>
                )}
                {buyerAddress && <p>{buyerAddress}</p>}
                {buyerContact && <p>{tx.contactPerson}: {buyerContact}</p>}
                {buyerEmail && <p>{buyerEmail}</p>}
                {buyerPhone && <p>{buyerPhone}</p>}
              </div>
            </div>

            <table className="w-full text-sm border-collapse table-fixed">
              <colgroup>
                <col />
                <col className="w-20" />
                <col className="w-32" />
                <col className="w-32" />
              </colgroup>
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-2 pr-4">{tx.itemName}</th>
                  <th className="text-right py-2 px-3 tabular-nums">{tx.quantity}</th>
                  <th className="text-right py-2 px-3 tabular-nums whitespace-nowrap">{tx.price}</th>
                  <th className="text-right py-2 pl-3 tabular-nums whitespace-nowrap">{tx.sum}</th>
                </tr>
              </thead>
              <tbody>
                {validItems.map((i) => {
                  const logos = (i.logos && i.logos.length > 0)
                    ? i.logos
                    : (i.logo_url ? [{ url: i.logo_url, filename: i.logo_filename ?? "", quantity: i.quantity }] : []);
                  return (
                    <tr key={i.id} className="border-b border-gray-200">
                      <td className="py-2 pr-4 align-top">
                        {localizeProductName(pickI18n(i.product!.name_i18n, lang, i.product!.name), lang, tx)}
                        {i.product!.weight_grams ? (
                          <div className="text-xs text-gray-500 mt-1">
                            {tx.weightPerPiece}: {fmtKg(i.product!.weight_grams)} · {tx.totalWeight}: {fmtKg(i.product!.weight_grams * i.quantity)}
                          </div>
                        ) : null}
                        {logos.length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {logos.length === 1
                              ? `${tx.withYourLogo}${logos[0].filename ? `: ${logos[0].filename}` : ""}`
                              : `${tx.withLogos(logos.length)}: ${logos.map((l) => l.filename || "—").join(", ")}`}
                          </div>
                        )}
                      </td>
                      <td className="text-right py-2 px-3 align-top tabular-nums whitespace-nowrap">{i.quantity}</td>
                      <td className="text-right py-2 px-3 align-top tabular-nums whitespace-nowrap">{fmt(isReverseCharge ? Math.round(i.product!.price_cents / (1 + vatRate)) : i.product!.price_cents, currency, lang)}</td>
                      <td className="text-right py-2 pl-3 align-top tabular-nums whitespace-nowrap">{fmt(isReverseCharge ? Math.round(i.product!.price_cents * i.quantity / (1 + vatRate)) : i.product!.price_cents * i.quantity, currency, lang)}</td>
                    </tr>
                  );
                })}
                {shipping.cents > 0 && (
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 align-top">{tx.shipping}: {shippingLabel}</td>
                    <td className="text-right py-2 px-3 align-top tabular-nums whitespace-nowrap">1</td>
                    <td className="text-right py-2 px-3 align-top tabular-nums whitespace-nowrap">{fmt(isReverseCharge ? Math.round(shipping.cents / (1 + vatRate)) : shipping.cents, currency, lang)}</td>
                    <td className="text-right py-2 pl-3 align-top tabular-nums whitespace-nowrap">{fmt(isReverseCharge ? Math.round(shipping.cents / (1 + vatRate)) : shipping.cents, currency, lang)}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-end mt-6">
              <div className="w-80 text-sm">
                {agencyDiscountOn && agencyDiscountCents > 0 && (
                  <div className="flex justify-between py-1 text-green-700">
                    <span>{tx.agencyDiscount} ({agencyPctClamped}%):</span>
                    <span>−{fmt(agencyDiscountCents, currency, lang)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1"><span>{tx.subtotalExVat}:</span><span>{fmt(totalExVat, currency, lang)}</span></div>
                <div className="flex justify-between py-1">
                  <span>{isReverseCharge ? tx.vatReverse : tx.vat}:</span>
                  <span>{fmt(vatAmount, currency, lang)}</span>
                </div>

                <div className="flex justify-between py-2 border-t-2 border-black font-bold text-base mt-1">
                  <span>{tx.totalPayable}:</span><span>{fmt(total, currency, lang)}</span>
                </div>
                {totalWeightGrams > 0 && (
                  <div className="flex justify-between py-1 text-sm text-gray-700">
                    <span>{tx.totalWeight}:</span><span className="tabular-nums">{fmtKg(totalWeightGrams)}</span>
                  </div>
                )}
                {isReverseCharge && (
                  <p className="mt-2 text-xs italic text-gray-600">{tx.reverseNote}</p>
                )}
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <p className="font-medium mb-1">{tx.bankTransfer}:</p>
              <p>{tx.recipient}: Luxury Chocolate SIA</p>
              <p>{tx.companyRegNo}: LV40103921954</p>
              <p>{tx.bank}: AS Citadele banka · SWIFT: PARXLV22</p>
              <p>{tx.account}: LV88PARX0032054790002</p>
              <p className="mt-3">{tx.productionAfterPayment}</p>
              <p className="mt-3 italic">{tx.proformaNote}</p>
            </div>
          </div>
        )}

        {validItems.length > 0 && (
          <div className="no-print mt-8 flex flex-wrap gap-3 justify-end">
            <button
              onClick={handleSavePdf}
              disabled={savingPdf}
              className="flex items-center gap-2 rounded-lg border border-border bg-card text-foreground px-5 py-3 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              {savingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {tx.saveInvoice}
            </button>
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 text-foreground px-5 py-3 text-sm font-medium hover:bg-primary/20 disabled:opacity-50"
            >
              {confirming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {tx.confirmOrder}
            </button>
            <button
              onClick={handlePay}
              disabled={paying}
              className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:brightness-110 disabled:opacity-50"
            >
              {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
              {tx.payInvoice}
            </button>
          </div>
        )}
      </main>
      <div className="no-print"><FooterSection /></div>
    </div>
  );
};

export default Rekins;
