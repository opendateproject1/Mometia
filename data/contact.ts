export type TrustNote = {
  title: string;
  description: string;
};

export const contactPageData = {
  hero: {
    eyebrow: "Confidential Intake",
    title: "Request a Confidential Consultation",
    description:
      "If your organization is evaluating cybersecurity exposure, governance maturity, or resilience planning, we welcome a confidential discussion.",
  },
  intro: {
    title: "Begin with context, not noise.",
    description:
      "Use the form to share your current priorities, exposure concerns, or advisory needs. The discussion remains confidential and appropriately scoped.",
  },
  trustNotes: [
    {
      title: "Confidential inquiry",
      description: "Initial outreach is handled with discretion and suitable professional care.",
    },
    {
      title: "No-obligation discussion",
      description: "The first conversation is designed to clarify context, not force a predefined engagement.",
    },
    {
      title: "Response within normal business timeframe",
      description: "Expect a follow-up aligned with standard working hours and availability.",
    },
  ] satisfies TrustNote[],
  form: {
    title: "Consultation Request",
    description: "Provide the essentials and we will follow up to structure the next conversation.",
    submitLabel: "Submit Confidential Inquiry",
    successMessage:
      "Thank you. Your request has been received and the next conversation can now be scoped appropriately.",
  },
};
