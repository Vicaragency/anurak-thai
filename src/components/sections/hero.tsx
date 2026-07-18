import { HeroDishes } from "./hero-dishes";

import { SITE } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-seigaiha lg:min-h-[900px]">
      {/* Verticale hang-ornamenten uit Figma (desktop) */}
      <img
        src="/images/hero-ornament.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[17%] top-[150px] hidden h-[230px] xl:block"
      />
      <img
        src="/images/hero-ornament.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[17%] top-[150px] hidden h-[230px] xl:block"
      />

      {/* Tekstblok */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-center px-6 pt-28 text-center lg:pt-32">
        <span className="inline-block rounded-full bg-beige-20 px-5 py-2 text-[15px] font-semibold text-brand">
          Thais restaurant in Roeselare
        </span>

        <h1 className="heading-display mt-6 max-w-[900px] text-[40px] text-heading sm:text-[50px] lg:text-[60px]">
          Heerlijke Thaise keuken
          <br />
          midden in Roeselare
        </h1>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={SITE.reserveUrl} variant="primary">
            Reserveren
          </Button>
          <Button href={SITE.orderUrl} variant="soft">
            Bestellen
          </Button>
        </div>
      </div>

      {/* Food-laag — interactief bordenwiel */}
      <HeroDishes />
    </section>
  );
}
