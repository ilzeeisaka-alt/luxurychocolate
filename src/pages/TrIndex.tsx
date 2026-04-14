import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SeoContentSection from "@/components/SeoContentSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import BookBoxSection from "@/components/BookBoxSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
import RestaurantChocolateSection from "@/components/RestaurantChocolateSection";
import DailyChocolateSection from "@/components/DailyChocolateSection";
import VipGiftSection from "@/components/VipGiftSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const TrIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.tr;

  useSeo({
    title: "Logolu çikolata & Kurumsal hediyeler",
    description: "Premium kurumsal hediyeler ve logolu kişiselleştirilmiş çikolata. Belçika çikolatası, hızlı üretim.",
    path: "/tr",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="tr" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="tr" {...t} logoAlt="Luxury Chocolate — logolu özel kurumsal çikolata" />
      <SeoContentSection lang="tr" />
      <QuickFactsSection lang="tr" />
      <ClientExamplesSection lang="tr" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="tr" />
      <HowToOrderSection lang="tr" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="tr" />
      <TrustSection lang="tr" />
      <ProductsSection lang="tr" />
      <ShopSection lang="tr" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="tr" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="tr" />
      <DailyChocolateSection lang="tr" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="tr" />
      <FaqSection lang="tr" />
      <IdeasSection lang="tr" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="tr" />
      <ContactSection lang="tr" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default TrIndex;
