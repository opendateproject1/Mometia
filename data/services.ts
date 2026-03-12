export type ServiceSectionData = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: string[];
  tagsLabel: string;
  tags: string[];
  secondaryLabel?: string;
  secondaryTags?: string[];
};

export const servicesPageData = {
  hero: {
    eyebrow: "Cybersecurity Services",
    title: "Cybersecurity Services",
    description:
      "Governance, cloud risk reduction, and resilience planning structured around operational continuity and measurable control maturity.",
    signalLabels: ["Governance", "Cloud Exposure", "Resilience Planning"],
  },
  anchors: [
    { label: "Governance, Risk & Compliance", href: "#governance-risk-compliance" },
    { label: "Cloud Security", href: "#cloud-security" },
    { label: "Ransomware Readiness", href: "#ransomware-readiness" },
  ],
  sections: [
    {
      id: "governance-risk-compliance",
      eyebrow: "Governance, Risk & Compliance",
      title: "Sustainable governance aligned to recognized frameworks.",
      intro:
        "We help organizations build sustainable security governance aligned with industry frameworks.",
      items: [
        "Security framework gap assessments",
        "Risk register development and management",
        "Security control mapping",
        "Audit readiness support",
        "Policy and procedure development",
        "Third-party risk reviews",
        "Security awareness program guidance",
        "GRC platform configuration",
      ],
      tagsLabel: "Framework Experience",
      tags: ["ISO 27001", "SOC 2", "NIST CSF", "NIST 800-171", "CMMC", "GDPR"],
    },
    {
      id: "cloud-security",
      eyebrow: "Cloud Security",
      title: "Configuration, identity, and monitoring discipline across cloud estates.",
      intro:
        "We evaluate cloud environments to identify configuration weaknesses, identity risks, and monitoring gaps.",
      items: [
        "Cloud identity and access reviews",
        "Misconfiguration assessments",
        "Logging and monitoring evaluations",
        "CSPM findings analysis",
        "Cloud risk reporting",
        "Security baseline guidance",
        "Compliance support for cloud environments",
      ],
      tagsLabel: "Platforms",
      tags: ["AWS", "Azure", "Google Cloud Platform"],
      secondaryLabel: "Tools",
      secondaryTags: [
        "Defender for Cloud",
        "AWS Security Hub",
        "Wiz",
        "Prisma Cloud",
        "Okta",
        "Microsoft Entra ID",
        "Microsoft Sentinel",
      ],
    },
    {
      id: "ransomware-readiness",
      eyebrow: "Ransomware Readiness",
      title: "Preparation that improves survivability under operational pressure.",
      intro: "Preparation determines survivability during a ransomware incident.",
      items: [
        "Attack surface reduction reviews",
        "Endpoint monitoring improvements",
        "Identity privilege analysis",
        "Backup and recovery validation",
        "Incident response readiness guidance",
      ],
      tagsLabel: "Priority Focus Areas",
      tags: ["Attack Surface", "Detection Coverage", "Privilege Integrity", "Recovery Validation"],
    },
  ] satisfies ServiceSectionData[],
  cta: {
    title: "Bring governance, cloud security, and resilience into one decision framework.",
    description:
      "When exposures overlap across identity, infrastructure, and recovery, piecemeal fixes rarely hold. We help structure the response.",
    action: {
      label: "Request a Confidential Consultation",
      href: "/contact",
    },
  },
};
