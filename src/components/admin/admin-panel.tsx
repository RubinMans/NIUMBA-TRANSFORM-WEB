import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminPanelProps = {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/**
 * Conteneur "carte" standard du portail Admin.
 * Utilisé pour les tableaux, listes, formulaires et états de contenu.
 */
export function AdminPanel({
  title,
  description,
  actions,
  children,
  footer,
  className,
  bodyClassName,
}: AdminPanelProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border-soft bg-surface shadow-sm",
        className,
      )}
    >
      {title || description || actions ? (
        <div className="flex flex-col gap-3 border-b border-border-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            {title ? <h2 className="text-base font-extrabold tracking-tight text-ink">{title}</h2> : null}
            {description ? (
              <p className="mt-0.5 text-sm text-ink-muted">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
      {footer ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-soft px-5 py-3 text-xs text-ink-muted">
          {footer}
        </div>
      ) : null}
    </section>
  );
}