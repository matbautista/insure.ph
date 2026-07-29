import type { Metadata } from "next";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { InquiryCard } from "@/components/InquiryCard";
import { StatusFilter } from "@/components/StatusFilter";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchFilter } from "@/components/SearchFilter";
import { adminFormTypeGroups } from "@/lib/forms";
import { STATUS_OPTIONS, STATUS_LABELS, type InquiryStatus } from "@/lib/inquiry-status";
import { withFilterParam } from "@/lib/with-filter-param";

export const metadata: Metadata = {
  title: "Admin | Insure PH",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function isInquiryStatus(value: string): value is InquiryStatus {
  return (STATUS_OPTIONS as readonly string[]).includes(value);
}

const knownFormTypes = new Set(adminFormTypeGroups.map((g) => g.formType));

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; category?: string; q?: string }>;
}) {
  const { status: statusParam, category: categoryParam, q: qParam } = await searchParams;
  const activeStatus = statusParam && isInquiryStatus(statusParam) ? statusParam : "all";
  const activeCategory = categoryParam && knownFormTypes.has(categoryParam) ? categoryParam : "all";
  const activeSearch = qParam?.trim() ?? "";

  // Search matches against the submitted form fields (stored as JSONB),
  // internal remarks, and the reference number — covers name/email/phone/
  // message plus lookup-by-reference across every form type without needing
  // a per-field query.
  const searchCondition = activeSearch
    ? sql`(${inquiries.data}::text ILIKE ${`%${activeSearch}%`} OR ${inquiries.remarks} ILIKE ${`%${activeSearch}%`} OR ${inquiries.referenceNumber} ILIKE ${`%${activeSearch}%`})`
    : undefined;

  // Conditions that scope "what set of inquiries are we looking at" apart
  // from status — reused by both the row query and the status-count
  // summary (which breaks that same set down by status).
  const scopeConditions = [
    activeCategory === "all" ? undefined : eq(inquiries.formType, activeCategory),
    searchCondition,
  ].filter((c) => c !== undefined);

  const rowConditions = [
    ...scopeConditions,
    activeStatus === "all" ? undefined : eq(inquiries.status, activeStatus),
  ].filter((c) => c !== undefined);

  const rows = db
    ? await db
        .select()
        .from(inquiries)
        .where(rowConditions.length > 0 ? and(...rowConditions) : undefined)
        .orderBy(desc(inquiries.createdAt))
        .limit(200)
    : null;

  const statusCounts = db
    ? await db
        .select({ status: inquiries.status, count: count() })
        .from(inquiries)
        .where(scopeConditions.length > 0 ? and(...scopeConditions) : undefined)
        .groupBy(inquiries.status)
    : null;

  const countByStatus = Object.fromEntries(STATUS_OPTIONS.map((s) => [s, 0])) as Record<InquiryStatus, number>;
  let totalCount = 0;
  for (const row of statusCounts ?? []) {
    if (isInquiryStatus(row.status)) countByStatus[row.status] = row.count;
    totalCount += row.count;
  }

  const currentSearch = new URLSearchParams({
    ...(statusParam ? { status: statusParam } : {}),
    ...(categoryParam ? { category: categoryParam } : {}),
    ...(qParam ? { q: qParam } : {}),
  }).toString();

  // Group by form type in a fixed triage order (see adminFormTypeGroups),
  // preserving the newest-first ordering within each group. Any form type
  // not in that list (shouldn't happen, but schemas evolve) falls into a
  // trailing "Other" group rather than silently disappearing.
  const groupDefs = [...adminFormTypeGroups, { formType: "", label: "Other" }];
  const groups = rows
    ? groupDefs
        .map((group) => ({
          label: group.label,
          rows: rows.filter((row) =>
            group.formType === "" ? !knownFormTypes.has(row.formType) : row.formType === group.formType
          ),
        }))
        .filter((group) => group.rows.length > 0)
    : [];

  const filtersActive = activeStatus !== "all" || activeCategory !== "all" || activeSearch !== "";
  const categoryLabel = adminFormTypeGroups.find((g) => g.formType === activeCategory)?.label;
  const descriptor = [activeStatus !== "all" ? STATUS_LABELS[activeStatus] : null, categoryLabel]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Inquiries</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {!rows
              ? "Database not configured"
              : !filtersActive
                ? `Latest ${rows.length} submission${rows.length === 1 ? "" : "s"}`
                : `${rows.length}${descriptor ? ` ${descriptor}` : ""} submission${rows.length === 1 ? "" : "s"}${
                    activeSearch ? ` matching "${activeSearch}"` : ""
                  }`}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      {rows && (
        <div className="mt-6 flex flex-wrap gap-2">
          {(["all", ...STATUS_OPTIONS] as const).map((option) => (
            <a
              key={option}
              href={withFilterParam(currentSearch, "status", option)}
              className={
                "rounded-lg border px-3 py-2 text-sm " +
                (activeStatus === option
                  ? "border-transparent bg-gradient-to-r from-blue-700 to-teal-600 text-white"
                  : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900")
              }
            >
              <span className="font-semibold">{option === "all" ? totalCount : countByStatus[option]}</span>{" "}
              <span className={activeStatus === option ? "text-white/90" : "text-zinc-500 dark:text-zinc-400"}>
                {option === "all" ? "All" : STATUS_LABELS[option]}
              </span>
            </a>
          ))}
        </div>
      )}

      {rows && (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="search-filter" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Search
            </label>
            <SearchFilter value={activeSearch} />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Status
            </label>
            <StatusFilter value={activeStatus} />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="category-filter" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Category
            </label>
            <CategoryFilter value={activeCategory} />
          </div>
        </div>
      )}

      {!rows ? (
        <p className="mt-8 text-sm text-red-600">DATABASE_URL is not configured in this environment.</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
          {!filtersActive ? "No inquiries yet." : "No inquiries match this filter."}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                {group.label} <span className="font-normal normal-case">({group.rows.length})</span>
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {group.rows.map((row) => (
                  <InquiryCard
                    key={row.id}
                    id={row.id}
                    referenceNumber={row.referenceNumber}
                    formType={row.formType}
                    createdAt={row.createdAt.toISOString()}
                    data={row.data as Record<string, unknown>}
                    status={row.status}
                    assignee={row.assignee}
                    remarks={row.remarks}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
