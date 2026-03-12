import { Section } from "@/components/layout/Section";
import { CTABlock } from "@/components/ui/CTABlock";
import { servicesPageData } from "@/data/services";

export function ServicesCTASection() {
  return (
    <Section className="pt-8">
      <CTABlock {...servicesPageData.cta} />
    </Section>
  );
}
