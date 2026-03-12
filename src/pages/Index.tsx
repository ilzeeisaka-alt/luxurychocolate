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
import FreePreviewSection from "@/components/FreePreviewSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useSeo({
    title: "Šokolādes ar logo uzņēmumiem | Premium korporatīvās dāvanas",
    description: "Ekskluzīvas šokolādes ar logo uzņēmumiem. Premium korporatīvās dāvanas klientiem, partneriem un pasākumiem ar personalizētu šokolādes apdruku.",
    path: "/",
  });

  return (
    <main className="bg-background">
      <HeroSection onCtaClick={() => setModalOpen(true)} />
      <SeoContentSection />
      <QuickFactsSection />
      <ClientExamplesSection />
      <HowToOrderSection />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} />
      <TrustSection />
      <ProductsSection />
      <FaqSection />
      <IdeasSection />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default Index;
