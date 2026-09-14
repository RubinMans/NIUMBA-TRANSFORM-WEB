import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { FilterBar } from "@/components/admin/filter-bar";
import { SearchBar } from "@/components/admin/search-bar";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton } from "@/components/admin/admin-button";
import { ImageIcon, VideoIcon, FileTextIcon, UploadIcon, LockIcon } from "@/components/admin/icons";
import { demoLogoVariants } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Médias",
};

export default function AdminMediasPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Médiathèque"
        subtitle="Bibliothèque de fichiers : logos, photos, images produits, miniatures, vidéos et documents (cahier § 37)."
        demo
        actions={
          <AdminButton icon={<UploadIcon width={15} height={15} />}>Importer un fichier</AdminButton>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterBar
          options={[
            { id: "tous", label: "Tous" },
            { id: "images", label: "Images" },
            { id: "logos", label: "Logos" },
            { id: "videos", label: "Vidéos" },
            { id: "documents", label: "Documents" },
          ]}
          className="lg:flex-1"
        />
        <SearchBar placeholder="Rechercher un fichier…" className="w-full lg:w-80" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <AdminPanel
            title="Bibliothèque média"
            description="Aperçu des entrées de la future médiathèque. Tous les fichiers officiels sont à intégrer."
            footer={<DemoBadge>Bibliothèque vide pour l&apos;instant — stockage des médias à venir</DemoBadge>}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Fichiers fictifs */}
              {[
                { label: "logo_niumba_principal.svg", type: "Logo" },
                { label: "photo_usine_01.jpg", type: "Photo" },
                { label: "bukhete_flacon_250ml.png", type: "Produit" },
                { label: "demo_degraissage.mp4", type: "Vidéo" },
                { label: "presentation_entreprise.pdf", type: "Document" },
              ].map((file) => (
                <div
                  key={file.label}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-sm"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-surface-subtle">
                    <ImageIcon width={22} height={22} className="text-ink-soft" />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-xs font-bold text-ink">{file.label}</p>
                    <p className="text-[11px] text-ink-muted">{file.type}</p>
                  </div>
                </div>
              ))}

              {/* Zone d'ajout */}
              <button
                type="button"
                className="flex aspect-auto min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border-soft bg-surface-subtle/60 text-ink-muted transition-colors hover:border-secondary/50 hover:text-primary"
              >
                <UploadIcon width={20} height={20} className="text-secondary" />
                <span className="text-xs font-bold">Importer</span>
              </button>
            </div>
          </AdminPanel>

          <AdminPanel title="Aperçu des types de fichiers" description="Types gérés par la médiathèque.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-surface-subtle p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <ImageIcon width={16} height={16} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Images</p>
                  <p className="text-xs text-ink-muted">JPG, PNG, WebP, SVG</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-surface-subtle p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-tertiary-soft text-tertiary">
                  <VideoIcon width={16} height={16} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Vidéos</p>
                  <p className="text-xs text-ink-muted">MP4, WebM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-surface-subtle p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-soft text-secondary-dark">
                  <FileTextIcon width={16} height={16} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Documents</p>
                  <p className="text-xs text-ink-muted">PDF, DOCX</p>
                </div>
              </div>
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-surface-subtle px-4 py-3 text-xs leading-relaxed text-ink-muted">
              <LockIcon width={14} height={14} className="mt-0.5 shrink-0 text-secondary" />
              Les types et tailles de fichiers seront contrôlés côté serveur lors de la mission
              dédiée (cahier § 37).
            </p>
          </AdminPanel>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <AdminPanel title="Logos & variantes" description="Placeholders identifiés — ASSETS OFFICIELS à intégrer (cahier § 27).">
            <div className="flex flex-col gap-3">
              {demoLogoVariants.map((variant) => (
                <div key={variant.id} className="flex items-center justify-between gap-3 rounded-xl border border-border-soft bg-surface-subtle/60 px-3.5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-white">
                      NT
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-ink">{variant.label}</p>
                      <p className="text-[11px] text-ink-muted">{variant.status}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-tertiary-soft px-2.5 py-0.5 text-[10px] font-extrabold text-tertiary">
                    À intégrer
                  </span>
                </div>
              ))}
            </div>
            <a className="mt-4 block text-center text-xs font-bold text-secondary hover:underline" href="/admin/identite">
              Gérer les logos dans « Identité visuelle » →
            </a>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}