// ============================================================
// 📂 src/App.tsx
// PURPOSE: Root of the app. Sets up:
//          1. All context providers (global state)
//          2. All routes (which page shows at which URL)
//          3. ApprovalProvider + ApprovalDialog (permission gate)
//          4. Read-Only safety at every layer
//
// Beginner tip: Think of App.tsx as the "main" function of
// your React app — it wires everything together.
// ============================================================

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ── Context Providers (global state wrappers) ──────────────────
import { TicketProvider } from "./context/TicketContext";
import { AnalysisProvider } from "./context/AnalysisContext";
import { ApprovalProvider } from "./context/ApprovalContext";

// ── Shared Layout ──────────────────────────────────────────────
import Layout from "./components/layout/Layout";

// ── Approval Dialog (always visible when permission is needed) ─
import ApprovalDialog from "./components/common/ApprovalDialog";

// ── Pages ──────────────────────────────────────────────────────
import DashboardPage from "./pages/DashboardPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import ModulesPage from "./pages/ModulesPage";
import NotFoundPage from "./pages/NotFoundPage";

// ── Styles ─────────────────────────────────────────────────────
import "./styles/global.css";
import "./styles/components.css";
import "./styles/layout.css";

const App = () => (
  // 1. BrowserRouter — enables URL-based navigation
  <BrowserRouter>
    {/* 2. ApprovalProvider — MUST wrap everything so all actions require permission */}
    <ApprovalProvider>
      {/* 3. Global state providers — wrap the whole app */}
      <TicketProvider>
        <AnalysisProvider>
          {/* 4. Layout — adds Navbar + Footer to every page */}
          <Layout>
            {/* 5. Routes — maps URLs to page components */}
            <Routes>
              <Route path="/"               element={<DashboardPage />} />
              <Route path="/ticket/:ticketId" element={<TicketDetailPage />} />
              <Route path="/modules"        element={<ModulesPage />} />
              <Route path="*"              element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </AnalysisProvider>
      </TicketProvider>

      {/* Approval dialog — renders on top of everything when needed */}
      <ApprovalDialog />
    </ApprovalProvider>
  </BrowserRouter>
);

export default App;
