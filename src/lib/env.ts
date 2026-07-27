const APP_ENVS = ["demo", "development", "staging", "production"] as const;

export type AppEnv = (typeof APP_ENVS)[number];

function resolveAppEnv(): AppEnv {
  const value = process.env.NEXT_PUBLIC_APP_ENV;
  if ((APP_ENVS as readonly string[]).includes(value ?? "")) {
    return value as AppEnv;
  }
  throw new Error(
    `NEXT_PUBLIC_APP_ENV is "${value ?? ""}" but must be one of: ${APP_ENVS.join(", ")}. ` +
      "Run via one of the env-scoped npm scripts (dev, dev:demo, dev:staging, build:production, ...) " +
      "so the right .env.<environment> file is loaded.",
  );
}

export const appEnv: AppEnv = resolveAppEnv();
export const appEnvLabel: string = process.env.NEXT_PUBLIC_APP_ENV_LABEL ?? appEnv;
export const isProduction: boolean = appEnv === "production";
export const allowTestEndpoints: boolean = process.env.ALLOW_TEST_ENDPOINTS === "true";
