import { sql } from "drizzle-orm";
import { db } from "./db/client";

// Keys are src/lib/forms.ts formType values. Falls back to GI (General
// Inquiry) for any formType this map doesn't recognize, so a future form
// type still gets a reference number instead of failing the submission.
const PREFIX_BY_FORM_TYPE: Record<string, string> = {
  "claims-assistance": "CA",
  "auto-insurance-quote": "MI",
  "life-insurance-inquiry": "LI",
  "hmo-insurance-inquiry": "HMO",
  "property-fire-insurance-quote": "PFI",
  "memorial-plan-inquiry": "MP",
  "general-inquiry": "GI",
};

const SEQUENCE_BY_FORM_TYPE: Record<string, string> = {
  "claims-assistance": "ref_seq_ca",
  "auto-insurance-quote": "ref_seq_mi",
  "life-insurance-inquiry": "ref_seq_li",
  "hmo-insurance-inquiry": "ref_seq_hmo",
  "property-fire-insurance-quote": "ref_seq_pfi",
  "memorial-plan-inquiry": "ref_seq_mp",
  "general-inquiry": "ref_seq_gi",
};

// Sequence names above come only from this fixed internal map (never from
// the request body), so building the nextval() call with sql.raw is safe —
// there's no way for a caller-supplied formType to inject an arbitrary
// identifier here.
export async function generateReferenceNumber(formType: string): Promise<string> {
  if (!db) throw new Error("DATABASE_URL is not configured");

  const prefix = PREFIX_BY_FORM_TYPE[formType] ?? "GI";
  const sequenceName = SEQUENCE_BY_FORM_TYPE[formType] ?? "ref_seq_gi";

  const result = await db.execute<{ nextval: string }>(sql.raw(`select nextval('${sequenceName}') as nextval`));
  const n = result.rows[0].nextval;
  return prefix + n.padStart(6, "0");
}
