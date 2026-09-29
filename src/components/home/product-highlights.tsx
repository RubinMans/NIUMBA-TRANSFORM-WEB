import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ArrowRightIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CategoryCard } from "@/components/site/catalogue/category-card";
import { ProductCard } from "@/components/site/catalogue/product-card";
import { getCategories, getProducts } from "@/services/catalogue";

/**
 * Produits BUKHETE mis en avant + catégories (page accueil, cahier § 10).
 * Données pilotées par la base.
 */
export async function ProductHighlights() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const featured = products.filter((product) => product.status === "Publié").slice(0, 4);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Badge variant="tertiary">La gamme {siteConfig.brandName}</Badge>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              Le catalogue, catégorie par catégorie
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Nettoyage, entretien, hygiène et assainissement : découvrez les produits
              actuellement prévus par la marque {siteConfig.brandName}.
            </p>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-secondary-dark"
          >
            Tout le catalogue
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} products={products} />
          ))}
        </div>
      </Container>
    </section>
  );
}