import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import SeoContentSection from "@/components/SeoContentSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useSeo({
    title: "Ekskluzīvas šokolādes ar Jūsu logo",
    description: "Korporatīvās šokolādes ar Jūsu logo. ✔ Premium Beļģu šokolāde ✔ Personalizēta apdruka ar Jūsu logo ✔ Minimālais pasūtījums no 50 gab.",
    path: "/",
  });

  return (
    <main className="bg-background">
      <HeroSection onCtaClick={() => setModalOpen(true)} />
      <QuickFactsSection />
      <ClientExamplesSection />
      <HowToOrderSection />
      <TrustSection />
      <ProductsSection />
      <SeoContentSection />
      <FaqSection />
      <IdeasSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default Index;
