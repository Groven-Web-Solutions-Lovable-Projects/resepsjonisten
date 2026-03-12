import { motion } from "framer-motion";

const companies = [
  "Øhres Auto AS", "Negassie Holding AS", "NGT AS", "Pescator AB",
  "Svenska Industrihotellet AB", "OIV7B AS", "Pepzi AS", "FinnAI AS",
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Betrodd av bedrifter som ønsker bedre tilgjengelighet
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Vi hjelper bedrifter med å håndtere innkommende telefoner profesjonelt, slik at ingen viktige henvendelser går tapt.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex flex-wrap justify-center gap-6"
      >
        {companies.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
          >
            {name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SocialProofSection;
