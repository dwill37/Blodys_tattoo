"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/site";

/** Always visible on mobile; a quiet round button on desktop that wakes up on hover. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get a quote on WhatsApp"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      className="group fixed bottom-4 right-4 z-30 flex h-14 items-center gap-2 rounded-full bg-blood pl-4 pr-5 text-bone shadow-[0_12px_40px_-10px_rgb(176_20_47/0.7)] md:bottom-8 md:right-8 md:h-14 md:w-14 md:justify-center md:bg-ink-3 md:p-0 md:shadow-none md:ring-1 md:ring-bone/15 md:transition-colors md:duration-300 md:hover:bg-blood"
      initial={reduce ? false : { y: 90, opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay: 2.2 }}
      whileTap={{ scale: 0.92 }}
    >
      <WhatsappLogoIcon size={26} weight="fill" aria-hidden="true" />
      <span className="text-sm font-semibold md:sr-only">Quote</span>
    </motion.a>
  );
}
