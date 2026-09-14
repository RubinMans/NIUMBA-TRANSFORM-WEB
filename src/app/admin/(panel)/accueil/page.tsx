import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton, AdminIconButton } from "@/components/admin/admin-button";
import { HomeIcon, EyeIcon, EditIcon, MoveIcon, CheckIcon, ChevronDownIcon } from "@/components/admin/icons";
import { demoHomeSections } from "@/data/admin-demo";
import { adminInputClass } from "@/components/admin/admin-form";

export const metadata: Metadata = {
  title: "Page d'accueil",
};

export default function AdminAccueilPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Page d'accueil"
        subtitle="CMS de la homepage : hero, sections, contenu mis en avant, ordre et visibilité (cahier § 38)."
        demo
        actions={
          <AdminButton variant="outline" size="md" icon={<EyeIcon width={15} height={15} />}>
            Prévisualiser la page
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          {/* Hero */}
          <AdminPanel
            title="Hero — section principale"
            description="Titre principal, texte et appel à l'action affichés en premier."
            actions={<DemoBadge>Champ de démonstration</DemoBadge>}
          >
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="heroTitle" className="mb-1.5 block text-sm font-bold text-ink">
                  Titre principal (H1)
                </label>
                <input
                  id="heroTitle"
                  className={adminInputClass}
                  defaultValue="La science au service de la transformation"
                  aria-describedby="heroTitleHint"
                />
                <p id="heroTitleHint" className="mt-1 text-xs text-ink-muted">
                  Texte provisoire — le titre officiel sera confirmé avec les assets.
                </p>
              </div>
              <div>
                <label htmlFor="heroText" className="mb-1.5 block text-sm font-bold text-ink">
                  Texte de présentation
                </label>
                <textarea
                  id="heroText"
                  rows={3}
                  className={adminInputClass}
                  defaultValue="Entreprise industrielle congolaise de transformation locale : chimie, nettoyage, hygiène et valorisation des déchets."
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="heroCta" className="mb-1.5 block text-sm font-bold text-ink">
                    Bouton d&apos;action principal (CTA)
                  </label>
                  <input id="heroCta" className={adminInputClass} defaultValue="Commander" />
                </div>
                <div>
                  <label htmlFor="heroImage" className="mb-1.5 block text-sm font-bold text-ink">
                    Image de fond
                  </label>
                  <div className="flex h-10 items-center gap-2 rounded-xl border border-dashed border-border-soft bg-surface-subtle px-3.5 text-xs text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-tertiary" aria-hidden />
                    Visuel officiel à intégrer
                  </div>
                </div>
              </div>
            </div>
          </AdminPanel>

          {/* Sections */}
          <AdminPanel
            title="Sections de la page d'accueil"
            description="Ordre d'affichage et visibilité de chaque bloc sur la home."
            footer={
              <>
                <DemoBadge>Ordre et statuts fictifs</DemoBadge>
                <span>Réorganisation par glisser-déposer à venir (drag & drop)</span>
              </>
            }
          >
            <ol className="flex flex-col gap-2.5">
              {demoHomeSections.map((section, index) => (
                <li
                  key={section.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border-soft bg-surface-subtle/50 px-3.5 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-extrabold text-primary">
                      {index + 1}
                    </span>
                    <span className="truncate text-sm font-bold text-ink">{section.label}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge
                      status={section.status}
                      tone={section.status === "Visible" ? "success" : "neutral"}
                      pulse={section.status === "Visible"}
                    />
                    <AdminIconButton label="Réorganiser" icon={<MoveIcon width={14} height={14} />} />
                    <AdminIconButton label="Modifier la section" icon={<EditIcon width={14} height={14} />} tone="primary" />
                  </div>
                </li>
              ))}
            </ol>
          </AdminPanel>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <AdminPanel title="Éléments configurables" description="Contenus sélectionnables dans les sections.">
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Produits mis en avant", hint: "Choisis dans le catalogue" },
                { label: "Catégories mises en avant", hint: "Nettoyage, hygiène…" },
                { label: "Vidéos en avant", hint: "Issue de la vidéothèque" },
                { label: "Actualités récentes", hint: "Articles publiés" },
                { label: "Sections innovation / écologie", hint: "Initiatives visibles" },
                { label: "Appels à l'action", hint: "Commander / Devenir distributeur" },
              ].map((item) => (
                <li key={item.label} className="rounded-xl border border-border-soft bg-surface px-3.5 py-3">
                  <p className="text-sm font-bold text-ink">{item.label}</p>
                  <p className="text-xs text-ink-muted">{item.hint}</p>
                </li>
              ))}
            </ul>
          </AdminPanel>

          <AdminPanel title="Brouillons & enregistrement" description="Fonctionnement prévu du CMS.">
            <div className="flex flex-col gap-3">
              {[
                "Modification des textes et images",
                "Brouillon avant publication",
                "Publication / dépublication d'une section",
                "Historique des versions",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
                    <CheckIcon width={12} height={12} />
                  </span>
                  <span className="text-sm text-ink-muted">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <AdminButton size="sm" icon={<CheckIcon width={14} height={14} />}>
                Enregistrer les modifications
              </AdminButton>
              <AdminButton size="sm" variant="outline" icon={<ChevronDownIcon width={14} height={14} />}>
                Plus
              </AdminButton>
            </div>
          </AdminPanel>

          <div className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary-soft/50 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <HomeIcon />
            </span>
            <p className="text-sm leading-relaxed text-ink">
              L&apos;objectif de ce module : gérer la homepage sans modifier le code, comme un
              véritable CMS (cahier § 38, § 58).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}