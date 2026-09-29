import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { CategoryForm } from "@/components/admin/categories/category-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nouvelle catégorie",
};

export default function AdminNouvelleCategoriePage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Nouvelle catégorie"
        subtitle={`Ajoutez une nouvelle catégorie au catalogue ${siteConfig.brandName}.`}
      />
      <AdminPanel>
        <CategoryForm />
      </AdminPanel>
    </div>
  );
}
