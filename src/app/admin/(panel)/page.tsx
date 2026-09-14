import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatCard } from "@/components/admin/stat-card";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminQuickAction } from "@/components/admin/admin-quick-action";
import { AdminButton } from "@/components/admin/admin-button";
import {
  ProductIcon,
  TagIcon,
  BagIcon,
  TruckIcon,
  VideoIcon,
  NewspaperIcon,
  PlusIcon,
  PlayIcon,
  HomeIcon,
  BuildingIcon,
  CheckIcon,
  XIcon,
  InfoIcon,
} from "@/components/admin/icons";
import { siteConfig } from "@/lib/site";
import { prisma } from "@/db/client";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  const [products, categories, orders, distributors, videos, articles] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.distributorRequest.count(),
    prisma.video.count(),
    prisma.article.count(),
  ]);

  const statCards = [
    { label: "Produits BUKHETE", value: String(products), hint: "Liste officielle du cahier des charges (§ 5)", icon: <ProductIcon />, tone: "primary" },
    { label: "Catégories", value: String(categories), hint: "Nettoyage, entretien, hygiène, assainissement", icon: <TagIcon />, tone: "secondary" },
    { label: "Commandes", value: String(orders), hint: "Commandes reçues en base", icon: <BagIcon />, tone: "tertiary" },
    { label: "Demandes distributeurs", value: String(distributors), hint: "Candidatures enregistrées", icon: <TruckIcon />, tone: "neutral" },
    { label: "Vidéos", value: String(videos), hint: "Vidéothèques et démonstrations", icon: <VideoIcon />, tone: "primary" },
    { label: "Actualités", value: String(articles), hint: "Articles et annonces", icon: <NewspaperIcon />, tone: "secondary" },
  ] as const;

  const quickActions = [
    {
      title: "Gérer les produits",
      description: `Catalogue, statuts et catégories ${siteConfig.brandName}.`,
      href: "/admin/produits",
      icon: <PlusIcon />,
      accent: "primary" as const,
    },
    {
      title: "Modifier les informations entreprise",
      description: "Coordonnées, contact, données légales.",
      href: "/admin/entreprise",
      icon: <BuildingIcon />,
      accent: "secondary" as const,
    },
    {
      title: "Modifier la page d'accueil",
      description: "CMS des sections de la homepage.",
      href: "/admin/accueil",
      icon: <HomeIcon />,
      accent: "tertiary" as const,
    },
    {
      title: "Gérer les commandes",
      description: "Suivi et traitement des commandes.",
      href: "/admin/commandes",
      icon: <BagIcon />,
      accent: "neutral" as const,
    },
    {
      title: "Publier une actualité",
      description: "Rédiger et diffuser un article.",
      href: "/admin/actualites",
      icon: <NewspaperIcon />,
      accent: "neutral" as const,
    },
    {
      title: "Ajouter une vidéo",
      description: "Intégrer une démonstration ou un reportage.",
      href: "/admin/videos",
      icon: <PlayIcon />,
      accent: "neutral" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Tableau de bord"
        subtitle={`Centre de contrôle du site ${siteConfig.companyName} — produits, commandes, contenus et informations.`}
        actions={
          <>
            <AdminButton href="/" variant="outline" size="md" icon={<InfoIcon width={15} height={15} />}>
              Voir le site public
            </AdminButton>
          </>
        }
      />

      {/* État du système */}
      <div className="flex flex-col gap-3 rounded-2xl border border-secondary/40 bg-secondary-soft/40 px-5 py-4 sm:flex-row sm:items-center">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
          <CheckIcon />
        </span>
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-extrabold">Backend réel actif — Données en base</p>
          <p className="mt-0.5 text-ink-muted">
            Authentification, session et données enregistrées dans la base SQLite (développement).
            {user ? <> Connecté en tant que <span className="font-bold text-ink">{user.name}</span> ({user.roleLabel}).</> : null}
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <section aria-label="Statistiques">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {statCards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              hint={card.hint}
              icon={card.icon}
              tone={card.tone}
            />
          ))}
        </div>
      </section>

      {/* Accès rapides */}
      <section aria-label="Accès rapides">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-extrabold tracking-tight text-ink">Accès rapides</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <AdminQuickAction key={action.title} {...action} />
          ))}
        </div>
      </section>

      {/* Modules du portail */}
      <AdminPanel title="Modules du portail" description="État d'avancement réel (mission 02)">
        <ul className="flex flex-col gap-2.5">
          {[
            { label: "Authentification & sessions", ready: true },
            { label: "Base de données (SQLite)", ready: true },
            { label: "Produits & catalogue (CRUD)", ready: true },
            { label: "Catégories", ready: true },
            { label: "Paramètres site / entreprise", ready: true },
            { label: "Logo & assets (mécanisme)", ready: true },
            { label: "Commandes & distributeurs", ready: false },
            { label: "Vidéos & actualités", ready: false },
          ].map((module) => (
            <li key={module.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ink">{module.label}</span>
              {module.ready ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-dark">
                  <CheckIcon width={14} height={14} /> Activé
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft">
                  <XIcon width={14} height={14} /> À venir
                </span>
              )}
            </li>
          ))}
        </ul>
      </AdminPanel>
    </div>
  );
}