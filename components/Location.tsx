"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPinIcon, NavigationArrowIcon, PhoneIcon } from "@phosphor-icons/react";
import { useClientValue } from "@/lib/useClientValue";
import { InkButton } from "@/components/ui/InkButton";
import { ClipReveal } from "@/components/ui/DripReveal";
import { directionsUrl, fullAddress, hours, mapEmbedUrl, nowInCancun, site, weekOrder } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

export function Location() {
  const reduce = useReducedMotion();
  const today = useClientValue<number | null>(() => nowInCancun().dayIndex, null);

  return (
    <section id="location" aria-labelledby="location-title" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blood-bright">Visit the studio</p>
        <h2 id="location-title" className="display mt-4 text-[clamp(3rem,8vw,7rem)]">
          Supermanzana 67, Cancún.
        </h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <ClipReveal
            className="relative min-h-[360px] overflow-hidden bg-ink-2 lg:min-h-[520px]"
            from="inset(0 100% 0 0)"
            to="inset(0 0% 0 0)"
            duration={1.2}
          >
            <iframe
              title={`Map showing ${site.name} at ${fullAddress}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
            />
          </ClipReveal>

          <div className="flex flex-col">
            <address className="not-italic">
              <p className="flex items-start gap-3 text-lg leading-snug">
                <MapPinIcon size={22} className="mt-0.5 shrink-0 text-blood-bright" aria-hidden="true" />
                <span>
                  {site.address.street}, {site.address.neighborhood}
                  <br />
                  {site.address.postalCode} {site.address.city}, {site.address.regionShort}, {site.address.countryName}
                </span>
              </p>
              <p className="mt-2 pl-[34px] text-sm text-bone-muted">Plus code: 55G9+JF Cancún</p>
              <p className="mt-4 flex items-center gap-3 text-lg">
                <PhoneIcon size={22} className="shrink-0 text-blood-bright" aria-hidden="true" />
                <a href={site.phoneHref} className="underline decoration-bone/30 underline-offset-4 hover:decoration-blood-bright">
                  {site.phoneDisplay}
                </a>
              </p>
            </address>

            <h3 className="mt-10 text-sm font-semibold text-bone-muted">Opening hours</h3>
            <table className="mt-3 w-full text-left">
              <caption className="sr-only">Weekly opening hours, Cancún time</caption>
              <tbody>
                {weekOrder.map((d, i) => {
                  const h = hours[d];
                  const isToday = today === d;
                  return (
                    <motion.tr
                      key={h.day}
                      className="relative"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE_OUT }}
                      aria-current={isToday ? "date" : undefined}
                    >
                      <th scope="row" className={`relative py-3 pl-4 font-medium transition-colors duration-700 ${isToday ? "bg-blood/20" : ""}`}>
                        {isToday ? (
                          <motion.span
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-[3px] origin-top bg-blood-bright"
                            initial={reduce ? false : { scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
                          />
                        ) : null}
                        <span className={isToday ? "text-bone" : "text-bone/85"}>
                          {h.day}
                          {isToday ? <span className="ml-2 text-xs font-semibold text-blood-bright">Today</span> : null}
                        </span>
                      </th>
                      <td className={`py-3 pr-4 text-right tabular-nums transition-colors duration-700 ${isToday ? "bg-blood/20" : ""} ${h.open ? "text-bone" : "text-bone-muted"}`}>
                        {h.open ? `${h.open} - ${h.close}` : "Closed"}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-10">
              <InkButton
                href={directionsUrl}
                external
                magnetic
                variant="solid"
                icon={<NavigationArrowIcon size={18} weight="fill" />}
              >
                Get directions
              </InkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
