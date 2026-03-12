import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { contactPageData } from "@/data/contact";

export function ContactHero() {
  const { hero } = contactPageData;

  return (
    <Section className="pt-10 sm:pt-14 lg:pt-20" reveal={false}>
      <div className="max-w-4xl">
        <Badge>{hero.eyebrow}</Badge>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl lg:text-[4.25rem]">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{hero.description}</p>
      </div>
    </Section>
  );
}
