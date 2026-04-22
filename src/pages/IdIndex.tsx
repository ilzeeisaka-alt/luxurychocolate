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

const IdIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.id;

  useSeo({
    title: "Pencetakan Cokelat & Cokelat Personalisasi dengan Logo",
    description: "Pencetakan cokelat — cetak warna penuh langsung pada cokelat Belgia. Cokelat personalisasi dengan logo, hadiah perusahaan.",
    path: "/id",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="id" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="id" {...t} logoAlt="Luxury Chocolate — cokelat perusahaan eksklusif dengan logo" />

      <SeoContentSection lang="id" />
      <QuickFactsSection lang="id" />
      <ClientExamplesSection lang="id" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="id" />
      <HowToOrderSection lang="id" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="id" />
      <TrustSection lang="id" />
      <ProductsSection lang="id" />
      <ShopSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="id" />
      <CoinsCardsSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="id" />
      <DailyChocolateSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="id" />
      <FaqSection lang="id" />
      <IdeasSection lang="id" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="id" />
      <ContactSection lang="id" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default IdIndex;
