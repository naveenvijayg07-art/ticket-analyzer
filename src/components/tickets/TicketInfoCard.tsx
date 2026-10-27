// ============================================================
// 📂 src/components/tickets/TicketInfoCard.tsx
// PURPOSE: Shows the main details of a single ticket.
//          Purely a display card — nothing is editable.
// ============================================================

import React from "react";
import type { Ticket } from "../../types";
import ReadOnlyBadge from "../common/ReadOnlyBadge";

interface Props {
  ticket: Ticket;
}

// Display each field as a labelled row
const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="info-field">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

const TicketInfoCard = ({ ticket }: Props) => (
  <div className="card ticket-info-card">
    <div className="card-header">
      <h2 className="card-title">🎫 Ticket Details</h2>
      <ReadOnlyBadge />
    </div>

    <div className="card-body">
      <Field label="ID" value={`#${ticket.id}`} />
      <Field label="Title" value={ticket.title} />
      <Field label="Description" value={ticket.description} />
      <Field label="Module / Screen" value={ticket.module} />
      <Field label="Status" value={<span className="status-chip">{ticket.status}</span>} />
      <Field label="Priority" value={<span className="priority-chip">{ticket.priority}</span>} />
      <Field label="Raised By" value={ticket.raisedBy} />
      {ticket.assignedTo && <Field label="Assigned To" value={ticket.assignedTo} />}
      <Field label="Created" value={new Date(ticket.createdAt).toLocaleString()} />
      <Field label="Last Updated" value={new Date(ticket.updatedAt).toLocaleString()} />
    </div>
  </div>
);

export default TicketInfoCard;

