// ============================================================
// 📂 src/pages/NotFoundPage.tsx
// PURPOSE: Shown when the user navigates to an unknown route.
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page not-found-page">
      <h1>404</h1>
      <p>Oops! This page doesn't exist.</p>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Go to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;

