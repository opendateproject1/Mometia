export type ValuePillar = {
  title: string;
  description: string;
};

export type AboutProcessStep = {
  title: string;
  description: string;
};

export const aboutPageData = {
  hero: {
    eyebrow: "Our Philosophy",
    title: "Security should reflect the seriousness of the organization it protects.",
    description:
      "MOMENTIA IO focuses on measurable risk reduction, operational continuity, and disciplined security architecture.",
  },
  philosophy: {
    eyebrow: "Philosophy",
    title: "Advisory work built for sober decisions and durable control improvements.",
    items: [
      {
        title: "Measurable Risk Reduction",
        description: "Recommendations are framed around exposure change, control effectiveness, and business consequence.",
      },
      {
        title: "Operational Continuity",
        description: "Security planning is treated as a continuity issue, not just a control checklist.",
      },
      {
        title: "Disciplined Architecture",
        description: "Identity, monitoring, and recovery design are approached as structural components of resilience.",
      },
    ] satisfies ValuePillar[],
  },
  process: {
    eyebrow: "Our Approach",
    title: "Cybersecurity is not transactional. It is structural.",
    description:
      "The engagement model is built to help leadership teams understand current exposure, sequence decisions, and maintain visibility after immediate remediation.",
    items: [
      {
        title: "Evaluate exposure",
        description: "Establish where identity, infrastructure, monitoring, and recovery conditions are creating avoidable risk.",
      },
      {
        title: "Quantify risk",
        description: "Translate findings into operational consequence, governance impact, and decision urgency.",
      },
      {
        title: "Prioritize remediation",
        description: "Sequence the work according to materiality, dependency, and expected control improvement.",
      },
      {
        title: "Strengthen defensive architecture",
        description: "Tighten the controls that shape resilience across cloud, identity, endpoint, and recovery paths.",
      },
      {
        title: "Maintain ongoing visibility",
        description: "Support an operating rhythm that keeps risk posture observable after immediate issues are addressed.",
      },
    ] satisfies AboutProcessStep[],
  },
  whyEngage: {
    eyebrow: "Why organizations engage MOMENTIA IO",
    title: "Confidence built through precision, not volume.",
    items: [
      {
        title: "Executive-level clarity",
        description: "Findings are translated into concise decision language without diluting technical reality.",
      },
      {
        title: "Practical remediation focus",
        description: "The emphasis stays on actions teams can implement and sustain.",
      },
      {
        title: "Cloud and identity emphasis",
        description: "Modern exposure patterns are addressed where misconfiguration and privilege issues concentrate.",
      },
      {
        title: "Resilience-oriented planning",
        description: "Recovery assumptions, monitoring depth, and continuity dependencies remain in scope.",
      },
    ] satisfies ValuePillar[],
  },
  cta: {
    title: "A serious operating environment requires serious security architecture.",
    description:
      "If your leadership team needs a clearer view of risk, resilience, or control maturity, MOMENTIA IO can structure the discussion.",
    action: {
      label: "Request a Confidential Consultation",
      href: "/contact",
    },
  },
};
