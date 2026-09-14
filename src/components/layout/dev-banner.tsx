import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

/**
 * Bandeau de prévisualisation de démonstration.
 * Communique sobrement le statut du projet (version de démonstration)
 * sans alourdir l'interface. Visible en phase de prévisualisation.
 */
export function DevBanner({ className }: { className?: string }) {
  return (
    <div className={cn("bg-tertiary text-primary-dark", className)} role="status">
      <Container className="flex flex-wrap items-center justify-center gap-2 py-2 text-center text-xs font-semibold md:text-[13px]">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary-dark" />
          Version de prévisualisation v{siteConfig.buildVersion}
        </span>
        <span className="hidden text-primary-dark/60 md:inline">·</span>
        <span className="hidden text-primary-dark/70 md:inline">
          Contenus, logos et photos officiels en cours de finalisation
        </span>
      </Container>
    </div>
  );
}