import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { InquiryForm } from "@/components/InquiryForm";
import { business } from "@/lib/business";
import { claimsAssistanceForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Claims and Assistance Center | Insure PH",
  description: "Step-by-step guidance and support for filing an insurance claim with Insure PH.",
};

const claimGuides = [
  {
    type: "Auto Accident",
    steps: [
      "Ensure everyone's safety first.",
      "Take photos of the scene and vehicle damage.",
      "Get a police report if there's significant damage or injury.",
      "Note the other party's details (name, plate number, insurer, contact info).",
      "Contact us — we'll help you file with your insurer.",
    ],
    documents: ["Policy number", "Valid ID", "Police report (if applicable)", "Photos of damage"],
  },
  {
    type: "Fire / Property Damage",
    steps: [
      "Ensure everyone's safety first.",
      "Document the damage with photos before cleanup.",
      "Secure the property.",
      "Contact your barangay/local fire station if required for an official report.",
      "Contact us — we'll help you file with your insurer.",
    ],
    documents: ["Policy number", "Valid ID", "Fire department report (if applicable)", "Photos of damage"],
  },
  {
    type: "Hospitalization (HMO)",
    steps: [
      "For a planned admission, contact us in advance for a Letter of Authorization.",
      "For an emergency admission, settle immediate care first, then contact us.",
      "We'll coordinate directly with your HMO on documentation.",
    ],
    documents: ["Policy/member number", "Valid ID", "Medical records or admission notes", "Receipts"],
  },
  {
    type: "Death Claim (Life / Memorial)",
    steps: [
      "Our deepest condolences during this difficult time.",
      "When you're ready, contact us with the policy number.",
      "Our team will personally guide the family through the documentation and insurer process.",
    ],
    documents: ["Policy number", "Death certificate", "Valid ID of the beneficiary/claimant"],
  },
];

const faqs = [
  {
    question: "How long does a claim take?",
    answer:
      "It depends on the insurer and claim type, but we follow up on your behalf so you're not the one chasing the insurance company. We'll give you a realistic timeline once we see your specific case.",
  },
  {
    question: "What if my claim is denied?",
    answer:
      "We'll review the denial reason with you and help you understand your options, including appeal where applicable.",
  },
  {
    question: "Do I pay you for claims assistance?",
    answer:
      "No — claims assistance is part of our service as your agent; we're compensated by the insurer, not by you.",
  },
];

export default function ClaimsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero
        headline="We're Here to Help — Every Step of the Way"
        subheadline="Filing a claim shouldn't add to your stress. Tell us what happened, and our team will guide you through the process with your insurer, start to finish."
        primaryCta={{ label: "Submit a Claims Assistance Request", href: "#claim-form" }}
        secondaryCta={{ label: "Call Us Now", href: `mailto:${business.email}` }}
      />

      <section className="border-y border-red-200 bg-red-50 py-6 dark:border-red-900 dark:bg-red-950">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-semibold text-red-900 dark:text-red-100">Urgent? Contact us directly.</p>
          <p className="mt-1 text-sm text-red-800 dark:text-red-200">
            {business.address} ·{" "}
            <a href={`mailto:${business.email}`} className="underline">
              {business.email}
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">What To Do First</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Select the situation that matches yours.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {claimGuides.map((guide) => (
            <details
              key={guide.type}
              className="group rounded-lg border border-zinc-200 p-4 transition-colors open:border-teal-300 hover:border-teal-300 dark:border-zinc-800 dark:open:border-teal-700 dark:hover:border-teal-700"
            >
              <summary className="cursor-pointer list-none font-semibold text-zinc-900 marker:content-none dark:text-zinc-50">
                {guide.type}
              </summary>
              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Steps to take</p>
                  <ol className="mt-2 flex flex-col gap-1.5">
                    {guide.steps.map((step, i) => (
                      <li key={step} className="text-sm text-zinc-600 dark:text-zinc-400">
                        {i + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Documents you&apos;ll need</p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {guide.documents.map((doc) => (
                      <li key={doc} className="text-sm text-zinc-600 dark:text-zinc-400">
                        • {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-16 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">How Insure PH Helps</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            We liaise directly with your insurer, help complete paperwork correctly the first time, and follow
            up on your behalf so you&apos;re not the one chasing the insurance company.
          </p>
        </div>
      </section>

      <section id="claim-form" className="mx-auto w-full max-w-xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{claimsAssistanceForm.title}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{claimsAssistanceForm.description}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Have photos or documents to share? Submit this form first, then email them to{" "}
          <a href={`mailto:${business.email}`} className="underline">
            {business.email}
          </a>{" "}
          referencing your policy number.
        </p>
        <div className="mt-6">
          <InquiryForm form={claimsAssistanceForm} />
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-16 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="mt-6">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
