import { NextResponse } from "next/server";
import { appEnv, appEnvLabel } from "@/lib/env";

export function GET() {
  return NextResponse.json({
    status: "ok",
    env: appEnv,
    label: appEnvLabel,
    timestamp: new Date().toISOString(),
  });
}
