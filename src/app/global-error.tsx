"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="fr">
      <head>
        <title>Erreur — NIUMBA TRANSFORM</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex min-h-screen flex-col bg-surface-subtle">
        <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-soft text-tertiary">
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
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            Erreur serveur
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Une erreur inattendue s&apos;est produite. L&apos;équipe technique a été
            informée.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs font-mono text-ink-soft">
              Référence : {error.digest}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button onClick={reset} variant="primary" withArrow>
              Réessayer
            </Button>
            <Button href="/" variant="outline" size="md">
              Retour à l&apos;accueil
            </Button>
          </div>
        </Container>
      </body>
    </html>
  );
}