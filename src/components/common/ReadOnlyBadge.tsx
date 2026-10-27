// ============================================================
// 📂 src/components/common/ReadOnlyBadge.tsx
// PURPOSE: A small badge/chip shown everywhere to remind users
//          this app is READ-ONLY — no editing allowed.
// ============================================================

import React from "react";

const ReadOnlyBadge = () => (
  <span className="read-only-badge" title="This app is in view-only mode. No data is modified.">
    🔒 Read-Only · Analysis Mode
  </span>
);

export default ReadOnlyBadge;

