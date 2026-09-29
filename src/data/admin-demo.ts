/**
 * NIUMBA TRANSFORM — Données de démonstration (mission 01.5).
 *
 * ⚠️ AUCUNE de ces données n'est réelle.
 * Elles servent uniquement à prévisualiser visuellement le futur portail
 * Admin. Elles seront remplacées par les données Prisma dans les missions
 * techniques (API métier, CRUD, authentification).
 *
 * Les produits s'appuient sur la liste OFFICIELLE du cahier des charges
 * (§ 5 — "Les produits actuellement prévus") sans en inventer d'autres.
 * Les valeurs de contact non confirmées restent "[À CONFIRMER]"
 * (règle anti-invention, cahier § 52).
 */

export type DemoProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  status: "Publié" | "Brouillon" | "À venir";
  updated: string;
};

export const demoCategories = [
  { id: "nettoyage", slug: "nettoyage", label: "Nettoyage", description: "Produits de nettoyage courants pour la maison et les surfaces." },
  { id: "entretien", slug: "entretien", label: "Entretien", description: "Solutions d'entretien des sols, textiles et équipements." },
  { id: "hygiene", slug: "hygiene", label: "Hygiène", description: "Savons et produits d'hygiène pour les mains et le corps." },
  { id: "assainissement", slug: "assainissement", label: "Assainissement", description: "Produits de désinfection et d'assainissement." },
] as const;

export const demoProducts: DemoProduct[] = [
  { id: "p01", name: "Savon en barre", brand: "BUKHETE", category: "Hygiène", status: "Publié", updated: "Aujourd'hui" },
  { id: "p02", name: "Savon en poudre", brand: "BUKHETE", category: "Nettoyage", status: "Publié", updated: "Hier" },
  { id: "p03", name: "Savon liquide pour les mains", brand: "BUKHETE", category: "Hygiène", status: "Publié", updated: "Hier" },
  { id: "p04", name: "Liquide vaisselle", brand: "BUKHETE", category: "Nettoyage", status: "Publié", updated: "Il y a 3 jours" },
  { id: "p05", name: "Lessive automatique", brand: "BUKHETE", category: "Nettoyage", status: "Brouillon", updated: "Il y a 5 jours" },
  { id: "p06", name: "Super détergent", brand: "BUKHETE", category: "Nettoyage", status: "Brouillon", updated: "Il y a 6 jours" },
  { id: "p07", name: "Esprit de sel", brand: "BUKHETE", category: "Entretien", status: "À venir", updated: "—" },
  { id: "p08", name: "Eau de Javel", brand: "BUKHETE", category: "Assainissement", status: "À venir", updated: "—" },
  { id: "p09", name: "Balais écologiques", brand: "BUKHETE", category: "Entretien", status: "À venir", updated: "—" },
];

export type DemoOrder = {
  id: string;
  reference: string;
  client: string;
  phone: string;
  products: string[];
  quantity: string;
  location: string;
  status: "Nouvelle" | "En traitement" | "En livraison" | "Terminée";
  time: string;
};

export const demoOrders: DemoOrder[] = [
  {
    id: "o1",
    reference: "#NT-2026-0041",
    client: "Démo — Épicerie Kintambo",
    phone: "+243 000 000 001",
    products: ["Liquide vaisselle", "Savon en poudre"],
    quantity: "40 Cartons",
    location: "Kinshasa (Kintambo)",
    status: "Nouvelle",
    time: "Aujourd'hui, 10:42",
  },
  {
    id: "o2",
    reference: "#NT-2026-0040",
    client: "Démo — Alimentation Masina",
    phone: "+243 000 000 002",
    products: ["Lessive automatique", "Eau de Javel"],
    quantity: "25 Cartons",
    location: "Kinshasa (Masina)",
    status: "En traitement",
    time: "Aujourd'hui, 09:15",
  },
  {
    id: "o3",
    reference: "#NT-2026-0039",
    client: "Démo — Dépôt Goma",
    phone: "+243 000 000 003",
    products: ["Savon liquide pour les mains"],
    quantity: "120 Cartons",
    location: "Goma (Nord-Kivu)",
    status: "En livraison",
    time: "Hier, 17:30",
  },
  {
    id: "o4",
    reference: "#NT-2026-0038",
    client: "Démo — Clinique Bon Berger",
    phone: "+243 000 000 004",
    products: ["Esprit de sel"],
    quantity: "15 Bidons",
    location: "Kinshasa (Limete)",
    status: "Terminée",
    time: "Hier, 14:10",
  },
];

