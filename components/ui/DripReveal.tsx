"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DRIP_HIDDEN, DRIP_SHOWN, EASE_INK } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Classes for the element being revealed (background, padding, layout). */
  className?: string;
  /** Classes for the unclipped outer wrapper (grid placement, sizing). */
  wrapperClassName?: string;
  delay?: number;
  duration?: number;
  /** "view": reveal when scrolled into view. "mount": reveal on load. */
  trigger?: "view" | "mount";
  as?: "div" | "li";
  /** Custom hidden/shown clip-paths (same point count) for non-drip reveals. */
  from?: string;
  to?: string;
};

/**
 * Content is uncovered by an ink line whose wavy bottom edge flows downward.
 * The in-view check runs on an unclipped wrapper: a fully clipped element
 * is reported as not intersecting by some browsers, so it would never reveal.
 */
export function ClipReveal({
  children,
  className = "",
  wrapperClassName = "",
  delay = 0,
  duration = 1.1,
  trigger = "view",
  as = "div",
  from = DRIP_HIDDEN,
  to = DRIP_SHOWN,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = trigger === "mount" || inView;
  const Wrapper = as;

  return (
    <Wrapper ref={ref} className={`grid ${wrapperClassName}`}>
      <motion.div
        className={className}
        initial={reduce ? false : { clipPath: from }}
        animate={show ? { clipPath: to, transitionEnd: { clipPath: "none" } } : undefined}
        transition={{ duration, delay, ease: EASE_INK }}
      >
        {children}
      </motion.div>
    </Wrapper>
  );
}

export const DripReveal = ClipReveal;
