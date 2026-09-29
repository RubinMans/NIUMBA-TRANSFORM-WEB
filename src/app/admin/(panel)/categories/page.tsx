import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminButton } from "@/components/admin/admin-button";
import { PlusIcon, TagIcon, ProductIcon } from "@/components/admin/icons";
import { getAdminCategories } from "@/services/admin-categories";
import { CategoryRowActions } from "@/components/admin/categories/category-row-actions";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catégories",
};

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Catégories"
        subtitle={`Organisez le catalogue ${siteConfig.brandName} par catégories. Les données sont enregistrées en base.`}
        actions={
          <AdminButton href="/admin/categories/nouveau" icon={<PlusIcon width={15} height={15} />}>
            Créer une catégorie
          </AdminButton>
        }
      />

      <AdminPanel
        title="Catégories du catalogue"
        description={`${categories.length} catégorie(s) enregistrée(s).`}
      >
        {categories.length === 0 ? (
          <div className="py-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle text-ink-soft">
              <TagIcon />
            </span>
            <p className="mt-4 text-base font-bold text-ink">Aucune catégorie en base</p>
            <p className="mt-1 text-sm text-ink-muted">
              Créez votre première catégorie pour commencer à organiser le catalogue.
            </p>
            <AdminButton href="/admin/categories/nouveau" className="mt-5" icon={<PlusIcon width={15} height={15} />}>
              Créer une catégorie
            </AdminButton>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex flex-col justify-between rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <TagIcon />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-xs font-extrabold text-secondary-dark">
                    {category.productCount} produit{category.productCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-extrabold tracking-tight text-ink">{category.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {category.description || "Aucune description"}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border-soft pt-4">
                  <span className="text-xs text-ink-muted">
                    Ordre : {category.sortOrder}
                  </span>
                  <CategoryRowActions category={{ id: category.id, label: category.label, productCount: category.productCount }} />
                </div>
              </li>
            ))}

            <li className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-soft bg-surface-subtle/60 p-5 text-center">
              <AdminButton href="/admin/categories/nouveau" variant="ghost" className="flex flex-col items-center gap-2 p-0">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-secondary shadow-sm">
                  <PlusIcon />
                </span>
                <p className="text-sm font-bold text-ink">Nouvelle catégorie</p>
                <p className="max-w-[240px] text-xs text-ink-muted">
                  Cliquez pour ajouter une nouvelle catégorie au catalogue.
                </p>
              </AdminButton>
            </li>
          </ul>
        )}
      </AdminPanel>
    </div>
  );
}
