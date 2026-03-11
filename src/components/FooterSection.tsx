const FooterSection = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
    </footer>
  );
};

export default FooterSection;
