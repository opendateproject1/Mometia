'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { Shield, Cloud, Lock, FileSearch, Users, Zap } from 'lucide-react';
import ElegantCarousel from '@/components/ui/elegant-carousel';
import { GridCard } from '@/components/ui/grid-card';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// Main service offerings for the grid section
const MAIN_SERVICES = [
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Governance, Risk & Compliance",
    subtitle: "GRC",
    description: "Build sustainable security governance aligned with industry frameworks like ISO 27001, SOC 2, and NIST CSF.",
    highlights: ["Security framework assessments", "Risk register development", "Audit readiness support", "Policy development"],
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "Cloud Security",
    subtitle: "Cloud Defense",
    description: "Evaluate cloud environments to identify configuration weaknesses, identity risks, and monitoring gaps.",
    highlights: ["Identity and access reviews", "Misconfiguration assessments", "CSPM findings analysis", "Security baselines"],
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Ransomware Readiness",
    subtitle: "Threat Defense",
    description: "Preparation determines survivability. Build defensive architecture that withstands ransomware attacks.",
    highlights: ["Attack surface reduction", "Endpoint monitoring", "Privilege analysis", "Recovery validation"],
  },
  {
    icon: <FileSearch className="h-8 w-8 text-primary" />,
    title: "Security Assessments",
    subtitle: "Risk Evaluation",
    description: "Comprehensive security evaluations translated into clear business risk insights and remediation priorities.",
    highlights: ["Vulnerability assessments", "Penetration testing", "Risk analysis", "Remediation planning"],
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Identity & Access Management",
    subtitle: "IAM",
    description: "Strengthen identity governance and reduce exposure across Microsoft 365 and cloud environments.",
    highlights: ["Identity governance", "Access controls", "Privilege management", "Authentication systems"],
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Incident Response",
    subtitle: "Crisis Management",
    description: "Expert-led containment and recovery from security incidents with 24/7 availability when it matters most.",
    highlights: ["Incident containment", "Forensic analysis", "Recovery procedures", "Post-incident analysis"],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start center', 'end center'],
  });

  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ['start center', 'end center'],
  });

  const { scrollYProgress: outcomesProgress } = useScroll({
    target: outcomesRef,
    offset: ['start center', 'end center'],
  });

  const { scrollYProgress: carouselProgress } = useScroll({
    target: carouselRef,
    offset: ['start center', 'end center'],
  });

  // Main header animations with bidirectional smoothness
  const mainHeaderOpacity = useTransform(headerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const mainHeaderScale = useTransform(headerProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  // Grid section animations with bidirectional smoothness
  const gridY = useTransform(gridProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -30]);
  const gridOpacity = useTransform(gridProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Outcomes section animations with bidirectional smoothness
  const outcomesHeaderOpacity = useTransform(outcomesProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const outcomesHeaderScale = useTransform(outcomesProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  // Carousel section animations with bidirectional smoothness
  const carouselY = useTransform(carouselProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -40]);
  const carouselOpacity = useTransform(carouselProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);

  // Orb parallax with improved smoothness
  const orb1Y = useTransform(sectionProgress, [0, 0.5, 1], [0, -80, -160]);
  const orb2Y = useTransform(sectionProgress, [0, 0.5, 1], [0, 80, 160]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden py-16 md:py-20"
      aria-label="Security Services"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-0 h-96 w-96 rounded-full bg-primary/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-48 bottom-0 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Main Section Header */}
        <motion.div
          ref={headerRef}
          className="mb-12 flex flex-col items-center text-center"
          style={{
            opacity: mainHeaderOpacity,
            scale: mainHeaderScale,
          }}
        >

        </motion.div>

        {/* Services Grid Section */}
        <motion.div
          ref={gridRef}
          className="mb-20"
          style={{
            opacity: gridOpacity,
            y: gridY,
          }}
        >
          {/* Services Grid Header */}
          <motion.div
            className="mb-12 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span
              className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Services
            </motion.span>

            <motion.h3
              className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Services
            </motion.h3>

            <motion.div
              className="mb-3 h-[2px] rounded-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_EXPO }}
            />
          </motion.div>

          {/* Services Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MAIN_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_EXPO }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <GridCard className="h-full">
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title and subtitle */}
                    <div className="mb-3">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <span className="text-sm font-medium uppercase tracking-wider text-primary/70">
                        {service.subtitle}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1">
                      {service.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                          <span className="text-xs text-muted-foreground/80">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GridCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Divider */}
        <motion.div
          className="mb-16 flex items-center justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* What We Help Organizations Do Section */}
        <motion.div
          ref={outcomesRef}
          className="mb-12 flex flex-col items-center text-center"
          style={{
            opacity: outcomesHeaderOpacity,
            scale: outcomesHeaderScale,
          }}
        >
          <motion.span
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Shield className="h-3.5 w-3.5" aria-hidden />
            Outcomes
          </motion.span>

          <motion.h3
            className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What We Help Organizations Do
          </motion.h3>

          <motion.div
            className="mb-7 h-[2px] rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

        </motion.div>

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
          style={{
            opacity: carouselOpacity,
            y: carouselY,
          }}
        >
          <ElegantCarousel />
        </motion.div>
      </div>
    </section>
  );
}
