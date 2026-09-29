import { DevBanner } from "@/components/layout/dev-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getBrandAssets, getSiteSettings } from "@/services/site-settings";

// Rendu à chaque requête : les modifications Admin (logo, produits, texte)
// doivent apparaître immédiatement sur le site public (mission 02.9).
export const dynamic = "force-dynamic";

/**
 * Layout de l'application publique.
 * Charge les paramètres du site depuis la base (paramètres de l'Admin)
 * et transmet le logo officiel lorsqu'un asset est disponible.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, assets] = await Promise.all([getSiteSettings(), getBrandAssets()]);

  return (
    <>
      <DevBanner />
      <Header settings={settings} logoSrc={assets.logoPath ?? assets.logoBlackPath} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}