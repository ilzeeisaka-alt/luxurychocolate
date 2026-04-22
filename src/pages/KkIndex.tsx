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
import MagnetBoxSection from "@/components/MagnetBoxSection";
import CoinsCardsSection from "@/components/CoinsCardsSection";
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
import CelebrationCakeSection from "@/components/CelebrationCakeSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const KkIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.kk;

  useSeo({
    title: "Шоколад басып шығару және логотипі бар жеке шоколад",
    description: "Шоколад басып шығару — бельгиялық шоколадқа тікелей толық түсті басып шығару. Логотипі бар жеке шоколад, корпоративтік сыйлықтар.",
    path: "/kk",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="kk" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="kk" {...t} logoAlt="Luxury Chocolate — логотипі бар эксклюзивті корпоративтік шоколад" />

      <SeoContentSection lang="kk" />
      <QuickFactsSection lang="kk" />
      <ClientExamplesSection lang="kk" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="kk" />
      <HowToOrderSection lang="kk" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="kk" />
      <TrustSection lang="kk" />
      <ProductsSection lang="kk" />
      <ShopSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="kk" />
      <CoinsCardsSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="kk" />
      <DailyChocolateSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="kk" />
      <FaqSection lang="kk" />
      <IdeasSection lang="kk" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="kk" />
      <ContactSection lang="kk" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default KkIndex;
