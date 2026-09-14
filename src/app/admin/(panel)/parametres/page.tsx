import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { DemoBadge } from "@/components/admin/demo-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { AdminButton } from "@/components/admin/admin-button";
import {
  SettingsIcon,
  AlertIcon,
  CheckIcon,
  SearchIcon,
  RefreshIcon,
} from "@/components/admin/icons";
import { adminInputClass, AdminInput } from "@/components/admin/admin-form";

export const metadata: Metadata = {
  title: "Paramètres",
};

export default function AdminParametresPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Paramètres"
        subtitle="Configuration générale du portail et de la future plateforme (cahier § 46, § 48)."
        demo
        actions={
          <>
            <AdminButton variant="outline" size="md" icon={<RefreshIcon width={15} height={15} />}>
              Réinitialiser
            </AdminButton>
            <AdminButton size="md" icon={<CheckIcon width={15} height={15} />}>
              Enregistrer
            </AdminButton>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <AdminPanel title="Paramètres généraux" description="Options globales du portail.">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label htmlFor="paramSiteName" className="text-sm font-bold text-ink">
                    Nom du site
                  </label>
                  <p className="text-xs text-ink-muted">Visible dans l&apos;onglet et le header.</p>
                </div>
                <AdminInput id="paramSiteName" defaultValue="NIUMBA TRANSFORM" className="sm:max-w-xs" />
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label htmlFor="paramLangue" className="text-sm font-bold text-ink">
                    Langue principale
                  </label>
                  <p className="text-xs text-ink-muted">Le français est la langue officielle du site.</p>
                </div>
                <select id="paramLangue" className={`${adminInputClass} sm:max-w-xs`} defaultValue="fr">
                  <option value="fr">Français (RDC)</option>
                  <option value="en">Anglais</option>
                  <option value="ln">Lingala</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label htmlFor="paramMode" className="text-sm font-bold text-ink">
                    Mode du portail
                  </label>
                  <p className="text-xs text-ink-muted">Actuellement en prévisualisation (Mission 01.5).</p>
                </div>
                <span>
                  <StatusBadge status="Prévisualisation" tone="warning" pulse />
                </span>
              </div>
            </div>
          </AdminPanel>

          <AdminPanel title="Notifications" description="Alertes adressées aux administrateurs (à configurer en mission dédiée).">
            <div className="flex flex-col gap-3">
              {["Nouvelle commande", "Candidature distributeur", "Publication programmée", "Erreur du système"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-border-soft px-4 py-3">
                  <span className="text-sm font-bold text-ink">{item}</span>
                  <span className="inline-flex h-6 w-11 items-center rounded-full bg-secondary px-0.5" role="switch" aria-checked="true" aria-label={`${item} : activé`}>
                    <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
                  </span>
                </div>
              ))}
            </div>
          </AdminPanel>

          <AdminPanel title="Mentions légales & données" description="Liens réglementaires prévus (cahier § 9, § 53).">
            <div className="flex flex-col gap-2.5 text-sm">
              {["Politique de confidentialité", "Conditions d'utilisation", "Paramètres SEO (sitemap, robots)"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl bg-surface-subtle px-4 py-3">
                  <span className="font-bold text-ink">{item}</span>
                  <span className="text-xs text-ink-soft">À configurer</span>
                </div>
              ))}
            </div>
          </AdminPanel>
        </div>

        {/* États UI prévus */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <AdminPanel title="États UI du design system" description="Aperçu des états prévus pour tout le portail (cahier § 48).">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">État vide</span>
                <EmptyState
                  icon={<SearchIcon width={18} height={18} />}
                  title="Aucun résultat"
                  description="Exemple d'état vide pour un module sans données."
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">État chargement</span>
                <div className="flex items-center gap-3 rounded-xl border border-border-soft px-4 py-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-secondary border-t-transparent" aria-hidden />
                  <span className="text-sm text-ink-muted">Chargement des données…</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">État succès (notification)</span>
                <p className="flex items-center gap-2.5 rounded-xl bg-secondary-soft px-4 py-3 text-sm font-bold text-secondary-dark">
                  <CheckIcon width={16} height={16} />
                  Modifications enregistrées
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">État erreur (bannière)</span>
                <p className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <AlertIcon width={16} height={16} className="mt-0.5 shrink-0" />
                  Une erreur est survenue lors de l&apos;enregistrement.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Bouton désactivé & focus</span>
                <div className="flex flex-wrap gap-2">
                  <AdminButton size="sm" disabled>
                    Enregistrement impossible
                  </AdminButton>
                  <input
                    aria-label="Champ avec focus visible"
                    placeholder="Champ focus (tabulation)"
                    className={`${adminInputClass} max-w-[200px]`}
                  />
                </div>
              </div>
            </div>
          </AdminPanel>

          <div className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary-soft/50 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <SettingsIcon />
            </span>
            <div className="text-sm leading-relaxed text-ink">
              <p className="font-extrabold">Design system & composants</p>
              <p className="mt-0.5 text-ink-muted">
                Tous les états et composants vus ici sont réutilisables avec les vraies
                données (AdminLayout, StatCard, DataTable, StatusBadge, EmptyState…).
              </p>
            </div>
          </div>

          <DemoBadge className="self-start">
            États visuels de préfiguration — animation réelle à brancher
          </DemoBadge>
        </div>
      </div>
    </div>
  );
}