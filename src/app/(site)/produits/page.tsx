import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CategoryCard } from "@/components/site/catalogue/category-card";
import { CatalogueExplorer } from "@/components/site/catalogue/catalogue-explorer";
import { getCategories, getProducts } from "@/services/catalogue";

export const metadata: Metadata = {
  title: "Catalogue BUKHETE",
  description:
    "Découvrez le catalogue BUKHETE : savons, lessives, liquides vaisselle, eau de Javel, esprit de sel et balais écologiques, fabriqués en RDC.",
};

export default async function ProduitsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Badge variant="accent">Catalogue {siteConfig.brandName}</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Les produits BUKHETE
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Nettoyage, entretien, hygiène et assainissement : une gamme congolaise de
            produits d’entretien conçue pour les foyers, les entreprises et les
            institutions.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                Parcourir par catégorie
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                Catégories du catalogue
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              Chaque catégorie dispose de sa propre page pour retrouver les produits qui
              lui correspondent.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} products={products} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
              Tous les produits
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              La gamme {siteConfig.brandName}
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
              Liste des produits actuellement prévus par l’entreprise. Les photographies
              et informations commerciales officielles seront intégrées dès leur
              fourniture.
            </p>
          </div>

          <div className="mt-8">
            <CatalogueExplorer
              products={products}
              categories={categories}
            />
          </div>
        </Container>
      </section>
    </>
  );
}