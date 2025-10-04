import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/componenets/themeProvider";
import Footer from "./sections/Footer";

export const metadata: Metadata = {
  title: "Kal_X",
  description:
    "Kaleab Shewangizaw's Portfolio. Full-Stack Developer | React, Next.js, Node.js | Open to Opportunities",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL("https://kal-x.vercel.app"),
  openGraph: {
    title: "Kal_X",
    description:
      "Kaleab Shewangizaw's Portfolio. Full-Stack Developer | React, Next.js, Node.js | Open to Opportunities",
    url: "https://kal-x.vercel.app",
    siteName: "Kal_X Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kal_X Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kal_X",
    description:
      "Kaleab Shewangizaw's Portfolio. Full-Stack Developer | React, Next.js, Node.js | Open to Opportunities",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased not-dark:bg-[#887baf]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative">
            {children} <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
