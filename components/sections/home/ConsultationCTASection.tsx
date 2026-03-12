import { Section } from "@/components/layout/Section";
import { CTABlock } from "@/components/ui/CTABlock";
import { homePageData } from "@/data/home";

export function ConsultationCTASection() {
  return (
    <Section className="pt-8">
      <CTABlock {...homePageData.cta} />
    </Section>
  );
}
