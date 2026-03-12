import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type InfoCardProps = {
  title: string;
  description: string;
  label?: string;
  icon?: ReactNode;
  className?: string;
};

export function InfoCard({ title, description, label, icon, className }: InfoCardProps) {
  return (
    <article
      className={cn(
        "panel-surface group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/24 hover:bg-panelSoft/80 hover:shadow-[0_22px_48px_rgba(3,8,14,0.32)]",
        className,
      )}
    >
      <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        {label ? (
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-accent/90">
            {label}
          </span>
        ) : (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-line/15 bg-white/[0.02] text-accent">
            {icon}
          </span>
        )}
      </div>
      <h3 className="mt-8 text-[1.15rem] font-semibold tracking-[-0.025em] text-ink sm:text-xl">{title}</h3>
      <p className="mt-4 max-w-[30ch] text-sm leading-7 text-muted sm:text-[0.97rem]">{description}</p>
    </article>
  );
}
