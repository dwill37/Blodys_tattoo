import type { Metadata, Viewport } from "next";
import { Anton, Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/MotionProvider";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"], display: "swap" });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

const title = "Blodys Tattoo | Tattoo Shop & Tattoo Artist in Cancún, Supermanzana 67";
const description =
  "Tattoo studio in Supermanzana 67, Cancún. Send your idea on WhatsApp and get a quote. Open Mon and Wed-Sat from 13:00. Call +52 998 222 2093.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "tattoo shop Cancún",
    "tattoo artist Cancún",
    "tattoo studio Supermanzana 67 Cancún",
    "tattoo Cancún",
    "Blodys Tattoo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${geist.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-bone px-5 py-3 font-semibold text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
