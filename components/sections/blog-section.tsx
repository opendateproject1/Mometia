'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { LazyImage } from '@/components/ui/lazy-image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { blogs } from '@/lib/blog-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const PREVIEW_BLOGS = blogs.slice(0, 3)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
}

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ['start center', 'end center'],
  })

  const headerOpacity = useTransform(contentProgress, [0, 0.15], [0, 1])
  const headerScale = useTransform(contentProgress, [0, 0.15], [0.95, 1])
  const gridY = useTransform(contentProgress, [0.1, 0.35], [50, 0])
  const gridOpacity = useTransform(contentProgress, [0.1, 0.3], [0, 1])
  const orb1Y = useTransform(sectionProgress, [0, 1], [0, -100])
  const orb2Y = useTransform(sectionProgress, [0, 1], [0, 100])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      aria-label="Blog Articles"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-40 h-96 w-96 rounded-full bg-primary/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-48 -left-48 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          ref={contentRef}
          className="mb-16 flex flex-col items-center text-center"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >

          <motion.h2
            className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Blogs
          </motion.h2>

          <motion.div
            className="mb-7 h-[3px] rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mb-12 h-px w-full border-b border-dashed" 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Blog Grid — 3 cards */}
        <motion.div
          style={{ opacity: gridOpacity, y: gridY }}
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {PREVIEW_BLOGS.map((blog) => (
            <motion.a
              key={blog.title}
              href={blog.slug}
              variants={cardVariants}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/[0.08]"
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <LazyImage
                  src={blog.image}
                  alt={blog.title}
                  ratio={16 / 9}
                  inView
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                  <span className="font-medium">{blog.author}</span>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span>{blog.createdAt}</span>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {blog.title}
                </h3>

                <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                  {blog.description}
                </p>

                <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* See More Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4, ease: EASE_EXPO }}
        >
          <Link href="/blog">
            <motion.span
              className="group inline-flex items-center gap-2.5 rounded-xl border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:text-primary hover:shadow-md hover:shadow-primary/[0.08]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See All Articles
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
