# Mometia Project Memory

## Project Overview
Cybersecurity & GRC consulting website. Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion.

## Stack & Config
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 — config is CSS-only (`app/globals.css` with `@import "tailwindcss"`, no `tailwind.config.ts`)
- **PostCSS**: `postcss.config.js` uses `@tailwindcss/postcss`
- **Animations**: framer-motion v11+
- **Fonts** (via `next/font/google`): Plus Jakarta Sans (`--font-sans`), Source Serif 4 (`--font-serif`), JetBrains Mono (`--font-mono`)
- **Path alias**: `@/*` → `./*` (set in tsconfig.json)

## Theme (color palette)
- Primary: green `oklch(0.6487 0.1538 150.3071)`
- Secondary: blue/purple `oklch(0.6746 0.1414 261.3380)`
- Accent: cyan `oklch(0.8269 0.1080 211.9627)`
- Light bg: `oklch(0.9824 0.0013 286.3757)`, Dark bg: `oklch(0.2303 0.0125 264.2926)`
- Radius: `0.5rem`
- Shadows defined as CSS vars `--shadow-2xs` through `--shadow-2xl`

## Key Files
- `app/globals.css` — full theme + `@import "tailwindcss"`
- `app/layout.tsx` — Google Fonts + globals.css import + ThemeProvider wrapper
- `app/page.tsx` — main page (uses FloatingNavbar)
- `components/unlumen-ui/floating-navbar.tsx` — FloatingNavbar component (built from scratch, matches unlumen-ui API)
- `components/ui/theme-provider.tsx` — next-themes ThemeProvider re-export

## Navbar Design Patterns
- API: `<FloatingNavbar logo={ReactNode} links={NavLink[]} cta={{ label, href }} />`
- NavLink type: `{ label, href, children?: { label, href, description? }[] }`
- Scroll-morphing: full-width docked → floating pill (animates width, marginTop, borderRadius, padding)
- Glass bg: absolute overlay div with `backdrop-blur`, animated opacity 0→1 on scroll
- Top gradient scrim: visible only at top of page
- Desktop links: hover bg via conditional class, ChevronIcon rotates for dropdown links
- Dropdown: AnimatePresence, scale+opacity+y animation, glass card style, connector bridge span
- CTA button: shimmer sweep + glow ring on hover + arrow icon
- Theme toggle: AnimatePresence mode="wait" swapping Sun/Moon SVG icons with rotate+scale animation; `mounted` guard prevents hydration mismatch
- Hamburger: 3 spans → X (middle fades/scales, outer two rotate) via spring physics
- Mobile menu: `clipPath` curtain + staggered items with blur filter; children accordion via height animation
- Dark mode: next-themes with `attribute="class"` → toggles `.dark` class on `<html>`; `suppressHydrationWarning` on html element

## User Preferences
- Heavy Framer Motion usage preferred for all interactive elements
- "Insanely stylish" design bar — use glassmorphism, shimmer, spring physics
- No emojis in code/responses
