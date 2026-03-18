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
    { label: "Klientu dāvanas", to: "/sokolades-klientu-davanam" },
    { label: "Reklāmas šokolāde", to: "/reklamas-sokolade" },
    { label: "Ziemassvētku", to: "/ziemassvetku-korporativas-sokolades" },
    { label: "Šokolādes grāmata", to: "/sokolades-gramata" },
    { label: "Dāvanu idejas", to: "/korporativo-davanu-idejas" },
    { label: "Veikals", to: "https://www.luxurychocolatesia.lv/interneta-veikals-produkti/" },
    { label: "Kontakti", to: "#kontakti" },
  ],
  en: [
    { label: "Chocolate with Logo", to: "/en/chocolate-with-logo" },
    { label: "Client Gifts", to: "/en/client-gifts" },
    { label: "Promotional", to: "/en/promotional-chocolate" },
    { label: "Christmas", to: "/en/christmas-corporate-chocolate" },
    { label: "Book Box", to: "/en/chocolate-book-box" },
    { label: "Gift Ideas", to: "/en/corporate-gift-ideas" },
    { label: "Shop", to: "https://www.luxurychocolatesia.lv/online-shop-products/" },
    { label: "Contact", to: "#kontakti" },
  ],
  ru: [
    { label: "Шоколад с логотипом", to: "/ru/shokolad-s-logotipom" },
    { label: "Подарки клиентам", to: "/ru/podarki-klientam" },
    { label: "Рекламный", to: "/ru/reklamniy-shokolad" },
    { label: "Рождественский", to: "/ru/rozhdestvenskij-shokolad" },
    { label: "Шоколадная книга", to: "/ru/shokoladnaya-kniga" },
    { label: "Идеи подарков", to: "/ru/idei-korporativnyh-podarkov" },
    { label: "Магазин", to: "https://www.luxurychocolatesia.lv/internet-magazin-produkti/" },
    { label: "Контакты", to: "#kontakti" },
  ],
  et: [
    { label: "Šokolaad logoga", to: "/et/sokolaad-logoga" },
    { label: "Kliendikingitused", to: "/et/kingitused-klientidele" },
    { label: "Reklaamšokolaad", to: "/et/reklaam-sokolaad" },
    { label: "Jõulušokolaad", to: "/et/joulu-sokolaad" },
    { label: "Šokolaadiraamat", to: "/et/sokolaadi-raamat" },
    { label: "Kinkeideed", to: "/et/korporatiiv-kingituste-ideed" },
    { label: "E-pood", to: "https://www.luxurychocolatesia.lv/e-pood/" },
    { label: "Kontakt", to: "#kontakti" },
  ],
  lt: [
    { label: "Šokoladas su logotipu", to: "/lt/sokoladas-su-logotipu" },
    { label: "Dovanos klientams", to: "/lt/dovanos-klientams" },
    { label: "Reklaminis", to: "/lt/reklaminis-sokoladas" },
    { label: "Kalėdinis", to: "/lt/kaledinis-sokoladas" },
    { label: "Šokolado knyga", to: "/lt/sokolado-knyga" },
    { label: "Dovanų idėjos", to: "/lt/korporatyviniu-dovanu-idejos" },
    { label: "Parduotuvė", to: "https://www.luxurychocolatesia.lv/internetine-parduotuve/" },
    { label: "Kontaktai", to: "#kontakti" },
  ],
};

const homePaths: Record<Lang, string> = {
  lv: "/",
  en: "/en",
  ru: "/ru",
  et: "/et",
  lt: "/lt",
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
