/**
 * Types sérialisables partagés (site public).
 * Sans import serveur — utilisables par les composants client.
 */

export type SocialLinks = {
  facebook: string;
  instagram: string;
  tiktok: string;
};

export type SiteSettingsView = {
  companyName: string;
  legalName: string;
  brandName: string;
  tagline: string;
  companyDescription: string;
  rccm: string;
  idNat: string;
  nif: string;
  foundedAt: string;
  address: string;
  industrialSite: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  social: SocialLinks;
  horaires: string | null;
  designerCredit: string;
};

export type BrandAssets = {
  logoPath: string | null;
  logoDarkPath: string | null;
  logoBlackPath: string | null;
  logoSquarePath: string | null;
  faviconPath: string | null;
};