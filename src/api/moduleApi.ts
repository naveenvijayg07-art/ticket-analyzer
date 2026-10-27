// ============================================================
// 📂 src/api/moduleApi.ts
// PURPOSE: Read-only API calls for screen module metadata.
//
// ⛔ READ-ONLY RULE:
//    We ONLY read module definitions — never modify them.
// ============================================================

import type { Module } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

/** Fetch all screen modules (read-only view). */
export const fetchAllModules = (): Promise<Module[]> =>
  getJson<Module[]>("/modules");

/** Fetch detailed info of one module by name. */
export const fetchModuleDetails = (moduleName: string): Promise<Module> =>
  getJson<Module>(`/modules/${moduleName}`);

