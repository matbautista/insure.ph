import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { hmoInsuranceForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "HMO Insurance | Insure PH",
  description: "Comprehensive HMO plans for individuals, families, and businesses.",
};

export default function HmoInsurancePage() {
  return (
    <ServicePageTemplate
      eyebrow="HMO Insurance"
      headline="Healthcare You Can Count On"
      subheadline="Comprehensive HMO plans for individuals, families, and businesses — because quality care shouldn't have to wait."
      coverage={{
        title: "Coverage",
        items: [
          "Inpatient care",
          "Outpatient care",
          "Emergency care",
          "Dental",
          "Annual physical exam",
          "Maternity on select plans",
        ],
      }}
      whoNeedsThis={{
        title: "Who Needs This",
        items: [
          "Individuals and families without employer HMO",
          "Freelancers",
          "SMEs building employee benefits packages",
          "OFWs insuring dependents",
        ],
      }}
      whyInsurePh={{
        title: "Why Insure PH",
        items: [
          "Compare plans by hospital network, room type, and budget",
          "Corporate HMO packages for teams",
        ],
      }}
      form={hmoInsuranceForm}
      ctaHeadline="Ready to Get Covered?"
    />
  );
}
