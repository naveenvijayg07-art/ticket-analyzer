// ============================================================
// 📂 src/components/layout/Navbar.tsx
// PURPOSE: Top navigation bar shown on every page.
// ============================================================

import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReadOnlyBadge from "../common/ReadOnlyBadge";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🎫</span>
        <span className="brand-name">Ticket Analyzer</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className={isActive("/")}>
          Dashboard
        </Link>
        <Link to="/modules" className={isActive("/modules")}>
          Modules
        </Link>
      </div>

      <div className="navbar-right">
        <ReadOnlyBadge />
      </div>
    </nav>
  );
};

export default Navbar;

