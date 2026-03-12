import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        panelSoft: "rgb(var(--panel-soft) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accent-soft) / <alpha-value>)",
      },
      boxShadow: {
        ambient: "0 12px 40px rgba(3, 8, 14, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "signal-grid": "url('/patterns/signal-grid.svg')",
        noise: "url('/patterns/noise.svg')",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out both",
        pulsegrid: "pulsegrid 12s ease-in-out infinite",
        breathe: "breathe 14s ease-in-out infinite",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulsegrid: {
          "0%, 100%": { opacity: "0.16" },
          "50%": { opacity: "0.3" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.05)", opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
