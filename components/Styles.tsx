"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { InkButton } from "@/components/ui/InkButton";
import { photos, type Photo } from "@/lib/images";
import { isPlaceholder, whatsappLink } from "@/lib/site";
import { EASE_INK, SPRING_HEAVY } from "@/lib/motion";

type Style = { name: string; description: string; price: string; session: string; photo: Photo };

// Fill these in. The photo is only a visual pairing; swap it for one that matches the style.
const STYLES: Style[] = [
  {
    name: "[PLACEHOLDER: style name 1]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or “from $…”]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.rune,
  },
  {
    name: "[PLACEHOLDER: style name 2]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or “from $…”]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.star,
  },
  {
    name: "[PLACEHOLDER: style name 3]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or “from $…”]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.bat,
  },
  {
    name: "[PLACEHOLDER: style name 4]",
    description: "[PLACEHOLDER: short description]",
    price: "[PLACEHOLDER: price or “from $…”]",
    session: "[PLACEHOLDER: approximate session time]",
    photo: photos.hearts,
  },
];

function quoteMessage(style: string) {
  return isPlaceholder(style)
    ? "Hi Blodys Tattoo! I saw your website and I'd like a quote for a tattoo in one of your styles."
    : `Hi Blodys Tattoo! I saw your website and I'd like a quote for a ${style} tattoo.`;
}

export function Styles() {
  const reduce = useReducedMotion();

  return (
    <section id="styles" aria-labelledby="styles-title" className="border-t border-line/60 bg-ink-2/40 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="styles-title" className="display text-[clamp(3rem,8vw,7rem)]">
          Find your line.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-bone-muted">
          Tap a style and your WhatsApp opens with the message already written. Add your idea and send.
        </p>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-4">
          {STYLES.map((s, i) => (
            <motion.li
              key={s.name}
              className={`relative flex flex-col bg-ink ${i % 2 === 1 ? "lg:mt-20" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 110 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...SPRING_HEAVY, delay: i * 0.12 }}
            >
              {/* A thin line of ink running down the card edge */}
              <motion.span
                aria-hidden="true"
                className="absolute -left-px top-0 z-10 h-full w-[2px] origin-top bg-blood-bright"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.6, delay: 0.35 + i * 0.12, ease: EASE_INK }}
              />
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={s.photo.src}
                  alt={s.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="zoom-img object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="display text-3xl leading-[0.95]">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-muted">{s.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="text-bone-muted">Price</dt>
                    <dd className="mt-1 font-medium text-bone">{s.price}</dd>
                  </div>
                  <div>
                    <dt className="text-bone-muted">Session</dt>
                    <dd className="mt-1 font-medium text-bone">{s.session}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-6">
                  <InkButton
                    href={whatsappLink(quoteMessage(s.name))}
                    external
                    variant="ghost"
                    className="w-full justify-between text-sm"
                    icon={<WhatsappLogoIcon size={16} weight="fill" />}
                  >
                    Get a quote for this style
                  </InkButton>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
