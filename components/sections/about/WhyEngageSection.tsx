import { Section } from "@/components/layout/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPageData } from "@/data/about";

export function WhyEngageSection() {
  const { whyEngage } = aboutPageData;

  return (
    <Section surface>
      <SectionHeading eyebrow={whyEngage.eyebrow} title={whyEngage.title} />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {whyEngage.items.map((item, index) => (
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
