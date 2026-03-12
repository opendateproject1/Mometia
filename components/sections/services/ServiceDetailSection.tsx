import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ServiceSectionData } from "@/data/services";

type ServiceDetailSectionProps = {
  section: ServiceSectionData;
};

export function ServiceDetailSection({ section }: ServiceDetailSectionProps) {
  return (
    <Section id={section.id} className="scroll-mt-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="max-w-xl">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.intro} />
        </div>

        <div className="panel-surface rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <article key={item} className="panel-surface-soft rounded-[1.5rem] px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                  <p className="text-sm leading-6 text-ink">{item}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 border-t border-line/10 pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{section.tagsLabel}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {section.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          {section.secondaryTags?.length ? (
            <div className="mt-6 border-t border-line/10 pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{section.secondaryLabel}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {section.secondaryTags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
