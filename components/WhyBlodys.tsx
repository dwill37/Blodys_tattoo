"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { DripReveal } from "@/components/ui/DripReveal";
import { photos } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

export function WhyBlodys() {
  const reduce = useReducedMotion();

  return (
    <section id="why" aria-labelledby="why-title" className="relative px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          id="why-title"
          className="display max-w-4xl text-[clamp(3rem,8vw,7rem)]"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          Less talk. <span className="text-blood-bright">More ink.</span>
        </motion.h2>

        <div className="mt-14 grid gap-3 md:mt-20 lg:grid-cols-[5fr_7fr]">
          <DripReveal className="relative min-h-[420px] overflow-hidden bg-ink-2 lg:min-h-0" duration={1.3}>
            <Image
              src={photos.kanji.src}
              alt={photos.kanji.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_55%]"
            />
          </DripReveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            <DripReveal as="li" delay={0.1} className="flex min-h-[280px] flex-col justify-between bg-blood p-7 md:p-9">
              <WhatsappLogoIcon size={36} weight="fill" aria-hidden="true" />
              <div>
                <h3 className="display text-4xl md:text-5xl">Quotes on WhatsApp</h3>
                <p className="mt-3 max-w-xs text-bone/90">
                  Send a photo, a sketch or a rough idea. Get your quote in the same chat. No forms.
                </p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 font-semibold underline decoration-bone/50 underline-offset-4 hover:decoration-bone"
                >
                  Start the chat <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </DripReveal>

            <DripReveal as="li" delay={0.22} className="flex min-h-[280px] flex-col justify-between bg-ink-2 p-7 md:p-9">
              <p className="display text-[5.5rem] leading-none text-blood-bright md:text-[7rem]" aria-hidden="true">
                13:00
              </p>
              <div>
                <h3 className="display text-4xl md:text-5xl">Open 5 days a week</h3>
                <p className="mt-3 max-w-xs text-bone-muted">Monday, and Wednesday to Saturday. Doors open at 13:00.</p>
              </div>
            </DripReveal>

            <DripReveal as="li" delay={0.34} className="flex min-h-[280px] flex-col justify-between bg-ink-2 p-7 md:p-9">
              <p className="text-sm font-medium text-bone-muted">{site.address.city}, {site.address.region}</p>
              <div>
                <h3 className="display text-4xl md:text-5xl">Supermanzana 67</h3>
                <p className="mt-3 max-w-xs text-bone-muted">
                  On {site.address.street}, in the city. Directions are{" "}
                  <a href="#location" className="text-bone underline decoration-blood-bright underline-offset-4">
                    one tap away
                  </a>
                  .
                </p>
              </div>
            </DripReveal>

            <DripReveal
              as="li"
              delay={0.46}
              className="flex min-h-[280px] flex-col justify-end border border-dashed border-line bg-ink p-7 md:p-9"
            >
              <h3 className="display text-4xl md:text-5xl">[PLACEHOLDER: key differentiator]</h3>
              <p className="mt-3 max-w-xs text-bone-muted">
                [PLACEHOLDER: one line about it, e.g. signature style or hygiene standards]
              </p>
            </DripReveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
