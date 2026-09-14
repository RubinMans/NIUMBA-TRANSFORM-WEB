import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/admin/icons";
import { cn } from "@/lib/utils";

type AdminQuickActionProps = {
  title: string;
  description?: string;
  href: string;
  icon: ReactNode;
  accent?: "primary" | "secondary" | "tertiary" | "neutral";
  className?: string;
};

const accentClasses: Record<NonNullable<AdminQuickActionProps["accent"]>, string> = {
  primary: "bg-primary-soft text-primary",
  secondary: "bg-secondary-soft text-secondary-dark",
  tertiary: "bg-tertiary-soft text-tertiary",
  neutral: "bg-surface-subtle text-ink-muted border border-border-soft",
};

/**
 * Carte d'accès rapide du dashboard — indique clairement comment le futur
 * module fonctionnera (cahier § 30).
 */
export function AdminQuickAction({
  title,
  description,
  href,
  icon,
  accent = "neutral",
  className,
}: AdminQuickActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-start gap-3.5 rounded-2xl border border-border-soft bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md",
        className,
      )}
    >
      <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", accentClasses[accent])}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-ink">{title}</span>
        {description ? <span className="mt-0.5 block text-xs text-ink-muted">{description}</span> : null}
      </span>
      <ArrowRightIcon
        width={16}
        height={16}
        className="mt-2.5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-secondary"
      />
    </Link>
  );
}