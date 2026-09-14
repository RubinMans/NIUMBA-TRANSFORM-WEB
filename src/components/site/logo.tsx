import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Variante pour fond sombre (footer). */
  onDark?: boolean;
  /** Chemin de l'asset officiel (ex. /media/logo-niumba-transform.svg). */
  logoSrc?: string | null;
  className?: string;
  href?: string;
};

/**
 * Logo NIUMBA TRANSFORM.
 * Le LOGO OFFICIEL est affiché dès que son asset est disponible dans
 * `public/media/` (ou renseigné dans l'Admin → Identité visuelle).
 * À défaut, le monogramme provisoire "NT" (design système Stitch) est utilisé.
 */
export function Logo({ onDark = false, logoSrc, className, href = "/" }: LogoProps) {
  if (logoSrc) {
    return (
      <Link
        href={href}
        aria-label="NIUMBA TRANSFORM — Accueil"
        className={cn("group inline-flex items-center", className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="NIUMBA TRANSFORM"
          className={cn(
            "h-10 w-auto max-w-[220px] object-contain",
            onDark && "brightness-0 invert",
          )}
        />
      </Link>
    );
  }

  const mono = onDark ? "bg-white text-primary" : "bg-primary text-white";

  return (
    <Link
      href={href}
      aria-label="NIUMBA TRANSFORM — Accueil"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold tracking-tight",
          mono,
        )}
        aria-hidden
      >
        NT
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-extrabold tracking-tight",
            onDark ? "text-white" : "text-ink",
          )}
        >
          NIUMBA TRANSFORM
        </span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
          Bukhete
        </span>
      </span>
    </Link>
  );
}