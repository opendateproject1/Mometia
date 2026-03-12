import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type CTABlockProps = {
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
};

export function CTABlock({ title, description, action }: CTABlockProps) {
  return (
    <div className="section-shell signal-mask scanline relative px-6 py-10 shadow-ambient sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <div className="absolute inset-5 rounded-[1.5rem] border border-white/[0.04]" aria-hidden />
      <div className="absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl" aria-hidden />
      <div className="absolute right-0 top-0 h-px w-40 bg-gradient-to-r from-transparent via-accent/45 to-transparent" aria-hidden />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-3xl">
          <Badge>Confidential Consultation</Badge>
          <h2 className="mt-5 max-w-[16ch] text-3xl font-semibold leading-[1.03] tracking-[-0.04em] text-ink sm:text-4xl lg:text-[3rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-[38rem] text-[1.02rem] leading-8 text-muted">{description}</p>
        </div>
        <div className="flex items-center">
          <Button href={action.href} className="shadow-[0_16px_36px_rgba(56,102,117,0.22)]">
            {action.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
