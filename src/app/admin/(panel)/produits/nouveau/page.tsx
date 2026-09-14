import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { getCategoryOptions } from "@/services/admin-products";
import { ProductForm } from "@/components/admin/products/product-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nouveau produit",
};

export default async function AdminNouveauProduitPage() {
  const categories = await getCategoryOptions();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Nouveau produit"
        subtitle={`Ajoutez une nouvelle référence à la gamme ${siteConfig.brandName}.`}
      />
      <AdminPanel>
        <ProductForm categories={categories} />
      </AdminPanel>
    </div>
  );
}