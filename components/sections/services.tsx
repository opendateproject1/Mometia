'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { Shield } from 'lucide-react';
import ElegantCarousel from '@/components/ui/elegant-carousel';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ['start center', 'end center'],
  });

  const headerOpacity = useTransform(contentProgress, [0, 0.15], [0, 1]);
  const headerScale = useTransform(contentProgress, [0, 0.15], [0.95, 1]);

  const carouselY = useTransform(contentProgress, [0.1, 0.4], [50, 0]);
  const carouselOpacity = useTransform(contentProgress, [0.1, 0.35], [0, 1]);

  const orb1Y = useTransform(sectionProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(sectionProgress, [0, 1], [0, 100]);

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
            <Shield className="h-3.5 w-3.5" aria-hidden />
            Our Services
          </motion.span>

          <motion.h2
            className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            End-to-End Cyber Protection
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
            From cloud security to compliance and offensive testing, we deliver
            comprehensive protection tailored to your organization's unique risk
            profile.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
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
