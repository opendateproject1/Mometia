import { cn } from "@/lib/utils";

type ProcessStepProps = {
  index: number;
  title: string;
  description: string;
  className?: string;
};

export function ProcessStep({ index, title, description, className }: ProcessStepProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={cn("panel-surface relative h-full rounded-[1.5rem] px-6 py-7", className)}>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/24 bg-accent/10 text-sm font-semibold tracking-[0.16em] text-accent">
          {number}
        </span>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-accent/78">Step {number}</p>
          <h3 className="mt-3 text-lg font-semibold tracking-[-0.025em] text-ink">{title}</h3>
        </div>
      </div>
      <p className="mt-6 max-w-[28ch] text-sm leading-7 text-muted">{description}</p>
    </article>
  );
}
