import type { ComponentType } from "react";
import Link from "next/link";
import type { Category, Product } from "@/data/catalogue";
import { getProductsByCategory } from "@/data/catalogue";
import { ArrowRightIcon, DropletIcon, LeafIcon, ShieldIcon, SparklesIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, ComponentType<{ width?: number; height?: number; className?: string }>> = {
  nettoyage: SparklesIcon,
  hygiene: DropletIcon,
  entretien: LeafIcon,
  assainissement: ShieldIcon,
};

type CategoryCardProps = {
  category: Category;
  products?: Product[];
};

/** Tuile de catégorie (design system Stitch — category navigators). */
export function CategoryCard({ category, products }: CategoryCardProps) {
  const Icon = categoryIcons[category.slug] ?? SparklesIcon;
  const count = (products ?? getProductsByCategory(category.slug)).length;

  return (
    <Link
      href={`/categorie/${category.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-border-soft bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary-soft hover:shadow-[0_12px_24px_-6px_rgba(14,75,42,0.1)]"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F9] text-secondary transition-colors group-hover:bg-primary-soft">
        <Icon width={24} height={24} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold tracking-tight text-ink">{category.label}</span>
        <span className="mt-0.5 block truncate text-sm text-ink-muted">
          {count} produit{count > 1 ? "s" : ""}
        </span>
      </span>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-ink-soft transition-all group-hover:bg-secondary group-hover:text-white",
        )}
        aria-hidden
      >
        <ArrowRightIcon width={15} height={15} />
      </span>
    </Link>
  );
}