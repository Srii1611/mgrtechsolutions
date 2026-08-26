/**
 * Fixed-window in-memory rate limiter.
 *
 * On serverless this is per-instance, so it is BEST-EFFORT: it raises the
 * cost of casual abuse and accidental double-submits. It is deliberately not
 * a distributed limiter. If lead spam ever becomes a real problem, move this
 * to a shared store rather than tightening the numbers here.
 */
export const LIMIT = 5;
export const WINDOW_MS = 10 * 60 * 1000;

type Window = { count: number; startedAt: number };
const windows = new Map<string, Window>();

export function rateLimit(
  key: string,
  now: number = Date.now(),
): { ok: boolean; retryAfterSeconds: number } {
  const existing = windows.get(key);

  if (!existing || now - existing.startedAt >= WINDOW_MS) {
    windows.set(key, { count: 1, startedAt: now });
    return { ok: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= LIMIT) {
    const elapsed = now - existing.startedAt;
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - elapsed) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, retryAfterSeconds: 0 };
}

/** Test seam. Not used in production code. */
export function __resetRateLimit(): void {
  windows.clear();
}
