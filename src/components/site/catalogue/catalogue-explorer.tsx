"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/data/catalogue";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/site/catalogue/product-card";

type CatalogueExplorerProps = {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
};

/**
 * Exploration du catalogue : recherche + filtre par catégorie.
 * Les cartes sont filtrées instantanément côté client ; chaque catégorie
 * possède aussi sa propre page navigable (/categorie/[slug]).
 */
export function CatalogueExplorer({
  products,
  categories,
  initialCategory,
}: CatalogueExplorerProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(initialCategory ?? "all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = active === "all" || product.categorySlug === active;
      const matchesQuery =
        needle === "" ||
        product.name.toLowerCase().includes(needle) ||
        product.brand.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, active]);

  const chips = [{ slug: "all", label: "Tous" }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filtrer par catégorie"
          className="flex flex-wrap items-center gap-2"
        >
          {chips.map((chip) => {
            const isActive = active === chip.slug;
            return (
              <button
                key={chip.slug}
                type="button"
                onClick={() => setActive(chip.slug)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-bold transition-colors",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border-soft bg-surface text-ink-muted hover:border-secondary-soft hover:text-primary",
                )}
                aria-pressed={isActive}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <label className="relative block lg:w-72">
          <span className="sr-only">Rechercher un produit</span>
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un produit…"
            className="h-11 w-full rounded-full border border-border-soft bg-surface pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-border-soft bg-surface p-10 text-center">
          <p className="text-base font-bold text-ink">Aucun produit ne correspond</p>
          <p className="mt-1 text-sm text-ink-muted">
            Essayez une autre recherche ou une autre catégorie.
          </p>
        </div>
      ) : null}
    </div>
  );
}