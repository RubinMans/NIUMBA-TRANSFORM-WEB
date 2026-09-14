/**
 * NIUMBA TRANSFORM — Configuration centrale du site.
 *
 * Source de vérité : CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md
 * Les informations non confirmées utilisent la mention "[À CONFIRMER]"
 * (règle anti-invention — cahier des charges, section 52).
 *
 * Traçabilité : chaque constante renvoie vers une section du cahier.
 */

export const siteConfig = {
  // Identité de l'entreprise (cahier §§ 1-2)
  companyName: "NIUMBA TRANSFORM",
  legalName: "NIUMA TRANSFORM",
  brandName: "BUKHETE",
  companyDescription:
    "Entreprise industrielle congolaise de transformation locale : chimie, nettoyage, hygiène, assainissement, recyclage et valorisation des déchets.",
  tagline: "La propreté qui nous ressemble",

  // Informations légales (cahier § 1)
  rccm: "CDKNG/RCCM/25-A-02289",
  idNat: "01-F4300-N662785",
  nif: "A2521749T",
  foundedAt: "03 avril 2025",
  address: "N°5 Avenue Boma, Q/Kindele, C/Mont-Ngafula, Kinshasa, RDC",
  industrialSite: "Kimwenza, Mont-Ngafula, Kinshasa (projet)",

  // Contact (cahier §§ 23 ; en attente des informations officielles)
  phone: "[À CONFIRMER]",
  whatsapp: "[À CONFIRMER]",
  email: "[À CONFIRMER]",
  whatsappLink: "/contact", // remplacé par un lien wa.me dès confirmation du numéro officiel

  // Réseaux sociaux — à confirmer
  social: {
    facebook: "[À CONFIRMER]",
    instagram: "[À CONFIRMER]",
    tiktok: "[À CONFIRMER]",
  },

  // Conception du site (signature discrète dans le footer)
  designerCredit: "Site conçu par One Concept",

  // Statut du projet
  buildVersion: "0.2.0",
  siteStatus: "preview" as const,
} as const;

export const appName = siteConfig.companyName;
export const tagline = siteConfig.tagline;

/** Mention anti-invention pour toute information non confirmée (cahier § 52). */
export const toConfirmMarker = "[À CONFIRMER]";

/** URL canonique (utilisée pour SEO, sitemap, robots et Open Graph). */
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}