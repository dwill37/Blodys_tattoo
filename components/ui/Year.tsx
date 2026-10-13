"use client";

import { useClientValue } from "@/lib/useClientValue";

/** Current year, resolved on the client so the page can stay fully prerendered. */
export function Year() {
  const year = useClientValue(() => new Date().getFullYear(), 2026);
  return <span>{year}</span>;
}
