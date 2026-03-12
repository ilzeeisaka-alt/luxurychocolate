import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Lang } from "@/i18n/types";
import { faqContent } from "@/i18n/content";

const vp = { once: true, margin: "-50px" as const };

interface FaqSectionProps { lang?: Lang; }

const FaqSection = ({ lang = "lv" }: FaqSectionProps) => {
  const t = faqContent[lang];
  return (
    <section className="py-20 bg-secondary/50" aria-labelledby="faq-heading">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl text-foreground text-center mb-10">{t.heading}</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {t.items.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border border-border px-5">
                <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
