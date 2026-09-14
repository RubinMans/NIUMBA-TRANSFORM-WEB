import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Administration",
    template: "%s · Administration",
  },
  description: "Portail d'administration de NIUMBA TRANSFORM.",
  robots: { index: false, follow: false },
};

/**
 * Layout racine du portail Admin.
 * Le contenu est fourni par `(panel)` (layout Admin complet) ou par la
 * page de connexion `connexion` (mise en page dédiée, sans chrome Admin).
 */
export default function AdminAreaLayout({ children }: { children: React.ReactNode }) {
  return children;
}