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
import SouvenirSection from "@/components/SouvenirSection";
import CienastsSection from "@/components/CienastsSection";
import TableCardsSection from "@/components/TableCardsSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const ArIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.ar;

  useSeo({
    title: "شوكولاتة بالشعار وهدايا الشركات",
    description: "هدايا شركات فاخرة وشوكولاتة مخصصة بالشعار. علب هدايا حصرية. شوكولاتة بلجيكية، إنتاج سريع.",
    path: "/ar",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="ar" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="ar" {...t} logoAlt="Luxury Chocolate — exclusive corporate chocolate with logo" />
      <SeoContentSection lang="ar" />
      <QuickFactsSection lang="ar" />
      <ClientExamplesSection lang="ar" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="ar" />
      <HowToOrderSection lang="ar" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ar" />
      <TrustSection lang="ar" />
      <ProductsSection lang="ar" />
      <ShopSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="ar" />
      <DailyChocolateSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="ar" />
      <FaqSection lang="ar" />
      <IdeasSection lang="ar" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="ar" />
      <ContactSection lang="ar" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default ArIndex;