export type DemoDistributor = {
  id: string;
  initials: string;
  name: string;
  zone: string;
  status: "Nouvelle" | "En étude" | "Acceptée" | "Refusée";
};

export const demoDistributors: DemoDistributor[] = [
  { id: "d1", initials: "KD", name: "Démo — Distribution Express", zone: "Kinshasa (Kintambo)", status: "Nouvelle" },
  { id: "d2", initials: "GC", name: "Démo — Grand Katanga Négoce", zone: "Lubumbashi (Haut-Katanga)", status: "En étude" },
  { id: "d3", initials: "BO", name: "Démo — Boma Ouest Import", zone: "Kongo-Central", status: "Acceptée" },
];

export type DemoVideo = {
  id: string;
  title: string;
  duration: string;
  status: "Publié" | "Brouillon";
  updated: string;
};

export const demoVideos: DemoVideo[] = [
  { id: "v1", title: "Démo — Présentation de la gamme BUKHETE", duration: "1:25", status: "Publié", updated: "Il y a 2 jours" },
  { id: "v2", title: "Démo — Mode d'emploi du liquide vaisselle", duration: "0:58", status: "Publié", updated: "Il y a 6 jours" },
  { id: "v3", title: "Démo — Reportage usine & laboratoire", duration: "3:40", status: "Brouillon", updated: "—" },
];

export type DemoArticle = {
  id: string;
  title: string;
  category: string;
  status: "Publié" | "Brouillon";
  date: string;
};

export const demoArticles: DemoArticle[] = [
  { id: "a1", title: "Démo — Lancement de la marque BUKHETE", category: "Entreprise", status: "Publié", date: "23 août 2026" },
  { id: "a2", title: "Démo — Signature d'un partenariat local", category: "Partenariat", status: "Brouillon", date: "—" },
  { id: "a3", title: "Démo — Inauguration du site industriel", category: "Industrie", status: "Brouillon", date: "—" },
];

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Actif" | "Inactif";
};

export const demoUsers: DemoUser[] = [
  { id: "u1", name: "Administrateur démo", email: "admin.demo@exemple.cd", role: "Super administrateur", status: "Actif" },
  { id: "u2", name: "Rédacteur démo", email: "redacteur@exemple.cd", role: "Rédacteur CMS", status: "Actif" },
  { id: "u3", name: "Commercial démo", email: "commercial@exemple.cd", role: "Responsable commercial", status: "Inactif" },
];

export const demoRoles = [
  { name: "Super administrateur", scope: "Accès complet au portail et aux paramètres.", color: "primary" as const },
  { name: "Rédacteur CMS", scope: "Gestion du contenu : produits, actualités, vidéos, médias.", color: "secondary" as const },
  { name: "Responsable commercial", scope: "Commandes et candidatures distributeurs.", color: "tertiary" as const },
];

/** Sections de la page d'accueil (ordre de rendu public = tableau croissant). */
export const demoHomeSections = [
  { id: "hero", label: "Hero — titre principal & accroche", status: "Visible" },
  { id: "entreprise", label: "Présentation de l'entreprise", status: "Visible" },
  { id: "produits", label: "Produits BUKHETE mis en avant", status: "Visible" },
  { id: "categories", label: "Catégories du catalogue", status: "Visible" },
  { id: "innovation", label: "Innovation & écologie", status: "Visible" },
  { id: "videos", label: "Vidéothèques", status: "Masquée" },
  { id: "actualites", label: "Dernières actualités", status: "Visible" },
  { id: "cta", label: "Bandeau d'appel à l'action (CTA)", status: "Visible" },
] as const;

/** Identité visuelle — variantes prévues par le cahier des charges (§ 27, § 39). */
export const demoLogoVariants = [
  { id: "principal", label: "Logo principal", status: "Logo officiel à intégrer" },
  { id: "clair", label: "Logo clair (fond sombre)", status: "Logo officiel à intégrer" },
  { id: "sombre", label: "Logo sombre (fond clair)", status: "Logo officiel à intégrer" },
  { id: "favicon", label: "Favicon", status: "À intégrer" },
] as const;