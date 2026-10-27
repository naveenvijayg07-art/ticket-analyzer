// ============================================================
// 📂 src/context/AnalysisContext.tsx
// PURPOSE: Global shared state for AI analysis reports.
//          Reports are cached in memory so we don't re-analyze
//          the same ticket multiple times.
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AnalysisReport } from "../types";
import { analyzeTicket, fetchAnalysisReport } from "../api/analysisApi";

// ── Cache type: ticketId (number) → AnalysisReport ────────────
type ReportsCache = Record<number, AnalysisReport>;

interface AnalysisContextValue {
  reportsCache: ReportsCache;
  analyzing: boolean;
  error: string | null;
  runAnalysis: (ticketId: number) => Promise<AnalysisReport | undefined>;
  loadReport: (ticketId: number) => Promise<AnalysisReport | undefined>;
}

const AnalysisContext = createContext<AnalysisContextValue | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [reportsCache, setReportsCache] = useState<ReportsCache>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Trigger read-only analysis. Returns cached result if already done. */
  const runAnalysis = useCallback(
    async (ticketId: number): Promise<AnalysisReport | undefined> => {
      if (reportsCache[ticketId]) return reportsCache[ticketId]; // use cache

      setAnalyzing(true);
      setError(null);
      try {
        const report = await analyzeTicket(ticketId);
        setReportsCache((prev) => ({ ...prev, [ticketId]: report }));
        return report;
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setAnalyzing(false);
      }
    },
    [reportsCache]
  );

  /** Load a previously saved report (no re-analysis). */
  const loadReport = useCallback(
    async (ticketId: number): Promise<AnalysisReport | undefined> => {
      if (reportsCache[ticketId]) return reportsCache[ticketId];

      setAnalyzing(true);
      try {
        const report = await fetchAnalysisReport(ticketId);
        setReportsCache((prev) => ({ ...prev, [ticketId]: report }));
        return report;
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setAnalyzing(false);
      }
    },
    [reportsCache]
  );

  return (
    <AnalysisContext.Provider
      value={{ reportsCache, analyzing, error, runAnalysis, loadReport }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = (): AnalysisContextValue => {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used inside <AnalysisProvider>");
  return ctx;
};

