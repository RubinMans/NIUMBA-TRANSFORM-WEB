import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminButton, AdminIconButton } from "@/components/admin/admin-button";
import { DemoBadge } from "@/components/admin/demo-badge";
import { PlusIcon, TagIcon, EditIcon, TrashIcon, MoveIcon, CheckIcon } from "@/components/admin/icons";
import { demoCategories, demoProducts } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Catégories",
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Catégories"
        subtitle="Organisez le catalogue par catégories : nettoyage, entretien, hygiène et assainissement."
        demo
        actions={
          <AdminButton icon={<PlusIcon width={15} height={15} />}>Créer une catégorie</AdminButton>
        }
      />

      <AdminPanel
        title="Catégories du catalogue"
        description="Création, modification, suppression, classement et activation/désactivation (cahier § 32)."
        footer={<DemoBadge>Les catégories seront gérées depuis la base de données</DemoBadge>}
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {demoCategories.map((category) => {
            const count = demoProducts.filter((product) => product.category === category.label).length;
            return (
              <li
                key={category.id}
                className="flex flex-col justify-between rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <TagIcon />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-xs font-extrabold text-secondary-dark">
                    {count} produit{count > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-extrabold tracking-tight text-ink">{category.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{category.description}</p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border-soft pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted">
                    <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
                    Active
                  </span>
                  <div className="flex gap-1.5">
                    <AdminIconButton label="Réorganiser" icon={<MoveIcon width={14} height={14} />} />
                    <AdminIconButton label="Modifier" icon={<EditIcon width={14} height={14} />} tone="primary" />
                    <AdminIconButton label="Supprimer" icon={<TrashIcon width={14} height={14} />} tone="danger" />
                  </div>
                </div>
              </li>
            );
          })}

          {/* Carte "création" */}
          <li className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft bg-surface-subtle/60 p-5 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-secondary shadow-sm">
              <PlusIcon />
            </span>
            <p className="mt-3 text-sm font-bold text-ink">Nouvelle catégorie</p>
            <p className="mt-1 max-w-[240px] text-xs text-ink-muted">
              Ex. produits spécifiques — ajoutée via le bouton « Créer une catégorie ».
            </p>
          </li>
        </ul>
      </AdminPanel>

      <AdminPanel title="Association produit → catégorie" description="Chaque produit est rattaché à une catégorie (cahier § 13).">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {demoCategories.map((category) => {
            const products = demoProducts.filter((p) => p.category === category.label);
            return (
              <div key={category.id}>
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                  <CheckIcon width={15} height={15} className="text-secondary" />
                  {category.label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {products.length ? (
                    products.map((product) => (
                      <li key={product.id} className="rounded-xl bg-surface-subtle px-3.5 py-2 text-sm font-semibold text-ink">
                        {product.name} — {product.brand}
                      </li>
                    ))
                  ) : (
                    <li className="rounded-xl border border-dashed border-border-soft px-3.5 py-3 text-sm text-ink-muted">
                      Aucun produit associé pour l&apos;instant.
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </AdminPanel>
    </div>
  );
}