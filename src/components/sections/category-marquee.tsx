import Image from "next/image";

import { MARQUEE_CATEGORIES } from "@/lib/menu";

/** Donkerrode, horizontaal scrollende band met categorieën + thumbnails. */
export function CategoryMarquee() {
  const items = [...MARQUEE_CATEGORIES, ...MARQUEE_CATEGORIES];
  return (
    <section className="overflow-hidden bg-brand-dark py-5 text-white">
      <div className="flex w-max animate-marquee items-center">
        {items.map((cat, i) => (
          <div key={i} className="flex items-center gap-4 pr-12">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/25">
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="heading-display text-[26px] tracking-wide">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
