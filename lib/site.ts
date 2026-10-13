/**
 * Single source of truth for every business fact on the site.
 * Anything wrapped in [PLACEHOLDER: ...] must be filled in by the studio.
 * Never add facts here that the studio has not confirmed.
 */

export const SHOW_ARTIST = true;
export const SHOW_REVIEWS = true; // set to false to hide the section until real Google reviews exist

export const site = {
  name: "Blodys Tattoo",
  shortName: "Blodys",
  url: "https://blodystattoo.com", // [PLACEHOLDER: final domain]
  phoneDisplay: "+52 998 222 2093",
  phoneHref: "tel:+529982222093",
  phoneE164: "+529982222093",
  whatsappNumber: "529982222093",
  address: {
    street: "C. 30 Poniente", // [PLACEHOLDER: confirm "Poniente" and street number]
    neighborhood: "Supermanzana 67",
    postalCode: "77510",
    city: "Cancún",
    region: "Quintana Roo",
    regionShort: "Q.R.",
    country: "MX",
    countryName: "México",
  },
  plusCode: "55G9+JF Cancún, Quintana Roo, México",
  // [PLACEHOLDER: latitude/longitude from plus code 55G9+JF]. Leave null until confirmed;
  // the JSON-LD only emits `geo` when this is set.
  geo: null as { latitude: number; longitude: number } | null,
  instagram: "[PLACEHOLDER: Instagram URL]",
  facebook: "[PLACEHOLDER: Facebook link]",
  email: "[PLACEHOLDER: email]",
  googleReviewLink: "[PLACEHOLDER: Google review link]",
};

export const fullAddress = `${site.address.street}, ${site.address.neighborhood}, ${site.address.postalCode} ${site.address.city}, ${site.address.regionShort}, ${site.address.countryName}`;

export const mapsQuery = encodeURIComponent(site.plusCode);
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

/** Builds a wa.me link with an English, URL-encoded pre-filled message. */
export function whatsappLink(message = "Hi Blodys Tattoo! I saw your website and I'd like a quote for a tattoo.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const isPlaceholder = (value: string) => value.startsWith("[PLACEHOLDER");

/* ---------------------------------------------------------------- Hours */

export type DayHours = { day: string; short: string; schemaDay: string; open: string | null; close: string | null };

// Index 0 = Sunday, matching Date.getDay()
export const hours: DayHours[] = [
  { day: "Sunday", short: "Sun", schemaDay: "Sunday", open: null, close: null },
  { day: "Monday", short: "Mon", schemaDay: "Monday", open: "13:00", close: "20:00" },
  { day: "Tuesday", short: "Tue", schemaDay: "Tuesday", open: null, close: null },
  { day: "Wednesday", short: "Wed", schemaDay: "Wednesday", open: "13:00", close: "20:00" },
  { day: "Thursday", short: "Thu", schemaDay: "Thursday", open: "13:00", close: "20:00" },
  { day: "Friday", short: "Fri", schemaDay: "Friday", open: "13:00", close: "20:00" },
  { day: "Saturday", short: "Sat", schemaDay: "Saturday", open: "13:00", close: "19:00" },
];

/** Monday-first order for tables. */
export const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export const STUDIO_TZ = "America/Cancun";

/** Current weekday index and minutes since midnight in Cancún time, whatever the visitor's timezone. */
export function nowInCancun(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STUDIO_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { dayIndex, minutes };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export type OpenStatus = { open: boolean; label: string };

export function getOpenStatus(date = new Date()): OpenStatus {
  const { dayIndex, minutes } = nowInCancun(date);
  const today = hours[dayIndex];

  const nextOpenDay = () => {
    for (let i = 1; i <= 7; i++) {
      const d = hours[(dayIndex + i) % 7];
      if (d.open) return { name: d.day, open: d.open };
    }
    return null;
  };

  if (today.open && today.close) {
    const o = toMinutes(today.open);
    const c = toMinutes(today.close);
    if (minutes < o) return { open: true, label: `Open today · ${today.open}-${today.close}` };
    if (minutes < c) return { open: true, label: `Open now · until ${today.close}` };
    const next = nextOpenDay();
    return { open: false, label: next ? `Closed now · Opens ${next.name} at ${next.open}` : "Closed now" };
  }

  const next = nextOpenDay();
  return { open: false, label: next ? `Closed today · Opens ${next.name} at ${next.open}` : "Closed today" };
}

/** Placeholder URLs fall back to "#" so nothing links to a broken relative path before launch. */
export const href = (value: string) => (isPlaceholder(value) ? "#" : value);
