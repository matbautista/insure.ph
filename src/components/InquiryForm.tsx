"use client";

import { useState, type FormEvent } from "react";
import type { FormDefinition } from "@/lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ form }: { form: FormDefinition }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formEl = event.currentTarget;
    const data = Object.fromEntries(new FormData(formEl));

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: form.formType, data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
        <p className="font-semibold">Thank you — we&apos;ve received your request.</p>
        <p className="mt-1 text-sm">
          An Insure PH advisor will get back to you shortly. For urgent matters, call us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {form.fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-1 text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-600"> *</span>}
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              defaultValue=""
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              <option value="" disabled>
                Select an option
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
          )}
        </label>
      ))}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-gradient-to-r from-blue-700 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-md hover:from-blue-800 hover:to-teal-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : form.submitLabel}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your request. Please try again or email{" "}
          <a href="mailto:info@insureph.org" className="underline">
            info@insureph.org
          </a>
          .
        </p>
      )}
    </form>
  );
}
