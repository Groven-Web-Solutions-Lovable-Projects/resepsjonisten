import { motion } from "framer-motion";
import { AlertTriangle, PhoneOff, Clock, Users, Briefcase } from "lucide-react";
import problemImg from "@/assets/problem-section.jpg";

const problems = [
  { icon: PhoneOff, text: "Du rekker ikke alltid å svare når du står i jobb" },
  { icon: AlertTriangle, text: "Viktige henvendelser kan gå tapt" },
  { icon: Clock, text: "Arbeidsflyten blir avbrutt flere ganger om dagen" },
  { icon: Users, text: "Kunder forventer rask og profesjonell respons" },
  { icon: Briefcase, text: "Du trenger en løsning uten å måtte ansette noen" },
];

const ProblemSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={problemImg} alt="Stresset bedriftseier" className="w-full h-auto object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Telefonen tar tid, skaper avbrytelser og kan{" "}
            <span className="gradient-text">koste deg kunder</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            For mange små bedrifter blir telefonen en konstant avbrytelse i arbeidshverdagen. Du rekker ikke alltid å svare, og når du først svarer, stjeler det fokus fra oppgavene du egentlig burde bruke tiden på.
          </p>
          <div className="mt-8 space-y-4">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
