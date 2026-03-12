import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { FooterNav } from "@/components/ui/FooterNav";
import { footerMarkers, footerNavigation, siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10 pt-16 pb-10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="max-w-xl">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line/15 bg-panelSoft/80 text-lg font-semibold tracking-[-0.04em] text-ink">
                M
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-ink">{siteConfig.name}</span>
            </Link>
            <p className="mt-5 text-base leading-7 text-muted">
              Strategic cybersecurity advisory focused on governance, operational continuity, and measured risk reduction.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink">Navigation</p>
              <div className="mt-4">
                <FooterNav items={footerNavigation} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink">Engagement Markers</p>
              <ul className="mt-4 space-y-4">
                {footerMarkers.map((marker) => (
                  <li key={marker.label}>
                    <p className="text-sm font-medium text-ink">{marker.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{marker.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} MOMENTIA IO. Confidential advisory positioning for modern operating environments.</p>
          <Link href="/contact" className="transition-colors duration-200 hover:text-ink">
            {siteConfig.ctaLabel}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
