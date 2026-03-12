import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-[44rem]", centered && "mx-auto text-center", className)}>
      {eyebrow ? <Badge className={centered ? "justify-center" : undefined}>{eyebrow}</Badge> : null}
      <h2
        className={cn(
          "mt-6 max-w-[18ch] text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[2.8rem] lg:text-[3.2rem]",
          centered && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-[38rem] text-[1.02rem] leading-8 text-muted sm:text-[1.06rem]",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
