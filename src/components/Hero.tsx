import Link from "next/link";

export function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-cyan-50 to-white dark:from-blue-950 dark:via-slate-900 dark:to-black">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-600/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl dark:bg-teal-500/20"
      />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {headline}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{subheadline}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="rounded-full border border-zinc-300 bg-white/60 px-6 py-3 text-sm font-semibold text-zinc-800 backdrop-blur transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
