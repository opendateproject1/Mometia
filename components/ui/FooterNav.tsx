import Link from "next/link";

import { NavItem } from "@/data/site";

type FooterNavProps = {
  items: NavItem[];
};

export function FooterNav({ items }: FooterNavProps) {
  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-muted transition-colors duration-200 hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
