"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * "Rad" met bleeding borden. Het middenbord staat groot en hoog, de zijborden
 * kleiner en lager. Klik op het wiel om het één plaats te draaien: de gerechten
 * verschuiven vloeiend zodat telkens een ander bord in het midden komt. Er zijn
 * 3 borden tegelijk zichtbaar; de rest wacht off-screen en schuift van opzij in.
 * De foto's zijn genormaliseerd zodat elk gerecht in eenzelfde slot even groot oogt.
 */
const DISHES = [
  { src: "/images/hero-dish-1.png", alt: "Vers bereid gerecht" },
  { src: "/images/hero-dish-2.png", alt: "Vers bereid gerecht" },
  { src: "/images/hero-dish-3.png", alt: "Vers bereid gerecht" },
  { src: "/images/hero-dish-4.png", alt: "Vers bereid gerecht" },
  { src: "/images/hero-dish-5.png", alt: "Vers bereid gerecht" },
];

// Slotstijlen per (signed) positie t.o.v. het midden. Slechts 3 zichtbaar.
const SLOT: Record<string, { transform: string; z: number; opacity: number }> = {
  "0": { transform: "translate(-50%, 0) scale(1)", z: 50, opacity: 1 },
  "1": { transform: "translate(calc(-50% + 30vw), 70px) scale(0.7)", z: 40, opacity: 1 },
  "-1": { transform: "translate(calc(-50% - 30vw), 70px) scale(0.7)", z: 40, opacity: 1 },
  offRight: { transform: "translate(calc(-50% + 96vw), 110px) scale(0.55)", z: 0, opacity: 0 },
  offLeft: { transform: "translate(calc(-50% - 96vw), 110px) scale(0.55)", z: 0, opacity: 0 },
};

export function HeroDishes() {
  const [rot, setRot] = useState(0);
  const n = DISHES.length;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[-70px] h-[560px] sm:bottom-[-90px] sm:h-[620px]">
      <div
        className="pointer-events-auto relative mx-auto h-full max-w-[1440px] cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label="Draai het bordenwiel"
        onClick={() => setRot((r) => r + 1)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setRot((r) => r + 1);
          }
        }}
      >
        {DISHES.map((dish, i) => {
          const pos = ((i + rot) % n + n) % n;
          const signed = pos <= n / 2 ? pos : pos - n;
          const key =
            Math.abs(signed) <= 1
              ? String(signed)
              : signed > 0
                ? "offRight"
                : "offLeft";
          const slot = SLOT[key];
          const isCenter = signed === 0;
          return (
            <div
              key={dish.src}
              className={`absolute bottom-0 left-1/2 aspect-square w-[74vw] max-w-[540px] transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
                isCenter ? "" : "hidden sm:block"
              }`}
              style={{
                transform: slot.transform,
                transformOrigin: "bottom center",
                zIndex: slot.z,
                opacity: slot.opacity,
              }}
            >
              <Image
                src={dish.src}
                alt={dish.alt}
                fill
                priority
                sizes="540px"
                draggable={false}
                className="pointer-events-none object-contain object-bottom drop-shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
