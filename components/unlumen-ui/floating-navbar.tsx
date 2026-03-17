"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChildLink {
  label: string;
  href: string;
  description?: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: ChildLink[];
}

interface CTAConfig {
  label: string;
  href: string;
}

interface FloatingNavbarProps {
  logo: ReactNode;
  links: NavLink[];
  cta?: CTAConfig;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: EASE_EXPO }}
    >
      <path d="m6 9 6 6 6-6" />
    </motion.svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      className={[
        "relative flex items-center justify-center rounded-full overflow-hidden",
        "transition-colors duration-200",
        compact
          ? "w-12 h-12 text-foreground/60 hover:text-foreground hover:bg-muted/60"
          : "w-9 h-9 text-muted-foreground hover:text-foreground",
      ].join(" ")}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92, rotate: 15 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      {/* Hover bg ring */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100"
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--muted) 50%, transparent)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Icon swap */}
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            className="relative"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.22, ease: EASE_EXPO }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        ) : (
          // Skeleton to avoid layout shift before mount
          <span className="w-4 h-4 rounded-full bg-muted animate-pulse" />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Dropdown menu ────────────────────────────────────────────────────────────

function Dropdown({ items }: { items: ChildLink[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.22, ease: EASE_EXPO }}
      className="absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-56 overflow-hidden rounded-2xl p-1.5"
      style={{
        translateX: "-50%",
        backgroundColor:
          "color-mix(in oklab, var(--card) 88%, transparent)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 8px 32px -4px hsl(0 0% 0% / 0.14), 0 0 0 1px color-mix(in oklab, var(--border) 70%, transparent)",
      }}
    >
      {/* Connector bridge so cursor can travel from link to dropdown */}
      <span className="absolute -top-3 left-0 right-0 h-3" />

      {items.map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.2, ease: EASE_EXPO }}
        >
          <Link
            href={item.href}
            className="group flex flex-col gap-0.5 rounded-xl px-3.5 py-2.5 transition-colors duration-150 hover:bg-muted/60"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
              {item.label}
            </span>
            {item.description && (
              <span className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </span>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FloatingNavbar({ logo, links, cta }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 72));

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      {/* ── Fixed outer shell ── */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            width: scrolled ? "min(900px, 92vw)" : "100%",
            marginTop: scrolled ? 12 : 0,
            borderRadius: scrolled ? 9999 : 0,
            paddingLeft: scrolled ? 20 : 40,
            paddingRight: scrolled ? 20 : 40,
          }}
          transition={{
            y: { duration: 0.7, ease: EASE_EXPO, delay: 0.1 },
            opacity: { duration: 0.5, delay: 0.1 },
            width: { duration: 0.55, ease: EASE_EXPO },
            marginTop: { duration: 0.55, ease: EASE_EXPO },
            borderRadius: { duration: 0.55, ease: EASE_EXPO },
            paddingLeft: { duration: 0.55, ease: EASE_EXPO },
            paddingRight: { duration: 0.55, ease: EASE_EXPO },
          }}
          className="relative flex items-center justify-between py-3 pointer-events-auto"
        >
          {/* Glass background */}
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[inherit]"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--card) 82%, transparent)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:
                "0 4px 32px -4px hsl(0 0% 0% / 0.12), 0 0 0 1px color-mix(in oklab, var(--border) 60%, transparent)",
            }}
          />
          {/* Top-of-page gradient scrim */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, transparent 100%)",
            }}
          />

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_EXPO }}
            className="relative z-10 flex-shrink-0"
          >
            <Link href="/" aria-label="Home" className="block">
              {logo}
            </Link>
          </motion.div>

          {/* ── Desktop nav links ── */}
          <div className="relative z-10 hidden md:flex items-center gap-0.5">
            {links.map((link, i) => {
              const hasChildren = !!link.children?.length;
              const isOpen = openDropdown === link.label;

              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.28 + i * 0.06,
                    ease: EASE_EXPO,
                  }}
                  className="relative"
                  onMouseEnter={() =>
                    hasChildren ? handleDropdownEnter(link.label) : undefined
                  }
                  onMouseLeave={() =>
                    hasChildren ? handleDropdownLeave() : undefined
                  }
                >
                  <Link
                    href={hasChildren ? "#" : link.href}
                    onClick={(e) => hasChildren && e.preventDefault()}
                    className={[
                      "relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium",
                      "transition-colors duration-150",
                      isOpen
                        ? "text-foreground bg-muted/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    ].join(" ")}
                  >
                    {link.label}
                    {hasChildren && <ChevronIcon open={isOpen} />}
                  </Link>

                  {/* Dropdown */}
                  {hasChildren && (
                    <AnimatePresence>
                      {isOpen && (
                        <Dropdown items={link.children!} />
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ── Right side: theme toggle + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.46, ease: EASE_EXPO }}
            className="relative z-10 hidden md:flex items-center gap-2"
          >
            <ThemeToggle />

            {cta && (
              <motion.a
                href={cta.href}
                className="relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full overflow-hidden"
                style={{
                  color: "var(--primary-foreground)",
                  backgroundColor: "var(--primary)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%)",
                    translateX: "-120%",
                  }}
                  whileHover={{ translateX: "120%" }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
                {/* Outer glow ring on hover */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    boxShadow:
                      "0 0 0 3px color-mix(in oklab, var(--primary) 38%, transparent)",
                  }}
                />
                <span className="relative">{cta.label}</span>
                <motion.span
                  className="relative"
                  initial={{ x: 0 }}
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                >
                  <ArrowIcon />
                </motion.span>
              </motion.a>
            )}
          </motion.div>

          {/* ── Mobile: theme toggle + hamburger ── */}
          <div className="relative z-10 md:hidden flex items-center gap-1">
            <ThemeToggle />

            <motion.button
              className="flex flex-col items-center justify-center gap-[5px] w-10 h-10"
              onClick={() => setMobileOpen((o) => !o)}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[2px] rounded-full origin-center"
                  style={{ backgroundColor: "var(--foreground)" }}
                  animate={
                    mobileOpen
                      ? i === 0
                        ? { rotate: 45, y: 7, width: 22 }
                        : i === 1
                          ? { opacity: 0, scaleX: 0 }
                          : { rotate: -45, y: -7, width: 22 }
                      : {
                          rotate: 0,
                          y: 0,
                          opacity: 1,
                          scaleX: 1,
                          width: i === 1 ? 14 : 22,
                        }
                  }
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                />
              ))}
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            style={{ backgroundColor: "var(--background)" }}
          >
            {/* Radial glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 45% at 50% 45%, color-mix(in oklab, var(--primary) 7%, transparent), transparent)",
              }}
            />

            {/* Link list (centered vertically) */}
            <nav className="relative flex flex-col justify-center flex-1 px-8 gap-1 overflow-y-auto pt-20">
              {links.map((link, i) => {
                const hasChildren = !!link.children?.length;
                const isExpanded = expandedMobileLink === link.label;

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    transition={{
                      delay: i * 0.055 + 0.08,
                      duration: 0.42,
                      ease: EASE_EXPO,
                    }}
                  >
                    {hasChildren ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full py-3 text-left"
                          onClick={() =>
                            setExpandedMobileLink(isExpanded ? null : link.label)
                          }
                        >
                          <motion.span
                            className="text-3xl font-bold tracking-tight"
                            style={{ color: "var(--foreground)" }}
                            animate={{ color: isExpanded ? "var(--primary)" : "var(--foreground)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.label}
                          </motion.span>
                          <ChevronIcon open={isExpanded} />
                        </button>

                        {/* Children accordion */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE_EXPO }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-0 pb-3 pl-2">
                                {link.children!.map((child, ci) => (
                                  <motion.div
                                    key={child.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: ci * 0.05, duration: 0.25 }}
                                  >
                                    <Link
                                      href={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex flex-col py-2.5 px-3 rounded-xl hover:bg-muted/40 transition-colors"
                                    >
                                      <span className="text-base font-semibold text-foreground">
                                        {child.label}
                                      </span>
                                      {child.description && (
                                        <span className="text-sm text-muted-foreground">
                                          {child.description}
                                        </span>
                                      )}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-3 py-3"
                      >
                        <motion.span
                          className="text-3xl font-bold tracking-tight"
                          style={{ color: "var(--foreground)" }}
                          whileHover={{ x: 6, color: "var(--primary)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              {cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: links.length * 0.055 + 0.18,
                    duration: 0.4,
                    ease: EASE_EXPO,
                  }}
                  className="pt-4"
                >
                  <motion.a
                    href={cta.href}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-full"
                    style={{
                      color: "var(--primary-foreground)",
                      backgroundColor: "var(--primary)",
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  >
                    {cta.label}
                  </motion.a>
                </motion.div>
              )}
            </nav>

            {/* Footer tagline */}
            <motion.p
              className="relative pb-10 text-center text-xs tracking-widest uppercase"
              style={{ color: "var(--muted-foreground)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
            >
              Cybersecurity &amp; GRC Consulting
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
