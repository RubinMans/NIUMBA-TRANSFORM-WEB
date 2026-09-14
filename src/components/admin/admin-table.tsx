import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminTableProps = {
  columns: string[];
  children: ReactNode;
  className?: string;
};

/**
 * Conteneur de tableau Admin : entête sticky, enveloppe scrollable
 * (responsive : jamais de débordement horizontal de la page).
 */
export function AdminTable({ columns, children, className }: AdminTableProps) {
  return (
    <div className={cn("-mx-5 overflow-x-auto px-5", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            {columns.map((column) => (
              <th key={column} className="border-b border-border-soft py-2.5 pr-4 last:text-right">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-soft">{children}</tbody>
      </table>
    </div>
  );
}

/** Ligne de tableau avec hover doux. */
export function AdminTableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn("transition-colors hover:bg-surface-subtle/70", className)}>{children}</tr>
  );
}

/** Cellule standard avec styles uniformes. */
export function AdminTableData({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  return (
    <td className={cn("py-3.5 pr-4 align-middle text-sm text-ink", className)}>
      <span className={cn("inline-flex items-center gap-2", align === "right" && "w-full justify-end")}>
        {children}
      </span>
    </td>
  );
}

/** Cellule d'en-tête textuelle d'une ligne (nom principal en gras). */
export function AdminTableTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-bold text-ink", className)}>{children}</span>;
}

/** Petit texte secondaire sous une cellule (ex. coordonnées). */
export function AdminTableMuted({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("block text-xs text-ink-muted", className)}>{children}</span>;
}