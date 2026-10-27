// ============================================================
// 📂 src/main.tsx
// PURPOSE: Entry point — mounts the React app onto the HTML page.
//          Installs safety guards before anything else:
//          1. Mock Interceptor (for testing without real backend)
//          2. Read-Only Guard (blocks all write operations)
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { installReadOnlyGuard } from "./guards/ReadOnlyGuard";
import { installMockInterceptor } from "./api/mockInterceptor";

// ⛔ STEP 1: Install mock data interceptor for testing
// Remove this line when connecting to a real backend
installMockInterceptor();

// ⛔ STEP 2: Install the read-only guard AFTER mock interceptor.
// This blocks any PUT/DELETE/PATCH requests at the global fetch level.
installReadOnlyGuard();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
