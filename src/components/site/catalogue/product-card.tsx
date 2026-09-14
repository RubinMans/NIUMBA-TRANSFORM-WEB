import Link from "next/link";
import type { Product } from "@/data/catalogue";
import { getCategoryOfProduct } from "@/data/catalogue";
import { ArrowRightIcon } from "@/lib/icons";
import { ProductVisual } from "@/components/site/catalogue/product-visual";

type ProductCardProps = {
  product: Product;
};

function StatusChip({ product }: ProductCardProps) {
  if (product.status === "Publié") {
    return (
      <span className="rounded-full bg-tertiary-soft px-3 py-1 text-[11px] font-bold text-primary-dark">
        Disponibilité à confirmer
      </span>
    );
  }
  return (
    <span className="rounded-full bg-surface-subtle px-3 py-1 text-[11px] font-bold text-ink-muted">
      Prochainement
    </span>
  );
}

/** Carte produit du catalogue (design system Stitch — produit § 3). */
export function ProductCard({ product }: ProductCardProps) {
  const category = getCategoryOfProduct(product);

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary-soft hover:shadow-[0_12px_24px_-6px_rgba(14,75,42,0.12)]"
    >
      <ProductVisual product={product} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
            {product.brand}
          </span>
          <StatusChip product={product} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold tracking-tight text-ink">{product.name}</h3>
          {category ? (
            <p className="mt-1 text-sm text-ink-muted">Catégorie {category.label}</p>
          ) : null}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-secondary-dark">
          Voir la fiche
          <ArrowRightIcon
            width={15}
            height={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}