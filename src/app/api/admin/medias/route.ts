import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/db/client";

export const runtime = "nodejs";

/**
 * API médiathèque (mission 02.9) — lecture.
 * Retourne les images uploadées via /api/admin/upload (table `media`).
 * La gestion complète (recherche, dossiers, tags, vidéos) viendra plus tard.
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      title: true,
      url: true,
      type: true,
      alt: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ media });
}