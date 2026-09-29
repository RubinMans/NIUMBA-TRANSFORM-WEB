/**
 * NIUMBA TRANSFORM — Configuration de la navigation Admin.
 *
 * Source fonctionnelle : cahier des charges, section 29 (Administration).
 * Sources visuelles : STITCH (back-office administrateur, connexion sécurisée).
 *
 * Le portail Admin est volontairement distinct du site public : il possède
 * son propre layout (sidebar + header) et sa propre arborescence.
 */

export type AdminIconName =
  | "dashboard"
  | "product"
  | "tag"
  | "video"
  | "newspaper"
  | "leaf"
  | "image"
  | "bag"
  | "truck"
  | "home"
  | "palette"
  | "building"
  | "users"
  | "settings"
  | "logout";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminIconName;
  description: string;
};

export type AdminNavGroup = {
  /** Groupe sans libellé (ex. Tableau de bord en tête). */
  label?: string;
  items: AdminNavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    items: [
      {
        label: "Tableau de bord",
        href: "/admin",
        icon: "dashboard",
        description: "Vue d'ensemble du portail.",
      },
    ],
  },
  {
    label: "CONTENU",
    items: [
      {
        label: "Produits",
        href: "/admin/produits",
        icon: "product",
        description: "Catalogue de la gamme BUKHETE.",
      },
      {
        label: "Catégories",
        href: "/admin/categories",
        icon: "tag",
        description: "Organisation du catalogue.",
      },
      {
        label: "Vidéos",
        href: "/admin/videos",
        icon: "video",
        description: "Vidéothèque et démonstrations.",
      },
      {
        label: "Actualités",
        href: "/admin/actualites",
        icon: "newspaper",
        description: "Articles et annonces.",
      },
      {
        label: "Innovation & écologie",
        href: "/admin/innovation-ecologie",
        icon: "leaf",
        description: "R&D, recyclage, économie circulaire.",
      },
      {
        label: "Médias",
        href: "/admin/medias",
        icon: "image",
        description: "Bibliothèque de fichiers.",
      },
    ],
  },
  {
    label: "COMMERCE",
    items: [
      {
        label: "Commandes",
        href: "/admin/commandes",
        icon: "bag",
        description: "Commandes clients BUKHETE.",
      },
      {
        label: "Distributeurs",
        href: "/admin/distributeurs",
        icon: "truck",
        description: "Candidatures et réseau.",
      },
    ],
  },
  {
    label: "SITE",
    items: [
      {
        label: "Page d'accueil",
        href: "/admin/accueil",
        icon: "home",
        description: "CMS de la page d'accueil.",
      },
      {
        label: "Identité visuelle",
        href: "/admin/identite",
        icon: "palette",
        description: "Logo, couleurs, marque.",
      },
      {
        label: "Informations entreprise",
        href: "/admin/entreprise",
        icon: "building",
        description: "Coordonnées et données légales.",
      },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      {
        label: "Utilisateurs & rôles",
        href: "/admin/utilisateurs",
        icon: "users",
        description: "Accès et permissions.",
      },
      {
        label: "Paramètres",
        href: "/admin/parametres",
        icon: "settings",
        description: "Configuration du système.",
      },
    ],
  },
];

/** Retrouve un élément de navigation à partir de sa route. */
export function findAdminNavItem(href: string): AdminNavItem | undefined {
  for (const group of adminNavGroups) {
    const item = group.items.find((entry) => entry.href === href);
    if (item) return item;
  }
  return undefined;
}