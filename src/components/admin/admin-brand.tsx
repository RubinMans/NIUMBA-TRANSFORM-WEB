import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type AdminBrandProps = {
  /** Fond sombre (sidebar). */
  dark?: boolean;
  className?: string;
  href?: string;
};

/**
 * Bloc de marque du portail Admin — monogramme "NT" provisoire.
 * En l'attente des ASSETS_OFFICIELS (cahier § 27), l'identité reste
 * un placeholder clairement identifiable, cohérente avec le design système.
 */
export function AdminBrand({ dark = true, className, href = "/admin" }: AdminBrandProps) {
  return (
    <Link
      href={href}
      aria-label="NIUMBA TRANSFORM — Tableau de bord"
      className={cn(
        "group inline-flex items-center gap-3 rounded-2xl",
        dark ? "text-white" : "text-ink",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold tracking-tight",
          dark ? "bg-white/10 ring-1 ring-white/15" : "bg-primary text-white",
        )}
        aria-hidden
      >
        NT
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-[15px] font-extrabold tracking-tight">
          NIUMBA TRANSFORM
        </span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
          {siteConfig.brandName}
        </span>
      </span>
    </Link>
  );
}