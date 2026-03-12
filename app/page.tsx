import { ConsultationCTASection } from "@/components/sections/home/ConsultationCTASection";
import { CapabilitiesSection } from "@/components/sections/home/CapabilitiesSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { OutcomesSection } from "@/components/sections/home/OutcomesSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { RiskRealitySection } from "@/components/sections/home/RiskRealitySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RiskRealitySection />
      <CapabilitiesSection />
      <OutcomesSection />
      <IndustriesSection />
      <ProcessSection />
      <ConsultationCTASection />
    </>
  );
}
