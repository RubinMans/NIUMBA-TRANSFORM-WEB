/**
 * Navigation publique — première structure de navigation (mission 01).
 * Les routes correspondent aux pages du cahier des charges (§ 9).
 * Le champ `status: "upcoming"` signale les pages à livrer dans les
 * prochaines missions (elles pointent déjà vers des routes valides,
 * actuellement en version "page en construction").
 */

export type NavItem = {
  label: string;
  shortLabel?: string;
  href: string;
  description?: string;
  status?: "live" | "upcoming";
};

export const mainNavigation: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
    status: "live",
  },
  {
    label: "Entreprise",
    href: "/entreprise",
    description: "NIUMBA TRANSFORM, vision industrielle.",
  },
  {
    label: "Produits BUKHETE",
    shortLabel: "Produits",
    href: "/catalogue",
    description: "Catalogue de la marque BUKHETE.",
  },
  {
    label: "Innovation & Écologie",
    shortLabel: "Innovation",
    href: "/innovation-ecologie",
    description: "Recyclage, économie circulaire, R&D.",
  },
  {
    label: "Actualités",
    href: "/actualites",
    description: "Nouvelles de l'entreprise.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Nous contacter.",
  },
];

/** Bouton d'action principal du header. */
export const headerCta: NavItem = {
  label: "Commander",
  href: "/commander",
};

export const footerNavigation: NavItem[] = [
  ...mainNavigation,
  {
    label: "Vidéos",
    href: "/videos",
    description: "Démonstrations et reportages.",
  },
  {
    label: "Devenir distributeur",
    href: "/devenir-distributeur",
    description: "Rejoindre le réseau BUKHETE.",
  },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGU", href: "/cgu" },
];

export const footerBukheteLinks: NavItem[] = [
  { label: "Catalogue BUKHETE", href: "/catalogue" },
  { label: "Passer une commande", href: "/commander" },
  { label: "Devenir distributeur", href: "/devenir-distributeur" },
  { label: "Contact commercial", href: "/contact" },
];