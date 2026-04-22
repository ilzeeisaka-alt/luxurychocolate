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

const KmIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.km;

  useSeo({
    title: "ការបោះពុម្ពសូកូឡា និងសូកូឡាមានឡូហ្គោផ្ទាល់ខ្លួន",
    description: "ការបោះពុម្ពសូកូឡា — បោះពុម្ពពេញពណ៌លើសូកូឡាបែលហ្ស៊ិក។ សូកូឡាមានឡូហ្គោ អំណោយសាជីវកម្ម។ បញ្ជាទិញចាប់ពី ១ ដុំ។",
    path: "/km",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="km" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="km" {...t} logoAlt="Luxury Chocolate — សូកូឡាសាជីវកម្មផ្តាច់មុខមានឡូហ្គោ" />
      <SeoContentSection lang="km" />
      <QuickFactsSection lang="km" />
      <ClientExamplesSection lang="km" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="km" />
      <HowToOrderSection lang="km" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="km" />
      <TrustSection lang="km" />
      <ProductsSection lang="km" />
      <ShopSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="km" />
      <CoinsCardsSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="km" />
      <DailyChocolateSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="km" />
      <FaqSection lang="km" />
      <IdeasSection lang="km" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="km" />
      <ContactSection lang="km" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default KmIndex;
