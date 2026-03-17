"use client"

import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { motion } from "framer-motion"
import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
  variant?: "light" | "dark"
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
  variant = "light"
}: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ["start center", "end center"],
  })

  const headerOpacity = useTransform(contentProgress, [0, 0.15], [0, 1])
  const headerScale = useTransform(contentProgress, [0, 0.15], [0.95, 1])

  const carouselY = useTransform(contentProgress, [0.1, 0.4], [50, 0])
  const carouselOpacity = useTransform(contentProgress, [0.1, 0.35], [0, 1])

  const orb1Y = useTransform(sectionProgress, [0, 1], [0, -100])
  const orb2Y = useTransform(sectionProgress, [0, 1], [0, 100])

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden py-16 md:py-20",
        variant === "dark" ? "bg-gradient-to-b from-background via-background/95 to-background" : "",
        className
      )}
      aria-label="Testimonials and Commitments"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 right-1/4 h-96 w-96 rounded-full bg-accent/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-48 -left-48 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          ref={contentRef}
          className="mb-16 flex flex-col items-center text-center"
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
            Client Testimonials
          </motion.span>

          <motion.h2
            className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
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
            {description}
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          style={{
            opacity: carouselOpacity,
            y: carouselY,
          }}
          className="relative flex w-full flex-col items-center justify-center overflow-hidden"
        >
          {/* Marquee container */}
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:110s] w-full">
            <motion.div
              className="flex shrink-0 [gap:var(--gap)] flex-row"
              style={{
                animation: "marquee var(--duration) linear infinite",
                width: "max-content"
              }}
              onMouseEnter={(e) => {
                const element = e.currentTarget
                element.style.animationPlayState = "paused"
              }}
              onMouseLeave={(e) => {
                const element = e.currentTarget
                element.style.animationPlayState = "running"
              }}
            >
              {[...Array(6)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background via-transparent to-transparent sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background via-transparent to-transparent sm:block" />
        </motion.div>
      </div>
    </section>
  )
}
