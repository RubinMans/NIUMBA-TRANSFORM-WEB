import type { Metadata } from "next";
import { PageUnderConstruction } from "@/components/site/page-under-construction";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Nouvelles de NIUMBA TRANSFORM : lancements, événements, activités industrielles et annonces.",
};

export default function ActualitesPage() {
  return (
    <PageUnderConstruction
      title="Actualités de l'entreprise"
      description="Lancements de produits, événements, activités industrielles, partenariats, innovations et projets."
      planned={[
        "Articles et annonces officielles",
        "Lancements de produits BUKHETE",
        "Événements et activités industrielles",
        "Partenariats et projets",
        "Archives et catégories d'articles",
      ]}
    />
  );
}