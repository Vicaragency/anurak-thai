import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { Deal } from "@/components/sections/deal";
import { CategoryMarquee } from "@/components/sections/category-marquee";
import { MenuHighlight } from "@/components/sections/menu-highlight";
import { Reviews } from "@/components/sections/reviews";
import { Cta } from "@/components/sections/cta";
import { JsonLd, restaurantSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  description:
    "Anurak Thai - heerlijke Thaise keuken in het hart van Roeselare. Verse soepen, dim sum, noodles en specialiteiten. Reserveer een tafel of bestel online.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={[restaurantSchema()]} />
      <Hero />
      <Deal />
      <CategoryMarquee />
      <MenuHighlight />
      <Reviews />
      <Cta />
    </>
  );
}
