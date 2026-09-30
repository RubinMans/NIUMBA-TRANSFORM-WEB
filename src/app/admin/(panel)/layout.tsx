import { redirect } from "next/navigation";
import { getCurrentUser, type AdminPanelUser } from "@/lib/auth";
import { getVisualIdentityRaw } from "@/services/site-settings";
import { AdminLayout } from "@/components/admin/admin-layout";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Layout du portail Admin (zones sous la connexion).
 * Protège TOUTES les routes /admin/* : sans session valide, le visiteur
 * est redirigé vers /admin/connexion.
 */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/connexion");
  }

  const panelUser: AdminPanelUser = {
    name: user.name,
    email: user.email,
    roleLabel: user.roleLabel,
  };

  const identity = await getVisualIdentityRaw();
  const logoSrc = identity.logoPath ?? identity.logoBlackPath;

  return <AdminLayout user={panelUser} logoSrc={logoSrc}>{children}</AdminLayout>;
}