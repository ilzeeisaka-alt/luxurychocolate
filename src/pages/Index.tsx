import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import CakeChocolateSection from "@/components/CakeChocolateSection";
import BookBoxSection from "@/components/BookBoxSection";
import SeoContentSection from "@/components/SeoContentSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import CtaSection from "@/components/CtaSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import UseCasesSection from "@/components/UseCasesSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
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
    <main className="bg-background pt-14">
      <Navbar />
      <HeroSection onCtaClick={() => setModalOpen(true)} />
      <SeoContentSection />
      <QuickFactsSection />
      <ClientExamplesSection />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} />
      <HowToOrderSection />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} />
      <TrustSection />
      <ProductsSection />
      <ShopSection onCtaClick={() => setModalOpen(true)} />
      <CakeChocolateSection />
      <BookBoxSection />
      <FaqSection />
      <IdeasSection />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <ContactSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default Index;
