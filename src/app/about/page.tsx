import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { InquiryForm } from "@/components/InquiryForm";
import { business, mapsEmbedUrl } from "@/lib/business";
import { generalInquiryForm } from "@/lib/forms";

export const metadata: Metadata = {
  title: "About Us | Insure PH",
  description: "Meet the Pasig-based team behind Insure PH.",
};

const values = [
  { title: "Transparency", body: "We tell you what a plan actually covers, including the limits, before you sign anything." },
  { title: "Accessibility", body: "Insurance advice shouldn't be confusing or intimidating — we explain things in plain language." },
  { title: "Client-First Advice", body: "We recommend what fits your situation, even if that means a smaller commission for us." },
  { title: "Fast Claims Support", body: "We stay involved after the sale — especially when you need us most, during a claim." },
];

const whoWeServe = [
  "Private individuals and families",
  "OFWs insuring property or family back home",
  "Small and medium businesses needing HMO or business coverage",
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero
        headline="The Local Team Behind Your Peace of Mind"
        subheadline={`${business.name} is a Pasig-based insurance agency helping Filipino families and businesses find the right coverage — with honest advice, not a hard sell.`}
        primaryCta={{ label: "Talk to Our Team", href: "#contact" }}
      />

      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Our Story</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          {`We started ${business.name} because too many Filipinos only think about insurance after something goes wrong. We wanted to change that — by making insurance advice approachable, and by being genuinely useful when a client needs to file a claim, not just when they're buying a policy.`}
        </p>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-16 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-xl font-bold text-zinc-900 dark:text-zinc-50">Our Values</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-teal-300 dark:border-zinc-800 dark:bg-black dark:hover:border-teal-700"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{value.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Meet the Team</h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Placeholder — replace with real agent photos, names, and Insurance Commission license numbers.
          This section is one of the highest-trust elements on the site; don&apos;t launch without it filled in.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {["Agent Name", "Agent Name", "Agent Name"].map((name, i) => (
            <div key={i} className="rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
              <div className="mx-auto h-20 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <p className="mt-3 font-medium text-zinc-900 dark:text-zinc-50">{name}</p>
              <p className="text-xs text-zinc-500">License # placeholder</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-16 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Who We Serve</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {whoWeServe.map((item) => (
              <li key={item} className="text-zinc-600 dark:text-zinc-400">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Visit Us</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{business.address}</p>
        <iframe
          title="Insure PH office location"
          src={mapsEmbedUrl}
          className="mt-4 h-72 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
          loading="lazy"
        />
      </section>

      <section id="contact" className="mx-auto w-full max-w-xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{generalInquiryForm.title}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{generalInquiryForm.description}</p>
        <div className="mt-6">
          <InquiryForm form={generalInquiryForm} />
        </div>
      </section>

      <CTASection
        headline="Ready to Talk?"
        subheadline="No pressure, just honest advice about the right coverage for you."
        cta={{ label: "Talk to Our Team", href: "#contact" }}
      />
    </div>
  );
}
