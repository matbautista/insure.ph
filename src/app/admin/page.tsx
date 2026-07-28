import type { Metadata } from "next";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { InquiryCard } from "@/components/InquiryCard";
import { StatusFilter } from "@/components/StatusFilter";
import { CategoryFilter } from "@/components/CategoryFilter";
import { adminFormTypeGroups } from "@/lib/forms";
import { STATUS_OPTIONS, STATUS_LABELS, type InquiryStatus } from "@/lib/inquiry-status";

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
  searchParams: Promise<{ status?: string; category?: string }>;
}) {
  const { status: statusParam, category: categoryParam } = await searchParams;
  const activeStatus = statusParam && isInquiryStatus(statusParam) ? statusParam : "all";
  const activeCategory = categoryParam && knownFormTypes.has(categoryParam) ? categoryParam : "all";

  const conditions = [
    activeStatus === "all" ? undefined : eq(inquiries.status, activeStatus),
    activeCategory === "all" ? undefined : eq(inquiries.formType, activeCategory),
  ].filter((c) => c !== undefined);

  const rows = db
    ? await db
        .select()
        .from(inquiries)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(inquiries.createdAt))
        .limit(200)
    : null;

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

  const filtersActive = activeStatus !== "all" || activeCategory !== "all";
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
                : `${rows.length} ${descriptor} submission${rows.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      {rows && (
        <div className="mt-6 flex flex-wrap items-center gap-4">
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
