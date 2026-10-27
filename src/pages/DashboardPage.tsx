// ============================================================
// 📂 src/pages/DashboardPage.tsx
// PURPOSE: Home screen — shows all tickets in a searchable table.
//          Users can filter by status and click to view details.
//          READ-ONLY — no editing here.
//
// ⛔ APPROVAL REQUIRED:
//    - Loading tickets requires user approval
//    - Clicking a ticket row requires user approval
// ============================================================

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketContext";
import { useApproval } from "../context/ApprovalContext";
import TicketTable from "../components/tickets/TicketTable";
import SearchBar from "../components/common/SearchBar";
import FilterDropdown from "../components/common/FilterDropdown";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import useDebounce from "../hooks/useDebounce";
import type { TicketStatus } from "../types";

type StatusFilter = TicketStatus | "ALL";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { tickets, loading, error, loadTickets } = useTickets();
  const { requestApproval } = useApproval();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("ALL");
  const [approved, setApproved] = useState(false);

  // Debounce search input so we don't re-filter on every keystroke
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Ask permission before loading tickets
  useEffect(() => {
    if (approved) return; // Already approved this session

    requestApproval(
      "DATA_FETCH",
      "Load All Tickets",
      "The application wants to fetch the list of all tickets from the server.",
      "This is a READ-ONLY GET request to /api/tickets. No data will be modified."
    ).then((granted) => {
      if (granted) {
        setApproved(true);
        loadTickets();
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle row click — requires approval before navigating
  const handleRowClick = useCallback(
    async (ticketId: number) => {
      const granted = await requestApproval(
        "TICKET_VIEW",
        `View Ticket #${ticketId}`,
        `You are about to open the detail view for ticket #${ticketId}.`,
        "This will fetch the ticket details and its history (READ-ONLY GET requests)."
      );
      if (granted) {
        navigate(`/ticket/${ticketId}`);
      }
    },
    [navigate, requestApproval]
  );

  // Filter tickets locally (no extra API calls needed)
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      ticket.id.toString().includes(debouncedSearch);

    const matchesFilter =
      filterStatus === "ALL" || ticket.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  if (!approved) {
    return (
      <div className="page dashboard-page">
        <div className="awaiting-approval">
          <h2>⏳ Waiting for Approval</h2>
          <p>Please approve or deny the permission request to continue.</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner message="Loading tickets..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <h1 className="page-title">🎫 Ticket Dashboard</h1>
        <p className="page-subtitle">
          {tickets.length} total ticket{tickets.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search + Filter row */}
      <div className="controls-row">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by ID or title..."
        />
        <FilterDropdown
          value={filterStatus}
          onChange={(v) => setFilterStatus(v as StatusFilter)}
          options={["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]}
          label="Status"
        />
      </div>

      {/* Results count */}
      {debouncedSearch || filterStatus !== "ALL" ? (
        <p className="results-count">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </p>
      ) : null}

      {/* Ticket table */}
      <TicketTable
        tickets={filteredTickets}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default DashboardPage;
