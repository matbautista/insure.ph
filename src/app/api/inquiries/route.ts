import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { sendInquiryEmail } from "@/lib/email";
import { generateReferenceNumber } from "@/lib/reference-number";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.formType !== "string" || typeof body.data !== "object") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { formType, data } = body as { formType: string; data: Record<string, unknown> };

  // The database write is the source of truth for a lead — if it fails, tell
  // the submitter so they know to try again or contact us directly, rather
  // than showing "success" for a submission that was never actually saved.
  if (!db) {
    console.error("[inquiry] DATABASE_URL is not configured — submission not saved:", formType, data);
    return NextResponse.json({ error: "Inquiries are not being accepted right now" }, { status: 503 });
  }

  let referenceNumber: string;
  try {
    referenceNumber = await generateReferenceNumber(formType);
    await db.insert(inquiries).values({ formType, referenceNumber, data });
  } catch (err) {
    console.error("[inquiry] failed to write to database:", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }

  // Email is a best-effort notification on top of the DB write — the lead is
  // already safely saved, so a failure here shouldn't fail the request, just
  // get logged for someone to notice the notification didn't go out.
  try {
    await sendInquiryEmail(formType, data);
  } catch (err) {
    console.error("[inquiry] failed to send notification email:", err);
  }

  return NextResponse.json({ status: "received", referenceNumber });
}
