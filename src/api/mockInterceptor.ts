// ============================================================
// 📂 src/api/mockInterceptor.ts
// PURPOSE: Intercepts API fetch calls and returns mock data
//          so the app can be tested WITHOUT a real backend.
//
//          Set VITE_USE_MOCK=true in .env to enable.
//
// ⛔ This is for TESTING ONLY. Remove or disable for production.
// ============================================================

import { MOCK_TICKETS, MOCK_HISTORY, MOCK_ANALYSIS, MOCK_MODULES } from "./mockData";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Install mock interceptor. Call BEFORE ReadOnlyGuard so it
 * intercepts first, or call after — both work since mocks
 * only handle GET and whitelisted POST.
 */
export function installMockInterceptor(): void {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const method = (init?.method ?? "GET").toUpperCase();

    // Only intercept API calls
    if (!url.includes("/api/")) {
      return originalFetch(input, init);
    }

    // Simulate network delay
    await delay(300 + Math.random() * 400);

    // ── GET /api/tickets ──────────────────────────────────────
    if (method === "GET" && url.endsWith("/api/tickets")) {
      console.log("🧪 MOCK: Serving all tickets");
      return jsonResponse(MOCK_TICKETS);
    }

    // ── GET /api/tickets/categories ───────────────────────────
    if (method === "GET" && url.endsWith("/api/tickets/categories")) {
      console.log("🧪 MOCK: Serving categories");
      return jsonResponse(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]);
    }

    // ── GET /api/tickets/:id ──────────────────────────────────
    const ticketMatch = url.match(/\/api\/tickets\/(\d+)$/);
    if (method === "GET" && ticketMatch) {
      const id = Number(ticketMatch[1]);
      const ticket = MOCK_TICKETS.find((t) => t.id === id);
      if (ticket) {
        console.log(`🧪 MOCK: Serving ticket #${id}`);
        return jsonResponse(ticket);
      }
      return jsonResponse({ error: "Not found" }, 404);
    }

    // ── GET /api/tickets/:id/history ──────────────────────────
    const historyMatch = url.match(/\/api\/tickets\/(\d+)\/history$/);
    if (method === "GET" && historyMatch) {
      const id = Number(historyMatch[1]);
      console.log(`🧪 MOCK: Serving history for ticket #${id}`);
      return jsonResponse(MOCK_HISTORY[id] ?? []);
    }

    // ── POST /api/analyze/ticket/:id ──────────────────────────
    const analyzeMatch = url.match(/\/api\/analyze\/ticket\/(\d+)$/);
    if (method === "POST" && analyzeMatch) {
      const id = Number(analyzeMatch[1]);
      const report = MOCK_ANALYSIS[id];
      if (report) {
        console.log(`🧪 MOCK: Serving analysis for ticket #${id}`);
        return jsonResponse(report);
      }
      // Generate a generic report for tickets without a specific mock
      console.log(`🧪 MOCK: Generating generic analysis for ticket #${id}`);
      return jsonResponse({
        ticketId: id,
        analyzedAt: new Date().toISOString(),
        summary: `Analysis of ticket #${id}. This is a standard ticket with no dangerous operations detected.`,
        rootCauseHints: ["Requires further investigation by the assigned developer."],
        relatedModules: [MOCK_TICKETS.find((t) => t.id === id)?.module ?? "Unknown"],
        pastActionsReview: "See the ticket history timeline for all recorded actions.",
        suggestions: ["Continue investigation following standard procedures."],
        confidence: "MEDIUM" as const,
      });
    }

    // ── GET /api/analyze/report/:id ───────────────────────────
    const reportMatch = url.match(/\/api\/analyze\/report\/(\d+)$/);
    if (method === "GET" && reportMatch) {
      const id = Number(reportMatch[1]);
      const report = MOCK_ANALYSIS[id];
      if (report) {
        console.log(`🧪 MOCK: Serving cached report for ticket #${id}`);
        return jsonResponse(report);
      }
      return jsonResponse({ error: "No report found" }, 404);
    }

    // ── GET /api/modules ──────────────────────────────────────
    if (method === "GET" && url.endsWith("/api/modules")) {
      console.log("🧪 MOCK: Serving all modules");
      return jsonResponse(MOCK_MODULES);
    }

    // ── GET /api/modules/:name ────────────────────────────────
    const moduleMatch = url.match(/\/api\/modules\/([^/]+)$/);
    if (method === "GET" && moduleMatch) {
      const name = moduleMatch[1];
      const mod = MOCK_MODULES.find((m) => m.name === name);
      if (mod) {
        console.log(`🧪 MOCK: Serving module ${name}`);
        return jsonResponse(mod);
      }
      return jsonResponse({ error: "Module not found" }, 404);
    }

    // ── Unmatched — pass through to real fetch (will be caught by ReadOnlyGuard if unsafe)
    console.warn(`🧪 MOCK: No mock for ${method} ${url} — passing through`);
    return originalFetch(input, init);
  };

  console.log("🧪 Mock Interceptor installed — using fake data for testing.");
}

