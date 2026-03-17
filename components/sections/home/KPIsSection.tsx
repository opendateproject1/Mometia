"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Award,
  Clock,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const KPIS = [
  {
    icon: ShieldCheck,
    value: 350,
    suffix: "+",
    prefix: "",
    label: "Organizations Protected",
    description: "Active clients across enterprise, mid-market, and government sectors.",
    color: "primary" as const,
  },
  {
    icon: Clock,
    value: 98,
    suffix: "%",
    prefix: "",
    label: "Incident SLA Met",
    description: "We meet our 2-hour response commitment virtually every time.",
    color: "accent" as const,
  },
  {
    icon: FileCheck2,
    value: 40,
    suffix: "+",
    prefix: "",
    label: "Compliance Frameworks",
    description: "SOC 2, ISO 27001, HIPAA, NIST, GDPR, PCI DSS, and beyond.",
    color: "secondary" as const,
  },
  {
    icon: TrendingUp,
    value: 89,
    suffix: "%",
    prefix: "",
    label: "Avg. Posture Improvement",
    description: "Measured in the first 90-day engagement across all clients.",
    color: "primary" as const,
  },
  {
    icon: Users,
    value: 150,
    suffix: "+",
    prefix: "",
    label: "Years Combined Expertise",
    description: "Our practitioners average 15+ years in offensive and defensive security.",
    color: "accent" as const,
  },
  {
    icon: Award,
    value: 99.9,
    suffix: "%",
    prefix: "",
    label: "Security Ops Uptime",
    description: "Always-on monitoring and threat intelligence, 365 days a year.",
    color: "secondary" as const,
  },
];

const FRAMEWORKS = [
  "SOC 2 Type II",
  "ISO 27001",
  "HIPAA",
  "NIST CSF",
  "GDPR",
  "PCI DSS",
  "FedRAMP",
  "CIS Controls",
];

const COLOR_MAP = {
  primary: {
    icon: "text-primary",
    glow: "bg-primary/10 dark:bg-primary/15",
    border: "border-primary/20 dark:border-primary/30",
    stat: "text-primary",
  },
  accent: {
    icon: "text-accent-foreground dark:text-accent",
    glow: "bg-accent/20 dark:bg-accent/20",
    border: "border-accent/20 dark:border-accent/30",
    stat: "text-accent-foreground dark:text-accent",
  },
  secondary: {
    icon: "text-secondary",
    glow: "bg-secondary/10 dark:bg-secondary/15",
    border: "border-secondary/20 dark:border-secondary/30",
    stat: "text-secondary",
  },
};

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  prefix,
  suffix,
  color,
  inView,
}: {
  value: number;
  prefix: string;
  suffix: string;
  color: "primary" | "accent" | "secondary";
  inView: boolean;
}) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    value % 1 === 0 ? Math.round(v).toString() : v.toFixed(1)
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    });
    return controls.stop;
  }, [inView, motionVal, value]);

  return (
    <div className={`text-4xl font-bold tracking-tight ${COLOR_MAP[color].stat}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
}

// ─── Card variants ─────────────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.09,
    },
  }),
};

const pillVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3 + i * 0.06,
    },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function KPIsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const frameworksRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const frameworksInView = useInView(frameworksRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-28"
      aria-label="Security metrics and KPIs"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-muted/30 dark:bg-card/40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in oklab, var(--primary) 6%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60 backdrop-blur"
          >
            <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden />
            By the Numbers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Results that speak{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              for themselves
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl text-base text-foreground/60 md:text-lg"
          >
            Our work is measured in outcomes — not deliverables. Here's what
            clients experience when they partner with Mometia.
          </motion.p>
        </div>

        {/* ── KPI grid ── */}
        <div
          ref={gridRef}
          className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {KPIS.map((kpi, i) => {
            const colors = COLOR_MAP[kpi.color];
            return (
              <motion.div
                key={kpi.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={gridInView ? "visible" : "hidden"}
                className="group relative overflow-hidden rounded-2xl border border-border/30 bg-background/70 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg dark:border-border/50 dark:bg-card/60"
              >
                {/* Card glow on hover */}
                <motion.div
                  aria-hidden
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${colors.glow} group-hover:opacity-100`}
                />

                {/* Gradient border accent */}
                <motion.div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-300 ${colors.icon} group-hover:opacity-60`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.glow} border ${colors.border}`}
                  >
                    <kpi.icon className={`h-5 w-5 ${colors.icon}`} aria-hidden />
                  </div>

                  {/* Value */}
                  <AnimatedNumber
                    value={kpi.value}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    color={kpi.color}
                    inView={gridInView}
                  />

                  {/* Label */}
                  <div className="mt-1.5 text-sm font-semibold text-foreground">
                    {kpi.label}
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-foreground/55">
                    {kpi.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Frameworks strip ── */}
        <div ref={frameworksRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={frameworksInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground/40"
          >
            Frameworks &amp; Standards We Cover
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {FRAMEWORKS.map((fw, i) => (
              <motion.span
                key={fw}
                custom={i}
                variants={pillVariants}
                initial="hidden"
                animate={frameworksInView ? "visible" : "hidden"}
                className="rounded-full border border-border/40 bg-background/60 px-4 py-2 text-xs font-medium tracking-wide text-foreground/60 backdrop-blur transition-colors duration-200 hover:border-primary/40 hover:text-foreground dark:border-border/50 dark:bg-card/50"
              >
                {fw}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
