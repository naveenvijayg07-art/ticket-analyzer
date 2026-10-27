// ============================================================
// 📂 src/components/tickets/TicketHistoryTimeline.tsx
// PURPOSE: Shows a chronological timeline of all past actions
//          taken on a ticket — fetched from DB (read-only).
// ============================================================

import React from "react";
import type { TicketHistoryRecord } from "../../types";

interface Props {
  history: TicketHistoryRecord[];
}

const TicketHistoryTimeline = ({ history }: Props) => {
  if (history.length === 0) {
    return (
      <div className="card">
        <h3 className="card-title">📋 History</h3>
        <p className="empty-state">No history records found for this ticket.</p>
      </div>
    );
  }

  return (
    <div className="card history-card">
      <h3 className="card-title">📋 Past Actions (History)</h3>
      <ol className="timeline">
        {history.map((record) => (
          <li key={record.id} className="timeline-item">
            {/* Dot on the timeline line */}
            <span className="timeline-dot" />

            <div className="timeline-content">
              <p className="timeline-action">{record.action}</p>
              <p className="timeline-meta">
                <span className="timeline-by">👤 {record.performedBy}</span>
                <span className="timeline-at">
                  🕐 {new Date(record.performedAt).toLocaleString()}
                </span>
              </p>
              {record.note && <p className="timeline-note">💬 {record.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TicketHistoryTimeline;

