import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryOfProduct, getProductBySlug, getProductsByCategory } from "@/services/catalogue";
import { toConfirm } from "@/data/catalogue";
import { siteConfig } from "@/lib/site";
import { ArrowRightIcon, LockIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductVisual } from "@/components/site/catalogue/product-visual";
import { ProductCard } from "@/components/site/catalogue/product-card";

type ProduitPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getProducts } = await import("@/services/catalogue");
  const products = await getProducts({ includeUnpublished: true });
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProduitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: `${product.name} · ${siteConfig.brandName}`,
    description: product.shortDescription || undefined,
  };
}

function sectionOf(value: string | null | undefined, fallback: string = toConfirm): string {
  return value ? value : fallback;
}

export default async function ProduitPage({ params }: ProduitPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = await getCategoryOfProduct(product);
  const categoryProducts = (await getProductsByCategory(product.categorySlug)).filter(
    (item) => item.slug !== product.slug,
  );

  const hasVideo = Boolean(product.videoUrl);

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
              {category ? (
                <>
                  <li>
                    <Link
                      href={`/categorie/${category.slug}`}
                      className="transition-colors hover:text-white"
                    >
                      {category.label}
                    </Link>
                  </li>
                  <li aria-hidden>·</li>
                </>
              ) : null}
              <li aria-current="page" className="font-semibold text-white">
                {product.name}
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      <section className="bg-surface py-10 md:py-14">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductVisual product={product} showName />
              {!product.image ? (
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
                  <LockIcon width={13} height={13} className="mt-0.5 shrink-0 text-secondary" />
                  Photographie officielle du produit à intégrer dès sa fourniture
                  (ASSETS_OFFICIELS). L’étiquette et l’emballage officiels seront
                  respectés à l’identique.
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
                  {product.brand}
                </span>
                <Badge variant={product.status === "Publié" ? "tertiary" : "neutral"}>
                  {product.status === "Publié" ? "Disponibilité à confirmer" : "Prochainement"}
                </Badge>
                {category ? <Badge variant="neutral">{category.label}</Badge> : null}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {product.shortDescription}
              </p>

              {product.description ? (
                <div className="mt-6 rounded-2xl border border-border-soft bg-surface-subtle p-5">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-ink">
                    {product.description}
                  </p>
                </div>
              ) : null}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border-soft bg-surface-subtle p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Conditionnement
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{sectionOf(product.packaging)}</p>
                </div>
                <div className="rounded-2xl border border-border-soft bg-surface-subtle p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Composition
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{sectionOf(product.composition)}</p>
                </div>
                <div className="rounded-2xl border border-border-soft bg-surface-subtle p-5 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Certifications
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{sectionOf(product.certifications)}</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { label: "Utilisation", value: sectionOf(product.additionalInfo) },
                  { label: "Mode d'emploi", value: sectionOf(product.instructions) },
                  { label: "Précautions d'usage", value: sectionOf(product.precautions) },
                ].map((section) => (
                  <div
                    key={section.label}
                    className="rounded-2xl border border-border-soft bg-surface p-5"
                  >
                    <p className="text-sm font-bold text-ink">{section.label}</p>
                    <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                      {section.value}
                    </p>
                  </div>
                ))}
              </div>

              {hasVideo ? (
                <div className="mt-4 rounded-2xl border border-border-soft bg-surface p-5">
                  <p className="text-sm font-bold text-ink">Vidéo associée</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    Découvrez ce produit en vidéo.
                  </p>
                  <a
                    href={product.videoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary-dark"
                  >
                    Regarder la vidéo
                    <ArrowRightIcon width={15} height={15} />
                  </a>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/commander" variant="primary" size="lg" withArrow>
                  Commander ce produit
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Demander des informations
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {categoryProducts.length > 0 ? (
        <section className="bg-surface-subtle py-12 md:py-16">
          <Container>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                  Dans la même catégorie
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                  {category?.label ?? "Autres produits"}
                </h2>
              </div>
              <Link
                href={`/categorie/${product.categorySlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary-dark"
              >
                Voir toute la catégorie
                <ArrowRightIcon width={15} height={15} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-primary text-white">
        <Container className="flex flex-col items-center gap-5 py-12 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-soft">
              Un besoin particulier ?
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
              Commander en gros ou devenir distributeur
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              href="/devenir-distributeur"
              variant="accent"
              size="lg"
              className="border border-white/20"
            >
              Devenir distributeur
            </Button>
            <Button
              href="/commander"
              size="lg"
              className="border border-white/25 bg-white/10 hover:bg-white/20"
            >
              Passer une commande
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}