import { cn } from "@/lib/utils";

type TagProps = {
  children: string;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-line/15 bg-white/[0.02] px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent/30 hover:text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
