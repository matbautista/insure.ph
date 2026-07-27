import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services } from "@/lib/nav";

const differentiators = [
  {
    title: "Compare Multiple Insurers, One Conversation",
    body: "We're an independent agency, not a single-brand sales team — so the plan we recommend is the one that fits you, not a quota.",
  },
  {
    title: "Local, Pasig-Based Team",
    body: "A real office you can visit, in Rosario, Pasig City — not just a hotline.",
  },
  {
    title: "Dedicated Claims & Assistance Support",
    body: "We help you through the claims process with your insurer, from paperwork to follow-up.",
  },
  {
    title: "Advice Matched to Your Life Stage",
    body: "Starting a family, buying a car, insuring OFW dependents — we recommend coverage for your situation, not a one-size product.",
  },
];

const testimonials = [
  {
    quote:
      "Insure PH helped my family get HMO coverage that actually fit our budget, and walked us through every step of the enrollment.",
    name: "Client testimonial placeholder — replace with a real name/photo once collected",
  },
  {
    quote:
      "When I got into a minor accident, their claims team handled the back-and-forth with my insurer so I didn't have to.",
    name: "Client testimonial placeholder — replace with a real name/photo once collected",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero
        headline="Protect What Matters Most — Trusted Insurance for Every Filipino Family"
        subheadline="From your car and your home to your health and your family's future, Insure PH connects you to the right coverage — with honest advice, not hard selling."
        primaryCta={{ label: "Get a Free Quote", href: "/services" }}
        secondaryCta={{ label: "Talk to an Advisor", href: "/about" }}
      />

      <section className="border-y border-teal-100 bg-gradient-to-r from-blue-50 to-teal-50 py-4 text-center text-sm font-medium text-zinc-700 dark:border-teal-900/40 dark:from-blue-950/40 dark:to-teal-950/30 dark:text-zinc-300">
        Licensed insurance agency based in Pasig City, working with multiple trusted insurers.
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Our Services
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
          Whatever you need to protect, we likely have a plan for it.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-16 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Why Insure PH
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-teal-300 dark:border-zinc-800 dark:bg-black dark:hover:border-teal-700"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Need to File a Claim?</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Our Claims and Assistance Center walks you through every step, with your insurer, on your side.
            </p>
          </div>
          <Link
            href="/claims"
            className="shrink-0 rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700"
          >
            Get Claims Help
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
          What Our Clients Say
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-xl border border-zinc-200 p-6 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
              <p className="italic">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-3 text-sm font-medium text-zinc-500">{t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <CTASection
        headline="Not Sure Where to Start?"
        subheadline="Let's find the right coverage together."
        cta={{ label: "Talk to an Advisor", href: "/about" }}
      />
    </div>
  );
}
