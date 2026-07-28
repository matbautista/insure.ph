import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { STATUS_OPTIONS } from "@/lib/inquiry-status";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1);

  if (!token || !(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const inquiryId = Number(id);
  if (!Number.isInteger(inquiryId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { status, assignee, remarks } = body as Record<string, unknown>;

  if (status !== undefined && !STATUS_OPTIONS.includes(status as (typeof STATUS_OPTIONS)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  if (assignee !== undefined && typeof assignee !== "string") {
    return NextResponse.json({ error: "Invalid assignee" }, { status: 400 });
  }
  if (remarks !== undefined && typeof remarks !== "string") {
    return NextResponse.json({ error: "Invalid remarks" }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const update: Partial<typeof inquiries.$inferInsert> = {};
  if (status !== undefined) update.status = status as string;
  if (assignee !== undefined) update.assignee = assignee as string;
  if (remarks !== undefined) update.remarks = remarks as string;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  await db.update(inquiries).set(update).where(eq(inquiries.id, inquiryId));

  return NextResponse.json({ status: "ok" });
}
