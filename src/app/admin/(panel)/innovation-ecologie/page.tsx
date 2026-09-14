import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton } from "@/components/admin/admin-button";
import { PlusIcon, LeafIcon, EyeIcon, EditIcon } from "@/components/admin/icons";

export const metadata: Metadata = {
  title: "Innovation & écologie",
};

export default function AdminInnovationEcologiePage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Innovation & écologie"
        subtitle="Recherche, transformation, recyclage et économie circulaire (cahier § 22)."
        demo
        actions={
          <AdminButton icon={<PlusIcon width={15} height={15} />}>Ajouter une initiative</AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "R&D & laboratoire",
            description: "Formulation et développement de solutions scientifiques adaptées aux réalités congolaises.",
            status: "Visible" as const,
          },
          {
            title: "Recyclage des plastiques",
            description: "Valorisation des déchets plastiques dans le cycle de production.",
            status: "Visible" as const,
          },
          {
            title: "Recyclage du papier",
            description: "Transformation et valorisation locale du papier.",
            status: "Brouillon" as const,
          },
          {
            title: "Économie circulaire",
            description: "Intégration progressive des principes d'économie circulaire (cahier § 4).",
            status: "Visible" as const,
          },
          {
            title: "Solutions environnementales",
            description: "Projets orientés environnement et assainissement.",
            status: "Brouillon" as const,
          },
        ].map((initiative) => (
          <AdminPanel key={initiative.title} className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-soft text-secondary-dark">
                <LeafIcon />
              </span>
              <StatusBadge
                status={initiative.status === "Visible" ? "Publié" : "Brouillon"}
                tone={initiative.status === "Visible" ? "success" : "neutral"}
              />
            </div>
            <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink">{initiative.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{initiative.description}</p>
            <div className="mt-5 flex items-center gap-1.5 border-t border-border-soft pt-4">
              <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-surface text-primary hover:bg-primary-soft" aria-label="Aperçu" title="Aperçu">
                <EyeIcon width={14} height={14} />
              </button>
              <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-surface text-ink-muted hover:bg-surface-subtle" aria-label="Modifier" title="Modifier">
                <EditIcon width={14} height={14} />
              </button>
            </div>
          </AdminPanel>
        ))}

        {/* Ajout */}
        <button
          type="button"
          className="flex min-h-[190px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border-soft bg-surface-subtle/60 text-ink-muted transition-colors hover:border-secondary/50 hover:text-primary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-secondary shadow-sm">
            <PlusIcon />
          </span>
          <span className="text-sm font-bold">Nouvelle initiative</span>
        </button>
      </div>

      <AdminPanel
        title="Contenus industriels à publier"
        description="La section Innovation & écologie du site public présentera ces ambitions (cahier § 56)."
        footer={<DemoBadge>Projets fictifs d&apos;illustration</DemoBadge>}
      >
        <ul className="flex flex-col gap-2.5 text-sm text-ink-muted">
          {[
            "Transformation industrielle locale",
            "Valorisation des déchets",
            "Production locale et Made in DRC",
            "Développement scientifique",
            "Création d'emplois",
            "Réduction des dépendances aux importations",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl bg-surface-subtle px-4 py-3">
              <LeafIcon width={16} height={16} className="shrink-0 text-secondary-dark" />
              {item}
            </li>
          ))}
        </ul>
      </AdminPanel>
    </div>
  );
}