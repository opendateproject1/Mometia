import { Section } from "@/components/layout/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePageData } from "@/data/home";

export function CapabilitiesSection() {
  const { capabilities } = homePageData;

  return (
    <Section>
      <SectionHeading
        eyebrow={capabilities.eyebrow}
        title={capabilities.title}
        description={capabilities.description}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {capabilities.items.map((item) => (
          <InfoCard
            key={item.title}
            label={item.number}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Section>
  );
}
