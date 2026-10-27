// ============================================================
// 📂 src/components/common/ErrorMessage.tsx
// PURPOSE: Displays an error alert box.
// ============================================================

import React from "react";

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => (
  <div className="error-message" role="alert">
    <span className="error-icon">⚠️</span>
    <span>{message}</span>
  </div>
);

export default ErrorMessage;

