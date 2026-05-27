/**
 * SSRF protection — blocks requests to private/loopback IP ranges and
 * bare hostnames that should never appear in a public audit URL.
 */

const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^0\.0\.0\.0$/,
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^169\.254\./,               // link-local
  /^::1$/,                     // IPv6 loopback
  /^fc00:/i,                   // IPv6 unique local
  /^fd[0-9a-f]{2}:/i,
  /^fe80:/i,                   // IPv6 link-local
];

// Hostnames with no TLD or known internal names
const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "internal",
  "local",
  "intranet",
  "corp",
  "host.docker.internal",
  "metadata.google.internal",
]);

/**
 * Returns true if the URL should be blocked to prevent SSRF.
 * Call before any outbound fetch.
 */
export function isBlockedUrl(rawUrl: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return true; // malformed — block it
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^\[/, "").replace(/\]$/, "");

  if (BLOCKED_HOSTNAMES.has(hostname)) return true;
  if (PRIVATE_HOST_PATTERNS.some((re) => re.test(hostname))) return true;

  // Block bare hostnames (no dot = likely internal DNS)
  if (!hostname.includes(".")) return true;

  return false;
}
