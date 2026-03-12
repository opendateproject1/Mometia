import { Section } from "@/components/layout/Section";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePageData } from "@/data/home";

const industryIcons = {
  Healthcare: (
    <svg viewBox="0 0 24 24" className="h-[1.125rem] w-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  ),
  Legal: (
    <svg viewBox="0 0 24 24" className="h-[1.125rem] w-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v14" />
      <path d="M7 8h10" />
      <path d="M8 18h8" />
    </svg>
  ),
  "Financial Services": (
    <svg viewBox="0 0 24 24" className="h-[1.125rem] w-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 9l8-5 8 5" />
      <path d="M6 10v7" />
      <path d="M12 10v7" />
      <path d="M18 10v7" />
      <path d="M4 19h16" />
    </svg>
  ),
  "Real Estate": (
    <svg viewBox="0 0 24 24" className="h-[1.125rem] w-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 20V7l7-3v16" />
      <path d="M12 20V10l7-2v12" />
    </svg>
  ),
  "Professional Services": (
    <svg viewBox="0 0 24 24" className="h-[1.125rem] w-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 20v-9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
    </svg>
  ),
} as const;

export function IndustriesSection() {
  const { industries } = homePageData;

  return (
    <Section surface>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
        <div className="max-w-xl">
          <SectionHeading eyebrow={industries.eyebrow} title={industries.title} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.items.map((industry) => (
            <Pill
              key={industry.name}
              icon={industryIcons[industry.name as keyof typeof industryIcons]}
              title={industry.name}
              description={industry.descriptor}
              className="h-full min-h-[10.75rem] border-line/12 bg-panel/72"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
