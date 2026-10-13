/** Shared motion language: heavy, damped, ink-like. */

export const EASE_INK = [0.65, 0, 0.35, 1] as const; // slow in, slow out: pigment spreading
export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // long settle
export const SPRING_HEAVY = { type: "spring", stiffness: 70, damping: 18, mass: 1.4 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 22 } as const;

/**
 * Polygon clip-path whose bottom edge is a run of irregular ink drips.
 * `level` is the base height of the ink (in %), drips hang below it.
 * Both hidden and revealed states share the same point count, so Framer Motion
 * (and CSS transitions) can interpolate between them.
 */
const DRIPS = [
  // [x position %, depth %, width %]
  [8, 9, 5],
  [23, 18, 4],
  [37, 6, 6],
  [52, 22, 3.5],
  [66, 11, 5],
  [81, 16, 4],
  [93, 7, 4],
];
const SAMPLES = 28;

export function dripPolygon(level: number, dripScale = 1) {
  const pts: string[] = ["0% 0%", "100% 0%"];
  for (let i = SAMPLES; i >= 0; i--) {
    const x = (i / SAMPLES) * 100;
    let d = 0;
    for (const [cx, depth, w] of DRIPS) {
      const t = (x - cx) / w;
      d = Math.max(d, depth * Math.exp(-t * t * 1.6));
    }
    const y = level + d * dripScale;
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

/** Fully hidden: the ink line and its drips sit above the element. */
export const DRIP_HIDDEN = dripPolygon(-30, 1);
/** Fully revealed: the shallowest point of the edge is below the element. */
export const DRIP_SHOWN = dripPolygon(102, 1.4);
