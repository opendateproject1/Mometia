import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type SignalPanelProps = {
  labels: string[];
  compact?: boolean;
  className?: string;
};

const nodes = [
  { top: "14%", left: "24%" },
  { top: "34%", left: "62%" },
  { top: "58%", left: "42%" },
  { top: "72%", left: "76%" },
];

const beams = [
  "left-[24%] top-[14%] h-px w-[40%] rotate-[18deg]",
  "left-[42%] top-[58%] h-px w-[34%] -rotate-[22deg]",
  "left-[26%] top-[16%] h-[45%] w-px rotate-[12deg]",
];

export function SignalPanel({ labels, compact = false, className }: SignalPanelProps) {
  return (
    <div
      className={cn(
        "section-shell signal-mask scanline relative overflow-hidden rounded-[2rem] p-6 sm:p-7",
        compact ? "min-h-[25rem]" : "min-h-[32rem]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-signal-grid bg-cover bg-center opacity-25 animate-pulsegrid" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl animate-breathe"
        aria-hidden
      />
      <div className="absolute inset-5 rounded-[1.5rem] border border-accent/12" aria-hidden />
      <div className="absolute left-10 top-10 h-px w-28 bg-gradient-to-r from-accent/0 via-accent/55 to-accent/0" aria-hidden />
      <div className="absolute bottom-10 right-10 h-px w-20 bg-gradient-to-r from-accent/0 via-accent/45 to-accent/0" aria-hidden />

      {beams.map((beam) => (
        <div key={beam} className={cn("absolute bg-gradient-to-r from-accent/0 via-accent/55 to-accent/0", beam)} aria-hidden />
      ))}

      {nodes.map((node) => (
        <div
          key={`${node.top}-${node.left}`}
          className="absolute h-3.5 w-3.5 rounded-full border border-accent/40 bg-accent shadow-[0_0_18px_rgba(104,175,190,0.28)]"
          style={{ top: node.top, left: node.left }}
          aria-hidden
        >
          <span className="absolute inset-[-0.45rem] rounded-full border border-accent/15" />
          <span className="absolute inset-[-0.9rem] rounded-full border border-accent/10" />
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-xs">
            <p className="text-xs uppercase tracking-[0.24em] text-accent/80">Risk Signal Map</p>
            <p className="mt-3 text-sm leading-7 text-muted">
              A simplified view of identity, monitoring, and recovery dependencies that shape operational risk.
            </p>
          </div>
          <div className="rounded-full border border-line/15 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted">
            Architecture View
          </div>
        </div>

        <div className="grid gap-3 sm:max-w-[19rem] sm:self-end">
          {labels.map((label) => (
            <Tag key={label} className="justify-center border-accent/20 bg-panel/75 text-ink">
              {label}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
