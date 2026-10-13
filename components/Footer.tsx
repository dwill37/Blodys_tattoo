import { EnvelopeSimpleIcon, FacebookLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react/ssr";
import { Wordmark } from "@/components/ui/Wordmark";
import { Year } from "@/components/ui/Year";
import { SHOW_ARTIST, fullAddress, hours, href, isPlaceholder, site, weekOrder, whatsappLink } from "@/lib/site";

const LINKS = [
  { href: "#styles", label: "Styles" },
  { href: "#work", label: "Work" },
  ...(SHOW_ARTIST ? [{ href: "#artist", label: "Artist" }] : []),
  { href: "#process", label: "Process" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

const social = [
  { label: "Instagram", url: site.instagram, Icon: InstagramLogoIcon },
  { label: "Facebook", url: site.facebook, Icon: FacebookLogoIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-4 pb-28 pt-20 text-bone-muted md:px-8 md:pb-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[4fr_3fr_3fr_2fr]">
          <div>
            <Wordmark className="text-6xl" />
            <p className="mt-4 text-sm font-medium text-bone">{site.name}</p>
            <address className="mt-3 max-w-xs text-sm not-italic leading-relaxed">
              {fullAddress}
              <br />
              <a href={site.phoneHref} className="mt-2 inline-block text-bone underline decoration-bone/30 underline-offset-4 hover:decoration-blood-bright">
                {site.phoneDisplay}
              </a>
              <br />
              {isPlaceholder(site.email) ? (
                <span className="mt-1 inline-flex items-center gap-2">
                  <EnvelopeSimpleIcon size={16} aria-hidden="true" /> {site.email}
                </span>
              ) : (
                <a href={`mailto:${site.email}`} className="mt-1 inline-flex items-center gap-2 text-bone hover:text-blood-bright">
                  <EnvelopeSimpleIcon size={16} aria-hidden="true" /> {site.email}
                </a>
              )}
            </address>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-bone">Hours</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
              {weekOrder.map((d) => (
                <div key={d} className="contents">
                  <dt>{hours[d].day}</dt>
                  <dd className="tabular-nums text-bone/85">{hours[d].open ? `${hours[d].open} - ${hours[d].close}` : "Closed"}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-bone">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-bone">Follow</h2>
            <ul className="mt-4 flex gap-2">
              {social.map(({ label, url, Icon }) => (
                <li key={label}>
                  <a
                    href={href(url)}
                    {...(isPlaceholder(url) ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={`${site.name} on ${label}`}
                    title={isPlaceholder(url) ? url : undefined}
                    className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:border-blood hover:bg-blood"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © <Year /> {site.name}. All rights reserved.
          </p>
          <p>Tattoo studio in Supermanzana 67, Cancún, Quintana Roo.</p>
        </div>
      </div>
    </footer>
  );
}
