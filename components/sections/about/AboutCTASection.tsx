import { Section } from "@/components/layout/Section";
import { CTABlock } from "@/components/ui/CTABlock";
import { aboutPageData } from "@/data/about";

export function AboutCTASection() {
  return (
    <Section className="pt-8">
      <CTABlock {...aboutPageData.cta} />
    </Section>
  );
}
