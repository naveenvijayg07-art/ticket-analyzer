// ============================================================
// 📂 src/components/analysis/AnalysisReportPanel.tsx
// PURPOSE: Shows the AI-generated analysis & concrete solution.
//          Includes root cause, exact code/SQL fixes, step-by-step
//          procedure, rollback plans, and prevention advice.
//
// ⛔ SAFETY: All solutions require manual human execution.
// ============================================================

import React from "react";
import type { AnalysisReport } from "../../types";
import LoadingSpinner from "../common/LoadingSpinner";
import CodeBlock from "../common/CodeBlock";

interface Props {
  report: AnalysisReport | null;
  ticketId: number | string;
}

// Maps confidence level to a color
const confidenceColor = {
  LOW: "#dc3545",
  MEDIUM: "#e07b00",
  HIGH: "#28a745",
};

const severityStyles: Record<string, { bg: string; color: string; border: string }> = {
  INFO: { bg: "#e7f3ff", color: "#0066cc", border: "#b6d4fe" },
  WARNING: { bg: "#fff3cd", color: "#856404", border: "#ffeeba" },
  CRITICAL: { bg: "#f8d7da", color: "#721c24", border: "#f5c6cb" },
};

const AnalysisReportPanel = ({ report, ticketId }: Props) => {
  if (!report) {
    return (
      <div className="card analysis-card">
        <h3 className="card-title">🤖 AI Solution Engine</h3>
        <LoadingSpinner message={`Generating comprehensive solution for ticket #${ticketId}...`} />
      </div>
    );
  }

  const { solution } = report;

  return (
    <div className="card analysis-card">
      {/* Header */}
      <div className="card-header">
        <div>
          <h3 className="card-title">🛠️ Engineering Analysis & Solution</h3>
          <p className="card-subtitle-small">
            Automated diagnostic report with step-by-step resolution
          </p>
        </div>
        <span
          className="confidence-badge"
          style={{ color: confidenceColor[report.confidence] }}
        >
          Confidence: {report.confidence}
        </span>
      </div>

      <div className="card-body">
        {/* Dangerous Request Alert */}
        {solution?.isDangerous && (
          <div className="danger-alert-box">
            <div className="danger-alert-header">
              <span className="danger-icon">🚨</span>
              <h4>DESTRUCTIVE OPERATION WARNING</h4>
            </div>
            <p className="danger-alert-msg">
              {solution.dangerWarning ||
                "This ticket requests destructive database actions (delete/drop/bulk-update). Automated execution is strictly blocked. Follow the manual DBA instructions below."}
            </p>
          </div>
        )}

        {/* Issue Summary */}
        <section className="analysis-section">
          <h4 className="section-heading">📝 Diagnostic Summary</h4>
          <p className="summary-text">{report.summary}</p>
        </section>

        {/* Concrete Solution Block */}
        {solution && (
          <section className="analysis-section solution-main-section">
            <div
              className="solution-banner"
              style={{
                backgroundColor: severityStyles[solution.severity]?.bg,
                borderColor: severityStyles[solution.severity]?.border,
                color: severityStyles[solution.severity]?.color,
              }}
            >
              <div className="solution-banner-content">
                <span className="solution-severity-pill">
                  {solution.severity} SEVERITY
                </span>
                <h3 className="solution-headline">{solution.solutionTitle}</h3>
              </div>
            </div>

            {/* Solution Metadata Grid */}
            <div className="solution-meta-grid">
              <div className="meta-item">
                <span className="meta-label">👤 Target Role:</span>
                <span className="meta-value role-tag">{solution.requiredRole}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">⏱️ Est. Effort:</span>
                <span className="meta-value">{solution.estimatedEffort}</span>
              </div>
              {solution.affectedTables && solution.affectedTables.length > 0 && (
                <div className="meta-item">
                  <span className="meta-label">📦 Affected Tables:</span>
                  <span className="meta-value tables-list">
                    {solution.affectedTables.map((tbl) => (
                      <code key={tbl} className="table-chip">{tbl}</code>
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* Detailed Root Cause Analysis */}
            <div className="root-cause-box">
              <h4 className="sub-heading">🔍 Deep Root Cause Analysis</h4>
              <p>{solution.rootCause}</p>
            </div>

            {/* Step-by-Step Fix Procedure */}
            <div className="steps-container">
              <h4 className="sub-heading">
                🛠️ Step-by-Step Resolution Procedure ({solution.steps.length} Steps)
              </h4>

              <div className="steps-list">
                {solution.steps.map((step) => (
                  <div key={step.stepNumber} className="solution-step-card">
                    <div className="step-card-header">
                      <span className="step-number-bubble">{step.stepNumber}</span>
                      <div className="step-header-text">
                        <h5 className="step-title">{step.title}</h5>
                        {step.requiresManualExecution && (
                          <span className="manual-badge">
                            ✋ Manual Execution Required
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="step-description">{step.description}</p>

                    {/* Step Warning if any */}
                    {step.warning && (
                      <div className="step-warning-box">
                        <span className="warning-icon">⚠️</span>
                        <span>{step.warning}</span>
                      </div>
                    )}

                    {/* Code / Script Snippet */}
                    {step.code && (
                      <CodeBlock
                        code={step.code}
                        language={step.codeLanguage || "sql"}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rollback Plan */}
            {solution.rollbackPlan && (
              <div className="rollback-box">
                <h4 className="sub-heading">🔄 Rollback Plan / Emergency Recovery</h4>
                <p>{solution.rollbackPlan}</p>
              </div>
            )}

            {/* Prevention Checklist */}
            {solution.preventionSteps && solution.preventionSteps.length > 0 && (
              <div className="prevention-box">
                <h4 className="sub-heading">🛡️ Long-Term Prevention Measures</h4>
                <ul className="prevention-list">
                  {solution.preventionSteps.map((p, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">✔</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Fallback suggestions if no solution object exists */}
        {!solution && report.suggestions && report.suggestions.length > 0 && (
          <section className="analysis-section">
            <h4 className="section-heading">💡 Action Items</h4>
            <ul className="analysis-list suggestions-list">
              {report.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Root Cause Hints (if present) */}
        {report.rootCauseHints && report.rootCauseHints.length > 0 && (
          <section className="analysis-section">
            <h4 className="section-heading">🔎 Diagnostic Factors</h4>
            <ul className="analysis-list">
              {report.rootCauseHints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Related Modules */}
        <section className="analysis-section">
          <h4 className="section-heading">🖥️ Related Modules & Screens</h4>
          <div className="tags-row">
            {report.relatedModules.map((mod) => (
              <span key={mod} className="module-tag">
                {mod}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <p className="analysis-footer">
          Generated at: {new Date(report.analyzedAt).toLocaleString()} • Strictly Read-Only
        </p>
      </div>
    </div>
  );
};

export default AnalysisReportPanel;
