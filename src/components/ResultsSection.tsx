import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhoneCall, Timer, Clock, Smile } from "lucide-react";

type Stat = {
  icon: typeof PhoneCall;
  value: number;
  prefix?: string;
  suffix?: string;
  display?: (n: number) => string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: PhoneCall,
    value: 10000,
    suffix: "+",
    display: (n) => `${Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, " ")}`,
    label: "Kundesamtaler besvart",
  },
  {
    icon: Timer,
    value: 10,
    prefix: "< ",
    suffix: " sek",
    label: "Gjennomsnittlig responstid",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Tilgjengelighet",
  },
  {
    icon: Smile,
    value: 98,
    suffix: " %",
    label: "Fornøyde kunder",
  },
];

const useCountUp = (target: number, start: boolean, duration = 1800) => {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);

  return val;
};

const StatCard = ({ stat, index, start }: { stat: Stat; index: number; start: boolean }) => {
  const Icon = stat.icon;
  const animated = useCountUp(stat.value, start);
  const text = stat.display
    ? stat.display(animated)
    : Math.round(animated).toLocaleString("nb-NO").replace(/\u00A0/g, " ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative h-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elevated overflow-hidden">
        {/* Decorative gradient corner */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 blur-2xl"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
        />

        <div className="relative flex flex-col items-start">
          <div
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-primary-foreground mb-5 shadow-glow"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex items-baseline">
            {stat.prefix && (
              <span className="gradient-text text-3xl sm:text-4xl font-extrabold tabular-nums">
                {stat.prefix}
              </span>
            )}
            <span className="gradient-text text-4xl sm:text-5xl lg:text-6xl font-extrabold tabular-nums leading-none tracking-tight">
              {text}
            </span>
            {stat.suffix && (
              <span className="gradient-text text-2xl sm:text-3xl font-extrabold tabular-nums ml-0.5">
                {stat.suffix}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium">
            {stat.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="resultater" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 gradient-primary-soft" />
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            Våre resultater
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tall som <span className="gradient-text">taler for seg selv</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Vi leverer målbare resultater for bedrifter som stoler på oss hver dag.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
