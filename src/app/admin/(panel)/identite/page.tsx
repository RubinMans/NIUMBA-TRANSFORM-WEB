import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getSiteSettings, getVisualIdentityRaw } from "@/services/site-settings";
import { IdentiteForm } from "@/components/admin/identite-form";

export const metadata: Metadata = {
  title: "Identité visuelle",
};

export const dynamic = "force-dynamic";

/**
 * Identité visuelle (mission 02.9) — fonctionnelle.
 * Le chef de projet téléverse les logos officiels (couleur, blanc, noir,
 * favicon) depuis ce formulaire ; ils sont enregistrés en base et affichés
 * immédiatement sur le site public.
 */
export default async function AdminIdentitePage() {
  const [settings, identity] = await Promise.all([getSiteSettings(), getVisualIdentityRaw()]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Identité visuelle"
        subtitle="Logos officiels (couleur, blanc, noir) et favicon — enregistrement et affichage immédiat sur le site public."
      />

      <IdentiteForm
        initialSettings={{
          companyName: settings.companyName,
          brandName: settings.brandName,
          tagline: settings.tagline,
        }}
        initialIdentity={identity}
      />
    </div>
  );
}