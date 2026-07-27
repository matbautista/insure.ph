import Link from "next/link";

export function CTASection({
  headline,
  subheadline,
  cta,
}: {
  headline: string;
  subheadline?: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-teal-600 dark:from-blue-900 dark:to-teal-900">
      <div className="mx-auto max-w-3xl px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{headline}</h2>
        {subheadline && <p className="mt-3 text-blue-50">{subheadline}</p>}
        <Link
          href={cta.href}
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-50"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
