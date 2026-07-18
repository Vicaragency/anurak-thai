import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Woordmerk "ANURAK THAI" in een afgerond goud blokje (Inter Bold, uppercase).
 * `tone="bright"` gebruikt het fellere geel voor op de donkere nav-overlay.
 */
export function Logo({
  className,
  tone = "brand",
  onClick,
}: {
  className?: string;
  tone?: "brand" | "bright";
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Anurak Thai - naar home"
      className={cn(
        "inline-flex items-center rounded-md px-3 py-2 text-[15px] font-bold uppercase tracking-[0.06em] text-brand-dark shadow-sm",
        tone === "bright" ? "bg-yellow" : "bg-gold",
        className,
      )}
    >
      Anurak Thai
    </Link>
  );
}
