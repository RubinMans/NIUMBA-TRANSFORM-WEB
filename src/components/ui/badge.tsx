import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "accent" | "tertiary" | "neutral" | "whatsapp";
};

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-primary text-white",
  accent: "bg-secondary text-white",
  tertiary: "bg-tertiary text-primary-dark",
  neutral: "bg-surface-subtle text-ink-muted border border-border-soft",
  whatsapp: "bg-whatsapp text-white",
};

/** Pastille pill du design system Stitch. */
export function Badge({ children, className, variant = "primary" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}