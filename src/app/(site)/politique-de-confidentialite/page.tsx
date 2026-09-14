import type { Metadata } from "next";
import { PageUnderConstruction } from "@/components/site/page-under-construction";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de NIUMBA TRANSFORM : collecte, utilisation et protection des données.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <PageUnderConstruction
      title="Politique de confidentialité"
      description="La politique de confidentialité décrira la collecte, l'utilisation et la protection des données des visiteurs, clients et distributeurs."
      planned={[
        "Données collectées sur le site",
        "Finalités de traitement",
        "Droits des personnes",
        "Sécurité et conservation des données",
      ]}
    />
  );
}