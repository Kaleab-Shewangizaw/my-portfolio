import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/Toaster";
import { Discoveries } from "@/components/Discoveries";
import { Bubble } from "@/components/Bubble";
import { Reward } from "@/components/Reward";
import { TopBar } from "@/components/TopBar";
import { Dock } from "@/components/Dock";
import { Footer } from "@/components/Footer";
import { getProjects } from "@/lib/projects";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description = `${site.name} (${site.alias}), ${site.role} in ${site.city}. ${site.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.alias}` },
  description,
  keywords: [site.name, "Kaleab", site.alias, "Kal_abX", "software engineer", "mobile developer", "React Native", "full-stack", "Next.js", "React", "TypeScript", site.location],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description,
    url: site.url,
    siteName: site.alias,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
    creator: "@Kal_abX",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const projects = (await getProjects()).map(({ slug, name, kind }) => ({ slug, name, kind }));
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--bg)]">
            Skip to content
          </a>
          <TopBar />
          <main id="main">{children}</main>
          <Footer />
          <Dock projects={projects} />
          <Toaster />
          <Discoveries />
          <Bubble />
          <Reward />
        </ThemeProvider>
      </body>
    </html>
  );
}
