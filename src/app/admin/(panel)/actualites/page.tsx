import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { FilterBar } from "@/components/admin/filter-bar";
import { SearchBar } from "@/components/admin/search-bar";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton, AdminIconButton } from "@/components/admin/admin-button";
import { PlusIcon, NewspaperIcon, EditIcon, TrashIcon } from "@/components/admin/icons";
import { demoArticles } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Actualités",
};

export default function AdminActualitesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Actualités"
        subtitle="Articles, annonces et nouvelles de l'entreprise : création, brouillons, publication."
        demo
        actions={
          <AdminButton icon={<PlusIcon width={15} height={15} />}>Publier une actualité</AdminButton>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterBar
          options={[
            { id: "toutes", label: "Toutes", count: demoArticles.length },
            { id: "publies", label: "Publiés", count: demoArticles.filter((a) => a.status === "Publié").length },
            { id: "brouillons", label: "Brouillons", count: demoArticles.filter((a) => a.status === "Brouillon").length },
          ]}
          className="lg:flex-1"
        />
        <SearchBar placeholder="Rechercher un article…" className="w-full lg:w-80" />
      </div>

      <AdminPanel
        title="Articles"
        description="Titre, image, contenu, auteur, date, catégorie, statut et métadonnées SEO (cahier § 21)."
        footer={
          <>
            <DemoBadge>Articles fictifs de prévisualisation</DemoBadge>
            <span>{demoArticles.length} articles de démonstration</span>
          </>
        }
      >
        <ul className="flex flex-col gap-4">
          {demoArticles.map((article) => (
            <li
              key={article.id}
              className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tertiary-soft text-tertiary">
                  <NewspaperIcon />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-ink">{article.title}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-muted">
                    <span className="rounded-full bg-surface-subtle px-2.5 py-0.5 font-bold">{article.category}</span>
                    {article.status === "Publié" ? <span className="font-semibold">Publié le {article.date}</span> : null}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-3">
                <StatusBadge status={article.status} tone={article.status === "Publié" ? "success" : "neutral"} />
                <div className="flex gap-1.5">
                  <AdminIconButton label="Modifier" icon={<EditIcon width={15} height={15} />} tone="primary" />
                  <AdminIconButton label="Supprimer" icon={<TrashIcon width={15} height={15} />} tone="danger" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </AdminPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminPanel title="Structure d'un article" description="Champs prévus pour chaque publication.">
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {["Titre", "Image principale", "Contenu", "Auteur", "Date", "Catégorie", "Statut", "Métadonnées SEO"].map((field) => (
              <div key={field} className="flex items-center gap-2 rounded-xl bg-surface-subtle px-3.5 py-2.5 text-ink-muted">
                <NewspaperIcon width={14} height={14} className="shrink-0 text-secondary" />
                {field}
              </div>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel title="Types de publications" description="Contenus attendus dans la section Actualités (cahier § 21).">
          <div className="flex flex-wrap gap-2">
            {["Nouvelles de l'entreprise", "Lancement de produits", "Événements", "Activités industrielles", "Annonces", "Partenariats", "Innovations", "Projets"].map((type) => (
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