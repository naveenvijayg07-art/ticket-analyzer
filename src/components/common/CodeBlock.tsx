// ============================================================
// 📂 src/components/common/CodeBlock.tsx
// PURPOSE: Formatted code viewer with syntax label & copy button.
// ============================================================

import React, { useState } from "react";

interface Props {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "plaintext" }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-lang-tag">{language.toUpperCase()}</span>
        <button
          className="code-copy-btn"
          onClick={handleCopy}
          title="Copy code to clipboard"
        >
          {copied ? "✓ Copied!" : "📋 Copy Code"}
        </button>
      </div>
      <pre className="code-block-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;

