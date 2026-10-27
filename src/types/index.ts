// ============================================================
// 📂 src/types/index.ts
// PURPOSE: All shared TypeScript types/interfaces live here.
//          This is like a "dictionary" of your data shapes.
//          Beginners: think of interfaces as blueprints for objects.
// ============================================================

// ----- TICKET -----------------------------------------------

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  module: string;          // which screen/module this ticket belongs to
  raisedBy: string;        // who raised this ticket
  assignedTo?: string;     // optional: who it's assigned to
  createdAt: string;       // ISO date string
  updatedAt: string;
}

// ----- TICKET HISTORY ----------------------------------------
// Past records: what actions were taken on this ticket before

export interface TicketHistoryRecord {
  id: number;
  ticketId: number;
  action: string;          // e.g., "Status changed to IN_PROGRESS"
  performedBy: string;     // who did it
  performedAt: string;     // when (ISO date)
  note?: string;           // optional note/comment
}

// ----- MODULE ------------------------------------------------
// A "module" = one screen/feature area in your software

export interface Module {
  name: string;
  displayLabel: string;
  description: string;
  relatedTables?: string[]; // DB tables this module reads from (read-only reference)
  fields?: ModuleField[];
}

export interface ModuleField {
  fieldName: string;
  type: string;
  description: string;
}

// ----- SOLUTION STEP -----------------------------------------
// A single actionable step in a solution

export interface SolutionStep {
  stepNumber: number;
  title: string;
  description: string;
  code?: string;           // Code snippet (SQL, C#, config, etc.)
  codeLanguage?: string;   // "sql" | "csharp" | "json" | "bash" | "config" etc.
  warning?: string;        // Any caution for this step
  requiresManualExecution: boolean; // true = human must run this, app won't
}

// ----- SOLUTION ----------------------------------------------
// Complete solution for a ticket

export interface Solution {
  solutionTitle: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  isDangerous: boolean;           // true if ticket requests write/delete operations
  dangerWarning?: string;         // Warning message for dangerous requests
  rootCause: string;              // Detailed root cause explanation
  steps: SolutionStep[];          // Step-by-step fix procedure
  preventionSteps?: string[];     // How to prevent this in the future
  estimatedEffort: string;        // e.g., "30 minutes", "2 hours"
  requiredRole: string;           // Who should execute this: "DBA", "Developer", etc.
  affectedTables?: string[];      // DB tables involved
  rollbackPlan?: string;          // How to undo if something goes wrong
}

// ----- ANALYSIS REPORT ---------------------------------------
// What the AI agent found after reading the ticket + history

export interface AnalysisReport {
  ticketId: number;
  analyzedAt: string;

  summary: string;                // Short plain-English summary of the issue
  rootCauseHints: string[];       // Possible reasons why this happened
  relatedModules: string[];       // Which modules are involved
  pastActionsReview: string;      // What was done historically — read from history
  suggestions: string[];          // Suggested next steps (for human to review)
  confidence: "LOW" | "MEDIUM" | "HIGH"; // How confident is the analysis

  // NEW: Proper solutions with code and step-by-step instructions
  solution?: Solution;
}

// ----- API RESPONSE WRAPPERS ---------------------------------

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
