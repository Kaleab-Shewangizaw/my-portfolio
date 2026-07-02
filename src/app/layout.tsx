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
  title: "Kal_X",
  description: "Software engineer.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://kal-x.vercel.app"),
  openGraph: {
    title: "Kal_X",
    description: "Software engineer. Based in Addis Ababa.",
    url: "https://kal-x.vercel.app",
    siteName: "Kal_X",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kal_X" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kal_X",
    description: "Software engineer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceMono.variable}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
