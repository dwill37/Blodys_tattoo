"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "blood";
  icon?: ReactNode;
  magnetic?: boolean;
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
  ariaLabel?: string;
};

/**
 * Pill CTA. Crimson pours in from the top on hover (CSS clip-path),
 * and main CTAs get a magnetic pull driven by motion values (no re-renders).
 */
export function InkButton({
  href,
  children,
  variant = "solid",
  icon,
  magnetic = false,
  external = false,
  className = "",
  size = "md",
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const pad = size === "lg" ? "pl-7 pr-2 py-2 text-base md:text-lg min-h-[60px]" : icon ? "pl-5 pr-1.5 py-1.5" : "px-5 py-2.5";

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(external && href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={magnetic ? { x: sx, y: sy } : undefined}
      className={`ink-btn ink-btn--${variant} ${pad} ${className}`}
    >
      <span className="ink-fill" aria-hidden="true" />
      <span>{children}</span>
      {icon ? (
        <span className={`ink-btn__icon ${size === "lg" ? "!h-11 !w-11" : ""}`} aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </motion.a>
  );
}
