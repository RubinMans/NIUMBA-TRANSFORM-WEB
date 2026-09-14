"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/admin/icons";

export type FilterChip = {
  id: string;
  label: string;
  count?: number;
};

/**
 * Barre de filtres Admin (pills). Sélection locale visuelle : le filtrage
 * réel interviendra avec les données Prisma/API dans les missions suivantes.
 */
export function FilterBar({
  options,
  activeId,
  onSelect,
  className,
}: {
  options: FilterChip[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const [internal, setInternal] = useState(activeId ?? options[0]?.id);

  function handleSelect(id: string) {
    setInternal(id);
    onSelect?.(id);
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} role="group" aria-label="Filtres">
      {options.map((option) => {
        const isActive = internal === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-colors",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "border border-border-soft bg-surface text-ink-muted hover:bg-surface-subtle hover:text-ink",
            )}
          >
            {option.label}
            {typeof option.count === "number" ? (
              <span
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold",
                  isActive ? "bg-white/20" : "bg-surface-subtle text-ink-soft",
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-surface px-4 py-2 text-xs font-bold tracking-wide text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
      >
        Plus de filtres
        <ChevronDownIcon width={14} height={14} />
      </button>
    </div>
  );
}