// ============================================================
// 📂 src/api/ticketApi.ts
// PURPOSE: All API calls for tickets.
//
// ⛔ READ-ONLY RULE:
//    This file ONLY has GET requests.
//    No POST/PUT/DELETE that writes to the DB.
// ============================================================

import type { Ticket, TicketHistoryRecord } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

// ── Helper ────────────────────────────────────────────────────
async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ── Exported Functions ────────────────────────────────────────

/** Fetch every ticket (for the dashboard list). */
export const fetchAllTickets = (): Promise<Ticket[]> =>
  getJson<Ticket[]>("/tickets");

/** Fetch one ticket by its ID. */
export const fetchTicketById = (id: number): Promise<Ticket> =>
  getJson<Ticket>(`/tickets/${id}`);

/** Fetch the change-history / past records for a ticket. */
export const fetchTicketHistory = (id: number): Promise<TicketHistoryRecord[]> =>
  getJson<TicketHistoryRecord[]>(`/tickets/${id}/history`);

/** Fetch available filter categories (status, priority, module). */
export const fetchTicketCategories = (): Promise<string[]> =>
  getJson<string[]>("/tickets/categories");

