"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: never;
}

interface ActionButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const VARIANTS = {
  default: `${BASE} bg-primary text-primary-foreground hover:bg-primary/90`,
  outline: `${BASE} border border-border/50 bg-background/60 text-foreground/80 backdrop-blur-sm hover:border-border hover:bg-background/80 dark:border-border/50 dark:bg-background/30 dark:hover:bg-background/50`,
};

const SPRING = { type: "spring", stiffness: 420, damping: 22 } as const;

export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...rest
}: ButtonProps) {
  const cls = `${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if ("href" in rest && rest.href) {
    return (
      <motion.a
        href={rest.href}
        className={cls}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={(rest as ActionButtonProps).onClick}
      className={cls}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
    >
      {children}
    </motion.button>
  );
}
