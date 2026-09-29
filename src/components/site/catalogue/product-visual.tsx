import { cn } from "@/lib/utils";
import type { Product } from "@/data/catalogue";

type ProductVisualProps = {
  product: Product;
  variant?: "dark" | "light";
  showName?: boolean;
  className?: string;
};

/**
 * Panneau visuel des produits BUKHETE.
 *
 * Dès qu'un visuel est renseigné (Admin → Produit → image), il est affiché.
 * En l'absence de visuel officiel (ASSETS_OFFICIELS), un panneau de marque
 * neutre affiche explicitement « Visuel officiel à venir » (anti-invention,
 * cahier § 15, § 52).
 */
export function ProductVisual({
  product,
  variant = "dark",
  showName = false,
  className,
}: ProductVisualProps) {
  if (product.image) {
    const image = product.image;
    return (
      <div
        className={cn(
          "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-surface-subtle",
          variant === "light" && "border-2 border-dashed border-border-soft",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${product.name} — ${product.brand}`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  if (variant === "light") {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] items-center justify-center rounded-3xl border-2 border-dashed border-border-soft bg-surface-subtle p-6",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-lg font-extrabold tracking-tight text-primary">
            {product.brand.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{product.name}</p>
            <p className="mt-1 text-[11px] font-medium text-ink-soft">
              Photographie produit officielle à venir
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary-deep text-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary-soft/10 blur-3xl" />

      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-5xl font-extrabold tracking-tight text-white/[0.06] md:text-7xl"
      >
        {product.brand}
      </p>

      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary-soft backdrop-blur-sm">
          {product.brand}
        </span>
        {showName ? (
          <p className="max-w-[14ch] text-lg font-extrabold leading-tight tracking-tight md:text-xl">
            {product.name}
          </p>
        ) : null}
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-sm">
          Visuel officiel à venir
        </span>
      </div>
    </div>
  );
}