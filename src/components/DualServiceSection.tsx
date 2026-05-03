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

    // Pause animation when canvas is offscreen
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    // Pause when tab is hidden
    const onVisibility = () => {
      // no-op flag; the rAF loop checks document.hidden too
    };
    document.addEventListener("visibilitychange", onVisibility);

    const dataArray = analyser
      ? new Uint8Array(analyser.frequencyBinCount)
      : null;

    // Pre-generate point distribution on a unit sphere using Fibonacci lattice
    const POINTS = 2200;
    const points: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    let t = 0;
    let amp = 0.15;
    let ampTarget = 0.15;
    const FRAME_MS = 1000 / 30; // 30 fps cap
    let lastTime = 0;

    const render = (now: number) => {
      rafRef.current = requestAnimationFrame(render);

      if (!visible || document.hidden) {
        lastTime = now;
        return;
      }
      if (now - lastTime < FRAME_MS) return;
      lastTime = now;

      t += 0.006;
      const w = canvas.width;
      const h = canvas.height;

      // Soft trail – fade previous frame instead of clearing fully (glow effect)
      ctx.fillStyle = "rgba(6, 3, 14, 0.32)";
      ctx.fillRect(0, 0, w, h);

      // Audio-driven amplitude
      if (analyser && dataArray && playing) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        const lows = Math.floor(dataArray.length * 0.4);
        for (let i = 0; i < lows; i++) sum += dataArray[i];
        ampTarget = 0.05 + (sum / lows / 255) * 1.6;
      } else {
        ampTarget = 0.08 + (Math.sin(t * 0.9) + 1) * 0.04;
      }
      amp += (ampTarget - amp) * 0.2;

      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.32;

      // Background radial glow
      const bgGrad = ctx.createRadialGradient(cx, cy, baseR * 0.2, cx, cy, baseR * 2);
      bgGrad.addColorStop(0, "rgba(60, 30, 150, 0.12)");
      bgGrad.addColorStop(0.5, "rgba(30, 15, 90, 0.05)");
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 2, 0, Math.PI * 2);
      ctx.fill();

      // Rotation – speeds up slightly with amplitude
      const rotY = t * (0.4 + amp * 0.6);
      const rotX = Math.sin(t * 0.25) * 0.35 + amp * 0.15;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // Render each point with deformation
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < POINTS; i++) {
        const p = points[i];
        // Organic deformation – noise-like surface displacement
        const n =
          Math.sin(p.x * 4 + t * 1.5) * 0.5 +
          Math.cos(p.y * 5 - t * 1.1) * 0.5 +
          Math.sin(p.z * 3 + t * 1.8) * 0.5;
        const disp =
          1 +
          n * (0.04 + amp * 0.08) +
          amp * 0.35 * (0.5 + 0.5 * Math.sin(t * 2.5 + i * 0.015));
        let x = p.x * disp;
        let y = p.y * disp;
        let z = p.z * disp;

        // Rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Project
        const persp = 1 / (1.6 - z2 * 0.5);
        const sx = cx + x1 * baseR * persp;
        const sy = cy + y2 * baseR * persp;

        // Depth-based color & size – softer/dimmer overall
        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const size = (0.35 + depth * 1.4) * dpr;

        const hue = 235 + depth * 45 + Math.sin(t + i * 0.02) * 6;
        const light = 25 + depth * 30;
        const alpha = 0.18 + depth * 0.42;

        ctx.fillStyle = `hsla(${hue}, 80%, ${light}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
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
                "radial-gradient(circle at 50% 50%, hsl(260 50% 10%), hsl(260 40% 4%) 70%, #050210 100%)",
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