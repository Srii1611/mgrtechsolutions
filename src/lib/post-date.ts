/**
 * Dates in blog frontmatter. Not server-only, so tests and components can use it.
 * Frontmatter may hold "2026-11-13" (a string) or an unquoted YAML date, which
 * the parser turns into a Date; both become "YYYY-MM-DD". Anything else is ignored.
 */
export function asDateString(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed) && !Number.isNaN(Date.parse(`${trimmed}T00:00:00Z`))) return trimmed;
  }
  return undefined;
}

/** "2026-11-13" -> "November 13, 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
