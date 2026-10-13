"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Global safety net: with reduced motion, transform and layout animations are skipped site-wide. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
