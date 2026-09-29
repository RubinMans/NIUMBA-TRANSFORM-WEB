import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/db/client";
import { getAdminCategories, uniqueCategorySlug } from "@/services/admin-categories";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const categories = await getAdminCategories();
  return NextResponse.json({ categories });
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

  const label = typeof body.label === "string" ? body.label.trim() : "";
  if (!label) {
    return NextResponse.json({ error: "Le nom de la catégorie est requis." }, { status: 400 });
  }

  const slug = await uniqueCategorySlug(typeof body.slug === "string" && body.slug.trim() ? body.slug.trim() : label);
  const description = typeof body.description === "string" ? body.description.trim() || null : null;
  const sortOrder = typeof body.sortOrder === "number" ? body.sortOrder : 0;

  const category = await prisma.category.create({
    data: { slug, label, description, sortOrder },
  });

  revalidatePath("/", "layout");
  revalidatePath("/catalogue");
  revalidatePath(`/categorie/${category.slug}`);

  return NextResponse.json({ category: { id: category.id, slug: category.slug } }, { status: 201 });
}
