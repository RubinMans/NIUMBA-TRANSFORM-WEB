import { siteConfig } from "@/lib/site";
import { FactoryIcon, RecyclingIcon, CheckIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

const metrics = [
  {
    icon: CheckIcon,
    title: "100% Capital congolais",
    text: "RCCM CDKNG/RCCM/25-A-02289 — entreprise enregistrée à Kinshasa.",
  },
  {
    icon: FactoryIcon,
    title: "Transformation locale",
    text: "Formulation, production et conditionnement de produits d’hygiène en RDC.",
  },
  {
    icon: RecyclingIcon,
    title: "Économie circulaire",
    text: "Recyclage plastique et papier, valorisation des déchets à terme.",
  },
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-primary-soft/10 blur-3xl" />

      <Container className="relative z-10 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="max-w-3xl">
          <Badge variant="accent" className="mb-6">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Souveraineté industrielle &amp; Made in RDC
          </Badge>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary-soft">
            {siteConfig.companyName}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            Transformer le savoir scientifique en{" "}
            <span className="text-secondary-soft">industrie congolaise d’excellence</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Entreprise industrielle congolaise de nettoyage, d’hygiène, d’assainissement et de
            recyclage. {siteConfig.brandName}, notre marque commerciale, propose des produits
            adaptés aux réalités locales et accessibles à chaque foyer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/entreprise" variant="accent" size="lg" withArrow>
              Découvrir l’entreprise
            </Button>
            <Button
              href="/produits"
              variant="primary"
              size="lg"
              className="border border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/20"
            >
              Catalogue {siteConfig.brandName}
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-primary-dark">
                <metric.icon width={22} height={22} />
              </span>
              <div>
                <p className="text-base font-bold text-white">{metric.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-primary-soft/85">{metric.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}