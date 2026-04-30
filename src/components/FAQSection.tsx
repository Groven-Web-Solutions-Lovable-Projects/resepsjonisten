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
    q: "Hvor raskt kan vi komme i gang?",
    a: "Oppstart kan skje svært raskt — bedriften din kan være operativ innen én time.",
  },
];

const FAQSection = () => (
  <section
    id="faq"
    className="relative py-24 overflow-hidden"
    style={{ background: "hsl(36 40% 96%)" }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 lg:sticky lg:top-24 self-start"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
            — FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.05] tracking-tight">
            Ofte stilte <span className="gradient-text">spørsmål</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Finner du ikke svaret du leter etter? Ta kontakt med oss – vi svarer gjerne på alt du lurer på.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7"
        >
          <Accordion type="single" collapsible className="border-t border-foreground/15">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-foreground/15 px-0"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-base md:text-lg">
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-muted-foreground/60">
                      0{i + 1}
                    </span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-10 pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FAQSection;
