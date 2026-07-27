import Link from "next/link";
import { business, mapsEmbedUrl } from "@/lib/business";
import { primaryNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{business.name}</p>
          <p className="mt-2 text-sm text-zinc-400">{business.address}</p>
          <p className="mt-2 text-sm text-zinc-400">
            <a href={`mailto:${business.email}`} className="hover:text-teal-300 hover:underline">
              {business.email}
            </a>
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Quick Links</p>
          <ul className="mt-3 flex flex-col gap-2">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-zinc-400 hover:text-teal-300 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Need to File a Claim?</p>
          <p className="mt-3 text-sm text-zinc-400">
            Our Claims and Assistance Center walks you through every step.
          </p>
          <Link
            href="/claims"
            className="mt-3 inline-block rounded-full bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-500 hover:to-teal-400"
          >
            Get Claims Help
          </Link>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-sm font-semibold text-white">Visit Us</p>
          <iframe
            title="Insure PH office location"
            src={mapsEmbedUrl}
            className="mt-3 h-40 w-full rounded-lg border border-white/10"
            loading="lazy"
          />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
