import type { Metadata } from "next";

/**
 * Centrale bron van waarheid voor bedrijfs- en SEO-gegevens.
 * Gebruikt door de per-pagina metadata (buildMetadata), de footer/header en
 * de JSON-LD structured data (src/components/seo/json-ld.tsx).
 */
export const SITE = {
  name: "Anurak Thai",
  legalName: "Anurak Thai",
  /** Standaard <title> voor de home + fallback. */
  defaultTitle: "Anurak Thai - Thais restaurant in het hart van Roeselare",
  description:
    "Heerlijke Thaise keuken in het hart van Roeselare. Verse soepen, dim sum, noodles en specialiteiten. Reserveer een tafel of bestel online.",
  url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  locale: "nl_BE",
  phone: "051 77 70 76",
  /** Genormaliseerd voor tel:-links en schema. */
  phoneHref: "+3251777076",
  email: "info@anurakthai.be",
  cuisine: "Thai",
  priceRange: "€€",
  address: {
    street: "Iepersestraat 33",
    postalCode: "8800",
    city: "Roeselare",
    region: "West-Vlaanderen",
    countryCode: "BE",
    countryName: "België",
  },
  /** Externe platforms (openen in nieuw tabblad). */
  // Reservaties via TableBooker (onderdeel van Zenchef-groep).
  reserveUrl: "https://reservations.tablebooker.com/?restaurantId=34808064",
  // Online bestellen (afhaal/bezorg) via orderticket.net-webshop.
  orderUrl: "https://anurakthairoeselare.be/online-bestellen/",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://www.facebook.com/anurakthai.roeselare/",
    tiktok: "https://tiktok.com/",
  },
  /** Google Maps embed voor de contactpagina (Iepersestraat, Roeselare). */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Iepersestraat+33,+8800+Roeselare&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Iepersestraat+33+8800+Roeselare",
  /** Standaard Open Graph-afbeelding (1200x630). */
  ogImage: "/og/og-default.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  /**
   * Openingsuren per dag. Lunch- en dinerdienst.
   * Dinsdag gesloten, woensdag enkel 's avonds.
   * Volgorde = ma t/m zo, geschikt voor de urentabel en schema.org.
   */
  openingHours: [
    { day: "Maandag", lunch: "12:00 - 14:30", dinner: "18:00 - 22:30" },
    { day: "Dinsdag", lunch: "Gesloten", dinner: "" },
    { day: "Woensdag", lunch: "Gesloten", dinner: "18:00 - 22:30" },
    { day: "Donderdag", lunch: "12:00 - 14:30", dinner: "18:00 - 22:30" },
    { day: "Vrijdag", lunch: "12:00 - 14:30", dinner: "18:00 - 22:30" },
    { day: "Zaterdag", lunch: "12:00 - 14:30", dinner: "18:00 - 22:30" },
    { day: "Zondag", lunch: "12:00 - 14:30", dinner: "18:00 - 22:30" },
  ],
} as const;

interface BuildMetadataOptions {
  /** Paginatitel zonder merk-suffix, bv. "Menu". Leeg = home (default titel). */
  title?: string;
  description: string;
  /** Root-relatief pad, bv. "/contact". Wordt de canonical + og:url. */
  path: string;
  /** Root-relatief pad naar een afbeelding; standaard de site-brede OG-image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

/**
 * Bouwt een consistent Metadata-object met openGraph + twitter voor elke pagina.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const fullTitle = title ? `${title} - ${SITE.name}` : SITE.defaultTitle;
  const img = image ?? SITE.ogImage;

  return {
    title: title ? title : { absolute: SITE.defaultTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE.locale,
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        {
          url: img,
          width: SITE.ogImageWidth,
          height: SITE.ogImageHeight,
          alt: imageAlt ?? fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}

/** Gedeelde navigatie-items (nav-overlay, footer). */
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reserveren", href: SITE.reserveUrl },
  { label: "Bestellen", href: SITE.orderUrl },
  { label: "Contact", href: "/contact" },
] as const;
