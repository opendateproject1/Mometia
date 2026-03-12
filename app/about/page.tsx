import type { Metadata } from "next";

import { AboutCTASection } from "@/components/sections/about/AboutCTASection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutProcessSection } from "@/components/sections/about/AboutProcessSection";
import { PhilosophySection } from "@/components/sections/about/PhilosophySection";
import { WhyEngageSection } from "@/components/sections/about/WhyEngageSection";
import { aboutPageData } from "@/data/about";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: aboutPageData.hero.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: aboutPageData.hero.description,
    url: absoluteUrl("/about"),
    images: [absoluteUrl("/images/og-card.svg")],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <PhilosophySection />
      <AboutProcessSection />
      <WhyEngageSection />
      <AboutCTASection />
    </>
  );
}
