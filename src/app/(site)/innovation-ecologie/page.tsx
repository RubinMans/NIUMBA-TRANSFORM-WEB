import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { FactoryIcon, LeafIcon, RecyclingIcon, ShieldIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Innovation & Écologie",
  description:
    "Innovation, recherche, recyclage et économie circulaire : l'engagement environnemental de NIUMBA TRANSFORM.",
};

const pillars = [
  {
    icon: FactoryIcon,
    title: "Innovation & recherche",
    text: "Développer des solutions scientifiques et industrielles adaptées aux réalités congolaises et africaines.",
  },
  {
    icon: RecyclingIcon,
    title: "Recyclage & transformation",
    text: "Recyclage et valorisation des déchets, transformation des plastiques et du papier en ressources utiles.",
  },
  {
    icon: LeafIcon,
    title: "Économie circulaire",
    text: "Intégrer progressivement les principes d’économie circulaire à la production et au cycle de vie des produits.",
  },
  {
    icon: ShieldIcon,
    title: "Solutions environnementales",
    text: "Proposer des produits et services d’hygiène et d’assainissement qui protègent la santé et l’environnement.",
  },
] as const;

const axes = [
  {
    label: "Recherche & développement",
    text: "Formulation et innovation produit au service de solutions locales performantes.",
  },
  {
    label: "Valorisation des déchets",
    text: "Créer de la valeur à partir des déchets plastiques et papiers collectés.",
  },
  {
    label: "Recyclage des plastiques",
    text: "Transformation des plastiques en nouveaux produits utilaires.",
  },
  {
    label: "Recyclage du papier",
    text: "Valorisation du papier pour une industrie plus circulaire.",
  },
] as const;

export default function InnovationEcologiePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Badge variant="accent">Innovation & Écologie</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Innover, transformer, valoriser
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            {siteConfig.companyName} place l’innovation, la recherche et l’économie
            circulaire au cœur de son développement industriel.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-border-soft bg-surface p-7 md:p-8"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-secondary">
                  <pillar.icon width={26} height={26} />
                </span>
                <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
              Piliers de développement
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              Une industrie plus responsable
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Les axes de travail prévus par l’entreprise pour renforcer son
              positionnement industriel et environnemental.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {axes.map((axis) => (
              <div key={axis.label} className="flex items-start gap-4 rounded-2xl border border-border-soft bg-surface p-6">
                <span className="mt-0.5 h-10 w-1 shrink-0 rounded-full bg-secondary" aria-hidden />
                <div>
                  <p className="text-base font-bold text-ink">{axis.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{axis.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/produits" variant="primary" withArrow>
              Découvrir les produits {siteConfig.brandName}
            </Button>
            <Button href="/contact" variant="ghost">
              Discuter d’un projet
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}