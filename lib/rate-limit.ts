/**
 * Sliding-window in-memory rate limiter.
 * Resets on cold start — acceptable for an internal tool.
 * For multi-instance scale, swap the Map for Upstash Redis.
 */
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

const store = new Map<string, number[]>();

/**
 * Returns true if the IP has exceeded the rate limit.
 * Call this before doing expensive work.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (store.get(ip) ?? []).filter(
    (ts) => now - ts < WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS) return true;
  timestamps.push(now);
  store.set(ip, timestamps);
  return false;
}

/** Extract the real client IP from Next.js request headers. */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}
