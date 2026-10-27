// ============================================================
// 📂 src/components/common/ApprovalDialog.tsx
// PURPOSE: Modal dialog that asks user for explicit permission
//          before ANY action is performed. Nothing proceeds
//          without clicking "✅ Approve".
//
// ⛔ SAFETY RULE:
//    This is the ONLY way actions get authorized in this app.
// ============================================================

import React from "react";
import { useApproval, type ApprovalCategory } from "../../context/ApprovalContext";

// Category icons and colors
const categoryMeta: Record<ApprovalCategory, { icon: string; color: string }> = {
  DATA_FETCH:    { icon: "📡", color: "#0066cc" },
  TICKET_VIEW:   { icon: "🎫", color: "#28a745" },
  ANALYSIS:      { icon: "🤖", color: "#7b00e0" },
  MODULE_VIEW:   { icon: "🖥️", color: "#e07b00" },
  NAVIGATION:    { icon: "🧭", color: "#6c757d" },
};

const ApprovalDialog = () => {
  const { pendingApproval, approve, deny } = useApproval();

  if (!pendingApproval) return null;

  const meta = categoryMeta[pendingApproval.category];

  return (
    <div className="approval-overlay" role="dialog" aria-modal="true">
      <div className="approval-dialog">
        {/* Header */}
        <div className="approval-header" style={{ borderColor: meta.color }}>
          <span className="approval-icon">{meta.icon}</span>
          <h2 className="approval-title">Permission Required</h2>
        </div>

        {/* Body */}
        <div className="approval-body">
          <div className="approval-category-badge" style={{ backgroundColor: meta.color }}>
            {pendingApproval.category.replace("_", " ")}
          </div>

          <h3 className="approval-action-title">{pendingApproval.title}</h3>
          <p className="approval-description">{pendingApproval.description}</p>

          {pendingApproval.details && (
            <div className="approval-details">
              <strong>Details:</strong>
              <p>{pendingApproval.details}</p>
            </div>
          )}

          <div className="approval-safety-notice">
            <span className="safety-icon">🔒</span>
            <span>This action is <strong>READ-ONLY</strong>. No data will be written or modified.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="approval-actions">
          <button className="approval-btn deny-btn" onClick={deny}>
            ❌ Deny
          </button>
          <button className="approval-btn approve-btn" onClick={approve}>
            ✅ Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalDialog;

