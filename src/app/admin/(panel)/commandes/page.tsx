import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { SearchBar } from "@/components/admin/search-bar";
import { FilterBar } from "@/components/admin/filter-bar";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton, AdminIconButton } from "@/components/admin/admin-button";
import {
  AdminTable,
  AdminTableRow,
  AdminTableData,
  AdminTableTitle,
  AdminTableMuted,
} from "@/components/admin/admin-table";
import {
  BagIcon,
  EyeIcon,
  DownloadIcon,
} from "@/components/admin/icons";
import { demoOrders } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Commandes",
};

function WhatsAppChatIcon({ width = 15, height = 15 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const statusTone = {
  Nouvelle: "warning",
  "En traitement": "info",
  "En livraison": "success",
  Terminée: "success",
} as const;

export default function AdminCommandesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Commandes"
        subtitle="Suivi et traitement des commandes clients BUKHETE."
        demo
        actions={
          <>
            <AdminButton variant="outline" size="md" icon={<DownloadIcon width={15} height={15} />}>
              Exporter
            </AdminButton>
          </>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterBar
          options={[
            { id: "toutes", label: "Toutes", count: demoOrders.length },
            { id: "nouvelles", label: "Nouvelles", count: demoOrders.filter((o) => o.status === "Nouvelle").length },
            { id: "encours", label: "En cours" },
            { id: "terminees", label: "Terminées" },
          ]}
          className="lg:flex-1"
        />
        <SearchBar placeholder="Rechercher une commande (réf., client)…" className="w-full lg:w-80" />
      </div>

      <AdminPanel
        title="Registre des commandes"
        description="Numéro, client, produits, quantités, localisation et statut (cahier § 33)."
        footer={
          <>
            <DemoBadge>Commandes fictives de prévisualisation</DemoBadge>
            <span>Statuts prévus : Nouvelle · En traitement · Confirmée · Préparée · Livrée · Annulée</span>
          </>
        }
      >
        <AdminTable columns={["N° Commande", "Client & contact", "Produits", "Quantité", "Localisation", "Statut", "Actions"]}>
          {demoOrders.map((order) => (
            <AdminTableRow key={order.id}>
              <AdminTableData>
                <AdminTableTitle>{order.reference}</AdminTableTitle>
                <AdminTableMuted>{order.time}</AdminTableMuted>
              </AdminTableData>
              <AdminTableData>
                <AdminTableTitle>{order.client}</AdminTableTitle>
                <AdminTableMuted className="font-mono">{order.phone}</AdminTableMuted>
              </AdminTableData>
              <AdminTableData>
                <div className="flex max-w-[220px] flex-wrap gap-1">
                  {order.products.map((product) => (
                    <span key={product} className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-ink-muted">
                      {product}
                    </span>
                  ))}
                </div>
              </AdminTableData>
              <AdminTableData>
                <span className="font-bold">{order.quantity}</span>
              </AdminTableData>
              <AdminTableData>
                <span className="text-ink-muted">{order.location}</span>
              </AdminTableData>
              <AdminTableData>
                <StatusBadge status={order.status} tone={statusTone[order.status]} pulse={order.status === "Nouvelle"} />
              </AdminTableData>
              <AdminTableData align="right">
                <span className="inline-flex gap-1.5">
                  <AdminIconButton label="Détails de la commande" icon={<EyeIcon width={15} height={15} />} tone="primary" />
                  <AdminIconButton label="Discuter sur WhatsApp (à venir)" icon={<WhatsAppChatIcon width={15} height={15} />} tone="secondary" />
                </span>
              </AdminTableData>
            </AdminTableRow>
          ))}
        </AdminTable>
      </AdminPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AdminPanel title="Statuts disponibles" description="Cycle de traitement prévu (cahier § 33)." className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {["Nouvelle", "En traitement", "Confirmée", "Préparée", "Livrée", "Annulée"].map((status, index) => (
              <span key={status} className="flex items-center gap-2">
                <StatusBadge
                  status={status}
                  tone={
                    status === "Annulée"
                      ? "danger"
                      : status === "Livrée"
                        ? "success"
                        : status === "Confirmée" || status === "Préparée"
                          ? "info"
                          : "warning"
                  }
                />
                {index < 5 ? <span className="text-ink-soft">→</span> : null}
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-surface-subtle px-4 py-3 text-xs leading-relaxed text-ink-muted">
            <BagIcon width={15} height={15} className="mt-0.5 shrink-0 text-secondary" />
            Le passage d&apos;un statut à l&apos;autre, le suivi stock et la facturation seront
            développés avec les vraies données dans la mission dédiée.
          </p>
        </AdminPanel>

        <AdminPanel title="Évolution à prévoir" description="Fondations du futur système (cahier § 19).">
          <ul className="flex flex-col gap-2 text-sm text-ink-muted">
            {["Panier", "Comptes clients", "Paiement en ligne / Mobile Money", "Suivi des commandes", "Stock", "Facturation", "Historique", "Livraison"].map((item) => (
              <li key={item} className="rounded-xl bg-surface-subtle px-3.5 py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </AdminPanel>
      </div>
    </div>
  );
}