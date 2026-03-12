import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Kāds ir minimālais pasūtījums personalizētām šokolādēm?",
    a: "Minimālais pasūtījums ir no 50 gab. Tas ir ērts apjoms gan mazākiem pasākumiem, gan lielām korporatīvajām kampaņām.",
  },
  {
    q: "Cik ilgi aizņem šokolādes ar logo izgatavošana?",
    a: "Standarta izgatavošanas laiks ir 3–10 darba dienas no dizaina apstiprināšanas brīža. Steidzamiem pasūtījumiem iespējama ātrāka izpilde.",
  },
  {
    q: "Kāda kvalitātes šokolāde tiek izmantota?",
    a: "Mēs izmantojam tikai premium Beļģu šokolādi — piena, tumšo un balto šokolādi no sertificētām ražotnēm.",
  },
  {
    q: "Vai ir iespējams pasūtīt šokolādes ar pilnkrāsu apdruku?",
    a: "Jā, mēs piedāvājam pilnkrāsu apdruku tieši uz šokolādes virsmas — Jūsu logo, dizains vai jebkurš grafisks motīvs. Apdruka ir pārtikas droša.",
  },
  {
    q: "Kādiem pasākumiem piemērotas korporatīvās šokolādes?",
    a: "Personalizētas šokolādes ir ideālas konferencēm, izstādēm, klientu tikšanām, Ziemassvētku dāvanām, uzņēmuma jubileju pasākumiem, produktu prezentācijām un VIP viesmīlībai.",
  },
  {
    q: "Vai piedāvājat piegādi ārpus Latvijas?",
    a: "Jā, mēs piegādājam personalizētās šokolādes uz vairāk nekā 30 valstīm visā pasaulē.",
  },
];

const vp = { once: true, margin: "-50px" as const };

const FaqSection = () => {
  return (
    <section className="py-20 bg-secondary/50" aria-labelledby="faq-heading">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl text-foreground text-center mb-10"
          >
            Biežāk uzdotie jautājumi
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background rounded-lg border border-border px-5"
              >
                <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
