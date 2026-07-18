import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site-config";

/**
 * Sitemap met alle statische routes.
 *
 * PRE-LAUNCH: de volledige site staat op noindex / disallow (zie
 * src/app/robots.ts + src/app/(site)/layout.tsx). Deze sitemap is al opgesteld
 * zodat ze bij domeinkoppeling meteen ingediend kan worden. Zie LAUNCH_CHECKLIST.md.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/algemene-voorwaarden", changeFrequency: "yearly", priority: 0.2 },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
