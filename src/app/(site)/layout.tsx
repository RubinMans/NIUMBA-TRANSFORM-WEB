import { DevBanner } from "@/components/layout/dev-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getBrandAssets, getSiteSettings } from "@/services/site-settings";

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
      <Header settings={settings} logoSrc={assets.logoPath} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}