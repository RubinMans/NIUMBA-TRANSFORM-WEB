import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { AdminButton } from "@/components/admin/admin-button";
import {
  AdminTable,
  AdminTableRow,
  AdminTableData,
  AdminTableTitle,
  AdminTableMuted,
} from "@/components/admin/admin-table";
import { PlusIcon, ProductIcon } from "@/components/admin/icons";
import { getAdminProducts } from "@/services/admin-products";
import { ProductRowActions } from "@/components/admin/products/product-row-actions";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Produits",
};

const statusTone = {
  Publié: "success",
  Brouillon: "neutral",
  "À venir": "warning",
} as const;

export default async function AdminProduitsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Produits"
        subtitle={`Gérez les produits et contenus de la gamme ${siteConfig.brandName}. Les données sont enregistrées en base.`}
        actions={
          <AdminButton href="/admin/produits/nouveau" icon={<PlusIcon width={15} height={15} />}>
            Ajouter un produit
          </AdminButton>
        }
      />

      <AdminPanel
        title={`Catalogue ${siteConfig.brandName}`}
        description={`${products.length} référence(s) enregistrée(s).`}
      >
        {products.length === 0 ? (
          <div className="py-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle text-ink-soft">
              <ProductIcon />
            </span>
            <p className="mt-4 text-base font-bold text-ink">Aucun produit en base</p>
            <p className="mt-1 text-sm text-ink-muted">
              Ajoutez votre premier produit pour commencer à alimenter le catalogue.
            </p>
            <AdminButton href="/admin/produits/nouveau" className="mt-5" icon={<PlusIcon width={15} height={15} />}>
              Ajouter un produit
            </AdminButton>
          </div>
        ) : (
          <AdminTable columns={["Produit", "Catégorie", "Statut", "Visibilité", "Dernière modification", "Actions"]}>
            {products.map((product) => (
              <AdminTableRow key={product.id}>
                <AdminTableData>
                  <AdminTableTitle>{product.name}</AdminTableTitle>
                  <AdminTableMuted>
                    Marque {product.brand} · {product.reference ? `réf. ${product.reference}` : "réf. à définir"}
                  </AdminTableMuted>
                </AdminTableData>
                <AdminTableData>
                  {product.categoryLabel ? (
                    <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-bold text-ink-muted">
                      {product.categoryLabel}
                    </span>
                  ) : (
                    <span className="text-xs text-ink-soft">—</span>
                  )}
                </AdminTableData>
                <AdminTableData>
                  <StatusBadge status={product.status} tone={statusTone[product.status as keyof typeof statusTone] ?? "neutral"} />
                </AdminTableData>
                <AdminTableData>
                  <span className={`text-xs font-bold ${product.active ? "text-secondary-dark" : "text-ink-soft"}`}>
                    {product.active ? "Actif" : "Inactif"}
                  </span>
                </AdminTableData>
                <AdminTableData>
                  <span className="text-xs text-ink-muted">
                    {product.updatedAt.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </AdminTableData>
                <AdminTableData align="right">
                  <ProductRowActions product={{ id: product.id, active: product.active }} />
                </AdminTableData>
              </AdminTableRow>
            ))}
          </AdminTable>
        )}
      </AdminPanel>
    </div>
  );
}