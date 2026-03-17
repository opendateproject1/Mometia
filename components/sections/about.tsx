"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  Cloud,
  FileCheck,
  KeyRound,
  Lock,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItem {
  icon: ReactNode;
  title: string;
  description: string;
  side: "left" | "right";
}

interface StatItem {
  icon: ReactNode;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceItem[] = [
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "Compromised credentials",
    description:
      "Weak passwords, reused accounts, and unmonitored access create entry points for attackers.",
    side: "left",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Cloud misconfigurations",
    description:
      "Incorrect settings in cloud platforms expose sensitive data and create unauthorized access paths.",
    side: "left",
  },
  {
    icon: <ShieldAlert className="w-5 h-5" />,
    title: "Weak monitoring visibility",
    description:
      "Blind spots in security monitoring allow threats to go undetected until significant damage occurs.",
    side: "left",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "Excessive permissions",
    description:
      "Over-privileged user accounts create unnecessary risk and expand potential attack surfaces.",
    side: "right",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Untested recovery procedures",
    description:
      "Backup and recovery plans that haven't been validated often fail when you need them most.",
    side: "right",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Small security gaps",
    description:
      "Minor exposures that compound over time to create significant vulnerabilities in your infrastructure.",
    side: "right",
  },
];

const STATS: StatItem[] = [
  { icon: <Users className="w-5 h-5" />, value: 200, suffix: "+", label: "Organisations Secured" },
  { icon: <Award className="w-5 h-5" />, value: 100, suffix: "%", label: "Client Retention" },
  { icon: <Clock className="w-5 h-5" />, value: 48, prefix: "<", suffix: "hr", label: "Incident Response" },
  { icon: <FileCheck className="w-5 h-5" />, value: 50, suffix: "+", label: "Compliance Standards" },
];

