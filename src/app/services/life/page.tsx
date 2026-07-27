import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { lifeInsuranceForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Life Insurance | Insure PH",
  description: "Life insurance designed to protect the people who depend on you.",
};

export default function LifeInsurancePage() {
  return (
    <ServicePageTemplate
      eyebrow="Life Insurance"
      headline="Your Family's Financial Security, Secured Today"
      subheadline="Life insurance designed to protect the people who depend on you — no matter what tomorrow brings."
      coverage={{
        title: "Plan Types",
        items: ["Term Life", "Whole Life / VUL (Variable Universal Life)", "Education / Investment-linked plans"],
      }}
      whoNeedsThis={{
        title: "Who Needs This",
        items: [
          "Breadwinners",
          "Young professionals starting families",
          "Parents planning for children's education",
          "Business owners (key-person coverage)",
        ],
      }}
      whyInsurePh={{
        title: "Why Insure PH",
        items: [
          "Needs-based planning across multiple insurers",
          "Not a single product pushed on everyone",
        ],
      }}
      form={lifeInsuranceForm}
      ctaHeadline="Ready to Plan Your Family's Future?"
    />
  );
}
