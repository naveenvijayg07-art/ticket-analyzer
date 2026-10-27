// ============================================================
// 📂 src/components/layout/Layout.tsx
// PURPOSE: Main page wrapper — Navbar on top, page content below.
//          Every page is wrapped in this Layout automatically
//          (via App.tsx routing).
// ============================================================

import React, { type ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="app-layout">
    <Navbar />
    <main className="main-content">{children}</main>
    <footer className="app-footer">
      <p>🔒 This tool is read-only. No data is created, updated, or deleted.</p>
    </footer>
  </div>
);

export default Layout;

