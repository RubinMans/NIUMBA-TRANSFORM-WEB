"use client";

import { SearchIcon } from "@/components/admin/icons";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  /** Valeur initiale (recherche visuelle uniquement en mission 01.5). */
  defaultValue?: string;
};

/**
 * Barre de recherche Admin. En mission 01.5 la recherche est visuelle
 * (prévisualisation) : le filtrage réel sera branché sur les API métier.
 */
export function SearchBar({ placeholder = "Rechercher…", className, defaultValue }: SearchBarProps) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{placeholder}</span>
      <SearchIcon
        width={16}
        height={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
      />
      <input
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-10 w-full rounded-full border border-border-soft bg-surface pl-9 pr-4 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}