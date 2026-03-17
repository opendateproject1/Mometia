"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

// ─── Content ─────────────────────────────────────────────────────────────────

const TRUST_PILLS = [
  "SOC 2 Type II",
  "ISO 27001",
  "HIPAA Ready",
  "Zero-Trust",
] as const;

// ─── Framer variants ─────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function buildThemeColors() {
  const tmp = document.createElement("div");
  tmp.style.cssText = "position:absolute;visibility:hidden;width:1px;height:1px;";
  document.body.appendChild(tmp);

  const resolve = (vars: string[], alpha = 1): string => {
    let out = `rgba(255,255,255,${alpha})`;
    for (const v of vars) {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue(v)
        .trim();
      if (!val) continue;
      tmp.style.backgroundColor = `var(${v})`;
      const computed = getComputedStyle(tmp).backgroundColor;
      if (computed && computed !== "rgba(0, 0, 0, 0)") {
        if (alpha < 1) {
          const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          out = m ? `rgba(${m[1]},${m[2]},${m[3]},${alpha})` : computed;
        } else {
          out = computed;
        }
        break;
      }
    }
    return out;
  };

  const result = {
    backgroundTop: resolve(["--background"], 1),
    backgroundBottom: resolve(["--muted", "--background"], 0.97),
    wavePalette: [
      {
        offset: 0,
        amplitude: 68,
        frequency: 0.003,
        color: resolve(["--primary"], 0.8),
        opacity: 0.42,
      },
      {
        offset: Math.PI / 2,
        amplitude: 88,
        frequency: 0.0026,
        color: resolve(["--accent", "--primary"], 0.7),
        opacity: 0.32,
      },
      {
        offset: Math.PI,
        amplitude: 58,
        frequency: 0.0034,
        color: resolve(["--secondary", "--foreground"], 0.6),
        opacity: 0.28,
      },
      {
        offset: Math.PI * 1.5,
        amplitude: 78,
        frequency: 0.0022,
        color: resolve(["--primary"], 0.3),
        opacity: 0.22,
      },
      {
        offset: Math.PI * 2,
        amplitude: 50,
        frequency: 0.004,
        color: resolve(["--foreground"], 0.15),
        opacity: 0.18,
      },
    ] satisfies WaveConfig[],
  };

  document.body.removeChild(tmp);
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetRef = useRef<Point>({ x: 0, y: 0 });

  // Scroll-driven parallax: content drifts up and fades out
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, -100]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scrollHintOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  // ── Canvas animation ──────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let time = 0;
    let theme = buildThemeColors();

    const observer = new MutationObserver(() => {
      theme = buildThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mouseInfluence = reducedMotion ? 8 : 65;
    const influenceRadius = reducedMotion ? 150 : 300;
    const smoothing = reducedMotion ? 0.04 : 0.08;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const recenter = () => {
      const p = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = { ...p };
      targetRef.current = { ...p };
    };

    resize();
    recenter();

    const onResize = () => { resize(); recenter(); };
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => recenter();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const infl = Math.max(0, 1 - dist / influenceRadius);
        const mfx =
          infl * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mfx;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 32;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      time++;
      mouseRef.current.x +=
        (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetRef.current.y - mouseRef.current.y) * smoothing;

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, theme.backgroundTop);
      grad.addColorStop(1, theme.backgroundBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      theme.wavePalette.forEach(drawWave);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />

      {/* Ambient glow orbs — sit on top of canvas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[-80px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[160px]" />
        <div className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-secondary/[0.07] blur-[140px]" />
        <div className="absolute left-1/4 top-1/3 h-[320px] w-[320px] rounded-full bg-accent/[0.04] blur-[130px]" />
      </div>

      {/* Bottom fade-out into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
        aria-hidden
      />

      {/* ── Main content (parallax) ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-32 pb-28 text-center md:px-10"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Eyebrow pill */}
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/65">
              Enterprise Cybersecurity &amp; GRC
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="mb-7 text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-[88px] leading-[0.93]"
          >
            Your Shield Against{" "}
            <span className="bg-gradient-to-r from-primary via-primary/75 to-accent bg-clip-text text-transparent">
              Modern Threats
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-11 max-w-2xl text-lg leading-relaxed text-foreground/58 md:text-xl"
          >
            From cloud security architecture to SOC&nbsp;2 and ISO&nbsp;27001
            compliance — Mometia delivers enterprise-grade protection before,
            during, and after an incident.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mb-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="/#contact" size="lg">
              Book Free Assessment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/#case-studies" size="lg" variant="outline">
              View Case Studies
            </Button>
          </motion.div>

          {/* Trust pills */}
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {TRUST_PILLS.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-border/35 bg-background/50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/55 backdrop-blur-sm dark:border-border/50 dark:bg-background/40"
              >
                {pill}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
        aria-hidden
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-foreground/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
