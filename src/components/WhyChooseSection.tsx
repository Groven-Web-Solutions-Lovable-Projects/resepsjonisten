import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "Profesjonell håndtering av alle innkommende samtaler",
  "Fleksibel løsning tilpasset små bedrifter",
  "Booking og beskjeder håndteres effektivt",
  "Bemannet løsning uten sårbarhet ved sykdom og ferie",
  "Klar på kort tid",
];

const WhyChooseSection = () => (
  <section className="py-24 gradient-primary-soft">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Hvorfor velge <span className="gradient-text">Resepsjonisten?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Vi gir deg fordelene av en profesjonell resepsjonist uten at du trenger å ansette noen selv. Du får en fleksibel løsning som gjør bedriften mer tilgjengelig, samtidig som du frigjør tid til det som faktisk driver virksomheten fremover.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-sm"
            >
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-foreground font-medium pt-1">{reason}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
