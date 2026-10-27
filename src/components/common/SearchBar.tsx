// ============================================================
// 📂 src/components/common/SearchBar.tsx
// PURPOSE: A reusable text input for searching/filtering.
// ============================================================

import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search..." }: Props) => (
  <div className="search-bar">
    <span className="search-icon">🔍</span>
    <input
      type="text"
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search"
    />
    {value && (
      <button className="search-clear" onClick={() => onChange("")} aria-label="Clear search">
        ✕
      </button>
    )}
  </div>
);

export default SearchBar;

