import { motion } from "framer-motion";
import { TrendingDown, PhoneIncoming, Smile, Award, BadgeDollarSign, Clock, Zap } from "lucide-react";

const benefits = [
  { icon: TrendingDown, title: "Færre avbrytelser", desc: "Fokuser på kjerneoppgavene uten å bli avbrutt." },
  { icon: PhoneIncoming, title: "Flere besvarte henvendelser", desc: "Ingen viktige samtaler går tapt." },
  { icon: Smile, title: "Bedre kundeopplevelse", desc: "Kundene dine får alltid profesjonell service." },
  { icon: Award, title: "Profesjonelt førsteinntrykk", desc: "Gjør et godt inntrykk fra første kontakt." },
  { icon: BadgeDollarSign, title: "Ingen ansettelseskostnader", desc: "Spar kostnader til ferie, sykefravær og lønn." },
  { icon: Clock, title: "Alltid bemannet", desc: "Vi er tilgjengelige når du trenger det." },
  { icon: Zap, title: "Rask oppstart", desc: "Kom i gang i løpet av kort tid." },
];

const BenefitsSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Dette får du når vi <span className="gradient-text">tar telefonen for deg</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Tjenesten handler ikke bare om å besvare telefoner. Den handler om å gi deg en mer effektiv arbeidshverdag, et mer profesjonelt førsteinntrykk og bedre oppfølging av kundene dine.
        </p>
      </motion.div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-6 rounded-xl hover:shadow-elevated transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-full bg-secondary mx-auto flex items-center justify-center group-hover:gradient-primary transition-all duration-300">
              <b.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="mt-4 font-bold text-foreground">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
