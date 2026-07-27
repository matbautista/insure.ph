import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Services | Insure PH",
  description: "Explore Insure PH's full range of insurance and pre-need solutions.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero
        headline="Insurance, Simplified — Find the Right Coverage for You"
        subheadline="Whether it's your car, your home, your health, or your family's future, explore our full range of insurance and pre-need solutions below."
        primaryCta={{ label: "Talk to an Advisor", href: "/about" }}
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50/70 to-teal-50/40 py-14 dark:from-blue-950/40 dark:to-teal-950/20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Not Sure What You Need?</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Insuring a car? A home? Your health? Your family&apos;s future? Let&apos;s talk — we&apos;ll help
            you figure out the right coverage, no pressure.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700"
          >
            Talk to an Advisor
          </Link>
        </div>
      </section>
    </div>
  );
}
