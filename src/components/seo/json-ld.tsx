import { SITE } from "@/lib/site-config";

type JsonObject = Record<string, unknown>;

/**
 * Rendert één of meerdere schema.org-objecten als
 * <script type="application/ld+json">. Te gebruiken in server components.
 */
export function JsonLd({ data }: { data: JsonObject | JsonObject[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/** Volledige URL vanaf een root-relatief pad. */
function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

const RESTAURANT_ID = `${SITE.url}/#restaurant`;

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  postalCode: SITE.address.postalCode,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.countryCode,
});

const DAY_MAP: Record<string, string> = {
  Maandag: "Monday",
  Dinsdag: "Tuesday",
  Woensdag: "Wednesday",
  Donderdag: "Thursday",
  Vrijdag: "Friday",
  Zaterdag: "Saturday",
  Zondag: "Sunday",
};

/** Lunch- en dinerdienst per dag omzetten naar OpeningHoursSpecification. */
function openingHoursSpecification() {
  const spec: JsonObject[] = [];
  for (const block of SITE.openingHours) {
    const day = DAY_MAP[block.day] ?? block.day;
    for (const range of [block.lunch, block.dinner]) {
      // Sla gesloten/lege dagdelen over (bv. "Gesloten" of "").
      if (!range.includes(" - ")) continue;
      const [opens, closes] = range.split(" - ");
      spec.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens,
        closes,
      });
    }
  }
  return spec;
}

/** Restaurant-schema met NAP, keuken, prijsklasse en openingsuren. */
export function restaurantSchema(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    image: abs(SITE.ogImage),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    servesCuisine: SITE.cuisine,
    priceRange: SITE.priceRange,
    currenciesAccepted: "EUR",
    acceptsReservations: true,
    hasMenu: abs("/menu"),
    address: postalAddress(),
    areaServed: { "@type": "City", name: SITE.address.city },
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [
      SITE.socials.instagram,
      SITE.socials.facebook,
      SITE.socials.tiktok,
    ],
  };
}

/** BreadcrumbList vanaf een lijst van {name, path}-items (in volgorde). */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
