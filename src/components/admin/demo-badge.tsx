import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DemoBadgeProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Pastille "Données de démonstration" — permet de distinguer clairement
 * les données simulées (mission 01.5) des futures données réelles du système.
 */
export function DemoBadge({ children = "Données de démonstration", className }: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-tertiary/70 bg-tertiary-soft px-3 py-1 text-xs font-bold tracking-wide text-primary-dark",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-tertiary" aria-hidden />
      {children}
    </span>
  );
}