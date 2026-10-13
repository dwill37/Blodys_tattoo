"use client";

import Image from "next/image";
import { motion, useAnimate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { InkButton } from "@/components/ui/InkButton";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { DripReveal } from "@/components/ui/DripReveal";
import { photos } from "@/lib/images";
import { whatsappLink } from "@/lib/site";
import { EASE_INK, EASE_OUT } from "@/lib/motion";

const HEADLINE = ["Ink", "that", "stays", "with", "you."];
const CIRCLE_0 = "circle(0% at 50% 50%)";
const CIRCLE_FULL = "circle(75% at 50% 50%)";

export function Hero() {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLElement>();

  // Intro: a single drop falls, lands, and spreads into the photo.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    (async () => {
      // Gravity: accelerate into the fall, stretching as it goes.
      await animate(
        "[data-drop]",
        { y: ["-62vh", "0vh"], scaleY: [1, 1.6], scaleX: [1, 0.8] },
        { duration: 0.55, ease: [0.55, 0, 0.95, 0.45] },
      );
      if (cancelled) return;
      // Impact: a springy squash as the drop flattens into the skin.
      animate("[data-drop]", { scaleX: 3.2, scaleY: 0.18 }, { type: "spring", stiffness: 520, damping: 14 });
      animate("[data-drop]", { opacity: 0 }, { duration: 0.35, delay: 0.12 });
      animate("[data-ink]", { clipPath: [CIRCLE_0, CIRCLE_FULL] }, { duration: 0.85, ease: EASE_INK });
      await animate(
        "[data-photo]",
        { clipPath: [CIRCLE_0, CIRCLE_FULL] },
        { duration: 0.9, delay: 0.12, ease: EASE_INK },
      );
      if (cancelled) return;
      animate("[data-ink]", { opacity: 0 }, { duration: 0.4 });
      animate("[data-photo]", { clipPath: "none" }, { duration: 0 });
    })();
    return () => {
      cancelled = true;
    };
  }, [animate, reduce]);

  // Slow scroll-linked drift on the photo once the intro is done.
  const { scrollYProgress } = useScroll({ target: scope, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring" as const, stiffness: 90, damping: 18, delay },
        };

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-ink"
    >
      {/* Crimson ink that spreads just ahead of the photo */}
      <div
        data-ink
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-blood"
        style={reduce ? { opacity: 0 } : { clipPath: CIRCLE_0 }}
      />

      <div data-photo className="absolute inset-0 -z-10" style={reduce ? undefined : { clipPath: CIRCLE_0 }}>
        <motion.div className="absolute inset-0" style={{ y: photoY, scale: photoScale }}>
          <Image
            src={photos.faith.src}
            alt={photos.faith.alt}
            fill
            preload
            placeholder="blur"
            quality={75}
            sizes="100vw"
            className="object-cover object-[55%_45%] grayscale-[0.2]"
          />
        </motion.div>
        {/* Scrims keep text above 4.5:1 over the photo */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--ink)_8%,rgb(12_11_11/0.75)_42%,rgb(12_11_11/0.1)_75%)]"
        />
      </div>

      {/* The drop */}
      {!reduce ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <span data-drop className="block" style={{ transform: "translateY(-62vh)" }}>
            <span className="block h-5 w-5 rotate-45 rounded-[0_50%_50%_50%] bg-blood-bright" />
          </span>
        </div>
      ) : null}

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-4 pb-10 pt-28 md:px-8 md:pb-14 md:pt-24">
        <DripReveal trigger="mount" delay={0.6} duration={1.05} className="select-none" as="div">
          <p aria-hidden="true" className="display -ml-[0.04em] text-[min(27vw,30vh)] leading-[0.8] text-bone/95 md:text-[min(19vw,30vh)] xl:text-[min(17rem,30vh)]">
            Blodys
          </p>
        </DripReveal>

        <div className="mt-10 max-w-3xl">
          <motion.div {...rise(1.25)}>
            <OpenBadge />
          </motion.div>

          <h1 id="hero-title" className="display mt-5 text-[clamp(3.25rem,min(10vw,11vh),7.5rem)] text-bone">
            <span className="sr-only">Blodys Tattoo, Cancún: </span>
            {HEADLINE.map((w, i) => (
              <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.04em] align-top last:mr-0">
                <motion.span
                  className={`inline-block ${w === "stays" ? "text-blood-bright" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.55 + i * 0.07, ease: EASE_OUT }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Visible from the first paint (LCP); it only settles into place. */}
          <motion.p
            initial={reduce ? false : { y: 18 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.5 }}
            className="mt-5 max-w-xl text-lg leading-snug text-bone/85 md:text-xl">
            Custom tattoos in Supermanzana 67, Cancún. Send your idea on WhatsApp and get a quote straight back.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.div {...rise(1.05)}>
              <InkButton
                href={whatsappLink()}
                external
                magnetic
                size="lg"
                className="w-full justify-between sm:w-auto"
                icon={<WhatsappLogoIcon size={22} weight="fill" />}
              >
                Get your tattoo quote on WhatsApp
              </InkButton>
            </motion.div>
            <motion.div {...rise(1.15)} className="self-start">
              <InkButton
                href="#work"
                variant="ghost"
                className="justify-between"
                icon={<ArrowDownRightIcon size={16} weight="bold" />}
              >
                See the work
              </InkButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
