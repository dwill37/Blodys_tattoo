import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyBlodys } from "@/components/WhyBlodys";
import { Styles } from "@/components/Styles";
import { Work } from "@/components/Work";
import { Artist } from "@/components/Artist";
import { Reviews } from "@/components/Reviews";
import { Process } from "@/components/Process";
import { Location } from "@/components/Location";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SHOW_ARTIST, SHOW_REVIEWS, hours, isPlaceholder, site } from "@/lib/site";

function jsonLd() {
  const open = hours.filter((h) => h.open);
  const groups = new Map<string, string[]>();
  for (const h of open) {
    const key = `${h.open}-${h.close}`;
    groups.set(key, [...(groups.get(key) ?? []), h.schemaDay]);
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image.jpg`,
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.plusCode)}`,
    openingHoursSpecification: [...groups.entries()].map(([key, days]) => {
      const [opens, closes] = key.split("-");
      return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
    }),
  };
  if (site.geo) data.geo = { "@type": "GeoCoordinates", ...site.geo };
  const sameAs = [site.instagram, site.facebook].filter((u) => !isPlaceholder(u));
  if (sameAs.length) data.sameAs = sameAs;

  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <Nav />
      <main id="main">
        <Hero />
        <WhyBlodys />
        <Styles />
        <Work />
        {SHOW_ARTIST ? <Artist /> : null}
        {SHOW_REVIEWS ? <Reviews /> : null}
        <Process />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
