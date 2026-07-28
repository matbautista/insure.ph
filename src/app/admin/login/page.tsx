"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError(res.status === 401 ? "Incorrect password." : "Something went wrong. Try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-zinc-200 p-8 dark:border-zinc-800">
        <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Admin Login</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Insure PH inquiries dashboard.</p>

        <label className="mt-6 flex flex-col gap-1 text-sm font-medium">
          Password
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700 disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
