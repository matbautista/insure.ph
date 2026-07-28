export function withFilterParam(currentSearch: string, key: string, value: string): string {
  const params = new URLSearchParams(currentSearch);
  if (value === "all" || value === "") params.delete(key);
  else params.set(key, value);
  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}
