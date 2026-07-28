"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { adminFormTypeGroups } from "@/lib/forms";
import { withFilterParam } from "@/lib/with-filter-param";

export function CategoryFilter({ value }: { value: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      id="category-filter"
      value={value}
      onChange={(e) => router.push(withFilterParam(searchParams.toString(), "category", e.target.value))}
      className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
    >
      <option value="all">All</option>
      {adminFormTypeGroups.map((group) => (
        <option key={group.formType} value={group.formType}>
          {group.label}
        </option>
      ))}
    </select>
  );
}
