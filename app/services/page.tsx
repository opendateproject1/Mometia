import type { Metadata } from "next";

import { CloudSecuritySection } from "@/components/sections/services/CloudSecuritySection";
import { GRCSection } from "@/components/sections/services/GRCSection";
import { RansomwareSection } from "@/components/sections/services/RansomwareSection";
import { ServicesAnchorNav } from "@/components/sections/services/ServicesAnchorNav";
import { ServicesCTASection } from "@/components/sections/services/ServicesCTASection";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { siteConfig } from "@/data/site";
import { servicesPageData } from "@/data/services";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cybersecurity Services",
  description: servicesPageData.hero.description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Cybersecurity Services | ${siteConfig.name}`,
    description: servicesPageData.hero.description,
    url: absoluteUrl("/services"),
    images: [absoluteUrl("/images/og-card.svg")],
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesAnchorNav />
      <GRCSection />
      <CloudSecuritySection />
      <RansomwareSection />
      <ServicesCTASection />
    </>
  );
}
