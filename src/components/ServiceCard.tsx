import Link from "next/link";
import type { ServiceDefinition } from "@/lib/nav";

export function ServiceCard({ service }: { service: ServiceDefinition }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 transition-colors hover:border-teal-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-teal-700">
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-teal-500" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{service.label}</h3>
        <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{service.tagline}</p>
        <div className="mt-4 flex gap-3">
          <Link
            href={service.href}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Learn More
          </Link>
          <Link
            href={`${service.href}#quote`}
            className="rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
