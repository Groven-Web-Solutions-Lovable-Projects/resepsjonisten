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
      initial={{ opacity: 0, y: 30 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Soft hover halo */}
      <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)/0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      <div
        className="relative h-full rounded-3xl p-[1px] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 100% / 0.08) 0%, hsl(0 0% 100% / 0.02) 50%, hsl(0 0% 100% / 0.08) 100%)",
        }}
      >
        <div
          className="relative h-full rounded-[calc(1.5rem-1px)] p-7 sm:p-8 overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, hsl(276 60% 18%) 0%, hsl(270 50% 10%) 50%, hsl(270 60% 6%) 100%)",
          }}
        >
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-screen pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Animated accent orb */}
          <div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--accent) / 0.55) 0%, transparent 70%)",
            }}
          />

          {/* Top hairline */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative">
            {/* Icon row */}
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-white/10 blur-md" />
                <div className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">
                0{index + 1}
              </span>
            </div>

            {/* Number */}
            <div className="flex items-baseline gap-1.5">
              {stat.prefix && (
                <span className="text-2xl sm:text-3xl font-light text-white/60 tabular-nums">
                  {stat.prefix}
                </span>
              )}
              <span
                className="text-5xl sm:text-6xl font-bold tabular-nums leading-none tracking-tight text-white"
                style={{
                  textShadow: "0 0 40px hsl(var(--accent) / 0.35)",
                }}
              >
                {text}
              </span>
              {stat.suffix && (
                <span className="text-xl sm:text-2xl font-medium text-white/70 tabular-nums">
                  {stat.suffix}
                </span>
              )}
            </div>

            {/* Accent underline */}
            <div className="mt-5 h-px w-12 bg-gradient-to-r from-accent to-transparent group-hover:w-24 transition-all duration-500" />

            {/* Label */}
            <p className="mt-4 text-base font-semibold text-white">{stat.label}</p>
            <p className="mt-1 text-xs text-white/50">{stat.hint}</p>
          </div>
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
      {/* Subtle backdrop */}
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
