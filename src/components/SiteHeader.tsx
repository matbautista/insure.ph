"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import { business } from "@/lib/business";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-lg font-bold tracking-tight text-transparent"
        >
          {business.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-zinc-700 hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-400"
                >
                  {item.label}
                </Link>
                <div className="invisible absolute left-0 top-full z-20 w-64 rounded-lg border border-zinc-200 bg-white p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 dark:border-zinc-800 dark:bg-zinc-900">
                  {item.children.map((child) => (
                    <Link
                      key={child.slug}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-zinc-700 hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-400"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/services"
          className="hidden rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700 md:inline-block"
        >
          Get a Free Quote
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 md:hidden dark:border-zinc-700 dark:text-zinc-300"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </div>
      <div aria-hidden className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500" />

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-zinc-200 px-6 py-4 md:hidden dark:border-zinc-800">
          {primaryNav.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 flex flex-col gap-1 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                  {item.children.map((child) => (
                    <Link
                      key={child.slug}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-1.5 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
