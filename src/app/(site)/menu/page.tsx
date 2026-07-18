import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { Deal } from "@/components/sections/deal";
import { MenuList } from "@/components/sections/menu-list";
import { Cta } from "@/components/sections/cta";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description:
    "Ontdek de menukaart van Anurak Thai: verse soepen, dim sum, noodles, gebakken rijst en Thaise specialiteiten. Eten in het restaurant of afhalen in Roeselare.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
        ])}
      />
      <PageBanner title="Ons menu" />
      <Deal showBand={false} variant="seigaiha" />
      <MenuList />
      <Cta />
    </>
  );
}
