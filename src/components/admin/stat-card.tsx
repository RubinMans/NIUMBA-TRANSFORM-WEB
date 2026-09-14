import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/admin/demo-badge";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  /** Couleur de la pastille d'icône. */
  tone?: "primary" | "secondary" | "tertiary" | "neutral";
  /** Met en évidence le caractère de démonstration. */
  demo?: boolean;
  className?: string;
};

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "bg-primary-soft text-primary",
  secondary: "bg-secondary-soft text-secondary-dark",
  tertiary: "bg-tertiary-soft text-tertiary",
  neutral: "bg-surface-subtle text-ink-muted border border-border-soft",
};

/**
 * Carte de statistique du dashboard. Les valeurs restent explicitement
 * de démonstration tant qu'aucune donnée réelle n'est branchée (cahier § 30).
 */
export function StatCard({ label, value, hint, icon, tone = "neutral", demo, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">{label}</span>
        {icon ? (
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              toneClasses[tone],
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight text-ink">{value}</span>
        {demo && <DemoBadge className="scale-90 origin-left" />}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}