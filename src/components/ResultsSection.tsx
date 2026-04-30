import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhoneCall, Timer, Clock, Smile, Sparkles } from "lucide-react";

type Stat = {
  icon: typeof PhoneCall;
  value: number;
  prefix?: string;
  suffix?: string;
  display?: (n: number) => string;
  label: string;
  hint: string;
};

const stats: Stat[] = [
  {
    icon: PhoneCall,
    value: 10000,
    suffix: "+",
    display: (n) => `${Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, " ")}`,
    label: "Kundesamtaler besvart",
    hint: "Siden oppstart",
  },
  {
    icon: Timer,
    value: 10,
    prefix: "<",
    suffix: "sek",
    label: "Gjennomsnittlig responstid",
    hint: "Raskere enn de fleste",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Tilgjengelighet",
    hint: "Alltid på vakt",
  },
  {
    icon: Smile,
    value: 98,
    suffix: "%",
    label: "Fornøyde kunder",
    hint: "Basert på tilbakemeldinger",
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
      initial={{ opacity: 0, y: 24 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Soft hover halo */}
      <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)/0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      <div className="relative h-full rounded-2xl bg-card border border-border shadow-elevated p-7 sm:p-8 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
        {/* Soft gradient corner wash */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top hairline */}
        <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative">
          {/* Icon row */}
          <div className="flex items-center justify-between mb-7">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/15">
              <Icon className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-mono">
              0{index + 1}
            </span>
          </div>

          {/* Number */}
          <div className="flex items-baseline gap-1.5">
            {stat.prefix && (
              <span className="text-2xl sm:text-3xl font-light text-muted-foreground tabular-nums">
                {stat.prefix}
              </span>
            )}
            <span className="gradient-text text-5xl sm:text-6xl font-extrabold tabular-nums leading-none tracking-tight">
              {text}
            </span>
            {stat.suffix && (
              <span className="text-xl sm:text-2xl font-semibold text-foreground/70 tabular-nums">
                {stat.suffix}
              </span>
            )}
          </div>

          {/* Accent underline */}
          <div className="mt-5 h-px w-12 bg-gradient-to-r from-primary via-accent to-transparent group-hover:w-24 transition-all duration-500" />

          {/* Label */}
          <p className="mt-4 text-base font-semibold text-foreground">{stat.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="resultater" className="relative py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Våre resultater
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tall som <span className="gradient-text">taler for seg selv</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Målbare resultater for bedrifter som stoler på oss hver dag.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
