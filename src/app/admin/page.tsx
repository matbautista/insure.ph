import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Admin | Insure PH",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const rows = db ? await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(200) : null;

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Inquiries</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {rows ? `Latest ${rows.length} submission${rows.length === 1 ? "" : "s"}` : "Database not configured"}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      {!rows ? (
        <p className="mt-8 text-sm text-red-600">DATABASE_URL is not configured in this environment.</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">No inquiries yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {rows.map((row) => (
            <details
              key={row.id}
              className="group rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{row.formType}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(row.createdAt).toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
                </span>
              </summary>
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {Object.entries(row.data as Record<string, unknown>).map(([key, value]) => (
                    <tr key={key} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="py-1.5 pr-4 align-top font-medium whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                        {key}
                      </td>
                      <td className="py-1.5 text-zinc-900 dark:text-zinc-50">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
