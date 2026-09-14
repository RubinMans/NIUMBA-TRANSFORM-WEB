import { notFound } from "next/navigation";
import { prisma } from "@/db/client";
import { slugify } from "@/data/catalogue";

/**
 * Service Admin — produits (mission 02).
 * Lecture/écriture en base pour la gestion du catalogue BUKHETE.
 */

export type AdminProductListItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  reference: string | null;
  categoryLabel: string | null;
  categorySlug: string | null;
  status: string;
  active: boolean;
  featured: boolean;
  image: string | null;
  shortDescription: string | null;
  updatedAt: Date;
};

export type AdminProductDetail = AdminProductListItem & {
  description: string | null;
  composition: string | null;
  certifications: string | null;
  packaging: string | null;
  instructions: string | null;
  precautions: string | null;
  additionalInfo: string | null;
  videoUrl: string | null;
  sortOrder: number;
  images: { id: string; url: string; alt: string | null; position: number }[];
};

export type CategoryOption = {
  id: string;
  slug: string;
  label: string;
};

export async function getAdminProducts(): Promise<AdminProductListItem[]> {
  const rows = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { category: { select: { slug: true, label: true } } },
  });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    reference: row.reference,
    categoryLabel: row.category?.label ?? null,
    categorySlug: row.category?.slug ?? null,
    status: row.status,
    active: row.active,
    featured: row.featured,
    image: row.image,
    shortDescription: row.shortDescription,
    updatedAt: row.updatedAt,
  }));
}

export async function getAdminProduct(id: string): Promise<AdminProductDetail | null> {
  const row = await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { slug: true, label: true } },
      images: { orderBy: { position: "asc" } },
    },
  });
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    reference: row.reference,
    categoryLabel: row.category?.label ?? null,
    categorySlug: row.category?.slug ?? null,
    status: row.status,
    active: row.active,
    featured: row.featured,
    image: row.image,
    shortDescription: row.shortDescription,
    description: row.description,
    composition: row.composition,
    certifications: row.certifications,
    packaging: row.packaging,
    instructions: row.instructions,
    precautions: row.precautions,
    additionalInfo: row.additionalInfo,
    videoUrl: row.videoUrl,
    sortOrder: row.sortOrder,
    updatedAt: row.updatedAt,
    images: row.images.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt,
      position: image.position,
    })),
  };
}

/** Charge un produit admin ou déclenche notFound(). */
export async function requireAdminProduct(id: string): Promise<AdminProductDetail> {
  const product = await getAdminProduct(id);
  if (!product) notFound();
  return product;
}

export async function getCategoryOptions(): Promise<CategoryOption[]> {
  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, slug: true, label: true },
  });
  return rows;
}

/** Vérifie l'unicité du slug (un autre produit l'utilise-t-il ?). */
export async function slugIsTaken(slug: string, excludeId?: string): Promise<boolean> {
  const found = await prisma.product.findUnique({ where: { slug } });
  return !!found && found.id !== excludeId;
}

/** Génère un slug unique à partir d'un nom. */
export async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const baseSlug = slugify(base) || "produit";
  let candidate = baseSlug;
  let counter = 2;
  while (await slugIsTaken(candidate, excludeId)) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return candidate;
}