import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Gecondenseerde display-font voor de uppercase koppen: DIN Condensed (zelf-gehost, Bold).
const dinCondensed = localFont({
  src: "../../fonts/din-condensed-bold.woff2",
  variable: "--font-din",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.defaultTitle,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  // PRE-LAUNCH: noindex tot het echte domein gekoppeld is. Zie LAUNCH_CHECKLIST.md.
  robots: { index: false, follow: false },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${dinCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
