import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { getCategoryOptions, requireAdminProduct } from "@/services/admin-products";
import { ProductForm } from "@/components/admin/products/product-form";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type ModifierPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ModifierPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await requireAdminProduct(id);
    return { title: `Modifier : ${product.name}` };
  } catch {
    return { title: "Produit introuvable" };
  }
}

export default async function AdminModifierProduitPage({ params }: ModifierPageProps) {
  const { id } = await params;
  const product = await requireAdminProduct(id);
  const categories = await getCategoryOptions();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={`Modifier : ${product.name}`}
        subtitle={`Fiche produit — gamme ${siteConfig.brandName}.`}
      />
      <AdminPanel>
        <ProductForm categories={categories} product={product} />
      </AdminPanel>
    </div>
  );
}