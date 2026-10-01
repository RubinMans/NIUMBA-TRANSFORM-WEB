"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { headerCta, mainNavigation } from "@/data/navigation";
import type { SiteSettingsView } from "@/lib/site-types";
import { fallbackSiteSettings } from "@/lib/site-fallback";
import { CloseIcon, MenuIcon, MapPinIcon, WhatsAppIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type HeaderProps = {
  /** Paramètres du site chargés depuis la base (optionnel — repli siteConfig). */
  settings?: SiteSettingsView;
  /** Chemin du logo officiel (fourni par getBrandAssets). */
  logoSrc?: string | null;
};

export function Header({ settings, logoSrc }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const cfg = settings ?? fallbackSiteSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-white/92 backdrop-blur-md">
      {/* Bandeau supérieur : origine + contact rapide */}
      <div className="hidden border-b border-border-soft bg-surface-subtle md:block">
        <Container className="flex h-9 items-center justify-between text-[13px] font-medium text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <MapPinIcon width={14} height={14} className="text-secondary" />
            Kinshasa, République Démocratique du Congo
          </span>
          <span className="inline-flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Made in RDC
            </span>
            <a
              href={cfg.whatsappLink}
              className="inline-flex items-center gap-1.5 text-secondary hover:text-secondary-dark"
            >
              <WhatsAppIcon width={14} height={14} />
              WhatsApp — {cfg.whatsapp}
            </a>
          </span>
        </Container>
      </div>

      {/* Barre principale de navigation */}
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo logoSrc={logoSrc} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {mainNavigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-ink-muted hover:bg-primary-soft hover:text-primary",
                  "after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:rounded-full",
                  isActive ? "after:bg-secondary" : "after:bg-transparent",
                )}
              >
                {item.shortLabel ?? item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={headerCta.href} variant="primary" size="md" withArrow className="hidden sm:inline-flex">
            {headerCta.label}
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft text-ink lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="border-t border-border-soft bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-ink-muted hover:bg-surface-subtle",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href={headerCta.href} variant="primary" withArrow className="mt-2" onClick={() => setMenuOpen(false)}>
              {headerCta.label}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}