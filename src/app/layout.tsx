import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LeftSidebar from "@/components/LeftSidebar";
import MobileHeader from "@/components/MobileHeader";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Kal_X",
    template: "%s · Kal_X",
  },
  description:
    "Kaleab Shewangizaw (Kal_X) — CTO at Pazimo. I build web and mobile products, design systems, and lead engineering teams in Addis Ababa.",
  keywords: [
    "Kaleab Shewangizaw",
    "Kaleab",
    "Kal_X",
    "kal-x",
    "kalx",
    "Kal_abX",
    "CTO",
    "Pazimo",
    "software engineer",
    "web developer",
    "Next.js",
    "React",
    "TypeScript",
    "Addis Ababa",
    "Ethiopia",
  ],
  authors: [{ name: "Kaleab Shewangizaw", url: "https://kal-x.vercel.app" }],
  creator: "Kaleab Shewangizaw",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://kal-x.vercel.app" },
  metadataBase: new URL("https://kal-x.vercel.app"),
  openGraph: {
    title: "Kal_X",
    description: "CTO at Pazimo. I build web and mobile products, design systems, and lead engineering.",
    url: "https://kal-x.vercel.app",
    siteName: "Kal_X",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kal_X — Kaleab Shewangizaw" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kal_X",
    description: "CTO at Pazimo. I build web and mobile products.",
    creator: "@Kal_abX",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kaleab Shewangizaw",
  alternateName: "Kal_X",
  jobTitle: "Chief Technology Officer",
  worksFor: { "@type": "Organization", name: "Pazimo" },
  url: "https://kal-x.vercel.app",
  email: "kaleab.stk@gmail.com",
  sameAs: [
    "https://github.com/Kaleab-Shewangizaw",
    "https://linkedin.com/in/kal-x",
    "https://x.com/Kal_abX",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Mobile Development",
    "System Design",
    "Engineering Leadership",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceMono.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MobileHeader />
          <div className="flex" style={{ minHeight: "100dvh" }}>
            <LeftSidebar />
            <main className="flex-1 min-w-0 overflow-hidden">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
