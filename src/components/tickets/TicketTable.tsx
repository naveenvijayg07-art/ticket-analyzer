// ============================================================
// 📂 src/components/tickets/TicketTable.tsx
// PURPOSE: Displays a list of tickets in a table.
//          Clicking a row navigates to the ticket detail page.
//          READ-ONLY — table rows are not editable.
// ============================================================

import React from "react";
import type { Ticket } from "../../types";

interface Props {
  tickets: Ticket[];
  onRowClick: (ticketId: number) => void;
}

// Helper: color-code status labels
const statusColor: Record<Ticket["status"], string> = {
  OPEN: "#e07b00",
  IN_PROGRESS: "#0066cc",
  RESOLVED: "#28a745",
  CLOSED: "#6c757d",
};

// Helper: color-code priority labels
const priorityColor: Record<Ticket["priority"], string> = {
  LOW: "#6c757d",
  MEDIUM: "#e07b00",
  HIGH: "#dc3545",
  CRITICAL: "#7b00e0",
};

const TicketTable = ({ tickets, onRowClick }: Props) => {
  if (tickets.length === 0) {
    return <p className="empty-state">No tickets to display.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="ticket-table" aria-label="Tickets list">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Title</th>
            <th>Module</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Raised By</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="ticket-row"
              onClick={() => onRowClick(ticket.id)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onRowClick(ticket.id)}
              aria-label={`View ticket ${ticket.id}`}
            >
              <td className="ticket-id">#{ticket.id}</td>
              <td className="ticket-title">{ticket.title}</td>
              <td>{ticket.module}</td>
              <td>
                <span
                  className="status-chip"
                  style={{ backgroundColor: statusColor[ticket.status] }}
                >
                  {ticket.status}
                </span>
              </td>
              <td>
                <span
                  className="priority-chip"
                  style={{ color: priorityColor[ticket.priority] }}
                >
                  {ticket.priority}
                </span>
              </td>
              <td>{ticket.raisedBy}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;

