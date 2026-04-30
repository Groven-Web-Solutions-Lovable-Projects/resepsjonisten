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
      <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)/0.35),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      <div
        className="relative h-full rounded-2xl p-7 sm:p-8 overflow-hidden border border-white/10"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
        }}
      >
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-50 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent) / 0.45) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative">
          <div className="flex items-center justify-between mb-7">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white">
              <Icon className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-mono">
              0{index + 1}
            </span>
          </div>

          <div className="flex items-baseline gap-1.5">
            {stat.prefix && (
              <span className="text-2xl sm:text-3xl font-light text-white/60 tabular-nums">
                {stat.prefix}
              </span>
            )}
            <span
              className="text-5xl sm:text-6xl font-extrabold tabular-nums leading-none tracking-tight text-white"
              style={{ textShadow: "0 0 40px hsl(var(--accent) / 0.4)" }}
            >
              {text}
            </span>
            {stat.suffix && (
              <span className="text-xl sm:text-2xl font-semibold text-white/70 tabular-nums">
                {stat.suffix}
              </span>
            )}
          </div>

          <div className="mt-5 h-px w-12 bg-gradient-to-r from-accent to-transparent group-hover:w-24 transition-all duration-500" />
          <p className="mt-4 text-base font-semibold text-white">{stat.label}</p>
          <p className="mt-1 text-xs text-white/50">{stat.hint}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="resultater"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, hsl(276 60% 18%) 0%, hsl(270 55% 10%) 55%, hsl(270 60% 6%) 100%)",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            Våre resultater
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Tall som{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(310 80% 75%) 100%)",
              }}
            >
              taler for seg selv
            </span>
          </h2>
          <p className="mt-3 text-white/60">
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
