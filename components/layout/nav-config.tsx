import type { ReactNode } from "react";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    href: "#services",
    children: [
      {
        label: "Cloud Security",
        href: "#cloud-security",
        description: "Secure your cloud infrastructure end-to-end.",
      },
      {
        label: "GRC & Compliance",
        href: "#grc",
        description: "Navigate SOC 2, ISO 27001, HIPAA, and more.",
      },
      {
        label: "Ransomware Defense",
        href: "#ransomware",
        description: "Protect against and respond to ransomware threats.",
      },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const NAV_CTA = { label: "Book a Call", href: "#contact" };

export const NavLogo: ReactNode = (
  <div className="flex items-center gap-2.5">
    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      M
    </div>
    <span
      className="font-sans font-bold text-[17px] tracking-tight"
      style={{ color: "var(--foreground)" }}
    >
      Mometia
    </span>
  </div>
);
