import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "@/components/admin/icons";

type MediaPreviewProps = {
  label: string;
  meta?: string;
  icon?: ReactNode;
  /** Affiche explicitement qu'aucun fichier officiel n'est intégré. */
  pending?: boolean;
  className?: string;
};

/**
 * Zone d'aperçu média (logo, favicon, photos, miniatures…).
 * En l'attente des ASSETS_OFFICIELS, affiche un état vide identifiable.
 */
export function MediaPreview({ label, meta, icon, pending = false, className }: MediaPreviewProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="mb-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted">{label}</span>
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border-soft bg-surface-subtle/70 p-4 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink-soft shadow-sm">
          {icon ?? <ImageIcon width={18} height={18} />}
        </span>
        <span className={cn("text-xs font-bold", pending ? "text-primary" : "text-ink")}>
          {pending ? "Logo officiel à intégrer" : "Aperçu"}
        </span>
        {meta ? <span className="max-w-[220px] truncate text-[11px] text-ink-muted">{meta}</span> : null}
      </div>
    </div>
  );
}