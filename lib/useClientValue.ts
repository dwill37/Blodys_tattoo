import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Reads a browser-only value (clock, timezone) without a hydration mismatch. `get` must return a primitive. */
export function useClientValue<T>(get: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, get, () => serverValue);
}
