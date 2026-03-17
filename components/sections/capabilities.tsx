"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Cloud,
  Lock,
  Zap,
  Bug,
  Eye,
  Network,
  Check,
} from "lucide-react";
import { Radar, CapabilityIcon } from "@/components/ui/radar-effect";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    text: "Threat Detection",
    delay: 0.2,
  },
  {
    icon: <Cloud className="h-6 w-6 text-primary" />,
    text: "Cloud Defense",
    delay: 0.3,
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    text: "Encryption",
    delay: 0.4,
  },
  {
    icon: <Network className="h-6 w-6 text-primary" />,
    text: "Network Security",
    delay: 0.5,
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    text: "Incident Response",
    delay: 0.6,
  },
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    text: "Monitoring",
    delay: 0.7,
  },
  {
    icon: <Bug className="h-6 w-6 text-primary" />,
    text: "Vulnerability Scan",
    delay: 0.8,
  },
];

export function Capabilities() {
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

  // Header animations
  const headerOpacity = useTransform(contentProgress, [0, 0.15], [0, 1]);
  const headerScale = useTransform(contentProgress, [0, 0.15], [0.95, 1]);

  // Content animations
  const contentY = useTransform(contentProgress, [0.15, 0.4], [40, 0]);
  const contentOpacity = useTransform(contentProgress, [0.15, 0.35], [0, 1]);

  // Radar animations
  const radarScale = useTransform(contentProgress, [0.3, 0.6], [0.8, 1.1]);
  const radarOpacity = useTransform(contentProgress, [0.3, 0.5], [0, 1]);

  // Orb parallax
  const orb1Y = useTransform(sectionProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(sectionProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full overflow-hidden py-16 md:py-20"
      aria-label="Security Capabilities"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-0 h-96 w-96 rounded-full bg-primary/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          ref={contentRef}
          className="mb-12 flex flex-col items-center text-center"
          style={{
            opacity: headerOpacity,
            scale: headerScale,
          }}
        >
          <motion.span
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Advanced Capabilities
          </motion.span>

          <motion.h2
            className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Security At Every Layer
          </motion.h2>

          <motion.div
            className="mb-7 h-[3px] rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

          <motion.p
            className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our multi-layered approach detects, prevents, and responds to threats in real-time across your entire infrastructure.
          </motion.p>
        </motion.div>

        {/* Radar section with capabilities */}
        <motion.div
          className="relative flex min-h-[700px] items-center justify-center overflow-hidden"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Radar in center */}
          <motion.div
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              scale: radarScale,
              opacity: radarOpacity,
            }}
          >
            <Radar className="h-96 w-96" />
          </motion.div>

          {/* Capabilities in semicircle (top half) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Top row - 2 items */}
            <motion.div
              className="absolute top-[5%] flex w-full items-center justify-center gap-20 md:gap-32"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <CapabilityIcon icon={capabilities[5].icon} text={capabilities[5].text} delay={0.7} />
              <CapabilityIcon icon={capabilities[6].icon} text={capabilities[6].text} delay={0.8} />
            </motion.div>

            {/* Middle left - 1 item */}
            <motion.div
              className="absolute left-[5%] top-1/2 flex flex-col items-center justify-center gap-12 -translate-y-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <CapabilityIcon icon={capabilities[3].icon} text={capabilities[3].text} delay={0.5} />
            </motion.div>

            {/* Middle right - 1 item */}
            <motion.div
              className="absolute right-[5%] top-1/2 flex flex-col items-center justify-center gap-12 -translate-y-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <CapabilityIcon icon={capabilities[4].icon} text={capabilities[4].text} delay={0.6} />
            </motion.div>

            {/* Bottom row - 3 items */}
            <motion.div
              className="absolute bottom-[5%] flex w-full items-center justify-center gap-16 md:gap-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CapabilityIcon icon={capabilities[0].icon} text={capabilities[0].text} delay={0.2} />
              <CapabilityIcon icon={capabilities[1].icon} text={capabilities[1].text} delay={0.3} />
              <CapabilityIcon icon={capabilities[2].icon} text={capabilities[2].text} delay={0.4} />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom description */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              title: "Real-Time Detection",
              description:
                "AI-powered threat detection that identifies anomalies instantly across your infrastructure.",
            },
            {
              title: "Proactive Prevention",
              description:
                "Multi-layer defense strategies that stop threats before they impact your business.",
            },
            {
              title: "24/7 Response",
              description:
                "Expert incident response team ready to contain and remediate threats around the clock.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
