import { Section } from "@/components/layout/Section";
import { ConsultationForm } from "@/components/sections/contact/ConsultationForm";
import { Badge } from "@/components/ui/Badge";
import { contactPageData } from "@/data/contact";

export function ContactFormSection() {
  const { intro, trustNotes } = contactPageData;

  return (
    <Section surface>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="max-w-xl">
          <Badge>Confidential Advisory Intake</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-ink">{intro.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{intro.description}</p>

          <div className="mt-8 grid gap-4">
            {trustNotes.map((note, index) => (
              <article key={note.title} className="panel-surface-soft rounded-[1.5rem] px-5 py-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-sm font-semibold text-accent">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-ink">{note.title}</h3>
                </div>
                <p className="mt-3 pl-12 text-sm leading-6 text-muted">{note.description}</p>
              </article>
            ))}
          </div>
        </div>

        <ConsultationForm />
      </div>
    </Section>
  );
}
