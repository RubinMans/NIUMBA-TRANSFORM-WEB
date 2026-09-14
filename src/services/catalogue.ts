import { prisma } from "@/db/client";
import {
  categories as staticCategories,
  products as staticProducts,
  type Category,
  type Product,
} from "@/data/catalogue";

/**
 * Service catalogue (mission 02) — piloté par la base de données.
 *
 * Lecture Prisma en priorité ; repli sûr sur les données statiques de
 * `src/data/catalogue.ts` si la base est indisponible (build sans base,
 * erreur temporaire). Les pages publiques et Admin passent par ici.
 */

function categorySlugOf(row: { category?: { slug: string } | null; categoryId: string | null }): string | null {
  return row.category?.slug ?? row.categoryId;
}

function toPublicProduct(row: {
  slug: string;
  name: string;
  brand: string;
  category?: { slug: string } | null;
  categoryId: string | null;
  status: string;
  active: boolean;
  shortDescription: string | null;
  packaging: string | null;
  composition: string | null;
  certifications: string | null;
  image: string | null;
  description?: string | null;
  instructions?: string | null;
  precautions?: string | null;
  additionalInfo?: string | null;
  videoUrl?: string | null;
}): Product {
  const categorySlug = categorySlugOf(row);
  return {
    slug: row.slug,
    name: row.name,
    brand: row.brand || "BUKHETE",
    categorySlug: categorySlug || "nettoyage",
    status: (row.status as Product["status"]) || "Brouillon",
    shortDescription: row.shortDescription || "",
    packaging: row.packaging ?? null,
    composition: row.composition ?? null,
    certifications: row.certifications ?? null,
    image: row.image ?? null,
    description: row.description ?? null,
    instructions: row.instructions ?? null,
    precautions: row.precautions ?? null,
    additionalInfo: row.additionalInfo ?? null,
    videoUrl: row.videoUrl ?? null,
  };
}

const productSelection = {
  slug: true,
  name: true,
  brand: true,
  categoryId: true,
  status: true,
  active: true,
  shortDescription: true,
  packaging: true,
  composition: true,
  certifications: true,
  image: true,
  description: true,
  instructions: true,
  precautions: true,
  additionalInfo: true,
  videoUrl: true,
  sortOrder: true,
} as const;

export async function getCategories(): Promise<Category[]> {
  try {
    const rows = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: { slug: true, label: true, description: true },
    });
    if (rows.length === 0) return staticCategories;
    return rows.map((row) => ({
      slug: row.slug,
      label: row.label,
      description: row.description || "",
    }));
  } catch {
    return staticCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const found = (await getCategories()).find((category) => category.slug === slug);
  if (found) return found;
  try {
    const row = await prisma.category.findUnique({
      where: { slug },
      select: { slug: true, label: true, description: true },
    });
    if (!row) return undefined;
    return { slug: row.slug, label: row.label, description: row.description || "" };
  } catch {
    return undefined;
  }
}

export async function getProducts(opts?: { includeUnpublished?: boolean }): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { ...productSelection, category: { select: { slug: true } } },
    });
    if (rows.length === 0) return staticProducts;
    const visible = rows.filter(
      (row) => row.active && (opts?.includeUnpublished || row.status !== "Brouillon"),
    );
    return visible.map(toPublicProduct);
  } catch {
    return staticProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts({ includeUnpublished: true });
  const found = products.find((product) => product.slug === slug);
  if (found) return found;
  try {
    const row = await prisma.product.findUnique({
      where: { slug },
      select: { ...productSelection, category: { select: { slug: true } } },
    });
    return row ? toPublicProduct(row) : undefined;
  } catch {
    return undefined;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const all = await getProducts({ includeUnpublished: true });
  return all.filter((product) => product.categorySlug === categorySlug);
}

export async function getCategoryOfProduct(product: Product): Promise<Category | undefined> {
  return getCategoryBySlug(product.categorySlug);
}