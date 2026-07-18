# 🚀 Launch checklist — Anurak Thai

Af te werken **op het moment dat het echte domein gekoppeld wordt**. Zolang de site op
`*.vercel.app` draait, staat ze bewust op **noindex** (niet vindbaar in Google).

## ⚠️ BIJ DOMEINKOPPELING — indexering terug aanzetten
1. **`src/app/robots.ts`** → verwijder de `disallow: "/"` (zet toe: `allow: "/"`) en voeg de
   sitemap-verwijzing toe.
2. **`src/app/(site)/layout.tsx`** → verwijder `robots: { index: false, follow: false }`
   uit de `metadata` (of zet op `index: true`).
3. **`NEXT_PUBLIC_SERVER_URL`** (lokaal `.env.local` + Vercel production) → zet op het echte
   domein (bv. `https://www.anurakthai.be`) i.p.v. de `*.vercel.app`-URL.
4. Verifieer met Google Search Console dat de site indexeerbaar is + dien de sitemap in.

## Andere launch-taken
- [ ] Custom domein koppelen in Vercel + DNS.
- [ ] **Reserveren / Bestellen koppelen** — nu wijzen `SITE.reserveUrl` en `SITE.orderUrl`
      (`src/lib/site-config.ts`) naar `#`. Vervang door de echte boekings-/bestel-URL's zodra
      het platform gekozen is (bv. Zenchef, TheFork, UberEats, Deliveroo, eigen bestelmodule).
- [ ] **Socials** — Facebook staat correct; Instagram- en TikTok-URL's in `SITE.socials`
      zijn nog placeholders. Vervang door echte URL's of verwijder ze uit de footer.
- [ ] **Eigen fotografie** — `public/images/*` zijn nog stockplaatsen (overgenomen van het
      basistemplate). Vervang door echte foto's van Anurak Thai (gerechten, interieur, team).
- [ ] **OG-preview-afbeelding** — `public/og/og-default.jpg` (1200×630) staat klaar met de
      huisstijl; vervang eventueel door een foto van het restaurant zodra beschikbaar.
- [ ] Content bevestigen door de klant (menukaart + prijzen, openingsuren, reviews, WK-deal).
- [ ] **WK-deal** — de deal op de home (`src/components/sections/deal.tsx`) is tijdsgebonden
      (`validUntil = "19 juli"`). Na afloop aanpassen of de `<Deal />` uit `page.tsx` halen.

## Display-font (licentie)
De koppen gebruiken **DIN Condensed Bold** (`src/fonts/din-condensed-bold.woff2`). Dit is een
systeemfont, niet web-gelicentieerd — vervang door een gelicentieerd bestand voor productie.