// ─── Framer variants ─────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const statsContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const statCard: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_EXPO },
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
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(motionVal, value, {
      duration: 1.8,
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

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon, value, prefix, suffix, decimals, label }: StatItem) {
  return (
    <motion.div
      variants={statCard}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 380, damping: 24 } }}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border border-border/40 bg-card/60 p-6 text-center backdrop-blur-sm"
      style={{
        boxShadow:
          "0 1px 3px hsl(0 0% 0% / 0.04), 0 0 0 1px color-mix(in oklab, var(--border) 40%, transparent)",
      }}
    >
      {/* Top accent */}
      <motion.div
        className="absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 rounded-full bg-primary"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Icon circle */}
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-full text-primary"
        style={{ backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)" }}
        whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
      >
        {icon}
      </motion.div>

      {/* Number */}
      <div className="text-4xl font-bold text-foreground">
        <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>

      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>

      {/* Underline */}
      <motion.div
        className="h-px bg-primary/40"
        initial={{ width: "1.5rem" }}
        whileHover={{ width: "3rem" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ─── Service item ─────────────────────────────────────────────────────────────

function ServiceCard({
  icon,
  title,
  description,
  side,
}: ServiceItem) {
  const variant = side === "left" ? slideLeft : slideRight;

  return (
    <motion.div
      variants={variant}
      className="group flex flex-col gap-3"
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="relative flex-shrink-0 rounded-xl p-2.5 text-primary"
          style={{ backgroundColor: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
          whileHover={{
            rotate: [0, -8, 8, -4, 0],
            transition: { duration: 0.45 },
          }}
        >
          {icon}
          {/* Key accent dot */}
          <span
            className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary opacity-70"
          />
        </motion.div>
        <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground pl-[46px]">
        {description}
      </p>
      {/* Hover CTA */}
      
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ["start center", "end center"],
  });

  // Parallax for orbs and image
  const imgY = useTransform(sectionProgress, [0, 1], [-24, 24]);
  const orb1Y = useTransform(sectionProgress, [0, 1], [0, -48]);
  const orb2Y = useTransform(sectionProgress, [0, 1], [0, 48]);

  // Scroll-driven opacity and scale for content elements with improved bidirectional smoothness
  const headerOpacity = useTransform(contentProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const headerScale = useTransform(contentProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  // Service cards scroll animations with improved bidirectional smoothness
  const servicesY = useTransform(contentProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -20]);
  const servicesOpacity = useTransform(contentProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);

  // Stats section animations
  const statsY = useTransform(contentProgress, [0.65, 0.85], [60, 0]);
  const statsOpacity = useTransform(contentProgress, [0.65, 0.8], [0, 1]);

  // Rotation animations for service cards with smoother bidirectional behavior
  const leftServiceRotation = useTransform(contentProgress, [0, 0.3, 0.7, 1], [-2, 0, 0, 1]);
  const rightServiceRotation = useTransform(contentProgress, [0, 0.3, 0.7, 1], [2, 0, 0, -1]);

  // Image container animations with enhanced bidirectional smoothness
  const imgScale = useTransform(contentProgress, [0.3, 0.5, 1], [0.9, 1.05, 0.95]);
  const imgRotation = useTransform(contentProgress, [0.2, 0.5, 1], [-1, 0, 1]);

  const leftServices = SERVICES.filter((s) => s.side === "left");
  const rightServices = SERVICES.filter((s) => s.side === "right");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden py-16 md:py-20"
      aria-label="About Mometia"
    >
      {/* ── Ambient orbs ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-secondary/[0.05] blur-[140px]"
        style={{ y: orb2Y }}
      />

      {/* ── Floating particles ── */}
      {[
        { top: "20%", left: "8%", size: 5, delay: 0 },
        { top: "65%", right: "7%", size: 7, delay: 1.2 },
        { top: "40%", left: "40%", size: 4, delay: 0.6 },
      ].map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-primary/25"
          style={{ top: p.top, left: "left" in p ? p.left : undefined, right: "right" in p ? p.right : undefined, width: p.size, height: p.size }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-6 md:px-10" ref={contentRef}>

        {/* ── Section header ── */}
        <motion.div
          className="mb-12 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          style={{
            opacity: headerOpacity,
            scale: headerScale,
          }}
        >
          <motion.span
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
            Modern Risk
          </motion.span>

          <h2 className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            The Reality of Modern Risk
          </h2>

          {/* Animated underline */}
          <motion.div
            className="mb-7 h-[3px] rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground mb-4">
            Cyber incidents rarely start with advanced attacks.
          </p>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground font-semibold">
            They begin with small gaps:
          </p>
        </motion.div>

        {/* ── 3-col layout ── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">

          {/* Left services */}
          <motion.div
            className="flex flex-col gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            style={{
              y: servicesY,
              opacity: servicesOpacity,
              rotateZ: leftServiceRotation,
            }}
          >
            {leftServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </motion.div>

          {/* Center image */}
          <div className="flex items-center justify-center order-first md:order-none">
            <motion.div
              className="relative w-full max-w-[280px]"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              style={{
                scale: imgScale,
                rotateZ: imgRotation,
              }}
            >
              {/* Border frame */}
              <motion.div
                className="absolute -inset-3 rounded-2xl border-2 border-primary/20 z-[-1]"
                initial={{ opacity: 0, scale: 1.06 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />

              {/* Image with parallax */}
              <motion.div
                className="overflow-hidden rounded-xl shadow-2xl"
                style={{ y: imgY }}
                whileHover={{ scale: 1.02, transition: { duration: 0.35 } }}
              >
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80"
                  alt="Mometia security team"
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
                {/* Gradient overlay + CTA */}
                <motion.div
                  className="absolute inset-0 flex items-end justify-center p-5"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in oklab, var(--foreground) 55%, transparent) 0%, transparent 55%)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <motion.a
                    href="/#capabilities"
                    className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-sm"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    Our Capabilities <ArrowRight className="h-3.5 w-3.5" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Floating accent orbs */}
              <motion.div
                className="absolute -right-6 -top-6 h-14 w-14 rounded-full bg-primary/10"
                style={{ y: orb1Y }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-secondary/10"
                style={{ y: orb2Y }}
              />
            </motion.div>
          </div>

          {/* Right services */}
          <motion.div
            className="flex flex-col gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            style={{
              y: servicesY,
              opacity: servicesOpacity,
              rotateZ: rightServiceRotation,
            }}
          >
            {rightServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </motion.div>
        </div>

        {/* ── MOMETIA Solution Statement ── */}
        <motion.div
          className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm p-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
        >
          <motion.div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <ShieldCheck className="h-8 w-8 text-primary" />
          </motion.div>

          <motion.p
            className="text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="font-semibold text-foreground">MOMETIA IO</span> helps organizations
            identify and resolve these exposures before they become operational disruptions.
          </motion.p>
        </motion.div>

        {/* ── Stats (replaces kpis.tsx) ── */}
        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={statsContainer}
          style={{
            y: statsY,
            opacity: statsOpacity,
          }}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
