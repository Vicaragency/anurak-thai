import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { ContactInfo } from "@/components/sections/contact-info";
import {
  JsonLd,
  breadcrumbSchema,
  restaurantSchema,
} from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Anurak Thai vind je in de Iepersestraat 33, 8800 Roeselare. Open voor lunch en diner, dinsdag gesloten. Reserveer of bel 051 77 70 76.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          restaurantSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageBanner title="Contact" />
      <ContactInfo />
    </>
  );
}
