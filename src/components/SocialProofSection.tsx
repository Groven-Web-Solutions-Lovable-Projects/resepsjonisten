import { motion } from "framer-motion";
import { Building2, ShieldCheck, Clock, Star, Quote } from "lucide-react";

const companies = [
  "Øhres Auto AS", "Negassie Holding AS", "NGT AS", "Pescator AB",
  "Svenska Industrihotellet AB", "OIV7B AS", "Pepzi AS", "FinnAI AS",
];

const stats = [
  { icon: Building2, value: "8+", label: "Bedrifter stoler på oss" },
  { icon: ShieldCheck, value: "99%", label: "Besvarte anrop" },
  { icon: Clock, value: "<1t", label: "Oppstartstid" },
  { icon: Star, value: "5/5", label: "Kundetilfredshet" },
];

const SocialProofSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Sosialt bevis</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Betrodd av bedrifter som ønsker bedre tilgjengelighet
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Vi hjelper bedrifter med å håndtere innkommende telefoner profesjonelt, slik at ingen viktige henvendelser går tapt.
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-xl bg-background border border-border"
          >
            <div className="w-12 h-12 rounded-full gradient-primary mx-auto flex items-center justify-center mb-3">
              <stat.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-3xl font-bold gradient-text">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Company chips */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex flex-wrap justify-center gap-3"
      >
        {companies.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50"
          >
            <Building2 className="w-3.5 h-3.5 text-primary opacity-60" />
            {name}
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-14 max-w-2xl mx-auto"
      >
        <div className="relative bg-background rounded-2xl p-8 border border-border shadow-elevated">
          <Quote className="w-8 h-8 text-primary/20 absolute top-6 left-6" />
          <div className="relative z-10">
            <p className="text-foreground text-lg leading-relaxed italic pl-6">
              "Vi mistet ikke lenger kunder på grunn av ubesvarte telefoner. Resepsjonisten sørger for at alle henvendelser blir tatt hånd om, og det har virkelig løftet bedriften vår."
            </p>
            <div className="mt-6 flex items-center gap-4 pl-6">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ØA</span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Daglig leder</p>
                <p className="text-xs text-muted-foreground">Øhres Auto AS</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SocialProofSection;
