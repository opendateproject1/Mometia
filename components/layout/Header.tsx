"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { primaryNavigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/10 bg-canvas/80 backdrop-blur-xl">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label={siteConfig.name}>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line/15 bg-panelSoft/90 text-lg font-semibold tracking-[-0.04em] text-ink">
              M
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink">{siteConfig.name}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Strategic Cybersecurity Advisory</p>
            </div>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {primaryNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    active ? "bg-accent/10 text-ink" : "text-muted hover:bg-white/[0.04] hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" variant="secondary">
              {siteConfig.ctaLabel}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line/15 bg-panel/70 text-ink lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className={cn("h-px w-5 bg-current transition-transform", menuOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("h-px w-5 bg-current transition-opacity", menuOpen && "opacity-0")} />
              <span className={cn("h-px w-5 bg-current transition-transform", menuOpen && "-translate-y-[7px] -rotate-45")} />
            </div>
          </button>
        </div>

        {menuOpen ? (
          <div id="mobile-navigation" className="panel-surface mt-4 rounded-[1.5rem] p-4 lg:hidden">
            <nav aria-label="Mobile navigation">
              <ul className="space-y-2">
                {primaryNavigation.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-sm",
                          active ? "bg-accent/10 text-ink" : "text-muted hover:bg-white/[0.04] hover:text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Button href="/contact" className="mt-4 w-full">
              {siteConfig.ctaLabel}
            </Button>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
