// ============================================================
// 📂 src/api/analysisApi.ts
// PURPOSE: Trigger AI analysis and fetch reports.
//
// ⛔ READ-ONLY RULE:
//    Analysis reads tickets/history from DB — never writes.
//    The POST below triggers a server-side read-only job.
// ============================================================

import type { AnalysisReport } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

/**
 * Trigger a read-only analysis job for a ticket on the server.
 * The server reads the ticket + history then returns insights.
 * Nothing is written to the DB.
 */
export const analyzeTicket = async (ticketId: number): Promise<AnalysisReport> => {
  const res = await fetch(`${BASE_URL}/analyze/ticket/${ticketId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // readOnly flag is a safety signal to the backend
    body: JSON.stringify({ ticketId, readOnly: true }),
  });
  if (!res.ok) throw new Error(`Analysis failed for ticket #${ticketId}`);
  return res.json() as Promise<AnalysisReport>;
};

/** Fetch a cached/saved analysis report (no reanalysis). */
export const fetchAnalysisReport = (ticketId: number): Promise<AnalysisReport> =>
  getJson<AnalysisReport>(`/analyze/report/${ticketId}`);

