import { NextResponse } from "next/server";

// TODO: no email/CRM/DB backend has been chosen yet (see ENVIRONMENTS.md).
// For now this validates the payload and logs it server-side so nothing is
// silently lost. Wire this to a real destination (e.g. send an email via a
// transactional email provider, write to a DB, or forward to a CRM) once
// one is chosen.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.formType !== "string" || typeof body.data !== "object") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  console.log("[inquiry]", body.formType, body.data);

  return NextResponse.json({ status: "received" });
}
