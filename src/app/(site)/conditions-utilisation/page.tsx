import type { Metadata } from "next";
import { PageUnderConstruction } from "@/components/site/page-under-construction";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation du site NIUMBA TRANSFORM.",
};

export default function ConditionsUtilisationPage() {
  return (
    <PageUnderConstruction
      title="Conditions d'utilisation"
      description="Les conditions d'utilisation cadreront l'accès au site, aux commandes et aux services de NIUMBA TRANSFORM."
      planned={[
        "Accès au site et aux contenus",
        "Commandes et engagements",
        "Propriété intellectuelle",
        "Limitations de responsabilité",
      ]}
    />
  );
}