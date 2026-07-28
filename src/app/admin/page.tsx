import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { InquiryCard } from "@/components/InquiryCard";
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

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const activeStatus = statusParam && isInquiryStatus(statusParam) ? statusParam : "all";

  const rows = db
    ? await db
        .select()
        .from(inquiries)
        .where(activeStatus === "all" ? undefined : eq(inquiries.status, activeStatus))
        .orderBy(desc(inquiries.createdAt))
        .limit(200)
    : null;

  // Group by form type in a fixed triage order (see adminFormTypeGroups),
  // preserving the newest-first ordering within each group. Any form type
  // not in that list (shouldn't happen, but schemas evolve) falls into a
  // trailing "Other" group rather than silently disappearing.
  const knownFormTypes = new Set(adminFormTypeGroups.map((g) => g.formType));
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

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Inquiries</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {!rows
              ? "Database not configured"
              : activeStatus === "all"
                ? `Latest ${rows.length} submission${rows.length === 1 ? "" : "s"}`
                : `${rows.length} ${STATUS_LABELS[activeStatus]} submission${rows.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      {rows && (
        <div className="mt-6 flex flex-wrap gap-2">
          {(["all", ...STATUS_OPTIONS] as const).map((option) => (
            <Link
              key={option}
              href={option === "all" ? "/admin" : `/admin?status=${option}`}
              className={
                "rounded-full border px-3 py-1 text-xs font-medium " +
                (activeStatus === option
                  ? "border-transparent bg-gradient-to-r from-blue-700 to-teal-600 text-white"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900")
              }
            >
              {option === "all" ? "All" : STATUS_LABELS[option]}
            </Link>
          ))}
        </div>
      )}

      {!rows ? (
        <p className="mt-8 text-sm text-red-600">DATABASE_URL is not configured in this environment.</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
          {activeStatus === "all" ? "No inquiries yet." : "No inquiries match this filter."}
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
