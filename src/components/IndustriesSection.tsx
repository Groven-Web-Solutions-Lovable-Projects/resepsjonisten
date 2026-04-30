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
  ArrowUpRight,
} from "lucide-react";

const industries = [
  { slug: "eiendom", name: "Eiendom", icon: Building2 },
  { slug: "legesenter", name: "Legesenter", icon: Stethoscope },
  { slug: "tannlege", name: "Tannlege", icon: Smile },
  { slug: "bilverksted", name: "Bilverksted", icon: Wrench },
  { slug: "restaurant", name: "Restaurant", icon: UtensilsCrossed },
  { slug: "frisor", name: "Frisør", icon: Scissors },
  { slug: "skjonnhetssalong", name: "Skjønnhetssalong", icon: Sparkles },
  { slug: "rengjoring", name: "Rengjøring", icon: Sparkle },
  { slug: "transport", name: "Transport", icon: Truck },
  { slug: "bat", name: "Båt", icon: Anchor },
];

const IndustriesSection = () => {
  return (
    <section id="bransjer" className="relative py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.06),transparent_60%)]" />

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
              <motion.a
                key={industry.slug}
                href={`/bransjer/${industry.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-sm hover:shadow-elevated hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* hover wash */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--accent) / 0.35) 0%, transparent 70%)",
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>

                <p className="relative mt-5 text-base font-semibold text-foreground">
                  {industry.name}
                </p>
                <span className="relative mt-1 inline-block text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Se løsning →
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
