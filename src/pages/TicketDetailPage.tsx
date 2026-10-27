// ============================================================
// 📂 src/pages/TicketDetailPage.tsx
// PURPOSE: Full detail view for one ticket.
//          Shows ticket info, past history timeline, and AI report.
//          READ-ONLY — nothing here can be edited or submitted.
//
// ⛔ APPROVAL REQUIRED:
//    - Loading ticket details requires approval (handled in hook)
//    - Running AI analysis requires separate approval
// ============================================================

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketContext";
import { useAnalysis } from "../context/AnalysisContext";
import { useApproval } from "../context/ApprovalContext";
import type { AnalysisReport } from "../types";
import TicketInfoCard from "../components/tickets/TicketInfoCard";
import TicketHistoryTimeline from "../components/tickets/TicketHistoryTimeline";
import AnalysisReportPanel from "../components/analysis/AnalysisReportPanel";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const TicketDetailPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const id = Number(ticketId);

  const {
    selectedTicket,
    ticketHistory,
    loadTicketDetails,
    loading: ticketLoading,
    error: ticketError,
  } = useTickets();

  const { runAnalysis, analyzing, error: analysisError } = useAnalysis();
  const { requestApproval } = useApproval();

  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [detailsApproved, setDetailsApproved] = useState(false);
  const [analysisApproved, setAnalysisApproved] = useState(false);

  // Step 1: Ask approval to load ticket details
  useEffect(() => {
    if (detailsApproved) return;

    requestApproval(
      "TICKET_VIEW",
      `Load Ticket #${ticketId} Details`,
      `The application wants to fetch full details and history for ticket #${ticketId}.`,
      "This involves two READ-ONLY GET requests:\n• GET /api/tickets/" + ticketId + "\n• GET /api/tickets/" + ticketId + "/history"
    ).then((granted) => {
      if (granted) {
        setDetailsApproved(true);
        loadTicketDetails(id);
      } else {
        navigate(-1); // Go back if denied
      }
    });
  }, [ticketId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Step 2: Once details are loaded, ask approval for AI analysis
  useEffect(() => {
    if (!detailsApproved || analysisApproved) return;
    if (!selectedTicket || selectedTicket.id !== id) return;

    requestApproval(
      "ANALYSIS",
      `Run AI Analysis on Ticket #${ticketId}`,
      "The application wants to trigger a read-only AI analysis of this ticket.",
      "This sends a POST to /api/analyze/ticket/" + ticketId + " with readOnly: true.\nThe server reads the ticket + history and returns insights.\n⛔ NO data is written to the database."
    ).then((granted) => {
      if (granted) {
        setAnalysisApproved(true);
        runAnalysis(id).then((r) => {
          if (r) setReport(r);
        });
      }
    });
  }, [detailsApproved, selectedTicket, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!detailsApproved) {
    return (
      <div className="page ticket-detail-page">
        <div className="awaiting-approval">
          <h2>⏳ Waiting for Approval</h2>
          <p>Please approve or deny the permission request to view this ticket.</p>
        </div>
      </div>
    );
  }

  if (ticketLoading) return <LoadingSpinner message={`Loading ticket #${ticketId}...`} />;
  if (ticketError) return <ErrorMessage message={ticketError} />;
  if (!selectedTicket) return <ErrorMessage message={`Ticket #${ticketId} not found.`} />;

  return (
    <div className="page ticket-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Dashboard
      </button>

      <h1 className="page-title">🎫 Ticket #{selectedTicket.id}: {selectedTicket.title}</h1>

      {/*
        Two-column layout:
        LEFT  → Ticket info + History timeline
        RIGHT → AI Analysis report
      */}
      <div className="detail-grid">
        <div className="detail-left">
          <TicketInfoCard ticket={selectedTicket} />
          <TicketHistoryTimeline history={ticketHistory} />
        </div>

        <div className="detail-right">
          {analysisApproved ? (
            <AnalysisReportPanel report={report} ticketId={id} />
          ) : (
            <div className="card analysis-card">
              <h3 className="card-title">🤖 AI Analysis</h3>
              <p className="analysis-pending-text">
                Analysis pending approval...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
