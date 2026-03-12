import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePageData } from "@/data/home";

export function RiskRealitySection() {
  const { riskReality } = homePageData;

  return (
    <Section surface>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="max-w-xl">
          <SectionHeading eyebrow={riskReality.eyebrow} title={riskReality.intro} />
          <p className="mt-6 text-base leading-7 text-muted">{riskReality.closing}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {riskReality.items.map((item, index) => (
            <article
              key={item}
              className="panel-surface-soft group relative flex items-center gap-4 rounded-[1.5rem] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-panel/78 hover:shadow-[0_18px_34px_rgba(3,8,14,0.18)] sm:px-6 sm:py-6"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/38 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100 sm:inset-x-6" />
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-sm font-semibold tracking-[0.16em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">{item}</h3>
                <p className="mt-1 max-w-[28ch] text-sm leading-7 text-muted">
                  Frequent precursor to larger operational disruption.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
