import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/admin/demo-badge";

type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Affiche la mention "Données de démonstration". */
  demo?: boolean;
  className?: string;
};

/**
 * En-tête standard des pages Admin : titre, sous-titre et zone d'actions.
 * Chaque module du futur back-office utilisera ce composant (cohérence UI).
 */
export function AdminPageHeader({ title, subtitle, actions, demo, className }: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-[28px]">{title}</h1>
          {demo && <DemoBadge />}
        </div>
        {subtitle ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div> : null}
    </div>
  );
}