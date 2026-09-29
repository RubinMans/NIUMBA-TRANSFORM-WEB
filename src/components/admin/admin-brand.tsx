import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { LogoImage } from "@/components/site/logo-image";

type AdminBrandProps = {
  /** Fond sombre (sidebar). */
  dark?: boolean;
  className?: string;
  href?: string;
  /** Chemin du logo officiel (optionnel). */
  logoSrc?: string | null;
};

/**
 * Bloc de marque du portail Admin.
 * Affiche le logo officiel si disponible, sinon le monogramme "NT" provisoire.
 * La zone du logo utilise le même gabarit d'affichage que le Header
 * (variante compacte pour la sidebar) — mission 02.9.2.
 */
export function AdminBrand({ dark = true, className, href = "/admin", logoSrc }: AdminBrandProps) {
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
      {logoSrc ? (
        <LogoImage
          src={logoSrc}
          alt="NIUMBA TRANSFORM"
          size="compact"
          className={cn(dark ? "brightness-0 invert" : "")}
        />
      ) : (
        <span
          className={cn(
            "flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full text-sm font-extrabold tracking-tight",
            dark ? "bg-white/10 ring-1 ring-white/15" : "bg-primary text-white",
          )}
          aria-hidden
        >
          NT
        </span>
      )}
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-[16px] md:text-[17px] font-extrabold tracking-tight">
          NIUMBA TRANSFORM
        </span>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.28em] text-secondary">
          {siteConfig.brandName}
        </span>
      </span>
    </Link>
  );
}