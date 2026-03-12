import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/sokolades-ar-logo", label: "Šokolādes ar logo" },
  { to: "/sokolades-klientu-davanam", label: "Korporatīvās dāvanas" },
  { to: "/reklamas-sokolade", label: "Reklāmas šokolādes" },
  { to: "/ziemassvetku-korporativas-sokolades", label: "Ziemassvētku šokolādes" },
];

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col gap-6">
        <nav aria-label="Populārākās lapas">
          <p className="text-sm font-medium text-foreground mb-3">Populārākās lapas</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luxury Chocolate. Visas tiesības aizsargātas.
          </p>
          <a
            href="mailto:info@luxurychocolate.lv"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            info@luxurychocolate.lv
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
