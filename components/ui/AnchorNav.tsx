import Link from "next/link";

import { cn } from "@/lib/utils";

type AnchorNavItem = {
  label: string;
  href: string;
};

type AnchorNavProps = {
  items: AnchorNavItem[];
  className?: string;
};

export function AnchorNav({ items, className }: AnchorNavProps) {
  return (
    <nav
      aria-label="Service sections"
      className={cn(
        "panel-surface sticky top-[5.25rem] z-30 overflow-x-auto rounded-[1.5rem] px-2 py-2 backdrop-blur-xl sm:rounded-full",
        className,
      )}
    >
      <ul className="flex min-w-max items-center gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex rounded-full px-4 py-2 text-sm text-muted transition-colors duration-200 hover:bg-accent/10 hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
