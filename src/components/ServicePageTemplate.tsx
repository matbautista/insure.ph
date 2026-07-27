import { Hero } from "@/components/Hero";
import { InquiryForm } from "@/components/InquiryForm";
import { CTASection } from "@/components/CTASection";
import type { FormDefinition } from "@/lib/forms";

interface InfoBlock {
  title: string;
  items: string[];
}

const defaultSteps = [
  "Fill out the quote form below.",
  "We compare options across our partner insurers.",
  "Get insured, often the same day.",
];

export function ServicePageTemplate({
  eyebrow,
  headline,
  subheadline,
  coverage,
  whoNeedsThis,
  whyInsurePh,
  form,
  ctaHeadline,
}: {
  eyebrow: string;
  headline: string;
  subheadline: string;
  coverage: InfoBlock;
  whoNeedsThis: InfoBlock;
  whyInsurePh: InfoBlock;
  form: FormDefinition;
  ctaHeadline: string;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <Hero
        eyebrow={eyebrow}
        headline={headline}
        subheadline={subheadline}
        primaryCta={{ label: form.submitLabel, href: "#quote" }}
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <InfoList block={coverage} />
          <InfoList block={whoNeedsThis} />
          <InfoList block={whyInsurePh} />
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-14 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-xl font-bold text-zinc-900 dark:text-zinc-50">
            How It Works
          </h2>
          <ol className="mt-6 flex flex-col gap-4">
            {defaultSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-teal-600 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="quote" className="mx-auto w-full max-w-xl px-6 py-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{form.title}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{form.description}</p>
        <div className="mt-6">
          <InquiryForm form={form} />
        </div>
      </section>

      <CTASection headline={ctaHeadline} cta={{ label: form.submitLabel, href: "#quote" }} />
    </div>
  );
}

function InfoList({ block }: { block: InfoBlock }) {
  return (
    <div>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{block.title}</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {block.items.map((item) => (
          <li key={item} className="text-sm text-zinc-600 dark:text-zinc-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
