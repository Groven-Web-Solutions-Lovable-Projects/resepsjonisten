import { motion } from "framer-motion";
import {
  TrendingDown,
  PhoneIncoming,
  Smile,
  Award,
  BadgeDollarSign,
  Clock,
  Zap,
} from "lucide-react";

const featured = {
  icon: PhoneIncoming,
  title: "Flere besvarte henvendelser",
  desc: "Ingen viktige samtaler går tapt – vi tar hver eneste innkommende telefon på vegne av deg, profesjonelt og uten ventetid.",
};

const items = [
  { icon: TrendingDown, title: "Færre avbrytelser", desc: "Fokuser på kjerneoppgavene." },
  { icon: Smile, title: "Bedre kundeopplevelse", desc: "Profesjonell service hver gang." },
  { icon: Award, title: "Profesjonelt førsteinntrykk", desc: "Gjør et godt inntrykk fra start." },
  { icon: BadgeDollarSign, title: "Ingen ansettelseskostnader", desc: "Spar lønn og sykefravær." },
  { icon: Clock, title: "Alltid bemannet", desc: "Tilgjengelig når du trenger det." },
  { icon: Zap, title: "Rask oppstart", desc: "Operativ i løpet av kort tid." },
];

const WhyUsSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
          — Hvorfor Resepsjonisten
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          Fordelene av en resepsjonist –{" "}
          <span className="gradient-text">uten å ansette en</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          Du får en fleksibel, profesjonell løsning som gjør bedriften mer
          tilgjengelig, samtidig som du frigjør tid til det som faktisk driver
          virksomheten fremover.
        </p>
      </motion.div>

      <div className="mt-14 grid lg:grid-cols-3 gap-5">
        {/* Featured kort */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:row-span-2 relative rounded-2xl p-8 overflow-hidden text-primary-foreground min-h-[320px] lg:min-h-[420px]"
          style={{
            background:
              "linear-gradient(135deg, hsl(276 52% 28%) 0%, hsl(310 60% 45%) 100%)",
          }}
        >
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative h-full flex flex-col justify-between gap-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
              <featured.icon className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <div>
              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 mb-3">
                Hovedfordel
              </span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                {featured.title}
              </h3>
              <p className="mt-3 text-white/85 leading-relaxed">{featured.desc}</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
          {items.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative rounded-2xl bg-card border border-border p-6 overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 blur-2xl transition-colors duration-500" />
              <div className="relative flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary border border-primary/15 flex-shrink-0">
                  <b.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyUsSection;
