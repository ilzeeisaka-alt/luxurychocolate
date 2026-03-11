import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-background">
      <HeroSection onCtaClick={() => setModalOpen(true)} />
      <TrustSection />
      <ProductsSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default Index;
