import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaLibrary, type MediaItem } from "@/components/admin/media-library";
import { prisma } from "@/db/client";

export const metadata: Metadata = {
  title: "Médias",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Médiathèque (mission 02.9) — version minimale fonctionnelle.
 * Import d'images, aperçu et réutilisation dans les produits.
 * La médiathèque complète (dossiers, tags, vidéos, documents) viendra plus tard.
 */
export default async function AdminMediasPage() {
  let media: MediaItem[] = [];
  try {
    const rows = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    media = rows.map((row) => ({
      id: row.id,
      title: row.title,
      url: row.url,
      type: row.type,
      alt: row.alt,
      createdAt: row.createdAt.toISOString(),
    }));
  } catch {
    media = [];
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Médiathèque"
        subtitle="Importez vos images (logos, visuels produits) et réutilisez-les dans le catalogue."
      />
      <MediaLibrary initialMedia={media} />
    </div>
  );
}