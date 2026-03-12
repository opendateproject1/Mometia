import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SignalPanel } from "@/components/ui/SignalPanel";
import { homePageData } from "@/data/home";

export function HeroSection() {
  const { hero } = homePageData;

  return (
    <Section className="pt-12 sm:pt-16 lg:pt-24" reveal={false}>
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.94fr)] lg:items-center">
        <div className="absolute left-[6%] top-[-1.5rem] h-48 w-48 rounded-full bg-accent/10 blur-3xl animate-breathe" aria-hidden />
        <div className="absolute left-[12%] top-[13rem] hidden h-px w-28 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 lg:block" aria-hidden />
        <div className="relative max-w-[40rem]">
          <Badge>{hero.eyebrow}</Badge>
          <h1 className="headline-glow mt-8 max-w-[12ch] text-[3.8rem] font-semibold leading-[0.92] tracking-[-0.055em] text-ink sm:text-[5rem] lg:text-[6rem]">
            <span className="block">Precision Security</span>
            <span className="block text-gradient">for Decisive Organizations</span>
          </h1>
          <p className="mt-7 max-w-[35rem] text-[1.06rem] leading-8 text-muted sm:text-[1.16rem]">
            {hero.description}
          </p>
          <p className="mt-4 max-w-[34rem] text-sm leading-7 text-muted sm:text-[1rem]">{hero.supportingNote}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            {hero.actions.map((action) => (
              <Button
                key={action.href}
                href={action.href}
                variant={action.variant}
                className={action.variant === "secondary" ? "border-white/[0.08] bg-white/[0.02]" : undefined}
              >
                {action.label}
              </Button>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {hero.briefingCards.map((card) => (
              <Pill
                key={card.title}
                title={card.title}
                description={card.detail}
                className="h-full border-line/12 bg-panel/70 px-5 py-5"
              />
            ))}
          </div>
        </div>

        <SignalPanel className="lg:ml-4" labels={hero.signalLabels} />
      </div>
    </Section>
  );
}
