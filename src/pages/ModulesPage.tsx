// ============================================================
// 📂 src/pages/ModulesPage.tsx
// PURPOSE: Shows a directory of all screen modules in the system.
//          Each module shows its description, fields, and linked DB tables.
//          READ-ONLY — purely informational.
//
// ⛔ APPROVAL REQUIRED:
//    - Loading module list requires user approval
//    - Expanding a module card requires user approval
// ============================================================

import React, { useEffect, useState, useCallback } from "react";
import { fetchAllModules } from "../api/moduleApi";
import { useApproval } from "../context/ApprovalContext";
import type { Module } from "../types";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const ModulesPage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);

  const { requestApproval } = useApproval();

  // Ask permission before loading modules
  useEffect(() => {
    if (approved) return;

    requestApproval(
      "DATA_FETCH",
      "Load Screen Modules",
      "The application wants to fetch the list of all screen modules from the server.",
      "This is a READ-ONLY GET request to /api/modules. No data will be modified."
    ).then((granted) => {
      if (granted) {
        setApproved(true);
        setLoading(true);
        fetchAllModules()
          .then(setModules)
          .catch((err: Error) => setError(err.message))
          .finally(() => setLoading(false));
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Ask approval before expanding a module card
  const handleToggleExpand = useCallback(
    async (modName: string) => {
      if (expanded === modName) {
        // Collapsing doesn't need approval
        setExpanded(null);
        return;
      }

      const granted = await requestApproval(
        "MODULE_VIEW",
        `View Module: ${modName}`,
        `You are about to expand the details for the "${modName}" module.`,
        "This shows DB table references and field definitions. All data is already loaded — no additional API calls."
      );
      if (granted) {
        setExpanded(modName);
      }
    },
    [expanded, requestApproval]
  );

  if (!approved) {
    return (
      <div className="page modules-page">
        <div className="awaiting-approval">
          <h2>⏳ Waiting for Approval</h2>
          <p>Please approve or deny the permission request to continue.</p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner message="Loading modules..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page modules-page">
      <h1 className="page-title">🖥️ Screen Modules Directory</h1>
      <p className="page-subtitle">
        Read-only reference for all modules in the system.
      </p>

      <div className="modules-grid">
        {modules.map((mod) => (
          <div
            key={mod.name}
            className={`card module-card ${expanded === mod.name ? "expanded" : ""}`}
          >
            {/* Card Header — click to expand (with approval) */}
            <button
              className="module-card-header"
              onClick={() => handleToggleExpand(mod.name)}
              aria-expanded={expanded === mod.name}
            >
              <span className="module-name">{mod.displayLabel}</span>
              <span className="module-toggle">{expanded === mod.name ? "▲" : "▼"}</span>
            </button>

            <p className="module-description">{mod.description}</p>

            {/* Expanded details */}
            {expanded === mod.name && (
              <div className="module-details">
                {mod.relatedTables && mod.relatedTables.length > 0 && (
                  <div className="module-tables">
                    <h4>📦 Related DB Tables (Read Reference)</h4>
                    <div className="tags-row">
                      {mod.relatedTables.map((t) => (
                        <span key={t} className="table-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {mod.fields && mod.fields.length > 0 && (
                  <div className="module-fields">
                    <h4>📋 Fields</h4>
                    <table className="fields-table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mod.fields.map((f) => (
                          <tr key={f.fieldName}>
                            <td><code>{f.fieldName}</code></td>
                            <td><code>{f.type}</code></td>
                            <td>{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
