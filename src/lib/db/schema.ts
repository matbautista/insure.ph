import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

// Form field sets vary by formType (see src/lib/forms.ts) — auto quotes carry
// vehicle fields, life insurance carries dependents, etc. Rather than a wide
// table of mostly-null columns per form type, `data` holds the submitted
// fields as-is; `formType` is what you'd filter/group by when reviewing leads.
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  // Internal triage fields — never accepted from the public submission
  // endpoint (see src/app/api/inquiries/route.ts), only set/edited from the
  // authenticated admin dashboard.
  status: text("status").notNull().default("new"),
  assignee: text("assignee").notNull().default("Admin"),
  remarks: text("remarks").notNull().default(""),
});
