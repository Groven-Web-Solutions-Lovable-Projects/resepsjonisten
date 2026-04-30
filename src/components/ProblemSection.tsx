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
  <section
    className="relative py-28 overflow-hidden"
    style={{ background: "hsl(36 40% 96%)" }}
  >
    {/* Editorial decoration */}
    <div className="absolute top-10 right-10 text-[200px] md:text-[300px] font-bold text-primary/[0.04] leading-none select-none pointer-events-none">
      Problem
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-elevated">
            <img src={problemImg} alt="Stresset bedriftseier" className="w-full h-auto object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-foreground text-background px-5 py-3 rounded-2xl shadow-elevated text-sm font-semibold">
            Hverdagen i dag
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
            — Utfordringen
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
            Telefonen tar tid, skaper avbrytelser og kan{" "}
            <span className="gradient-text">koste deg kunder</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-xl">
            For mange små bedrifter blir telefonen en konstant avbrytelse i arbeidshverdagen. Du rekker ikke alltid å svare, og når du først svarer, stjeler det fokus fra oppgavene du egentlig burde bruke tiden på.
          </p>
          <div className="mt-10 space-y-3">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 py-3 border-b border-foreground/10 last:border-b-0"
              >
                <span className="text-xs font-mono text-muted-foreground/60 w-8">
                  0{i + 1}
                </span>
                <item.icon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.75} />
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
