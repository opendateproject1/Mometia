import { Section } from "@/components/layout/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPageData } from "@/data/about";

export function PhilosophySection() {
  const { philosophy } = aboutPageData;

  return (
    <Section surface>
      <SectionHeading eyebrow={philosophy.eyebrow} title={philosophy.title} />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {philosophy.items.map((item, index) => (
          <InfoCard
            key={item.title}
            label={String(index + 1).padStart(2, "0")}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Section>
  );
}
