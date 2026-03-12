export type NavItem = {
  label: string;
  href: string;
};

export type ContactMarker = {
  label: string;
  detail: string;
};

export const siteConfig = {
  name: "MOMENTIA IO",
  shortName: "Momentia",
  title: "MOMENTIA IO | Strategic Cybersecurity Advisory",
  description:
    "Precision cybersecurity consulting focused on governance, cloud exposure, resilience planning, and measurable enterprise risk reduction.",
  url: "https://momentia.io",
  ctaLabel: "Request a Confidential Consultation",
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation: NavItem[] = [...primaryNavigation];

export const footerMarkers: ContactMarker[] = [
  {
    label: "Focus",
    detail: "Governance, cloud exposure, resilience",
  },
  {
    label: "Engagement Model",
    detail: "Confidential advisory for decisive organizations",
  },
  {
    label: "Response",
    detail: "Normal business timeframe",
  },
];
