"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { InkButton } from "@/components/ui/InkButton";
import { DripReveal } from "@/components/ui/DripReveal";
import { photos } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";

export function FinalCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative isolate overflow-hidden">
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ scale }}>
        <Image src={photos.lions.src} alt="" fill placeholder="blur" sizes="100vw" className="object-cover object-[50%_35%]" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/80" />

      <div className="mx-auto flex min-h-[85dvh] max-w-[1400px] flex-col justify-center px-4 py-28 md:px-8">
        <DripReveal duration={1.3}>
          <h2 id="cta-title" className="display max-w-5xl text-[clamp(3.5rem,12vw,11rem)]">
            Bring the idea. <span className="text-blood-bright">Leave with ink.</span>
          </h2>
        </DripReveal>
        <p className="mt-8 max-w-lg text-lg text-bone/90 md:text-xl">
          One message is all it takes. We&apos;re on WhatsApp at <span className="whitespace-nowrap">{site.phoneDisplay}</span>.
        </p>
        <div className="mt-10">
          <InkButton
            href={whatsappLink()}
            external
            magnetic
            size="lg"
            variant="solid"
            className="!min-h-[72px] !pl-9 text-lg md:text-xl"
            icon={<WhatsappLogoIcon size={26} weight="fill" />}
          >
            Message us on WhatsApp
          </InkButton>
        </div>
      </div>
    </section>
  );
}
