import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { SearchBar } from "@/components/admin/search-bar";
import { FilterBar } from "@/components/admin/filter-bar";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminIconButton } from "@/components/admin/admin-button";
import {
  TruckIcon,
  CheckIcon,
  XIcon,
  EyeIcon,
  FileTextIcon,
} from "@/components/admin/icons";
import { demoDistributors } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Distributeurs",
};

const distributorTone = {
  Nouvelle: "warning",
  "En étude": "info",
  Acceptée: "success",
  Refusée: "danger",
} as const;

export default function AdminDistributeursPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Distributeurs"
        subtitle="Consultation des candidatures, statuts et zone de distribution."
        demo
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterBar
          options={[
            { id: "toutes", label: "Toutes", count: demoDistributors.length },
            { id: "nouvelles", label: "Nouvelles", count: demoDistributors.filter((d) => d.status === "Nouvelle").length },
            { id: "etude", label: "En étude" },
            { id: "acceptees", label: "Acceptées" },
          ]}
          className="lg:flex-1"
        />
        <SearchBar placeholder="Rechercher un distributeur…" className="w-full lg:w-80" />
      </div>

      <AdminPanel
        title="Candidatures distributeurs"
        description="Dossiers de partenariat grossiste (cahier § 34)."
        footer={
          <>
            <DemoBadge>Dossiers fictifs de prévisualisation</DemoBadge>
            <span>Statuts : Nouvelle · En étude · Acceptée · Refusée</span>
          </>
        }
      >
        <ul className="flex flex-col gap-4">
          {demoDistributors.map((distributor) => (
            <li
              key={distributor.id}
              className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-extrabold text-primary">
                  {distributor.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-ink">{distributor.name}</p>
                  <p className="truncate text-xs text-ink-muted">{distributor.zone}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
                    <FileTextIcon width={13} height={13} />
                    Dossier de candidature — à vérifier (notes internes prévues)
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                <StatusBadge status={distributor.status} tone={distributorTone[distributor.status]} pulse={distributor.status === "Nouvelle"} />
                <div className="flex gap-1.5">
                  <AdminIconButton label="Consulter le dossier complet" icon={<EyeIcon width={15} height={15} />} tone="primary" />
                  <AdminIconButton label="Valider le dossier" icon={<CheckIcon width={15} height={15} />} tone="secondary" />
                  <AdminIconButton label="Refuser le dossier" icon={<XIcon width={15} height={15} />} tone="danger" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </AdminPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminPanel title="Flux de validation" description="Processus prévu pour chaque candidature.">
          <ol className="flex flex-col gap-3 text-sm text-ink-muted">
            {[
              "Réception de la demande (formulaire public « Devenir distributeur »)",
              "Consultation du dossier et des informations",
              "Changement de statut : en étude",
              "Acceptation ou refus",
              "Notes internes et contact WhatsApp",
            ].map((step, index) => (
              <li key={step} className="flex items-start gap-3 rounded-xl bg-surface-subtle px-4 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-extrabold text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </AdminPanel>

        <AdminPanel title="Informations d'une candidature" description="Champs recueillis par le formulaire public (cahier § 20).">
          <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            {[
              ["Nom", "…"],
              ["Entreprise", "…"],
              ["Téléphone", "[À CONFIRMER]"],
              ["WhatsApp", "[À CONFIRMER]"],
              ["Adresse", "…"],
              ["Localité", "…"],
              ["Activité", "…"],
              ["Zone de distribution", "…"],
              ["Message", "…"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-border-soft pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">{label}</span>
                <span className="font-semibold text-ink">{value}</span>
              </div>
            ))}
          </div>
        </AdminPanel>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary-soft/50 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <TruckIcon />
        </span>
        <p className="text-sm leading-relaxed text-ink">
          Le réseau de distribution sera progressivement construit à partir des candidatures
          acceptées. Un espace distributeur dédié est prévu à terme (cahier § 47).
        </p>
      </div>
    </div>
  );
}