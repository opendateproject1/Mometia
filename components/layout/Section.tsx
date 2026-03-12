import { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  surface?: boolean;
  reveal?: boolean;
  revealDelay?: number;
};

export function Section({
  id,
  className,
  containerClassName,
  contentClassName,
  children,
  surface = false,
  reveal = true,
  revealDelay = 0,
}: SectionProps) {
  const content = reveal ? (
    <Reveal delay={revealDelay} className={contentClassName}>
      {children}
    </Reveal>
  ) : (
    <div className={contentClassName}>{children}</div>
  );

  return (
    <section id={id} className={cn("relative py-[4.75rem] sm:py-24 lg:py-28", className)}>
      <Container className={containerClassName}>
        {surface ? <div className="section-shell p-7 sm:p-10 lg:p-12">{content}</div> : content}
      </Container>
    </section>
  );
}
