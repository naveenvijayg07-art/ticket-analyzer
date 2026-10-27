// ============================================================
// 📂 src/context/ApprovalContext.tsx
// PURPOSE: Global approval/permission system.
//          Every action in this app MUST be approved by the user
//          before executing. Nothing happens without explicit consent.
//
// ⛔ SAFETY RULE:
//    No action (API call, navigation, analysis) proceeds
//    without the user clicking "Approve" first.
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ── Types ──────────────────────────────────────────────────────

export type ApprovalCategory =
  | "DATA_FETCH"       // Loading tickets, modules, etc.
  | "TICKET_VIEW"      // Viewing a specific ticket's details
  | "ANALYSIS"         // Running AI analysis
  | "MODULE_VIEW"      // Viewing module details
  | "NAVIGATION";      // Navigating to a new page

interface ApprovalRequest {
  id: string;
  category: ApprovalCategory;
  title: string;
  description: string;
  details?: string;
  onApprove: () => void;
  onDeny: () => void;
}

interface ApprovalContextValue {
  /** Currently pending approval request (only one at a time) */
  pendingApproval: ApprovalRequest | null;
  /** Request user approval before performing an action */
  requestApproval: (
    category: ApprovalCategory,
    title: string,
    description: string,
    details?: string
  ) => Promise<boolean>;
  /** Approve the current pending request */
  approve: () => void;
  /** Deny the current pending request */
  deny: () => void;
  /** Log of all past approval decisions */
  approvalLog: ApprovalLogEntry[];
}

export interface ApprovalLogEntry {
  id: string;
  category: ApprovalCategory;
  title: string;
  decision: "APPROVED" | "DENIED";
  timestamp: string;
}

// ── Context ────────────────────────────────────────────────────

const ApprovalContext = createContext<ApprovalContextValue | undefined>(undefined);

let approvalCounter = 0;

export const ApprovalProvider = ({ children }: { children: ReactNode }) => {
  const [pendingApproval, setPendingApproval] = useState<ApprovalRequest | null>(null);
  const [approvalLog, setApprovalLog] = useState<ApprovalLogEntry[]>([]);

  const addToLog = useCallback(
    (id: string, category: ApprovalCategory, title: string, decision: "APPROVED" | "DENIED") => {
      setApprovalLog((prev) => [
        ...prev,
        { id, category, title, decision, timestamp: new Date().toISOString() },
      ]);
    },
    []
  );

  const requestApproval = useCallback(
    (
      category: ApprovalCategory,
      title: string,
      description: string,
      details?: string
    ): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const id = `approval-${++approvalCounter}`;

        setPendingApproval({
          id,
          category,
          title,
          description,
          details,
          onApprove: () => {
            addToLog(id, category, title, "APPROVED");
            setPendingApproval(null);
            resolve(true);
          },
          onDeny: () => {
            addToLog(id, category, title, "DENIED");
            setPendingApproval(null);
            resolve(false);
          },
        });
      });
    },
    [addToLog]
  );

  const approve = useCallback(() => {
    pendingApproval?.onApprove();
  }, [pendingApproval]);

  const deny = useCallback(() => {
    pendingApproval?.onDeny();
  }, [pendingApproval]);

  return (
    <ApprovalContext.Provider
      value={{ pendingApproval, requestApproval, approve, deny, approvalLog }}
    >
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApproval = (): ApprovalContextValue => {
  const ctx = useContext(ApprovalContext);
  if (!ctx) throw new Error("useApproval must be used inside <ApprovalProvider>");
  return ctx;
};

