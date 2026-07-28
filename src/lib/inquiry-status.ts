export const STATUS_OPTIONS = ["new", "in-progress", "contacted", "closed"] as const;

export type InquiryStatus = (typeof STATUS_OPTIONS)[number];

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "New",
  "in-progress": "In Progress",
  contacted: "Contacted",
  closed: "Closed",
};
