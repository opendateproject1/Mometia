import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePageData } from "@/data/home";

export function OutcomesSection() {
  const { outcomes } = homePageData;

  return (
    <Section surface>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="max-w-xl">
          <SectionHeading
            eyebrow={outcomes.eyebrow}
            title={outcomes.title}
            description={outcomes.description}
          />
        </div>

        <div className="panel-surface rounded-[2rem] p-3">
          <div className="grid gap-px overflow-hidden rounded-[1.25rem] bg-line/10 md:grid-cols-2">
            {outcomes.items.map((item, index) => (
              <article
                key={item.title}
                className="group relative bg-panelSoft/78 px-5 py-5 transition-all duration-300 hover:bg-panel/88 sm:px-6 sm:py-6"
              >
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inset-x-6" />
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-sm font-semibold text-accent">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                </div>
                <p className="mt-3 pl-12 text-sm leading-7 text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
