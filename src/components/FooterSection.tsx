import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/sokolades-ar-logo", label: "Šokolādes ar logo" },
  { to: "/sokolades-klientu-davanam", label: "Korporatīvās dāvanas" },
  { to: "/reklamas-sokolade", label: "Reklāmas šokolādes" },
  { to: "/ziemassvetku-korporativas-sokolades", label: "Ziemassvētku šokolādes" },
  { to: "/sokolades-konferencem", label: "Šokolādes konferencēm" },
  { to: "/sokolades-darbinieku-davanam", label: "Darbinieku dāvanas" },
  { to: "/sokolades-partneru-davanam", label: "Partneru dāvanas" },
  { to: "/korporativo-davanu-idejas", label: "Dāvanu idejas" },
];

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col gap-6">
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Links */}
          <nav aria-label="Populārākās lapas">
            <p className="text-sm font-medium text-foreground mb-3">Populārākās lapas</p>
            <ul className="space-y-1.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Kontakti</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>
                <a href="tel:+37126177853" className="hover:text-primary transition-colors duration-200">
                  +371 26 177 853
                </a>
              </li>
              <li>
                <a href="mailto:info@luxurychocolate.lv" className="hover:text-primary transition-colors duration-200">
                  info@luxurychocolate.lv
                </a>
              </li>
              <li>Kandavas iela 29a, Rīga, LV-1083</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Uzņēmums</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>Luxury Chocolate SIA</li>
              <li>PVN Reģ.nr. LV40103921954</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Luxury Chocolate SIA. Visas tiesības aizsargātas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
