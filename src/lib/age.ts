// Computed at display time rather than stored, so it's always accurate as
// of viewing rather than a snapshot that goes stale after submission.
export function calculateAge(birthdate: string): number | null {
  const dob = new Date(birthdate);
  if (Number.isNaN(dob.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
