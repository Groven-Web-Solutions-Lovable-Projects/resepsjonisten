import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  Smile,
  Wrench,
  UtensilsCrossed,
  Scissors,
  Sparkles,
  Sparkle,
  Truck,
  Anchor,
} from "lucide-react";

const industries = [
  { name: "Eiendom", icon: Building2 },
  { name: "Legesenter", icon: Stethoscope },
  { name: "Tannlege", icon: Smile },
  { name: "Bilverksted", icon: Wrench },
  { name: "Restaurant", icon: UtensilsCrossed },
  { name: "Frisør", icon: Scissors },
  { name: "Skjønnhetssalong", icon: Sparkles },
  { name: "Rengjøring", icon: Sparkle },
  { name: "Transport", icon: Truck },
  { name: "Båt", icon: Anchor },
];

const IndustriesSection = () => {
  return (
    <section id="bransjer" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-primary-soft" />
      <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            Bransjer vi kan
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Spesialisert på <span className="gradient-text">din bransje</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Vi kjenner rutinene, kundene og forventningene i bransjen din – og leverer en resepsjonist som passer rett inn.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-sm overflow-hidden"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/15">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <p className="mt-5 text-base font-semibold text-foreground">
                  {industry.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
