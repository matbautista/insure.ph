import { Resend } from "resend";
import { business } from "@/lib/business";

// Mirrors src/lib/db/client.ts: null when unconfigured rather than throwing
// at import time, so a build without secrets doesn't break.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendInquiryEmail(formType: string, data: Record<string, unknown>) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap;">${escapeHtml(key)}</td><td style="padding:4px 0;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  // The Resend SDK does NOT throw on API-level failures (bad domain, rate
  // limit, etc.) — it catches them internally and resolves with
  // { data: null, error }. Awaiting without checking `error` means a failed
  // send silently looks like success to every caller up the chain.
  const { error } = await resend.emails.send({
    from: process.env.INQUIRY_FROM_EMAIL || "Insure PH <onboarding@resend.dev>",
    to: business.email,
    replyTo: typeof data.email === "string" ? data.email : undefined,
    subject: `New inquiry: ${formType}`,
    html: `<table cellspacing="0" cellpadding="0">${rows}</table>`,
  });

  if (error) {
    throw new Error(`Resend API error (${error.name}): ${error.message}`);
  }
}
