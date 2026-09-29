import Link from "next/link";
import {
  footerBukheteLinks,
  footerLegalLinks,
  footerNavigation,
} from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { LockIcon, MapPinIcon, WhatsAppIcon } from "@/lib/icons";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { getCategories } from "@/services/catalogue";
import { getBrandAssets, getSiteSettings } from "@/services/site-settings";

export async function Footer() {
  const year = new Date().getFullYear();
  const [settings, categories, assets] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getBrandAssets(),
  ]);

  return (
    <footer className="bg-primary-dark text-primary-soft">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        {/* Marque */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Logo onDark logoSrc={assets.logoPath ?? assets.logoDarkPath ?? assets.logoBlackPath} />
          <p className="max-w-xs text-sm leading-relaxed text-primary-soft/80">
            {settings.companyDescription}
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Fièrement fabriqué en RDC
          </span>
        </div>

        {/* Navigation */}
        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2.5">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-primary-soft/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Catalogue & marque */}
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            {settings.brandName}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-primary-soft/80">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categorie/${category.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {category.label}
                </Link>
              </li>
            ))}
            {footerBukheteLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & légal */}
        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-primary-soft/80">
            <li className="flex items-start gap-2">
              <MapPinIcon width={15} height={15} className="mt-0.5 shrink-0 text-secondary-soft" />
              {settings.address}
            </li>
            <li>Site industriel : {settings.industrialSite}</li>
            <li>Téléphone : {settings.phone}</li>
            <li>Email : {settings.email}</li>
            <li>
              <a
                href={settings.whatsappLink}
                className="inline-flex items-center gap-2 font-semibold text-whatsapp hover:text-whatsapp-dark"
              >
                <WhatsAppIcon width={16} height={16} />
                WhatsApp — {settings.whatsapp}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-col gap-2.5">
            {footerLegalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-primary-soft/60 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Barre légale */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-soft/60 md:flex-row">
          <p>
            © {year} {settings.companyName}. Tous droits réservés.
          </p>
          <p className="text-center">
            RCCM : {settings.rccm} · Id.Nat : {settings.idNat} · NIF : {settings.nif}
          </p>
          {/* Accès administrateur discret */}
          <Link
            href="/admin/connexion"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-primary-soft/50 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Gestion — accès réservé"
          >
            <LockIcon width={13} height={13} />
            Gestion
          </Link>
        </Container>
      </div>

      {/* Signature conception */}
      <div className="border-t border-white/5">
        <Container className="flex justify-center py-5">
          <CreditSignature credit={settings.designerCredit || siteConfig.designerCredit} />
        </Container>
      </div>
    </footer>
  );
}

/**
 * Signature conception affichée en bas de page.
 * Style discret et professionnel : le nom du concepteur est mis en valeur
 * sobrement, sans concurrencer la marque NIUMBA TRANSFORM.
 */
function CreditSignature({ credit }: { credit: string }) {
  const brandToken = credit.match(/One.?Koncept/i)?.[0];

  if (!brandToken) {
    return (
      <p className="text-center text-[11px] font-medium tracking-wide text-primary-soft/40">
        {credit}
      </p>
    );
  }

  const [before, after] = credit.split(brandToken);
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[11px] font-medium tracking-wide text-primary-soft/50">
      <span className="hidden h-px w-8 bg-white/10 sm:inline-block" aria-hidden />
      {before ? <span>{before.trim()}</span> : null}
      <span className="inline-flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-secondary/70" aria-hidden />
        <span className="font-bold tracking-[0.08em] text-primary-soft/90">{brandToken}</span>
        <span className="h-1 w-1 rounded-full bg-secondary/70" aria-hidden />
      </span>
      {after ? <span>{after.trim()}</span> : null}
      <span className="hidden h-px w-8 bg-white/10 sm:inline-block" aria-hidden />
    </p>
  );
}