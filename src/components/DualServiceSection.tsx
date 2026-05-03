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

    // Build a lat/long grid of points on a unit sphere — gives the
    // structured dotted-grid look from the reference image.
    const LAT = 44;
    const LON = 64;
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 1; i < LAT; i++) {
      const phi = (i / LAT) * Math.PI; // 0 .. PI (poles)
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      for (let j = 0; j < LON; j++) {
        const theta = (j / LON) * Math.PI * 2;
        points.push({
          x: Math.cos(theta) * sinPhi,
          y: cosPhi,
          z: Math.sin(theta) * sinPhi,
        });
      }
    }
    const POINTS = points.length;

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

      t += 0.008;
      const w = canvas.width;
      const h = canvas.height;

      // Clear fully – the dotted grid look needs crisp dots, not trails
      ctx.clearRect(0, 0, w, h);

      // Audio-driven amplitude – use full spectrum so every part of the
      // voice (consonants, sibilance, vowels) clearly drives the sphere.
      if (analyser && dataArray && playing) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const avg = sum / dataArray.length / 255; // 0..1
        ampTarget = Math.min(1.4, avg * 3.0);
      } else {
        // gentle idle breathing
        ampTarget = 0.06 + (Math.sin(t * 1.1) + 1) * 0.03;
      }
      // fast attack so the sphere visibly jumps with each syllable
      amp += (ampTarget - amp) * (ampTarget > amp ? 0.45 : 0.12);

      const cx = w / 2;
      const cy = h / 2;
      // The sphere expands directly with the voice – clearly visible.
      const baseR = Math.min(w, h) * 0.26;
      const sphereR = baseR * (1 + amp * 0.32);

      // Brand colors
      const PRIMARY = "276, 60%, 55%"; // purple
      const ACCENT = "310, 80%, 65%"; // magenta

      // 1. Soft outer glow that pulses with amplitude
      const glowR = sphereR * (1.45 + amp * 0.3);
      const glowGrad = ctx.createRadialGradient(cx, cy, sphereR * 0.6, cx, cy, glowR);
      glowGrad.addColorStop(0, `hsla(${ACCENT}, ${0.18 + amp * 0.25})`);
      glowGrad.addColorStop(0.55, `hsla(${PRIMARY}, ${0.08 + amp * 0.12})`);
      glowGrad.addColorStop(1, "hsla(276, 60%, 30%, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Rotation – slow base + slight push from voice
      const rotY = t * (0.35 + amp * 0.4);
      const rotX = Math.sin(t * 0.2) * 0.28;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      // 3. Dotted grid points
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < POINTS; i++) {
        const p = points[i];

        // Rotate Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const persp = 1 / (1.7 - z2 * 0.45);
        const sx = cx + x1 * sphereR * persp;
        const sy = cy + y2 * sphereR * persp;

        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const dotR = (0.55 + depth * 1.1) * dpr;

        // Front-facing dots are bright magenta, back-facing fade to deep purple
        const isFront = z2 > 0;
        const hue = isFront ? 305 : 270;
        const sat = 75;
        const light = isFront ? 55 + depth * 18 : 28 + depth * 14;
        const alpha = (isFront ? 0.55 : 0.22) * (0.5 + depth * 0.5);

        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // 4. Bright glowing rim — pulses with the voice
      const rimWidth = (3 + amp * 6) * dpr;
      ctx.lineWidth = rimWidth;
      ctx.strokeStyle = `hsla(${ACCENT}, ${0.55 + amp * 0.4})`;
      ctx.shadowColor = `hsla(${ACCENT}, ${0.7 + amp * 0.3})`;
      ctx.shadowBlur = (14 + amp * 28) * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.stroke();

      // Inner rim accent
      ctx.lineWidth = 1.5 * dpr;
      ctx.strokeStyle = `hsla(0, 0%, 100%, ${0.25 + amp * 0.4})`;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR * 0.995, 0, Math.PI * 2);
      ctx.stroke();
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