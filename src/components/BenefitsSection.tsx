import { motion } from "framer-motion";
import { TrendingDown, PhoneIncoming, Smile, Award, BadgeDollarSign, Clock, Zap } from "lucide-react";
import benefitsImg from "@/assets/benefits-section.jpg";

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
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={benefitsImg} alt="Fornøyd bedriftseier" className="w-full h-72 md:h-96 object-cover" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Fordeler</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Dette får du når vi <span className="gradient-text">tar telefonen for deg</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tjenesten handler ikke bare om å besvare telefoner. Den handler om å gi deg en mer effektiv arbeidshverdag og bedre oppfølging av kundene dine.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default BenefitsSection;
