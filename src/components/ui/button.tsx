import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  /** Rendu en lien interne (Next Link) quand présent. */
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "accent" | "outline" | "whatsapp" | "ghost";
  size?: "md" | "lg";
  withArrow?: boolean;
  ariaLabel?: string;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-secondary-dark",
  accent: "bg-secondary text-white hover:bg-secondary-dark",
  outline:
    "border-2 border-secondary text-primary hover:bg-primary-soft",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  ghost: "text-primary hover:bg-primary-soft",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-5 py-2.5 gap-2 text-sm",
  lg: "px-7 py-3.5 gap-2.5 text-base",
};

/**
 * Bouton "pill" du design system Stitch (rounded-full).
 * Comporte l'icône flèche ✓ dans un disque circulaire (variants primaires).
 */
export function Button({
  children,
  className,
  href,
  target,
  rel,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  withArrow = false,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
    variantClasses[variant],
    sizeClasses[size],
    withArrow && "pl-6 pr-1.5",
    className,
  );

  const arrow = withArrow ? (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform">
      <ArrowRightIcon width={18} height={18} />
    </span>
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
      {arrow}
    </button>
  );
}