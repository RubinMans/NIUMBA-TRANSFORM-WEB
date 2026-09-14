import { siteConfig } from "@/lib/site";
import type { SiteSettingsView } from "@/lib/site-types";

/**
 * Valeurs par défaut des paramètres du site (repli sûr, sans base de
 * données). Module sûr pour les composants client (aucun import serveur).
 */
export function fallbackSiteSettings(): SiteSettingsView {
  return {
    companyName: siteConfig.companyName,
    legalName: siteConfig.legalName,
    brandName: siteConfig.brandName,
    tagline: siteConfig.tagline,
    companyDescription: siteConfig.companyDescription,
    rccm: siteConfig.rccm,
    idNat: siteConfig.idNat,
    nif: siteConfig.nif,
    foundedAt: siteConfig.foundedAt,
    address: siteConfig.address,
    industrialSite: siteConfig.industrialSite,
    phone: siteConfig.phone,
    whatsapp: siteConfig.whatsapp,
    whatsappLink: siteConfig.whatsappLink,
    email: siteConfig.email,
    social: {
      facebook: siteConfig.social.facebook,
      instagram: siteConfig.social.instagram,
      tiktok: siteConfig.social.tiktok,
    },
    horaires: null,
    designerCredit: siteConfig.designerCredit,
  };
}