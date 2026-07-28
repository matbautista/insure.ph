"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS_OPTIONS } from "@/lib/inquiry-status";
import { calculateAge } from "@/lib/age";

export function InquiryCard({
  id,
  formType,
  createdAt,
  data,
  status: initialStatus,
  assignee: initialAssignee,
  remarks: initialRemarks,
}: {
  id: number;
  formType: string;
  createdAt: string;
  data: Record<string, unknown>;
  status: string;
  assignee: string;
  remarks: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [assignee, setAssignee] = useState(initialAssignee);
  const [remarks, setRemarks] = useState(initialRemarks);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = status !== initialStatus || assignee !== initialAssignee || remarks !== initialRemarks;

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, assignee, remarks }),
      });
      if (!res.ok) {
        setError("Failed to save. Try again.");
        return;
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this inquiry? This cannot be undone.")) return;

    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Failed to delete. Try again.");
        return;
      }
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <details className="group rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
        <span className="font-semibold text-zinc-900 dark:text-zinc-50">{formType}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {new Date(createdAt).toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
        </span>
      </summary>

      <table className="mt-3 w-full text-sm">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            const age = key === "birthdate" && typeof value === "string" ? calculateAge(value) : null;
            return (
              <tr key={key} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="py-1.5 pr-4 align-top font-medium whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                  {key}
                </td>
                <td className="py-1.5 text-zinc-900 dark:text-zinc-50">
                  {String(value)}
                  {age !== null && <span className="text-zinc-500 dark:text-zinc-400"> (Age {age})</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 grid grid-cols-1 gap-3 rounded-md bg-zinc-50 p-3 dark:bg-zinc-900 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Assignee
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 sm:col-span-2">
          Remarks
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={2}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </label>

        <div className="flex items-center gap-3 sm:col-span-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving || deleting}
            className="rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="rounded-full border border-red-300 px-4 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>
    </details>
  );
}
