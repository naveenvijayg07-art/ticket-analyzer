// ============================================================
// 📂 src/hooks/useDebounce.ts
// PURPOSE: Delays a value so we don't make API calls on every
//          single keystroke when the user types in a search box.
// ============================================================

import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay = 500): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cancel if value changes again quickly
  }, [value, delay]);

  return debounced;
};

export default useDebounce;

