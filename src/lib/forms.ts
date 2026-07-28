export type FormFieldType = "text" | "email" | "tel" | "date" | "textarea" | "select";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormDefinition {
  formType: string;
  title: string;
  description: string;
  submitLabel: string;
  fields: FormField[];
}

export const generalInquiryForm: FormDefinition = {
  formType: "general-inquiry",
  title: "Get a Free Quote",
  description: "Tell us a bit about what you need, and an advisor will get back to you.",
  submitLabel: "Send Inquiry",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    {
      name: "inquiryType",
      label: "What are you interested in?",
      type: "select",
      required: true,
      options: [
        "Auto / Motor Insurance",
        "Property and Fire Insurance",
        "Life Insurance",
        "HMO Insurance",
        "Memorial Plans",
        "Not sure yet",
      ],
    },
    { name: "message", label: "Message", type: "textarea" },
  ],
};

export const autoInsuranceForm: FormDefinition = {
  formType: "auto-insurance-quote",
  title: "Get Your Free Auto Insurance Quote",
  description: "Share your vehicle details and we'll compare options across our partner insurers.",
  submitLabel: "Request Auto Quote",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "vehicle", label: "Vehicle Make / Model / Year", type: "text", required: true },
    {
      name: "vehicleUse",
      label: "Vehicle Use",
      type: "select",
      required: true,
      options: ["Private", "Commercial"],
    },
    { name: "currentInsurer", label: "Current Insurer (if renewing)", type: "text" },
    {
      name: "coverageType",
      label: "Desired Coverage Type",
      type: "select",
      required: true,
      options: ["CTPL only", "Comprehensive"],
    },
    { name: "preferredStartDate", label: "Preferred Start Date", type: "date" },
  ],
};

export const propertyInsuranceForm: FormDefinition = {
  formType: "property-fire-insurance-quote",
  title: "Protect Your Property — Get a Free Quote",
  description: "Tell us about the property you'd like to cover.",
  submitLabel: "Request Property Quote",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    {
      name: "propertyType",
      label: "Property Type",
      type: "select",
      required: true,
      options: ["House", "Condo", "Commercial"],
    },
    { name: "address", label: "Property Address", type: "text", required: true },
    { name: "estimatedValue", label: "Estimated Property Value", type: "text" },
    { name: "coverageInterest", label: "Coverage Interested In", type: "text" },
    {
      name: "hasExistingInsurance",
      label: "Existing Insurance?",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
};

export const lifeInsuranceForm: FormDefinition = {
  formType: "life-insurance-inquiry",
  title: "Plan Your Family's Future",
  description: "A few details help us match you with the right plan.",
  submitLabel: "Talk to an Advisor",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "age", label: "Age", type: "text", required: true },
    { name: "occupation", label: "Occupation", type: "text" },
    { name: "dependents", label: "Number of Dependents", type: "text" },
    {
      name: "planInterest",
      label: "Plan Interest",
      type: "select",
      required: true,
      options: ["Term Life", "Whole Life / VUL", "Education / Investment-linked", "Not sure yet"],
    },
    { name: "bestTimeToCall", label: "Best Time to Call", type: "text" },
  ],
};

export const hmoInsuranceForm: FormDefinition = {
  formType: "hmo-insurance-inquiry",
  title: "Get an HMO Quote for You or Your Team",
  description: "Tell us who needs coverage and we'll compare plans that fit.",
  submitLabel: "Request HMO Quote",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    {
      name: "forWhom",
      label: "Coverage For",
      type: "select",
      required: true,
      options: ["Self", "Family", "Company"],
    },
    { name: "numMembers", label: "Number of Members to Insure", type: "text", required: true },
    { name: "roomTypePreference", label: "Preferred Room Type", type: "text" },
    { name: "companyName", label: "Company Name (if corporate)", type: "text" },
  ],
};

export const memorialPlanForm: FormDefinition = {
  formType: "memorial-plan-inquiry",
  title: "Secure Peace of Mind",
  description: "Inquire about memorial plans for yourself or a loved one.",
  submitLabel: "Inquire About Memorial Plans",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    {
      name: "forWhom",
      label: "Planning For",
      type: "select",
      required: true,
      options: ["Self", "Family Member"],
    },
    {
      name: "planType",
      label: "Preferred Plan Type",
      type: "select",
      options: ["Traditional", "Cremation", "Not sure yet"],
    },
    { name: "budgetRange", label: "Budget Range", type: "text" },
    { name: "bestTimeToContact", label: "Best Time to Contact", type: "text" },
  ],
};

// Display/grouping order for the admin inquiries dashboard (not related to
// the public-facing form pages) — claims first since those are time-
// sensitive, general inquiry last since it's the catch-all.
export const adminFormTypeGroups: { formType: string; label: string }[] = [
  { formType: "claims-assistance", label: "Claims Assistance" },
  { formType: "auto-insurance-quote", label: "Motor Insurance" },
  { formType: "life-insurance-inquiry", label: "Life Insurance" },
  { formType: "hmo-insurance-inquiry", label: "HMO Insurance" },
  { formType: "property-fire-insurance-quote", label: "Property & Fire Insurance" },
  { formType: "memorial-plan-inquiry", label: "Memorial Plans" },
  { formType: "general-inquiry", label: "General Inquiry" },
];

export const claimsAssistanceForm: FormDefinition = {
  formType: "claims-assistance",
  title: "Submit a Claims Assistance Request",
  description:
    "Share the details below and our team will help you through the claims process with your insurer.",
  submitLabel: "Submit Claims Request",
  fields: [
    { name: "policyholderName", label: "Policyholder Name", type: "text", required: true },
    { name: "policyNumber", label: "Policy Number", type: "text", required: true },
    {
      name: "insuranceType",
      label: "Insurance Type",
      type: "select",
      required: true,
      options: [
        "Auto / Motor Insurance",
        "Property and Fire Insurance",
        "Life Insurance",
        "HMO Insurance",
        "Memorial Plans",
      ],
    },
    { name: "incidentDate", label: "Incident Date", type: "date" },
    {
      name: "description",
      label: "Brief Description of Incident/Claim",
      type: "textarea",
      required: true,
    },
    { name: "contactNumber", label: "Contact Number", type: "tel", required: true },
    { name: "bestTimeToReach", label: "Best Time to Reach You", type: "text" },
    {
      name: "urgencyLevel",
      label: "Urgency Level",
      type: "select",
      required: true,
      options: ["Standard", "Urgent"],
    },
  ],
};
