import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SignalPanel } from "@/components/ui/SignalPanel";
import { servicesPageData } from "@/data/services";

export function ServicesHero() {
  const { hero } = servicesPageData;

  return (
    <Section className="pt-10 sm:pt-14 lg:pt-20" reveal={false}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-center">
        <div className="max-w-2xl">
          <Badge>{hero.eyebrow}</Badge>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{hero.description}</p>
          <div className="mt-8">
            <Button href="/contact">Request a Confidential Consultation</Button>
          </div>
        </div>

        <SignalPanel compact labels={hero.signalLabels} />
      </div>
    </Section>
  );
}
