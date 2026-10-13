"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { InkButton } from "@/components/ui/InkButton";
import { href, site } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

export type Review = { text: string; author: string };

// Real Google reviews only. No ratings or star counts are shown on purpose.
const REVIEWS: Review[] = [
  { text: "[PLACEHOLDER: review text]", author: "[PLACEHOLDER: first name + initial]" },
  { text: "[PLACEHOLDER: review text]", author: "[PLACEHOLDER: first name + initial]" },
  { text: "[PLACEHOLDER: review text]", author: "[PLACEHOLDER: first name + initial]" },
];

export function ReviewCard({ review, index }: { review: Review; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      className={`flex flex-col justify-between gap-10 bg-ink-2 p-7 md:p-9 ${index === 1 ? "md:translate-y-10" : ""}`}
      initial={reduce ? false : { opacity: 0, rotate: index === 1 ? 2 : -2, y: 50 }}
      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 80, damping: 16, delay: index * 0.1 }}
    >
      <span aria-hidden="true" className="display text-7xl leading-none text-blood-bright">
        “
      </span>
      <blockquote className="text-lg leading-snug text-bone/90">{review.text}</blockquote>
      <figcaption className="text-sm font-medium text-bone-muted">{review.author}, Google review</figcaption>
    </motion.figure>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          id="reviews-title"
          className="display text-[clamp(3rem,8vw,7rem)]"
          initial={reduce ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          In their words.
        </motion.h2>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} review={r} index={i} />
          ))}
        </div>
        <div className="mt-20">
          <InkButton href={href(site.googleReviewLink)} external variant="ghost" icon={<GoogleLogoIcon size={16} weight="bold" />}>
            Leave us a review on Google
          </InkButton>
        </div>
      </div>
    </section>
  );
}
