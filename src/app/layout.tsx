import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Ambient } from "@/components/Ambient";
import { TopBar } from "@/components/TopBar";
import { Dock } from "@/components/Dock";
import { Footer } from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const description = `${site.name} (${site.alias}) — ${site.role}. ${site.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.alias}` },
  description,
  keywords: [site.name, "Kaleab", site.alias, "Kal_abX", "software engineer", "product engineer", "full-stack", "Next.js", "React", "TypeScript", site.location],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description,
    url: site.url,
    siteName: site.alias,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
    creator: "@Kal_abX",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--bg)]">
            Skip to content
          </a>
          <Ambient />
          <TopBar />
          <main id="main">{children}</main>
          <Footer />
          <Dock />
        </ThemeProvider>
      </body>
    </html>
  );
}
