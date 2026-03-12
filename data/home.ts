export type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type HeroBriefingCard = {
  title: string;
  detail: string;
};

export type Capability = {
  number: string;
  title: string;
  description: string;
};

export type Outcome = {
  title: string;
  detail: string;
};

export type Industry = {
  name: string;
  descriptor: string;
};

export type ProcessStepData = {
  title: string;
  description: string;
};

export const homePageData = {
  hero: {
    eyebrow: "Confidential Cybersecurity Advisory",
    title: "Precision Security for Decisive Organizations",
    description:
      "Strategic cybersecurity designed to protect infrastructure, preserve operational continuity, and reduce enterprise risk.",
    supportingNote:
      "Built for healthcare, legal, financial services, real estate, and professional services organizations where confidentiality and continuity carry operational weight.",
    actions: [
      {
        label: "Request a Confidential Consultation",
        href: "/contact",
        variant: "primary" as const,
      },
      {
        label: "Explore Services",
        href: "/services",
        variant: "secondary" as const,
      },
    ] satisfies HeroAction[],
    signalLabels: ["Identity Governance", "Monitoring Coverage", "Recovery Integrity"],
    briefingCards: [
      {
        title: "Who we help",
        detail:
          "Organizations in regulated and high-trust environments that need clearer visibility into governance, exposure, and resilience.",
      },
      {
        title: "Where we focus",
        detail:
          "Cloud and identity risk, monitoring depth, ransomware readiness, and framework-aligned remediation priorities.",
      },
      {
        title: "How we engage",
        detail:
          "Executive-level clarity, disciplined architecture review, and practical remediation sequencing that teams can sustain.",
      },
    ] satisfies HeroBriefingCard[],
  },
  riskReality: {
    eyebrow: "The Reality of Modern Risk",
    intro: "Cyber incidents rarely start with advanced attacks.",
    items: [
      "Compromised credentials",
      "Cloud misconfigurations",
      "Weak monitoring visibility",
      "Excessive permissions",
      "Untested recovery procedures",
    ],
    closing:
      "MOMENTIA IO helps organizations identify and resolve these exposures before they become operational disruptions.",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    title: "Controls structured around exposure reduction and operational continuity.",
    description:
      "Each engagement is designed to tighten exposure, improve clarity, and support decisions that stand up under executive review.",
    items: [
      {
        number: "01",
        title: "Cloud & Identity Security",
        description:
          "Reduce exposure across Microsoft 365 and cloud environments through identity governance and configuration hardening.",
      },
      {
        number: "02",
        title: "Endpoint Threat Defense",
        description:
          "Behavior-based monitoring and response to detect sophisticated threats before operational disruption.",
      },
      {
        number: "03",
        title: "Resilient Backup Architecture",
        description:
          "Immutable backup strategies designed to withstand ransomware and operational incidents.",
      },
      {
        number: "04",
        title: "Executive Risk Assessments",
        description:
          "Security evaluations translated into clear business risk insights and remediation priorities.",
      },
    ] satisfies Capability[],
  },
  outcomes: {
    eyebrow: "What We Help Organizations Do",
    title: "What stronger security looks like in practice.",
    description:
      "The emphasis stays on outcomes leadership teams can understand, sequence, and maintain without losing operational context.",
    items: [
      {
        title: "Understand cybersecurity exposure",
        detail: "Clarify where operational risk accumulates across identity, infrastructure, and recovery dependencies.",
      },
      {
        title: "Strengthen identity and access governance",
        detail: "Tighten administrative control paths and excessive privilege conditions.",
      },
      {
        title: "Reduce cloud configuration risk",
        detail: "Surface misaligned baselines before they become breach or audit issues.",
      },
      {
        title: "Improve monitoring visibility",
        detail: "Increase confidence in what your teams can observe, correlate, and respond to.",
      },
      {
        title: "Prepare for ransomware scenarios",
        detail: "Validate resilience assumptions, backup integrity, and critical response paths.",
      },
      {
        title: "Align security with compliance frameworks",
        detail: "Connect remediation priorities to governance expectations and measurable obligations.",
      },
    ] satisfies Outcome[],
  },
  industries: {
    eyebrow: "Industries",
    title: "Where confidentiality, continuity, and control maturity are operational requirements.",
    items: [
      { name: "Healthcare", descriptor: "Clinical systems, patient data, uptime" },
      { name: "Legal", descriptor: "Privilege, sensitive matters, client trust" },
      { name: "Financial Services", descriptor: "Control rigor, risk visibility, resilience" },
      { name: "Real Estate", descriptor: "Distributed operations, access management" },
      { name: "Professional Services", descriptor: "Advisory workflows, data stewardship" },
    ] satisfies Industry[],
  },
  process: {
    eyebrow: "Our Approach",
    title: "Cybersecurity is not transactional. It is structural.",
    description:
      "The work is organized as a disciplined sequence so leaders can see what matters first, what matters next, and what must remain under observation.",
    items: [
      {
        title: "Evaluate exposure",
        description: "Review the current environment to identify conditions that materially increase operational risk.",
      },
      {
        title: "Quantify risk",
        description: "Translate technical findings into business impact, decision context, and probable consequence.",
      },
      {
        title: "Prioritize remediation",
        description: "Sequence actions by urgency, dependency, and control effectiveness.",
      },
      {
        title: "Strengthen defensive architecture",
        description: "Improve identity, cloud, monitoring, and recovery controls where they matter most.",
      },
      {
        title: "Maintain ongoing visibility",
        description: "Establish an operating rhythm for monitoring, review, and resilience assurance.",
      },
    ] satisfies ProcessStepData[],
  },
  cta: {
    title: "Security decisions require clarity, not noise.",
    description:
      "If your organization is evaluating cybersecurity exposure, governance maturity, or resilience planning, we welcome a confidential discussion.",
    action: {
      label: "Request a Confidential Consultation",
      href: "/contact",
    },
  },
};
