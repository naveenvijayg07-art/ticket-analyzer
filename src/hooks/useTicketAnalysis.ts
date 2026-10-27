// ============================================================
// 📂 src/hooks/useTicketAnalysis.ts
// PURPOSE: Combines ticket loading + AI analysis in one hook.
//
// Beginner tip: Custom hooks are just functions starting with
// "use" that can share stateful logic between components.
// ============================================================

import { useState, useEffect } from "react";
import type { AnalysisReport } from "../types";
import { useTickets } from "../context/TicketContext";
import { useAnalysis } from "../context/AnalysisContext";

interface UseTicketAnalysisResult {
  ticket: ReturnType<typeof useTickets>["selectedTicket"];
  history: ReturnType<typeof useTickets>["ticketHistory"];
  report: AnalysisReport | null;
  loading: boolean;
  error: string | null;
}

/**
 * All-in-one hook for TicketDetailPage.
 * 1. Loads the ticket + its history from API
 * 2. Runs read-only AI analysis
 * 3. Returns everything needed to render the detail view
 */
const useTicketAnalysis = (ticketId: number): UseTicketAnalysisResult => {
  const {
    selectedTicket,
    ticketHistory,
    loadTicketDetails,
    loading: ticketLoading,
    error: ticketError,
  } = useTickets();

  const { runAnalysis, analyzing, error: analysisError } = useAnalysis();
  const [report, setReport] = useState<AnalysisReport | null>(null);

  // Step 1 — Load ticket + history whenever ticketId changes
  useEffect(() => {
    loadTicketDetails(ticketId);
  }, [ticketId, loadTicketDetails]);

  // Step 2 — Once ticket is loaded, trigger read-only analysis
  useEffect(() => {
    if (selectedTicket?.id === ticketId) {
      runAnalysis(ticketId).then((r) => {
        if (r) setReport(r);
      });
    }
  }, [selectedTicket, ticketId, runAnalysis]);

  return {
    ticket: selectedTicket,
    history: ticketHistory,
    report,
    loading: ticketLoading || analyzing,
    error: ticketError || analysisError,
  };
};

export default useTicketAnalysis;

