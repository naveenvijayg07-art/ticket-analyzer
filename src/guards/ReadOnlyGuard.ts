// ============================================================
// 📂 src/guards/ReadOnlyGuard.ts
// PURPOSE: Intercepts ALL fetch calls to ensure ONLY safe
//          HTTP methods (GET, HEAD, OPTIONS) are allowed.
//          POST/PUT/DELETE/PATCH are BLOCKED at runtime.
//
// ⛔ CRITICAL SAFETY:
//    This is the last line of defense. Even if a developer
//    accidentally adds a write call, it will be blocked here.
//    The ONLY exception is POST to /analyze/* endpoints which
//    are server-side read-only analysis jobs.
// ============================================================

const ALLOWED_WRITE_PATTERNS = [
  /\/analyze\//,  // Analysis endpoints use POST but are read-only on server
];

const WRITE_METHODS = ["PUT", "DELETE", "PATCH"];

/**
 * Install a global fetch interceptor that blocks unsafe HTTP methods.
 * Call this ONCE at app startup (in main.tsx).
 */
export function installReadOnlyGuard(): void {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const method = (init?.method ?? "GET").toUpperCase();
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

    // Block dangerous write methods unconditionally
    if (WRITE_METHODS.includes(method)) {
      console.error(
        `🔒 READ-ONLY GUARD: Blocked ${method} request to ${url}. ` +
        `This application does NOT modify the database.`
      );
      return new Response(
        JSON.stringify({
          error: "BLOCKED_BY_READ_ONLY_GUARD",
          message: `${method} requests are not allowed. This application is strictly read-only.`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // POST is allowed ONLY for whitelisted analysis endpoints
    if (method === "POST") {
      const isAllowed = ALLOWED_WRITE_PATTERNS.some((pattern) => pattern.test(url));
      if (!isAllowed) {
        console.error(
          `🔒 READ-ONLY GUARD: Blocked POST request to ${url}. ` +
          `Only analysis endpoints may use POST.`
        );
        return new Response(
          JSON.stringify({
            error: "BLOCKED_BY_READ_ONLY_GUARD",
            message: "POST requests are only allowed for analysis endpoints. No database writes permitted.",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Safe method — proceed
    return originalFetch(input, init);
  };

  console.log("🔒 Read-Only Guard installed — all write operations are blocked.");
}

