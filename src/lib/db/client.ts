import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// `db` is null when DATABASE_URL isn't set (e.g. no .env.<environment>.local
// yet, or a build running without secrets) rather than throwing at import
// time — that would break `next build` for any environment that hasn't been
// provisioned yet. Callers must check for null before using it.
//
// Uses Neon's HTTP driver (fetch-based, no persistent connection) since it's
// what this app is provisioned against — see ENVIRONMENTS.md. Switching to a
// different Postgres host later just means swapping this for
// drizzle-orm/postgres-js + the `postgres` package.
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return drizzle(neon(url), { schema });
}

export const db = createDb();
