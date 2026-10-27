// ============================================================
// 📂 src/components/common/LoadingSpinner.tsx
// PURPOSE: Shows a spinning loader with an optional message.
//          Used anywhere data is being fetched.
// ============================================================

import React from "react";

interface Props {
  message?: string;
}

const LoadingSpinner = ({ message = "Loading..." }: Props) => (
  <div className="loading-spinner-wrapper">
    <div className="spinner" aria-label="Loading" />
    <p className="spinner-message">{message}</p>
  </div>
);

export default LoadingSpinner;

