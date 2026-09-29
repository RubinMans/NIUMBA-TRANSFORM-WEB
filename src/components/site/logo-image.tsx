import { cn } from "@/lib/utils";

type LogoImageProps = {
  src: string;
  alt: string;
  className?: string;
  /**
   * Taille de référence.
   * `"header"`  — zone du Header public (48×200 px mobile, 56×240 px desktop).
   * `"compact"` — zone réduite (sidebar admin, aperçus) : 32×96 px à 40×120 px.
   */
  size?: "header" | "compact";
};

/**
 * Zone d'affichage uniforme pour tout logo officiel.
 *
 * Règle (mission 02.9.2) :
 *  - zone de dimension contrôlée (largeur et hauteur fixes par variante)
 *  - object-fit: contain  (aucun crop, aucune déformation)
 *  - conservation des proportions
 *  - centrage horizontal + vertical
 *  - aucun étirement
 *
 * Le Header public reste la référence de dimensionnement : toute variante
 * `header` affiche exactement la même zone que le logo du Header.
 */
export function LogoImage({ src, alt, className, size = "header" }: LogoImageProps) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        size === "header" && "h-12 w-[200px] md:h-14 md:w-[240px]",
        size === "compact" && "h-8 w-[96px] md:h-9 md:w-[120px]",
        className,
      )}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain object-center"
        draggable={false}
      />
    </span>
  );
}