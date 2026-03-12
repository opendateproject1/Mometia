import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PillProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function Pill({ title, description, icon, className }: PillProps) {
  return (
    <div
      className={cn(
        "panel-surface-soft group relative rounded-[1.5rem] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/22 hover:bg-panel/78 hover:shadow-[0_18px_34px_rgba(3,8,14,0.22)] sm:px-6 sm:py-6",
        className,
      )}
    >
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/38 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-100 sm:inset-x-6" />
      <div className="absolute -right-8 top-0 h-20 w-20 rounded-full bg-accent/8 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start gap-4">
        {icon ? (
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent/18 bg-accent/8 text-accent">
            {icon}
          </span>
        ) : null}
        <div>
          <p className="text-sm font-semibold tracking-[0.01em] text-ink">{title}</p>
          {description ? <p className="mt-2 max-w-[30ch] text-sm leading-7 text-muted">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}
