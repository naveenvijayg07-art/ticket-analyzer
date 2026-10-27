// ============================================================
// 📂 src/context/TicketContext.tsx
// PURPOSE: Global shared state for tickets.
//          Any page can READ tickets from here.
//
// Beginner tip: "Context" = a way to share data across the whole
// app without passing props down manually through every component.
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Ticket, TicketHistoryRecord } from "../types";
import {
  fetchAllTickets,
  fetchTicketById,
  fetchTicketHistory,
} from "../api/ticketApi";

// ── Shape of the context value ─────────────────────────────────
interface TicketContextValue {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  ticketHistory: TicketHistoryRecord[];
  loading: boolean;
  error: string | null;
  loadTickets: () => Promise<void>;
  loadTicketDetails: (id: number) => Promise<void>;
  setSelectedTicket: (t: Ticket | null) => void;
}

// ── Create the context ─────────────────────────────────────────
const TicketContext = createContext<TicketContextValue | undefined>(undefined);

// ── Provider component ─────────────────────────────────────────
export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketHistory, setTicketHistory] = useState<TicketHistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Load all tickets — READ ONLY */
  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllTickets();
      setTickets(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Load one ticket + its full history — READ ONLY */
  const loadTicketDetails = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const [ticket, history] = await Promise.all([
        fetchTicketById(id),
        fetchTicketHistory(id),
      ]);
      setSelectedTicket(ticket);
      setTicketHistory(history);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        selectedTicket,
        ticketHistory,
        loading,
        error,
        loadTickets,
        loadTicketDetails,
        setSelectedTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

// ── Custom hook — use this in any component ────────────────────
export const useTickets = (): TicketContextValue => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used inside <TicketProvider>");
  return ctx;
};

