"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { STATUS_OPTIONS, STATUS_LABELS } from "@/lib/inquiry-status";
import { withFilterParam } from "@/lib/with-filter-param";

export function StatusFilter({ value }: { value: "all" | (typeof STATUS_OPTIONS)[number] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      id="status-filter"
      value={value}
      onChange={(e) => router.push(withFilterParam(searchParams.toString(), "status", e.target.value))}
      className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
    >
      <option value="all">All</option>
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {STATUS_LABELS[option]}
        </option>
      ))}
    </select>
  );
}
