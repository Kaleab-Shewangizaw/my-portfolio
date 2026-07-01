import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LeftSidebar from "@/components/LeftSidebar";
import MobileHeader from "@/components/MobileHeader";

export const metadata: Metadata = {
  title: "Kal_X — Kaleab Shewangizaw",
  description:
    "Kaleab Shewangizaw's Portfolio. Full-Stack Developer | React, Next.js, Node.js | Open to Opportunities",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://kal-x.vercel.app"),
  openGraph: {
    title: "Kal_X — Kaleab Shewangizaw",
    description:
      "Full-Stack Developer | React, Next.js, Node.js | Open to Opportunities",
    url: "https://kal-x.vercel.app",
    siteName: "Kal_X Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kal_X Portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kal_X — Kaleab Shewangizaw",
    description: "Full-Stack Developer | React, Next.js, Node.js",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Mobile-only top bar */}
          <MobileHeader />

          <div className="flex" style={{ minHeight: "100dvh" }}>
            {/* Persistent left sidebar — hidden on mobile */}
            <LeftSidebar />

            {/* Page content */}
            <main className="flex-1 min-w-0 overflow-hidden">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
