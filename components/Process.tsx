"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { InkButton } from "@/components/ui/InkButton";
import { whatsappLink } from "@/lib/site";

const STEPS = [
  {
    title: "Send your idea",
    body: "Message us on WhatsApp with your references, the size you have in mind and the body area. Photos, sketches and screenshots all help.",
  },
  { title: "Get your design", body: "[PLACEHOLDER: design/approval process]" },
  { title: "Book your session", body: "[PLACEHOLDER: deposit policy]" },
  { title: "Tattoo day + aftercare", body: "Show up, sit back, leave marked. [PLACEHOLDER: aftercare info]" },
];

export function Process() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line/60 bg-ink-2/40 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="process-title" className="display text-[clamp(3rem,8vw,7rem)]">
            From idea <br className="hidden sm:block" />
            to skin.
          </h2>
          <p className="mt-6 max-w-md text-lg text-bone-muted">Four steps. The first one takes a minute.</p>
          <div className="mt-8">
            <InkButton href={whatsappLink()} external variant="solid" icon={<WhatsappLogoIcon size={18} weight="fill" />}>
              Get a quote on WhatsApp
            </InkButton>
          </div>
        </div>

        <ol ref={ref} className="relative flex flex-col gap-16 pl-14 md:gap-24 md:pl-20">
          {/* Track and the ink flowing down it */}
          <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px bg-line md:left-[23px]" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-2 left-[14px] top-2 w-[3px] origin-top rounded-full bg-blood-bright md:left-[22px]"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          {STEPS.map((s, i) => (
            <Step key={s.title} index={i} total={STEPS.length} progress={progress} reduce={!!reduce} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  total,
  title,
  body,
  progress,
  reduce,
}: {
  index: number;
  total: number;
  title: string;
  body: string;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // The step fills in when the ink reaches it.
  const end = Math.max(index / (total - 1), 0.04);
  const start = Math.max(0, end - 0.08);
  const fill = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0.7, 1]); // never below AA contrast
  const x = useTransform(progress, [start, end], [16, 0]);

  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className="absolute -left-14 top-1 grid h-8 w-8 place-items-center rounded-full border border-line bg-ink md:-left-20 md:h-12 md:w-12"
      >
        <motion.span className="absolute inset-0 rounded-full bg-blood" style={{ scale: reduce ? 1 : fill }} />
        <span className="relative text-xs font-semibold text-bone md:text-sm">{index + 1}</span>
      </span>
      <motion.div style={reduce ? undefined : { opacity, x }}>
        <h3 className="display text-4xl md:text-6xl">{title}</h3>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-bone/85">{body}</p>
      </motion.div>
    </li>
  );
}
