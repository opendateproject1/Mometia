"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface KpiItem {
  value: number;
  prefix?: string;
  suffix: string;
  decimals: number;
  label: string;
  description: string;
}

const KPIS: KpiItem[] = [
  {
    value: 200,
    suffix: "+",
    decimals: 0,
    label: "Organisations Secured",
    description: "From Fortune 500 to fast-growing startups.",
  },
  {
    value: 100,
    suffix: "%",
    decimals: 0,
    label: "Client Retention",
    description: "Every client we partner with stays with us.",
  },
  {
    value: 48,
    prefix: "<",
    suffix: "hr",
    decimals: 0,
    label: "Incident Response Time",
    description: "Detection to containment, guaranteed.",
  },
  {
    value: 50,
    suffix: "+",
    decimals: 0,
    label: "Compliance Standards",
    description: "SOC 2, ISO 27001, HIPAA, and more.",
  },
];

// ─── Framer variants ─────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const sectionTitle: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

const gridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

// ─── Counter ──────────────────────────────────────────────────────────────────

function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, value, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
    });
    return ctrl.stop;
  }, [inView, value, motionVal]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
  description,
}: KpiItem) {
  return (
    <motion.div
      initial="hidden"
      variants={cardVariant}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 380, damping: 24 } }}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border/40 bg-card/60 p-7 backdrop-blur-sm dark:border-border/30 dark:bg-card/40"
      style={{
        boxShadow:
          "0 1px 3px hsl(0 0% 0% / 0.04), 0 0 0 1px color-mix(in oklab, var(--border) 40%, transparent)",
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute left-7 top-0 h-[2px] w-10 rounded-full bg-primary opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.25 }}
      />

      {/* Number */}
      <div
        className="text-5xl font-bold tracking-tight text-foreground md:text-6xl"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <Counter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>

      {/* Label */}
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {label}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Kpis() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label="Key metrics"
    >
      {/* Ambient glow behind the grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[180px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-secondary/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Section header */}
        <motion.div
          className="mb-12 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionTitle}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/55">
              By the numbers
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Results that speak{" "}
            <span className="bg-gradient-to-r from-primary via-primary/70 to-accent bg-clip-text text-transparent">
              for themselves
            </span>
          </h2>

          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Trusted by hundreds of organisations worldwide. Every metric represents real impact, real partnerships, and real peace of mind.
          </p>
        </motion.div>

        {/* KPI grid */}
        <motion.div
          initial="hidden"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={gridContainer}
        >
          {KPIS.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </motion.div>

        {/* Bottom divider line */}
        <motion.div
          className="mt-16 h-px w-full bg-border/40"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_EXPO, delay: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
