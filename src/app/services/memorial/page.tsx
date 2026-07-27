import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { memorialPlanForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Memorial Plans | Insure PH",
  description: "Pre-need memorial and life plans that spare your family from financial stress.",
};

export default function MemorialPlansPage() {
  return (
    <ServicePageTemplate
      eyebrow="Memorial Plans"
      headline="Ease the Burden, Honor Their Memory"
      subheadline="Pre-need memorial and life plans that spare your family from financial stress during life's most difficult moments."
      coverage={{
        title: "What's Included",
        items: [
          "Memorial lot / cremation package",
          "Funeral service coordination",
          "Family assistance benefits",
        ],
      }}
      whoNeedsThis={{
        title: "Who Needs This",
        items: [
          "Parents planning ahead for themselves",
          "Adult children arranging for aging parents",
        ],
      }}
      whyInsurePh={{
        title: "Why Insure PH",
        items: [
          "Accredited pre-need providers",
          "Flexible payment terms",
          "No-pressure planning conversations",
        ],
      }}
      form={memorialPlanForm}
      ctaHeadline="Ready to Secure Peace of Mind?"
    />
  );
}
