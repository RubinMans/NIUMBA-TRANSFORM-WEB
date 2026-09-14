import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAdminProducts, uniqueSlug } from "@/services/admin-products";
import { prisma } from "@/db/client";
import { PRODUCT_STATUSES } from "@/data/catalogue";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const products = await getAdminProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Le nom du produit est requis." }, { status: 400 });
  }

  const status = typeof body.status === "string" && PRODUCT_STATUSES.includes(body.status as typeof PRODUCT_STATUSES[number])
    ? body.status
    : "Brouillon";
  const active = body.active !== false;
  const featured = body.featured === true;
  const requestedSlug = typeof body.slug === "string" && body.slug.trim() ? body.slug.trim() : name;
  const slug = await uniqueSlug(requestedSlug);

  const product = await prisma.product.create({
    data: {
      slug,
      name,
      brand: (typeof body.brand === "string" ? body.brand.trim() : "BUKHETE") || "BUKHETE",
      reference: (typeof body.reference === "string" ? body.reference.trim() : "") || null,
      categoryId: typeof body.categoryId === "string" && body.categoryId ? body.categoryId : null,
      status: status as string,
      active,
      featured,
      shortDescription: (typeof body.shortDescription === "string" ? body.shortDescription.trim() : "") || null,
      description: (typeof body.description === "string" ? body.description.trim() : "") || null,
      composition: (typeof body.composition === "string" ? body.composition.trim() : "") || null,
      certifications: (typeof body.certifications === "string" ? body.certifications.trim() : "") || null,
      packaging: (typeof body.packaging === "string" ? body.packaging.trim() : "") || null,
      instructions: (typeof body.instructions === "string" ? body.instructions.trim() : "") || null,
      precautions: (typeof body.precautions === "string" ? body.precautions.trim() : "") || null,
      additionalInfo: (typeof body.additionalInfo === "string" ? body.additionalInfo.trim() : "") || null,
      videoUrl: (typeof body.videoUrl === "string" ? body.videoUrl.trim() : "") || null,
      image: (typeof body.image === "string" ? body.image.trim() : "") || null,
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    },
  });

  // Galerie d'images (array de strings URL).
  if (Array.isArray(body.gallery) && body.gallery.length > 0) {
    await prisma.productImage.createMany({
      data: (body.gallery as string[])
        .filter((url): url is string => typeof url === "string" && url.length > 0)
        .map((url, position) => ({
          productId: product.id,
          url,
          position,
        })),
    });
  }

  return NextResponse.json({ product: { id: product.id, slug: product.slug } }, { status: 201 });
}