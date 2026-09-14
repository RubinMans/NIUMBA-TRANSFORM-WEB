import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/** Conteneur central : largeur max 1280px (max-w-7xl), marges responsive. */
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)} {...props}>
      {children}
    </div>
  );
}