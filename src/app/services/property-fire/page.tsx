import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { propertyInsuranceForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Property and Fire Insurance | Insure PH",
  description: "Safeguard your home, condo, or business against fire, flood, earthquake, and theft.",
};

export default function PropertyFireInsurancePage() {
  return (
    <ServicePageTemplate
      eyebrow="Property and Fire Insurance"
      headline="Because Home Is Worth Protecting"
      subheadline="Fire, flood, earthquake, or theft — safeguard your home, condo, or business against the unexpected."
      coverage={{
        title: "Coverage Types",
        items: [
          "Fire & Allied Perils",
          "Earthquake",
          "Comprehensive Property",
          "Condo / Homeowners",
          "Commercial / Business Property",
        ],
      }}
      whoNeedsThis={{
        title: "Who Needs This",
        items: [
          "Homeowners",
          "Condo owners and renters (contents insurance)",
          "Landlords and business owners",
          "OFWs insuring family property back home",
        ],
      }}
      whyInsurePh={{
        title: "Why Insure PH",
        items: [
          "Coverage tailored to your property type and value",
          "Help navigating condo-association vs. individual-unit requirements",
        ],
      }}
      form={propertyInsuranceForm}
      ctaHeadline="Ready to Protect Your Property?"
    />
  );
}
