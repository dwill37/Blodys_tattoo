"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { PlusIcon } from "@phosphor-icons/react";
import { useId, useState, type ReactNode } from "react";
import { whatsappLink } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "How do I get a quote?",
    a: (
      <>
        Send your idea on{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-bone underline decoration-blood-bright underline-offset-4">
          WhatsApp
        </a>
        : a reference photo or sketch, the size you want and where on your body it goes. We reply with your quote in the same chat.
      </>
    ),
  },
  { q: "How much does a tattoo cost?", a: "[PLACEHOLDER: pricing answer]" },
  { q: "What styles do you do?", a: "[PLACEHOLDER: styles answer]" },
  { q: "Do I need to leave a deposit?", a: "[PLACEHOLDER: deposit answer]" },
  { q: "Do you take walk-ins?", a: "[PLACEHOLDER: walk-in policy]" },
  {
    q: "What are your hours?",
    a: "Monday and Wednesday to Friday 13:00 - 20:00, Saturday 13:00 - 19:00. Closed Tuesday and Sunday.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line/60 bg-ink-2/40 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[4fr_8fr] lg:gap-20">
        <h2 id="faq-title" className="display text-[clamp(3rem,8vw,7rem)] lg:sticky lg:top-28 lg:self-start">
          Asked a lot.
        </h2>
        <LayoutGroup>
          <ul className="border-t border-line">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </ul>
        </LayoutGroup>
      </div>
    </section>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: ReactNode; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  const id = useId();
  return (
    // layout="position": rows below glide with transforms instead of animating height.
    <motion.li layout={reduce ? false : "position"} className="border-b border-line" transition={{ type: "spring", stiffness: 260, damping: 32 }}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium md:py-7 md:text-2xl"
        >
          <span className="transition-colors duration-300 group-hover:text-blood-bright">{q}</span>
          <motion.span
            aria-hidden="true"
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${open ? "border-blood bg-blood" : "border-bone/25"}`}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <PlusIcon size={18} weight="bold" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <p className="max-w-[60ch] pb-7 pr-14 text-lg leading-relaxed text-bone/80">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}
