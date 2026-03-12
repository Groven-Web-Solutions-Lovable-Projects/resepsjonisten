import { motion } from "framer-motion";
import { Search, PhoneForwarded, Headphones } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Vi kartlegger bedriften din",
    desc: "Vi går gjennom hvordan du ønsker at samtaler skal håndteres, hvilken informasjon vi trenger, og hvordan vi best representerer bedriften din.",
  },
  {
    icon: PhoneForwarded,
    num: "02",
    title: "Du setter opp viderekobling",
    desc: "Du videresender telefonen din til et nummer du får av oss. Dette kan vanligvis settes opp raskt via mobil eller operatør.",
  },
  {
    icon: Headphones,
    num: "03",
    title: "Vi svarer for deg",
    desc: "Vi tar telefonen på vegne av bedriften din, formidler beskjeder, videresender viktige samtaler og håndterer booking etter dine instrukser.",
  },
];

const HowItWorksSection = () => (
  <section id="slik-fungerer-det" className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Slik kommer du <span className="gradient-text">i gang</span>
        </h2>
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative text-center"
          >
            <div className="relative z-10 w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center shadow-glow">
              <step.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="inline-block mt-4 text-xs font-bold text-accent uppercase tracking-wider">{step.num}</span>
            <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
