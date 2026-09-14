import { FactoryIcon } from "@/lib/icons";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

type PageUnderConstructionProps = {
  title: string;
  description: string;
  planned: string[];
};

/**
 * Gabarit des pages "en construction" (mission 01).
 * Utilisé pour matérialiser l’arborescence publique du cahier des charges
 * (§ 9) en attendant les missions dédiées à chaque module.
 */
export function PageUnderConstruction({
  title,
  description,
  planned,
}: PageUnderConstructionProps) {
  return (
    <>
      <section className="bg-gradient-to-b from-primary via-primary-dark to-primary-deep text-white">
        <Container className="py-16 md:py-20">
          <Badge variant="accent">Page en construction</Badge>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl md:leading-[1.1]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-soft md:text-lg">
            {description}
          </p>
        </Container>
      </section>

      <section className="bg-surface-subtle py-16 md:py-20">
        <Container>
          <div className="max-w-2xl rounded-3xl border border-border-soft bg-surface p-8 shadow-sm md:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-secondary">
              <FactoryIcon width={22} height={22} />
            </span>
            <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink">
              Cette page sera développée dans une prochaine mission
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Le cahier des charges prévoit notamment :
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {planned.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/" variant="primary" withArrow>
              Retour à l’accueil
            </Button>
            <Button href="/contact" variant="ghost">
              Contacter {siteConfig.companyName}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}