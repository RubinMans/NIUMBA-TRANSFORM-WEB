import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { getAdminProduct, uniqueSlug } from "@/services/admin-products";
import { prisma } from "@/db/client";
import { PRODUCT_STATUSES } from "@/data/catalogue";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  // Slug : honore la valeur envoyée par le formulaire, dédiplique si besoin.
  if (typeof body.slug === "string" && body.slug.trim() && (body.slug as string).trim() !== existing.slug) {
    data.slug = await uniqueSlug((body.slug as string).trim(), id);
  } else if (typeof body.name === "string" && body.name.trim() && (body.name as string).trim() !== existing.name) {
    data.name = (body.name as string).trim();
    if (typeof body.slug !== "string" || !body.slug.trim()) {
      data.slug = await uniqueSlug(data.name as string, id);
    }
  } else if (typeof body.name === "string" && body.name.trim()) {
    data.name = (body.name as string).trim();
  }

  const stringFields = [
    "brand",
    "reference",
    "status",
    "shortDescription",
    "description",
    "composition",
    "certifications",
    "packaging",
    "instructions",
    "precautions",
    "additionalInfo",
    "videoUrl",
    "image",
  ] as const;

  for (const field of stringFields) {
    if (field === "status" && typeof body.status === "string") {
      if (PRODUCT_STATUSES.includes(body.status as typeof PRODUCT_STATUSES[number])) {
        data.status = body.status;
      }
    } else if (field in body) {
      const val = typeof body[field] === "string" ? (body[field] as string).trim() : null;
      data[field] = val || null;
    }
  }

  if ("categoryId" in body) {
    const catId = typeof body.categoryId === "string" ? body.categoryId : null;
    data.categoryId = catId || null;
  }

  if (typeof body.active === "boolean") data.active = body.active;
  if (typeof body.featured === "boolean") data.featured = body.featured;
  if (typeof body.sortOrder === "number") data.sortOrder = body.sortOrder;

  const product = await prisma.product.update({
    where: { id },
    data,
  });

  // Galerie : remplacement complet (si fournie).
  if (Array.isArray(body.gallery)) {
    await prisma.productImage.deleteMany({ where: { productId: id } });
    if (body.gallery.length > 0) {
      await prisma.productImage.createMany({
        data: (body.gallery as string[])
          .filter((url): url is string => typeof url === "string" && url.length > 0)
          .map((url, position) => ({
            productId: id,
            url,
            position,
          })),
      });
    }
  }

  revalidatePath("/", "layout");
  revalidatePath("/catalogue");
  revalidatePath(`/produit/${product.slug}`);

  return NextResponse.json({
    product: { id: product.id, slug: product.slug },
  });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  await prisma.productImage.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });

  revalidatePath("/", "layout");
  revalidatePath("/catalogue");

  return NextResponse.json({ ok: true, id });
}