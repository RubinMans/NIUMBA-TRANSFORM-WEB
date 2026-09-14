import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton, AdminIconButton } from "@/components/admin/admin-button";
import { PlusIcon, PlayIcon, VideoIcon, EditIcon, TrashIcon } from "@/components/admin/icons";
import { demoVideos } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Vidéos",
};

export default function AdminVideosPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Vidéos"
        subtitle="Vidéothèque et démonstrations BUKHETE : ajouter, modifier, publier, dépublier."
        demo
        actions={
          <AdminButton icon={<PlusIcon width={15} height={15} />}>Ajouter une vidéo</AdminButton>
        }
      />

      <AdminPanel
        title="Vidéos publiées"
        description="Chaque vidéo peut posséder un titre, une description, une miniature, une catégorie et un produit associé (cahier § 16)."
        footer={<DemoBadge>Vidéos fictives — liens et fichiers réels à venir</DemoBadge>}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {demoVideos.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Miniature fictive */}
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary-deep to-primary">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/10" aria-hidden />
                  <PlayIcon width={22} height={22} />
                </span>
                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-primary-deep/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                  {video.duration}
                </span>
                <span className="absolute right-2.5 top-2.5">
                  <StatusBadge status={video.status} tone={video.status === "Publié" ? "success" : "neutral"} />
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-extrabold leading-snug text-ink">{video.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-ink-muted">MAJ : {video.updated}</span>
                  <div className="flex gap-1.5">
                    <AdminIconButton label="Modifier" icon={<EditIcon width={14} height={14} />} tone="primary" />
                    <AdminIconButton label="Supprimer" icon={<TrashIcon width={14} height={14} />} tone="danger" />
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Miniature d'ajout */}
          <button
            type="button"
            className="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border-soft bg-surface-subtle/70 text-ink-muted transition-colors hover:border-secondary/50 hover:text-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-secondary shadow-sm">
              <PlusIcon />
            </span>
            <span className="text-sm font-bold">Nouvelle vidéo</span>
          </button>
        </div>
      </AdminPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminPanel title="Structure d'une vidéo" description="Champs prévus pour chaque entrée (cahier § 16).">
          <ul className="grid grid-cols-1 gap-2 text-sm text-ink-muted sm:grid-cols-2">
            {["Titre", "Description", "Miniature", "Fichier / lien vidéo", "Catégorie", "Produit associé", "Date", "Statut de publication"].map((field) => (
              <li key={field} className="flex items-center gap-2 rounded-xl bg-surface-subtle px-3.5 py-2.5">
                <VideoIcon width={14} height={14} className="shrink-0 text-secondary" />
                {field}
              </li>
            ))}
          </ul>
        </AdminPanel>

        <AdminPanel title="Types de contenu vidéo prévus" description="Section publique Vidéos (cahier § 16).">
          <div className="flex flex-wrap gap-2">
            {["Démonstrations", "Présentation de produits", "Modes d'utilisation", "Conseils", "Contenus industriels", "Contenus éducatifs", "Présentation de l'entreprise"].map((type) => (
              <span key={type} className="rounded-full border border-border-soft bg-surface px-3.5 py-1.5 text-xs font-bold text-ink-muted">
                {type}
              </span>
            ))}
          </div>
        </AdminPanel>
      </div>
    </div>
  );
}