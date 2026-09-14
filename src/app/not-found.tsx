import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-extrabold tracking-tight text-primary">404</p>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        La page demandée n’existe pas ou n’a pas encore été publiée. Revenez à l’accueil pour
        poursuivre votre visite.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary" withArrow>
          Retour à l’accueil
        </Button>
      </div>
    </Container>
  );
}