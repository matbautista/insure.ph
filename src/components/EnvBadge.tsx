import { appEnv, appEnvLabel } from "@/lib/env";

const COLORS: Record<string, string> = {
  demo: "bg-purple-600",
  development: "bg-blue-600",
  staging: "bg-amber-600",
  production: "bg-emerald-700",
};

export function EnvBadge() {
  if (appEnv === "production") return null;

  return (
    <div
      className={`fixed bottom-3 right-3 z-50 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg ${COLORS[appEnv]}`}
    >
      {appEnvLabel.toUpperCase()}
    </div>
  );
}
