import { Section } from "@/components/layout/Section";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPageData } from "@/data/about";

export function AboutProcessSection() {
  const { process } = aboutPageData;

  return (
    <Section>
      <SectionHeading
        eyebrow={process.eyebrow}
        title={process.title}
        description={process.description}
        align="center"
      />
      <div className="mt-12 grid gap-4 xl:grid-cols-5">
        {process.items.map((item, index) => (
          <ProcessStep
            key={item.title}
            index={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Section>
  );
}
