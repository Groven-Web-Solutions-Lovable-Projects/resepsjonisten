import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Hvordan fungerer viderekobling?",
    a: "Du videresender telefonen din til et nummer du får av oss. Dette kan vanligvis settes opp raskt via mobilinnstillingene dine eller hos teleoperatøren din.",
  },
  {
    q: "Hvordan kan dere håndtere booking?",
    a: "Vi kan booke avtaler direkte for deg dersom vi får tilgang til delt kalender, som for eksempel Google Calendar eller Outlook.",
  },
  {
    q: "Hvordan vet dere hva dere skal si?",
    a: "Ved oppstart går vi gjennom bedriften din, hvordan du vil ha samtaler håndtert, og hvilke instrukser vi skal følge.",
  },
  {
    q: "Har dere bindingstid?",
    a: "Standardpakkene har ingen bindingstid, men én måneds oppsigelsestid.",
  },
  {
    q: "Hvor raskt kan vi komme i gang?",
    a: "Oppstart kan skje svært raskt — bedriften din kan være operativ innen én time.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Ofte stilte <span className="gradient-text">spørsmål</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 max-w-2xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl px-6 border-none shadow-sm">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
