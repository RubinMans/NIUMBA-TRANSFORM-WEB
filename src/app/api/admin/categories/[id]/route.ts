import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/db/client";
import { getAdminCategory, uniqueCategorySlug } from "@/services/admin-categories";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;
  const category = await getAdminCategory(id);
  if (!category) {
    return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
  }
  return NextResponse.json({ category });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (typeof body.label === "string" && body.label.trim()) {
    data.label = body.label.trim();
    if (typeof body.slug !== "string" || !body.slug.trim()) {
      data.slug = await uniqueCategorySlug(data.label as string, id);
    }
  }

  if (typeof body.slug === "string" && body.slug.trim() && (body.slug as string).trim() !== existing.slug) {
    data.slug = await uniqueCategorySlug((body.slug as string).trim(), id);
  }

  if ("description" in body) {
    const val = typeof body.description === "string" ? body.description.trim() : null;
    data.description = val || null;
  }

  if (typeof body.sortOrder === "number") {
    data.sortOrder = body.sortOrder;
  }

  const category = await prisma.category.update({
    where: { id },
    data,
  });

  revalidatePath("/", "layout");
  revalidatePath("/catalogue");
  revalidatePath(`/categorie/${category.slug}`);

  return NextResponse.json({
    category: { id: category.id, slug: category.slug },
  });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Catégorie introuvable." }, { status: 404 });
  }

  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    return NextResponse.json(
      { error: `Impossible de supprimer : ${productCount} produit(s) sont encore rattaché(s) à cette catégorie. Déplacez-les d'abord.` },
      { status: 409 },
    );
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/", "layout");
  revalidatePath("/catalogue");

  return NextResponse.json({ ok: true, id });
}
