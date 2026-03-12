import { Section } from "@/components/layout/Section";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePageData } from "@/data/home";

import { cn } from "@/lib/utils";

export function ProcessSection() {
  const { process } = homePageData;

  return (
    <Section surface>
      <SectionHeading
        eyebrow={process.eyebrow}
        title={process.title}
        description={process.description}
        align="center"
      />
      <div className="relative mt-14">
        <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block" />
        <div className="absolute left-[9%] right-[9%] top-[1.72rem] hidden lg:flex lg:items-center lg:justify-between" aria-hidden>
          {process.items.map((item) => (
            <span
              key={item.title}
              className="h-2.5 w-2.5 rounded-full border border-accent/30 bg-accent/80 shadow-[0_0_12px_rgba(104,175,190,0.22)]"
            />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          {process.items.map((item, index) => (
            <ProcessStep
              key={item.title}
              index={index}
              title={item.title}
              description={item.description}
              className={cn(index % 2 === 1 && "lg:mt-10", index === process.items.length - 1 && "lg:mt-5")}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
