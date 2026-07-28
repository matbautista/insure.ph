import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!(await verifyAdminPassword(body.password))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const response = NextResponse.json({ status: "ok" });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    // Local dev/demo/staging often run over plain http; only require https
    // when the request actually arrived over it (production).
    secure: new URL(request.url).protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
