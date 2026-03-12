import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3.5 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-accent/85",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent/75" aria-hidden />
      {children}
    </span>
  );
}
