import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/db/client";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      label: true,
      description: true,
      _count: { select: { products: true } },
    },
  });

  return NextResponse.json({
    categories: rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      label: row.label,
      description: row.description,
      productCount: row._count.products,
    })),
  });
}