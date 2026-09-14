import type { Metadata } from "next";
import { PageUnderConstruction } from "@/components/site/page-under-construction";

export const metadata: Metadata = {
  title: "Vidéos",
  description:
    "Démonstrations, présentations de produits, modes d'utilisation et reportages industriels de NIUMBA TRANSFORM.",
};

export default function VideosPage() {
  return (
    <PageUnderConstruction
      title="Vidéos & reportages"
      description="Démonstrations de produits, modes d'utilisation, conseils et reportages sur l'activité industrielle de l'entreprise."
      planned={[
        "Lecteur vidéo et miniatures",
        "Démonstrations et modes d'utilisation",
        "Contenus industriels et éducatifs",
        "Présentation de l'entreprise",
        "Vidéos associées aux produits",
      ]}
    />
  );
}