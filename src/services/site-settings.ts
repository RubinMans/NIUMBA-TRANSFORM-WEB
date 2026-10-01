import { prisma } from "@/db/client";
import { siteConfig } from "@/lib/site";
import { fallbackSiteSettings } from "@/lib/site-fallback";
import type { BrandAssets, SiteSettingsView, SocialLinks } from "@/lib/site-types";

/**
 * Service des paramètres du site + identité visuelle (mission 02).
 * Lit la base (lignes singleton), avec repli sûr sur la configuration
 * statique (`src/lib/site.ts`) si la base n'est pas disponible — la
 * compilation et la prévisualisation ne cassent jamais.
 */

export type { BrandAssets, SiteSettingsView, SocialLinks };

export { fallbackSiteSettings } from "@/lib/site-fallback";

function parseSocial(raw: string | null | undefined): SocialLinks {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      facebook: typeof parsed.facebook === "string" ? parsed.facebook : siteConfig.social.facebook,
      instagram: typeof parsed.instagram === "string" ? parsed.instagram : siteConfig.social.instagram,
      tiktok: typeof parsed.tiktok === "string" ? parsed.tiktok : siteConfig.social.tiktok,
    };
  } catch {
    return { ...fallbackSiteSettings().social };
  }
}

export async function getSiteSettings(): Promise<SiteSettingsView> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!row) return fallbackSiteSettings();
    return {
      companyName: row.companyName || siteConfig.companyName,
      legalName: row.legalName || siteConfig.legalName,
      brandName: row.brandName || siteConfig.brandName,
      tagline: row.tagline || siteConfig.tagline,
      companyDescription: row.companyDescription || siteConfig.companyDescription,
      rccm: row.rccm || siteConfig.rccm,
      idNat: row.idNat || siteConfig.idNat,
      nif: row.nif || siteConfig.nif,
      foundedAt: row.foundedAt || siteConfig.foundedAt,
      address: row.address || siteConfig.address,
      industrialSite: row.industrialSite || siteConfig.industrialSite,
      phone: row.phone || siteConfig.phone,
      whatsapp: row.whatsapp || siteConfig.whatsapp,
      whatsappLink: row.whatsappLink || siteConfig.whatsappLink,
      email: row.email || siteConfig.email,
      social: parseSocial(row.social),
      horaires: row.horaires ?? null,
      designerCredit: row.designerCredit || siteConfig.designerCredit,
    };
  } catch {
    return fallbackSiteSettings();
  }
}

/** Fichiers candidats pour les assets officiels déposés dans public/. */
const LOGO_CANDIDATES = [
  "/media/logo-niumba-transform.svg",
  "/media/logo-niumba-transform.png",
  "/media/logo-niumba-transform.webp",
  "/media/logo-niumba-transform.jpg",
  "/media/logo-niumba.svg",
  "/media/logo-niumba.png",
  "/media/logo.svg",
  "/media/logo.png",
  "/media/logo-bukhete.svg",
  "/media/logo-bukhete.png",
];

const LOGO_DARK_CANDIDATES = [
  "/media/logo-niumba-transform-blanc.svg",
  "/media/logo-niumba-transform-white.svg",
  "/media/logo-niumba-blanc.svg",
  "/media/logo-niumba-white.svg",
];

const LOGO_SQUARE_CANDIDATES = [
  "/media/logo-niumba-transform-carre.svg",
  "/media/logo-niumba-transform-square.svg",
  "/media/logo-niumba-carre.svg",
  "/media/logo-niumba-square.svg",
];

const FAVICON_CANDIDATES = [
  "/favicon.ico",
  "/media/favicon-niumba-transform.svg",
  "/media/favicon-niumba-transform.png",
  "/media/favicon-niumba.svg",
  "/media/favicon.svg",
];

import { existsSync } from "node:fs";
import { join } from "node:path";

function findFirst(candidates: string[]): string | null {
  for (const candidate of candidates) {
    try {
      if (existsSync(join(process.cwd(), "public", candidate))) return candidate;
    } catch {
      // ignore
    }
  }
  return null;
}

export async function getBrandAssets(): Promise<BrandAssets> {
  try {
    const row = await prisma.visualIdentity.findUnique({ where: { id: 1 } });
    const dbAssets: BrandAssets = {
      logoPath: row?.logoPath || null,
      logoDarkPath: row?.logoDarkPath || null,
      logoBlackPath: row?.logoBlackPath || null,
      logoSquarePath: row?.logoSquarePath || null,
      faviconPath: row?.faviconPath || null,
    };
    return {
      logoPath: dbAssets.logoPath ?? findFirst(LOGO_CANDIDATES),
      logoDarkPath: dbAssets.logoDarkPath ?? findFirst(LOGO_DARK_CANDIDATES),
      logoBlackPath: dbAssets.logoBlackPath ?? null,
      logoSquarePath: dbAssets.logoSquarePath ?? findFirst(LOGO_SQUARE_CANDIDATES),
      faviconPath: dbAssets.faviconPath ?? findFirst(FAVICON_CANDIDATES),
    };
  } catch {
    return {
      logoPath: findFirst(LOGO_CANDIDATES),
      logoDarkPath: findFirst(LOGO_DARK_CANDIDATES),
      logoBlackPath: null,
      logoSquarePath: findFirst(LOGO_SQUARE_CANDIDATES),
      faviconPath: findFirst(FAVICON_CANDIDATES),
    };
  }
}

/** Identité visuelle brute (valeurs enregistrées en base, sans repli fichiers). */
export async function getVisualIdentityRaw(): Promise<BrandAssets> {
  try {
    const row = await prisma.visualIdentity.findUnique({ where: { id: 1 } });
    return {
      logoPath: row?.logoPath || null,
      logoDarkPath: row?.logoDarkPath || null,
      logoBlackPath: row?.logoBlackPath || null,
      logoSquarePath: row?.logoSquarePath || null,
      faviconPath: row?.faviconPath || null,
    };
  } catch {
    return {
      logoPath: null,
      logoDarkPath: null,
      logoBlackPath: null,
      logoSquarePath: null,
      faviconPath: null,
    };
  }
}