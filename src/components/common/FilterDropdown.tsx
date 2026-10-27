// ============================================================
// 📂 src/components/common/FilterDropdown.tsx
// PURPOSE: A reusable dropdown for filtering lists.
// ============================================================

import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
}

const FilterDropdown = ({ value, onChange, options, label = "Filter" }: Props) => (
  <div className="filter-dropdown">
    <label className="filter-label">{label}:</label>
    <select
      className="filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replace("_", " ")}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;

