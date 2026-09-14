/**
 * NIUMBA TRANSFORM — Catalogue public BUKHETE.
 *
 * ⚠️ Source statique de FALLBACK uniquement.
 * Depuis la mission 02, le catalogue est piloté par la base de données
 * (Prisma) via `src/services/catalogue.ts`. Ce module reste :
 *   - le socle de TYPES partagés entre le site public et les services ;
 *   - la source statique utilisée si la base n'est pas disponible (build
 *     sans base, prévisualisation, récupération d'erreur).
 *
 * Les données reflètent la liste OFFICIELLE du cahier des charges
 * (§ 5 produits, § 13 catégories). Aucune information commerciale n'est
 * inventée : tout élément non confirmé utilise "[À CONFIRMER]"
 * (règle anti-invention, cahier § 52).
 */

export type ProductStatus = "Publié" | "Brouillon" | "À venir";

export type Category = {
  slug: string;
  label: string;
  description: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  status: ProductStatus;
  shortDescription: string;
  /** Informations commerciales non confirmées — toujours affichées "[À CONFIRMER]". */
  packaging: string | null;
  composition: string | null;
  certifications: string | null;
  /** Chemin public de l'image officielle (ex. /media/produits/savon-en-barre.jpg). */
  image?: string | null;
  description?: string | null;
  instructions?: string | null;
  precautions?: string | null;
  additionalInfo?: string | null;
  videoUrl?: string | null;
};

/** Statuts canoniques (stockés tels quels en base). */
export const PRODUCT_STATUSES = ["Publié", "Brouillon", "À venir"] as const;
export const ORDER_STATUSES = [
  "Nouvelle",
  "En traitement",
  "En livraison",
  "Terminée",
  "Annulée",
] as const;
export const DISTRIBUTOR_STATUSES = ["Nouvelle", "En étude", "Acceptée", "Refusée"] as const;

/** Catégories officielles (cahier § 13). */
export const categories: Category[] = [
  {
    slug: "nettoyage",
    label: "Nettoyage",
    description:
      "Produits de nettoyage courants pour la maison, les surfaces et le linge.",
  },
  {
    slug: "entretien",
    label: "Entretien",
    description: "Solutions d'entretien des sols, textiles et équipements.",
  },
  {
    slug: "hygiene",
    label: "Hygiène",
    description: "Savons et produits d'hygiène pour les mains et le corps.",
  },
  {
    slug: "assainissement",
    label: "Assainissement",
    description: "Produits de désinfection et d'assainissement.",
  },
];

/**
 * Produits officiels prévus par le cahier des charges (§ 5).
 * Les catégories suivent l'affectation du portail Admin (mission 01.5).
 */
export const products: Product[] = [
  {
    slug: "savon-en-barre",
    name: "Savon en barre",
    brand: "BUKHETE",
    categorySlug: "hygiene",
    status: "Publié",
    shortDescription: "Savon de la gamme BUKHETE, fabriqué en RDC.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "savon-en-poudre",
    name: "Savon en poudre",
    brand: "BUKHETE",
    categorySlug: "nettoyage",
    status: "Publié",
    shortDescription: "Savon en poudre de la gamme BUKHETE, fabriqué en RDC.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "savon-liquide-mains",
    name: "Savon liquide pour les mains",
    brand: "BUKHETE",
    categorySlug: "hygiene",
    status: "Publié",
    shortDescription: "Savon liquide pour les mains de la gamme BUKHETE, fabriqué en RDC.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "liquide-vaisselle",
    name: "Liquide vaisselle",
    brand: "BUKHETE",
    categorySlug: "nettoyage",
    status: "Publié",
    shortDescription: "Liquide vaisselle de la gamme BUKHETE, fabriqué en RDC.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "lessive-automatique",
    name: "Lessive automatique",
    brand: "BUKHETE",
    categorySlug: "nettoyage",
    status: "Brouillon",
    shortDescription: "Lessive automatique de la gamme BUKHETE, fabriquée en RDC.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "super-detergent",
    name: "Super détergent",
    brand: "BUKHETE",
    categorySlug: "nettoyage",
    status: "Brouillon",
    shortDescription: "Super détergent de la gamme BUKHETE, fabriqué en RDC.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "esprit-de-sel",
    name: "Esprit de sel",
    brand: "BUKHETE",
    categorySlug: "entretien",
    status: "À venir",
    shortDescription: "Esprit de sel de la gamme BUKHETE (détartrage et entretien).",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "eau-de-javel",
    name: "Eau de Javel",
    brand: "BUKHETE",
    categorySlug: "assainissement",
    status: "À venir",
    shortDescription: "Eau de Javel de la gamme BUKHETE — désinfection et assainissement.",
    packaging: null,
    composition: null,
    certifications: null,
  },
  {
    slug: "balais-ecologiques",
    name: "Balais écologiques",
    brand: "BUKHETE",
    categorySlug: "entretien",
    status: "À venir",
    shortDescription: "Balais écologiques de la gamme BUKHETE — accessoires d'entretien.",
    packaging: null,
    composition: null,
    certifications: null,
  },
];

/** Mention à afficher pour toute information commerciale non confirmée. */
export const toConfirm = "[À CONFIRMER]";

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getCategoryOfProduct(product: Product): Category | undefined {
  return getCategoryBySlug(product.categorySlug);
}

/** Génère un slug à partir d'un nom (minuscules, non accentuées, tirets). */
export function slugify(value: string): string {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}