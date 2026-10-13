"use client";

import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon, InstagramLogoIcon, XIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { InkButton } from "@/components/ui/InkButton";
import { gallery, type Photo } from "@/lib/images";
import { href, site, whatsappLink } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

type Layout = "m" | "d"; // mobile 2 columns, desktop 3 columns

function split(items: Photo[], cols: number) {
  const out: { photo: Photo; index: number }[][] = Array.from({ length: cols }, () => []);
  items.forEach((photo, index) => out[index % cols].push({ photo, index }));
  return out;
}

const MOBILE_COLS = split(gallery, 2);
const DESKTOP_COLS = split(gallery, 3);

export function Work() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<{ index: number; origin: number; layout: Layout } | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r = reduce ? 0 : 1;
  const c0 = useTransform(scrollYProgress, [0, 1], [40 * r, -60 * r]);
  const c1 = useTransform(scrollYProgress, [0, 1], [120 * r, -140 * r]);
  const c2 = useTransform(scrollYProgress, [0, 1], [10 * r, -30 * r]);
  const desktopY = [c0, c1, c2];
  const mobileY = [c2, c0];

  return (
    <section id="work" aria-labelledby="work-title" className="overflow-hidden px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blood-bright">Portfolio</p>
            <h2 id="work-title" className="display mt-4 text-[clamp(3.5rem,11vw,10rem)]">
              The work.
            </h2>
          </div>
          <p className="max-w-sm text-bone-muted">
            Fresh pieces, straight from the chair in Cancún. Tap any photo to see it up close.
          </p>
        </div>

        <LayoutGroup>
          <div ref={ref} className="mt-14 md:mt-20">
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {MOBILE_COLS.map((col, ci) => (
                <Column key={ci} y={mobileY[ci]} items={col} layout="m" onOpen={(index) => setActive({ index, origin: index, layout: "m" })} hiddenIndex={active?.layout === "m" && active.index === active.origin ? active.origin : null} />
              ))}
            </div>
            <div className="hidden grid-cols-3 gap-4 md:grid">
              {DESKTOP_COLS.map((col, ci) => (
                <Column key={ci} y={desktopY[ci]} items={col} layout="d" onOpen={(index) => setActive({ index, origin: index, layout: "d" })} hiddenIndex={active?.layout === "d" && active.index === active.origin ? active.origin : null} />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {active ? (
              <Lightbox
                key="lightbox"
                index={active.index}
                isOrigin={active.index === active.origin}
                layout={active.layout}
                onClose={() => setActive(null)}
                onNavigate={(index) => setActive({ ...active, index })}
              />
            ) : null}
          </AnimatePresence>
        </LayoutGroup>

        <div className="mt-12 flex justify-center md:mt-8">
          <InkButton
            href={href(site.instagram)}
            external
            variant="ghost"
            icon={<InstagramLogoIcon size={18} weight="regular" />}
          >
            See more on Instagram
          </InkButton>
        </div>
      </div>
    </section>
  );
}

function Column({
  items,
  y,
  layout,
  onOpen,
  hiddenIndex,
}: {
  items: { photo: Photo; index: number }[];
  y: MotionValue<number>;
  layout: Layout;
  onOpen: (index: number) => void;
  hiddenIndex: number | null;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.ul className="flex flex-col gap-3 md:gap-4" style={{ y }}>
      {items.map(({ photo, index }, i) => (
        <motion.li
          key={photo.id}
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: (i % 3) * 0.08 + (index % 3) * 0.06, ease: EASE_OUT }}
        >
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="group relative block w-full overflow-hidden bg-ink-2 text-left"
            aria-label={`View larger: ${photo.alt}`}
          >
            <motion.div
              layoutId={`${layout}-${photo.id}`}
              className="relative"
              style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}`, opacity: hiddenIndex === index ? 0 : 1 }}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 33vw, 50vw"
                className="zoom-img object-cover"
              />
            </motion.div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-blood-bright transition-transform duration-500 group-hover:scale-x-100"
            />
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Lightbox({
  index,
  isOrigin,
  layout,
  onClose,
  onNavigate,
}: {
  index: number;
  isOrigin: boolean;
  layout: Layout;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const photo = gallery[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  const go = useCallback((dir: 1 | -1) => onNavigate((index + dir + gallery.length) % gallery.length), [index, onNavigate]);

  useEffect(() => {
    opener.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const ratio = photo.src.width / photo.src.height;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Tattoo photo viewer"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 overscroll-contain p-4 md:p-10"
    >
      <motion.button
        type="button"
        aria-label="Close viewer"
        tabIndex={-1}
        className="absolute inset-0 cursor-zoom-out bg-ink/95 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Shared-layout morph from the grid for the photo that was tapped; a crossfade when browsing. */}
      <motion.div
        key={photo.id}
        layoutId={isOrigin ? `${layout}-${photo.id}` : undefined}
        initial={isOrigin ? undefined : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={isOrigin ? undefined : { opacity: 0 }}
        className="relative z-10 overflow-hidden"
        style={{ aspectRatio: `${ratio}`, width: `min(92vw, calc((100dvh - 190px) * ${ratio}), 900px)` }}
        transition={{ type: "spring", stiffness: 180, damping: 26 }}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 900px, 92vw" quality={85} className="object-cover" />
      </motion.div>

      <motion.div
        className="relative z-10 flex w-full max-w-[900px] flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <p className="max-w-lg text-sm text-bone/85">{photo.alt}</p>
        <a
          href={whatsappLink("Hi Blodys Tattoo! I saw your website and I'd like a quote for a tattoo like one in your portfolio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-bone underline decoration-blood-bright underline-offset-4"
        >
          <WhatsappLogoIcon size={16} weight="fill" aria-hidden="true" /> Quote something like this
          <ArrowUpRightIcon size={14} weight="bold" aria-hidden="true" />
        </a>
      </motion.div>

      <motion.div
        className="absolute right-4 top-4 z-10 flex gap-2 md:right-8 md:top-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-bone/25 bg-ink/70 hover:border-bone">
          <CaretLeftIcon size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-bone/25 bg-ink/70 hover:border-bone">
          <CaretRightIcon size={18} aria-hidden="true" />
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="grid h-11 w-11 place-items-center rounded-full bg-bone text-ink hover:bg-blood hover:text-bone"
        >
          <XIcon size={18} weight="bold" aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}
