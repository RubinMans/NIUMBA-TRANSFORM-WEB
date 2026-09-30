import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-6xl font-extrabold tracking-tight text-primary">404</p>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        La page demandée n&apos;existe pas ou n&apos;a pas encore été publiée.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button href="/" variant="primary" withArrow>
          Retour à l&apos;accueil
        </Button>
        <Button href="/catalogue" variant="outline" size="md">
          Voir le catalogue
        </Button>
        <Button
          href="/contact"
          variant="ghost"
          size="md"
          className="w-full sm:w-auto"
        >
          Nous contacter
        </Button>
      </div>
    </Container>
  );
}