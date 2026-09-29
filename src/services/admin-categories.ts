import { notFound } from "next/navigation";
import { prisma } from "@/db/client";
import { slugify } from "@/data/catalogue";

export type AdminCategoryListItem = {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  sortOrder: number;
  productCount: number;
};

export type AdminCategoryDetail = AdminCategoryListItem & {
  createdAt: Date;
  updatedAt: Date;
  products: { id: string; name: string; brand: string }[];
};

export async function getAdminCategories(): Promise<AdminCategoryListItem[]> {
  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      label: true,
      description: true,
      sortOrder: true,
      _count: { select: { products: true } },
    },
  });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    label: row.label,
    description: row.description,
    sortOrder: row.sortOrder,
    productCount: row._count.products,
  }));
}

export async function getAdminCategory(id: string): Promise<AdminCategoryDetail | null> {
  const row = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        select: { id: true, name: true, brand: true },
        orderBy: { name: "asc" },
      },
    },
  });
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    description: row.description,
    sortOrder: row.sortOrder,
    productCount: row.products.length,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    products: row.products,
  };
}

export async function requireAdminCategory(id: string): Promise<AdminCategoryDetail> {
  const category = await getAdminCategory(id);
  if (!category) notFound();
  return category;
}

async function categorySlugIsTaken(slug: string, excludeId?: string): Promise<boolean> {
  const found = await prisma.category.findUnique({ where: { slug } });
  return !!found && found.id !== excludeId;
}

export async function uniqueCategorySlug(base: string, excludeId?: string): Promise<string> {
  const baseSlug = slugify(base) || "categorie";
  let candidate = baseSlug;
  let counter = 2;
  while (await categorySlugIsTaken(candidate, excludeId)) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return candidate;
}
