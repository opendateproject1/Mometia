'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { LazyImage } from '@/components/ui/lazy-image'
import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/navigation/Navbar'
import { blogs } from '@/lib/blog-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const ALL_CATEGORIES = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const filtered =
    activeCategory === 'All'
      ? blogs
      : blogs.filter((b) => b.category === activeCategory)

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen w-full bg-background">
        {/* Hero Header */}
        <div
          ref={headerRef}
          className="relative overflow-hidden pb-16 pt-36 md:pt-44"
        >
          {/* Background orbs */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary/[0.05] blur-[140px]"
            style={{ y: headerY }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-16 right-1/4 h-64 w-64 rounded-full bg-secondary/[0.04] blur-[120px]"
          />

          <motion.div
            className="relative mx-auto max-w-4xl px-6 text-center md:px-10"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="mb-8 flex justify-center"
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            <motion.span
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              Resources & Insights
            </motion.span>

            <motion.h1
              className="mt-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_EXPO }}
            >
              Security Knowledge Hub
            </motion.h1>

            <motion.div
              className="mx-auto mt-6 h-[3px] rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE_EXPO }}
            />

            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Expert insights on cybersecurity trends, best practices, and
              actionable strategies to protect your organization.
            </motion.p>

            {/* Category filter pills */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4, ease: EASE_EXPO }}
            >
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200',
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-primary',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Blog Grid */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <motion.div
            key={activeCategory}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {filtered.map((blog) => (
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

                  <h2 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {blog.title}
                  </h2>

                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
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

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.p
              className="mt-12 text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No articles found in this category.
            </motion.p>
          )}
        </section>
      </main>
    </>
  )
}
