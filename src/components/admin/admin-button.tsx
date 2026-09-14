import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AdminButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

const variantClasses: Record<NonNullable<AdminButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-secondary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline: "border border-border-soft bg-surface text-ink hover:border-secondary hover:text-primary",
  ghost: "text-ink-muted hover:bg-surface-subtle hover:text-ink",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<NonNullable<AdminButtonProps["size"]>, string> = {
  sm: "h-9 px-4 gap-1.5 text-xs",
  md: "h-10 px-5 gap-2 text-sm",
};

/**
 * Bouton d'action du portail Admin (pills, cohérent avec le design système).
 * Rendu en lien (next/link) quand `href` est fourni.
 */
export function AdminButton({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: AdminButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const inner = (
    <>
      {icon && iconPosition === "left" ? <span className="shrink-0">{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={classes}>
      {inner}
    </button>
  );
}

type AdminIconButtonProps = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  tone?: "default" | "primary" | "secondary" | "danger";
};

const iconToneClasses: Record<NonNullable<AdminIconButtonProps["tone"]>, string> = {
  default: "border border-border-soft bg-surface text-ink-muted hover:bg-surface-subtle hover:text-ink",
  primary: "border border-border-soft bg-surface text-primary hover:bg-primary-soft",
  secondary: "border border-border-soft bg-surface text-secondary-dark hover:bg-secondary-soft",
  danger: "border border-border-soft bg-surface text-red-600 hover:bg-red-50",
};

/** Bouton icône circulaire (actions de tableau : voir, éditer, supprimer…). */
export function AdminIconButton({
  label,
  icon,
  href,
  onClick,
  className,
  tone = "default",
}: AdminIconButtonProps) {
  const classes = cn(
    "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
    iconToneClasses[tone],
    className,
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={classes}>
        {icon}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={classes}>
      {icon}
    </button>
  );
}