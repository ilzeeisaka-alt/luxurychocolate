import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import VideoSection from "@/components/VideoSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-background">
      <HeroSection onCtaClick={() => setModalOpen(true)} />
      <FeaturesSection />
      <ProductsSection />
      <VideoSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default Index;
