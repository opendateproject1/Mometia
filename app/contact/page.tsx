'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  Clock,
  Lock,
} from 'lucide-react'
import Link from 'next/link'
import { FloatingNavbar } from '@/components/unlumen-ui/floating-navbar'
import { NAV_LINKS, NAV_CTA, NavLogo } from '@/components/layout/nav-config'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const SERVICES = [
  'Cloud Security',
  'GRC & Compliance',
  'Ransomware Defense',
  'Penetration Testing',
  'Incident Response',
  'Security Assessment',
  'Other',
]

const trustSignals = [
  { icon: Clock, title: '< 24h Response', desc: 'We reply to every inquiry within one business day' },
  { icon: Lock, title: 'Confidential', desc: 'All communications handled with strict discretion' },
  { icon: Shield, title: 'Expert Team', desc: 'Speak directly with certified security professionals' },
]

const faqs = [
  {
    q: 'How quickly can Mometia start an engagement?',
    a: 'Depending on scope, most engagements can be initiated within 1–2 weeks of a signed agreement.',
  },
  {
    q: 'Do you work with small and mid-sized businesses?',
    a: 'Yes — we tailor our services to organizations of all sizes, from startups to enterprise.',
  },
  {
    q: 'What information do you need to scope a penetration test?',
    a: 'A brief overview of your infrastructure, the systems in scope, and your compliance objectives is a great starting point.',
  },
  {
    q: 'Can Mometia assist with regulatory compliance?',
    a: 'Absolutely. We support SOC 2, ISO 27001, HIPAA, PCI-DSS, NIST, and sector-specific frameworks.',
  },
]

const inputBase =
  'w-full rounded-lg border border-border/60 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur-sm transition-all duration-200 focus:border-primary/60 focus:bg-card focus:ring-2 focus:ring-primary/10'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="border-b border-border/50 last:border-0"
      variants={itemVariants}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-0.5 shrink-0 text-primary"
        >
          <ArrowRight className="h-4 w-4 rotate-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_EXPO }}
            className="overflow-hidden pb-4 text-sm leading-relaxed text-muted-foreground"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <FloatingNavbar logo={NavLogo} links={NAV_LINKS} cta={NAV_CTA} />

      <main className="relative min-h-screen w-full bg-background">
        {/* Background orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-primary/[0.04] blur-[200px]" />
          <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[180px]" />
          <div className="absolute top-1/2 -left-32 h-64 w-64 rounded-full bg-accent/[0.03] blur-[140px]" />
        </div>

        {/* Hero */}
        <div className="relative pb-10 pt-36 md:pt-44">
          <motion.div
            className="mx-auto max-w-3xl px-6 text-center md:px-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8 flex justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            >
              <Shield className="h-3.5 w-3.5" />
              Contact Us
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Let's Talk Security
            </motion.h1>

            <motion.div
              className="mx-auto mt-6 h-[3px] rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
            />

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              Whether you need a full security assessment or just want to explore
              your options — we're here to help.
            </motion.p>
          </motion.div>
        </div>

        {/* Trust signals */}
        <motion.div
          className="relative mx-auto mb-16 max-w-5xl px-6 md:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {trustSignals.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/30 p-4 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main content */}
        <div className="relative mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            {/* Left — info + FAQ */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-foreground">Contact Details</h2>
                {[
                  { icon: Mail, label: 'Email', value: 'hello@mometia.com', href: 'mailto:hello@mometia.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
                  { icon: MapPin, label: 'Location', value: 'New York, NY', href: '#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="group flex items-center gap-4 rounded-xl border border-border/40 bg-card/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* FAQ */}
              <div>
                <h2 className="mb-2 text-xl font-bold text-foreground">Common Questions</h2>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                >
                  {faqs.map((faq) => (
                    <FAQ key={faq.q} {...faq} />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              className="relative rounded-2xl border border-border/50 bg-card/40 p-7 backdrop-blur-sm md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_EXPO }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center gap-5 py-20 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: EASE_EXPO }}
                  >
                    <motion.div
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                      Thank you for contacting Mometia. A member of our security
                      team will be in touch within one business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="relative flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fill in the form and we'll be in touch shortly.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                        <input required type="text" placeholder="Jane Smith" className={inputBase} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email *</label>
                        <input required type="email" placeholder="jane@company.com" className={inputBase} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</label>
                        <input type="text" placeholder="Acme Corp" className={inputBase} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" className={inputBase} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Interest</label>
                      <select className={inputBase}>
                        <option value="">Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us about your security needs or current challenges…"
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-muted-foreground">
                      By submitting, you agree to our{' '}
                      <span className="text-primary hover:underline underline-offset-4 cursor-pointer">
                        Privacy Policy
                      </span>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
