import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CallUsButton from "@/components/CallUsButton";

const AI_AUDIO_SRC = "/audio/ai-resepsjonisten.mp3";
const VIDEO_SRC = "/videos/manuell-kundeservice.mp4";

type Active = "none" | "video" | "ai";

const AIVisualizer = ({
  playing,
  analyser,
}: {
  playing: boolean;
  analyser: AnalyserNode | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const dataArray = analyser
      ? new Uint8Array(analyser.frequencyBinCount)
      : null;

    let t = 0;
    const render = () => {
      t += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      let amp = 0.25;
      if (analyser && dataArray && playing) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        amp = 0.2 + (sum / dataArray.length / 255) * 1.2;
      } else {
        amp = 0.3 + Math.sin(t * 1.5) * 0.08;
      }

      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.18;

      // Outer glow rings
      for (let r = 0; r < 4; r++) {
        const radius = baseR + r * baseR * 0.35 * (1 + amp * 0.4);
        const grad = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
        grad.addColorStop(0, `hsla(276, 60%, 50%, ${0.18 - r * 0.04})`);
        grad.addColorStop(1, `hsla(310, 70%, 55%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central pulsing orb
      const orbR = baseR * (0.85 + amp * 0.35);
      const orbGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR);
      orbGrad.addColorStop(0, `hsla(310, 80%, 70%, 0.95)`);
      orbGrad.addColorStop(0.6, `hsla(276, 60%, 45%, 0.7)`);
      orbGrad.addColorStop(1, `hsla(276, 52%, 28%, 0)`);
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
      ctx.fill();

      // Frequency bars in a circle
      const bars = 64;
      const barBaseR = baseR * 1.4;
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 + t * 0.3;
        let v: number;
        if (analyser && dataArray && playing) {
          v = dataArray[Math.floor((i / bars) * dataArray.length)] / 255;
        } else {
          v = (Math.sin(t * 2 + i * 0.4) + 1) / 2 * 0.4 + 0.1;
        }
        const barLen = baseR * 0.5 + v * baseR * 1.4;
        const x1 = cx + Math.cos(angle) * barBaseR;
        const y1 = cy + Math.sin(angle) * barBaseR;
        const x2 = cx + Math.cos(angle) * (barBaseR + barLen);
        const y2 = cy + Math.sin(angle) * (barBaseR + barLen);

        const lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        lineGrad.addColorStop(0, `hsla(276, 60%, 55%, 0.9)`);
        lineGrad.addColorStop(1, `hsla(310, 80%, 65%, 0.2)`);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2 * dpr;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Floating particles
      const particles = 24;
      for (let i = 0; i < particles; i++) {
        const a = (i / particles) * Math.PI * 2 + t * 0.6;
        const dist = baseR * 2.2 + Math.sin(t * 1.2 + i) * baseR * 0.4 * amp;
        const px = cx + Math.cos(a) * dist;
        const py = cy + Math.sin(a) * dist;
        const pr = (1.5 + Math.sin(t * 3 + i) * 1.5) * dpr * (0.6 + amp);
        ctx.fillStyle = i % 2 === 0
          ? `hsla(310, 80%, 70%, 0.85)`
          : `hsla(276, 60%, 60%, 0.85)`;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analyser, playing]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const DualServiceSection = () => {
  const [active, setActive] = useState<Active>("none");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [analyserReady, setAnalyserReady] = useState(false);

  const ensureAnalyser = () => {
    if (!audioRef.current) return;
    if (audioCtxRef.current) return;
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AC();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      setAnalyserReady(true);
    } catch (e) {
      // ignore
    }
  };

  const playVideo = () => {
    if (audioRef.current) audioRef.current.pause();
    videoRef.current?.play();
    setActive("video");
  };
  const pauseVideo = () => {
    videoRef.current?.pause();
    setActive("none");
  };
  const playAI = async () => {
    if (videoRef.current) videoRef.current.pause();
    ensureAnalyser();
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }
    try {
      await audioRef.current?.play();
      setActive("ai");
    } catch (e) {
      setActive("none");
    }
  };
  const pauseAI = () => {
    audioRef.current?.pause();
    setActive("none");
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 gradient-primary-soft opacity-60" />
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            Aldri en tapt kunde –{" "}
            <span className="gradient-text">verken på dagen eller natten</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Vi kombinerer ekte mennesker med kraftig AI, slik at bedriften din alltid er tilgjengelig.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Manuell */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-elevated bg-card aspect-[4/5] sm:aspect-square md:aspect-[4/5] group"
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              onEnded={() => setActive("none")}
              onPause={() => active === "video" && setActive("none")}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent transition-opacity duration-500 ${
                active === "video" ? "opacity-30" : "opacity-90"
              }`}
            />

            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-foreground border border-border">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Manuell kundeservice
              </span>
            </div>

            <button
              onClick={() => (active === "video" ? pauseVideo() : playVideo())}
              className="absolute inset-0 flex items-center justify-center z-10"
              aria-label={active === "video" ? "Pause video" : "Spill video"}
            >
              <span
                className={`flex items-center justify-center w-20 h-20 rounded-full gradient-primary text-primary-foreground shadow-glow transition-all duration-300 ${
                  active === "video"
                    ? "opacity-0 group-hover:opacity-100 scale-90"
                    : "opacity-100 scale-100 hover:scale-110"
                }`}
              >
                {active === "video" ? (
                  <Pause className="w-8 h-8" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                )}
              </span>
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground z-10 pointer-events-none">
              <h3 className="text-xl md:text-2xl font-bold">Ekte resepsjonist</h3>
              <p className="text-sm text-primary-foreground/90 mt-1">
                Personlig service med menneskelig varme.
              </p>
            </div>
          </motion.div>

          {/* AI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-elevated aspect-[4/5] sm:aspect-square md:aspect-[4/5] group"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, hsl(276 52% 18%), hsl(270 30% 8%))",
            }}
          >
            <audio
              ref={audioRef}
              src={AI_AUDIO_SRC}
              onEnded={() => setActive("none")}
              onPause={() => active === "ai" && setActive("none")}
              preload="none"
            />

            <div className="absolute inset-0">
              <AIVisualizer
                playing={active === "ai"}
                analyser={analyserReady ? analyserRef.current : null}
              />
            </div>

            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/15 backdrop-blur text-xs font-semibold text-white border border-white/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                AI-resepsjonisten
              </span>
            </div>

            <button
              onClick={() => (active === "ai" ? pauseAI() : playAI())}
              className="absolute inset-0 flex items-center justify-center z-10"
              aria-label={active === "ai" ? "Pause AI" : "Spill AI"}
            >
              <span
                className={`flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white shadow-glow transition-all duration-300 ${
                  active === "ai"
                    ? "opacity-0 group-hover:opacity-100 scale-90"
                    : "opacity-100 scale-100 hover:scale-110 hover:bg-white/20"
                }`}
              >
                {active === "ai" ? (
                  <Pause className="w-8 h-8" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                )}
              </span>
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 pointer-events-none">
              <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                AI-resepsjonist
                <Volume2 className="w-4 h-4 text-white/70" />
              </h3>
              <p className="text-sm text-white/80 mt-1">
                Tilgjengelig 24/7 – svarer umiddelbart, hver gang.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#kontakt">
            <Button variant="hero" size="xl">
              Book gratis demo
            </Button>
          </a>
          <CallUsButton />
        </motion.div>
      </div>
    </section>
  );
};

export default DualServiceSection;