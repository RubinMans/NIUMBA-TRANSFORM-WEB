import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories, getProductsByCategory } from "@/services/catalogue";
import { siteConfig } from "@/lib/site";
import { ArrowRightIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/site/catalogue/product-card";

type CategoriePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoriePageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: `${category.label} — Catalogue ${siteConfig.brandName}`,
    description: category.description,
  };
}

export default async function CategoriePage({ params }: CategoriePageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = await getProductsByCategory(category.slug);

  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-primary-soft/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/produits" className="transition-colors hover:text-white">
                  Catalogue
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="font-semibold text-white">
                {category.label}
              </li>
            </ol>
          </nav>

          <Badge variant="accent">Catégorie {siteConfig.brandName}</Badge>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            {category.label}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            {category.description}
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                {categoryProducts.length} produit{categoryProducts.length > 1 ? "s" : ""}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                Produits de la catégorie {category.label}
              </h2>
            </div>
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary-dark"
            >
              Retour au catalogue
              <ArrowRightIcon width={15} height={15} className="rotate-180" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-border-soft bg-surface p-10 text-center">
              <p className="text-base font-bold text-ink">Aucun produit dans cette catégorie</p>
              <p className="mt-1 text-sm text-ink-muted">
                Les produits seront ajoutés prochainement.
              </p>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/commander" variant="primary" withArrow>
              Passer une commande
            </Button>
            <Button href="/contact" variant="ghost">
              Demander des informations
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}