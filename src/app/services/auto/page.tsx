import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { autoInsuranceForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Auto / Motor Insurance | Insure PH",
  description: "Comprehensive auto insurance covering accidents, theft, fire, and natural calamities.",
};

export default function AutoInsurancePage() {
  return (
    <ServicePageTemplate
      eyebrow="Auto / Motor Insurance"
      headline="Drive with Confidence, Every Single Time"
      subheadline="Metro Manila traffic is unpredictable — your protection shouldn't be. Comprehensive coverage against accidents, theft, fire, and natural calamities."
      coverage={{
        title: "What's Covered",
        items: [
          "Own Damage",
          "Theft",
          "Third-Party Liability (CTPL)",
          "Acts of Nature (flood, typhoon)",
          "Personal Accident",
        ],
      }}
      whoNeedsThis={{
        title: "Who Needs This",
        items: [
          "Private car owners",
          "First-time buyers needing CTPL",
          "Business and fleet owners renewing registration",
        ],
      }}
      whyInsurePh={{
        title: "Why Insure PH",
        items: [
          "We compare quotes across insurers for the best rate",
          "Guidance on LTO renewal timing",
          "Help choosing comprehensive vs. CTPL-only coverage",
        ],
      }}
      form={autoInsuranceForm}
      ctaHeadline="Ready to Get Covered?"
    />
  );
}
