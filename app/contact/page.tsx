import type { Metadata } from "next";

import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { contactPageData } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPageData.hero.description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: contactPageData.hero.description,
    url: absoluteUrl("/contact"),
    images: [absoluteUrl("/images/og-card.svg")],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
