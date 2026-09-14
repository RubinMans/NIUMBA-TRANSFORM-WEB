import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { CheckIcon, FactoryIcon, MapPinIcon, RecyclingIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Entreprise",
  description:
    "NIUMBA TRANSFORM : présentation, histoire, mission, vision, ambitions industrielles et implantation à Kinshasa.",
};

const mission = [
  "Développer des produits adaptés aux besoins locaux",
  "Valoriser les ressources disponibles localement",
  "Réduire progressivement la dépendance aux importations",
  "Créer des emplois et développer des chaînes de valeur locales",
  "Encourager la transformation industrielle en RDC",
  "Développer des solutions scientifiques adaptées aux réalités africaines",
  "Promouvoir la production locale et le Made in DRC",
  "Intégrer progressivement le recyclage et l’économie circulaire",
] as const;

const timeline = [
  {
    period: "2024",
    title: "Activités informelles",
    text: "Démarrage des activités avant la formalisation officielle de l’entreprise.",
  },
  {
    period: "3 avril 2025",
    title: "Formalisation officielle",
    text: "Enregistrement officiel de l’entreprise à Kinshasa (RCCM, Id.Nat, NIF).",
  },
  {
    period: "Aujourd’hui",
    title: "Produits BUKHETE",
    text: "Développement de la marque BUKHETE et de la gamme de produits.",
  },
  {
    period: "Projet",
    title: "Hangar industriel de Kimwenza",
    text: "Implantation industrielle permanente à proximité de la route périphérique de Kinshasa.",
  },
] as const;

export default function EntreprisePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Badge variant="accent">Entreprise</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            {siteConfig.companyName}, une ambition industrielle congolaise
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            Entreprise congolaise de transformation industrielle : chimie, nettoyage,
            hygiène, assainissement, recyclage et valorisation des déchets.
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                Présentation
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                Une maison de transformation
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                {siteConfig.companyName} est une entreprise congolaise orientée vers la
                transformation industrielle et la création de solutions adaptées aux
                réalités locales. Le nom « NIUMBA » renvoie à l’idée de maison de
                transformation.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Les activités couvrent les produits chimiques, le nettoyage, l’entretien,
                l’hygiène, l’assainissement, le recyclage, la valorisation des déchets,
                la transformation des plastiques et du papier ainsi que la fabrication
                d’accessoires de nettoyage et d’hygiène.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                L’entreprise ambitionne de construire progressivement un véritable
                écosystème industriel congolais.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border-soft bg-surface p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-secondary">
                    <FactoryIcon width={20} height={20} />
                  </span>
                  <p className="mt-4 text-base font-bold text-ink">Transformation locale</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Production de solutions industrielles en RDC.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-soft bg-surface p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-secondary">
                    <MapPinIcon width={20} height={20} />
                  </span>
                  <p className="mt-4 text-base font-bold text-ink">Implanté à Kinshasa</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Adresse à Mont-Ngafula, site industriel envisagé à Kimwenza.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-soft bg-surface p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-secondary">
                    <RecyclingIcon width={20} height={20} />
                  </span>
                  <p className="mt-4 text-base font-bold text-ink">Économie circulaire</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Recyclage et valorisation des déchets à intégrer.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-primary-dark p-8 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-soft">
                  Statut légal
                </p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
                  Informations de l’entreprise
                </h3>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary-soft/60">
                      Nom officiel
                    </dt>
                    <dd className="mt-1 font-semibold text-white">{siteConfig.legalName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary-soft/60">
                      Création
                    </dt>
                    <dd className="mt-1 font-semibold text-white">03 avril 2025</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary-soft/60">
                      RCCM
                    </dt>
                    <dd className="mt-1 font-mono text-white">{siteConfig.rccm}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary-soft/60">
                      ID Nationale
                    </dt>
                    <dd className="mt-1 font-mono text-white">{siteConfig.idNat}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary-soft/60">
                      NIF
                    </dt>
                    <dd className="mt-1 font-mono text-white">{siteConfig.nif}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary-soft/60">
                      Adresse
                    </dt>
                    <dd className="mt-1 text-primary-soft">{siteConfig.address}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-primary-deep p-8 text-white md:p-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary-soft">
                  Vision
                </p>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                  « L’Apple du secteur industriel congolais »
                </h2>
                <p className="mt-4 leading-relaxed text-primary-soft">
                  Développer des produits et solutions modernes, adaptés aux réalités de
                  la RDC et capables de participer au développement d’une industrie
                  locale forte.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border-soft bg-surface p-8 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                Mission
              </p>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
                Transformer et valoriser les ressources locales
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {mission.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary">
                      <CheckIcon width={12} height={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-subtle py-14 md:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
            Parcours
          </p>
          <h2 className="mt-2 max-w-xl text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            De l’initiative informelle au projet industriel
          </h2>

          <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-border-soft bg-surface p-6"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">
                  {step.period}
                </span>
                <p className="mt-2 text-base font-bold text-ink">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                <span aria-hidden className="absolute right-5 top-5 text-2xl font-extrabold text-primary-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/produits" variant="primary" withArrow>
              Découvrir la gamme {siteConfig.brandName}
            </Button>
            <Button href="/contact" variant="ghost">
              Contacter l’entreprise
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}