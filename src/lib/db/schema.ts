import { pgTable, pgSequence, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

// One sequence per form type so reference numbers (see src/lib/reference-number.ts)
// count up independently per prefix (CA000001, CA000002, ... MI000001, ...)
// rather than sharing one global counter across unrelated inquiry types.
export const caRefSeq = pgSequence("ref_seq_ca", { startWith: 1, minValue: 1 });
export const miRefSeq = pgSequence("ref_seq_mi", { startWith: 1, minValue: 1 });
export const liRefSeq = pgSequence("ref_seq_li", { startWith: 1, minValue: 1 });
export const hmoRefSeq = pgSequence("ref_seq_hmo", { startWith: 1, minValue: 1 });
export const pfiRefSeq = pgSequence("ref_seq_pfi", { startWith: 1, minValue: 1 });
export const mpRefSeq = pgSequence("ref_seq_mp", { startWith: 1, minValue: 1 });
export const giRefSeq = pgSequence("ref_seq_gi", { startWith: 1, minValue: 1 });

// Form field sets vary by formType (see src/lib/forms.ts) — auto quotes carry
// vehicle fields, life insurance carries dependents, etc. Rather than a wide
// table of mostly-null columns per form type, `data` holds the submitted
// fields as-is; `formType` is what you'd filter/group by when reviewing leads.
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(),
  // Human-facing lookup number (e.g. "LI000042"), assigned once at insert
  // time via generateReferenceNumber() — see src/lib/reference-number.ts.
  referenceNumber: text("reference_number").notNull().unique(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  // Internal triage fields — never accepted from the public submission
  // endpoint (see src/app/api/inquiries/route.ts), only set/edited from the
  // authenticated admin dashboard.
  status: text("status").notNull().default("new"),
  assignee: text("assignee").notNull().default("Admin"),
  remarks: text("remarks").notNull().default(""),
});
