import { motion } from "framer-motion";
import { Search, PhoneForwarded, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CallUsButton from "@/components/CallUsButton";

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
  <section
    id="hvordan"
    className="relative py-24 overflow-hidden"
    style={{
      background:
        "radial-gradient(120% 80% at 50% 100%, hsl(276 60% 18%) 0%, hsl(270 55% 10%) 55%, hsl(270 60% 6%) 100%)",
    }}
  >
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
    <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/15">
          Slik fungerer det
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Slik kommer du{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(310 80% 75%) 100%)",
            }}
          >
            i gang
          </span>
        </h2>
      </motion.div>

      <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-6 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative text-center"
          >
            <div className="relative z-10 w-20 h-20 mx-auto flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-glow">
              <step.icon className="w-8 h-8 text-white" strokeWidth={1.75} />
            </div>
            <span className="inline-block mt-5 text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">
              Steg {step.num}
            </span>
            <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
            <p className="mt-3 text-white/60 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex flex-wrap justify-center gap-4"
      >
        <a href="#kontakt">
          <Button variant="hero" size="xl">
            Book gratis demo
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
        <CallUsButton tone="onDark" />
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;
