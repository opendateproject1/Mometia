import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
};

const variants = {
  primary:
    "border-accent/25 bg-accent text-canvas shadow-[0_14px_34px_rgba(56,102,117,0.24)] hover:-translate-y-0.5 hover:bg-accent/92 focus-visible:outline-accent",
  secondary:
    "border-line/20 bg-white/[0.03] text-ink hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.05] hover:text-white",
  ghost:
    "border-transparent bg-transparent text-muted hover:bg-white/[0.04] hover:text-ink",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-[0.95rem] font-medium tracking-[0.015em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link aria-label={ariaLabel} href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={ariaLabel} type={type} className={buttonClassName} disabled={disabled}>
      {children}
    </button>
  );
}
