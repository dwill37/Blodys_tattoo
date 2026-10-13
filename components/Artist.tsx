"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { InkButton } from "@/components/ui/InkButton";
import { photos } from "@/lib/images";
import { whatsappLink } from "@/lib/site";
import { ClipReveal } from "@/components/ui/DripReveal";
import { EASE_OUT } from "@/lib/motion";

const ARTIST = {
  name: "[PLACEHOLDER: artist name]",
  specialty: "[PLACEHOLDER: specialty]",
  bio: "[PLACEHOLDER: short bio]",
  // No portrait was provided: this studio shot of gloved hands at work stands in.
  // [PLACEHOLDER: artist portrait] Replace with a portrait when available.
  photo: photos.hands,
};

// Organic ink blot growing from the bottom-left corner (same point count in both states).
const BLOT_HIDDEN =
  "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%)";
const BLOT_SHOWN =
  "polygon(0% 100%, 0% -20%, 30% -35%, 70% -25%, 120% -10%, 135% 30%, 125% 75%, 110% 120%, 0% 130%)";

export function Artist() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} id="artist" aria-labelledby="artist-title" className="border-t border-line/60 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-[1fr_1fr] lg:gap-20">
        <ClipReveal className="relative aspect-[4/5] overflow-hidden bg-ink-2" from={BLOT_HIDDEN} to={BLOT_SHOWN} duration={1.6}>
          <motion.div className="absolute inset-[-10%_0]" style={{ y }}>
            <Image
              src={ARTIST.photo.src}
              alt={ARTIST.photo.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </ClipReveal>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
        >
          <h2 id="artist-title" className="text-lg font-medium text-bone-muted">
            The hands behind it
          </h2>
          <p className="display mt-4 text-[clamp(3rem,7vw,6rem)]">{ARTIST.name}</p>
          <p className="mt-4 text-lg font-medium text-blood-bright">{ARTIST.specialty}</p>
          <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-bone/85">{ARTIST.bio}</p>
          <div className="mt-10">
            <InkButton
              href={whatsappLink()}
              external
              variant="solid"
              icon={<WhatsappLogoIcon size={18} weight="fill" />}
            >
              Get a quote on WhatsApp
            </InkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
