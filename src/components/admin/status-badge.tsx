import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "info" | "danger" | "neutral";

type StatusBadgeProps = {
  status: string;
  tone?: StatusTone;
  className?: string;
  /** Petite puce animée (état actif/à traiter). */
  pulse?: boolean;
};

const toneClasses: Record<StatusTone, string> = {
  success: "bg-secondary-soft text-secondary-dark",
  warning: "bg-tertiary-soft text-tertiary",
  info: "bg-emploi-soft text-emploi",
  danger: "bg-red-50 text-red-700",
  neutral: "bg-surface-subtle text-ink-muted border border-border-soft",
};

const dotClasses: Record<StatusTone, string> = {
  success: "bg-secondary",
  warning: "bg-tertiary",
  info: "bg-emploi",
  danger: "bg-red-500",
  neutral: "bg-ink-soft",
};

/** Pastille de statut (Nouvelle, En traitement, Publié, Brouillon…). */
export function StatusBadge({ status, tone = "neutral", className, pulse }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", dotClasses[tone], pulse && "animate-pulse")}
        aria-hidden
      />
      {status}
    </span>
  );
}