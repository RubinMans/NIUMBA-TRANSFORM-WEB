import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { requireAdminCategory } from "@/services/admin-categories";
import { CategoryForm } from "@/components/admin/categories/category-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await requireAdminCategory(id);
  return { title: `Modifier — ${category.label}` };
}

export default async function AdminModifierCategoriePage({ params }: PageProps) {
  const { id } = await params;
  const category = await requireAdminCategory(id);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={`Modifier — ${category.label}`}
        subtitle="Mettez à jour les informations de cette catégorie."
      />
      <AdminPanel>
        <CategoryForm category={category} />
      </AdminPanel>
    </div>
  );
}
