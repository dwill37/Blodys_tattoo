"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { InkButton } from "@/components/ui/InkButton";
import { Wordmark } from "@/components/ui/Wordmark";
import { SHOW_ARTIST, site, whatsappLink, fullAddress } from "@/lib/site";
import { DRIP_HIDDEN, DRIP_SHOWN, EASE_INK, EASE_OUT } from "@/lib/motion";

const LINKS = [
  { href: "#styles", label: "Styles" },
  { href: "#work", label: "Work" },
  ...(SHOW_ARTIST ? [{ href: "#artist", label: "Artist" }] : []),
  { href: "#process", label: "Process" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 48;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      // Keep Tab inside the open menu (toggle button + menu links).
      if (e.key === "Tab") {
        const menu = document.getElementById("mobile-menu");
        const items = [toggleRef.current, ...(menu?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
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
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const compact = scrolled || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.25, ease: EASE_OUT }}
      >
        {/* Solid layer fades in on scroll; only opacity animates. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border-b border-line/80 bg-ink/90 backdrop-blur-md"
          initial={false}
          animate={{ opacity: compact ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
        <motion.nav
          aria-label="Main"
          className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 md:px-8"
          initial={false}
          animate={{ y: compact ? 0 : 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <a href="#top" className="relative z-10 -m-2 p-2" aria-label={`${site.name}, back to top`}>
            <motion.span
              className="block origin-left"
              initial={false}
              animate={{ scale: compact ? 0.86 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Wordmark className="text-[1.9rem]" />
            </motion.span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative py-2 text-sm font-medium text-bone/80 transition-colors duration-300 hover:text-bone"
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-top scale-y-0 bg-blood-bright transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 -translate-y-2 rounded-full bg-blood-bright opacity-0 transition-[transform,opacity] duration-500 group-hover:translate-y-1 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <InkButton
              href={whatsappLink()}
              external
              magnetic
              className="hidden !min-h-[42px] text-sm sm:inline-flex"
              icon={<WhatsappLogoIcon size={18} weight="fill" />}
            >
              Get a quote on WhatsApp
            </InkButton>

            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-bone/25 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 block h-0.5 w-5 rounded bg-bone"
                  animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-0.5 w-5 rounded bg-bone"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[39] flex flex-col overflow-y-auto overscroll-contain bg-blood-deep lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: DRIP_HIDDEN }}
            animate={reduce ? { opacity: 1 } : { clipPath: DRIP_SHOWN }}
            exit={reduce ? { opacity: 0 } : { clipPath: DRIP_HIDDEN }}
            transition={{ duration: 0.75, ease: EASE_INK }}
          >
            <div className="flex flex-1 flex-col justify-between px-4 pb-10 pt-28">
              <motion.ul
                className="flex flex-col gap-1"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } }, hidden: {} }}
              >
                {LINKS.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display block py-1 text-[clamp(3rem,15vw,5.5rem)] text-bone"
                      variants={{
                        hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
                        show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
                      }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: EASE_OUT } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <InkButton
                  href={whatsappLink()}
                  external
                  variant="solid"
                  className="w-full justify-between"
                  icon={<WhatsappLogoIcon size={18} weight="fill" />}
                >
                  Get a quote on WhatsApp
                </InkButton>
                <p className="text-sm leading-relaxed text-bone/85">
                  {fullAddress}
                  <br />
                  <a href={site.phoneHref} className="underline decoration-bone/40 underline-offset-4">
                    {site.phoneDisplay}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
