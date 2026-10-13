"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/site";

/**
 * Live open/closed badge computed client-side in Cancún time.
 * The server renders a neutral summary so the badge never shows stale state.
 */
export function OpenBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const label = status?.label ?? "Mon, Wed-Sat · from 13:00";

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-bone/20 bg-ink/60 py-1.5 pl-3 pr-4 text-[13px] font-medium text-bone backdrop-blur-sm ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {status?.open ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood-bright opacity-60 motion-reduce:animate-none" />
        ) : null}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${status?.open ? "bg-blood-bright" : "bg-bone-muted"}`} />
      </span>
      <span aria-live="polite">{label}</span>
    </span>
  );
}
