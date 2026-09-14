"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCurrentAdminLabel } from "@/components/admin/admin-sidebar";
import { MenuIcon, SearchIcon, BellIcon, ExternalLinkIcon, ChevronDownIcon } from "@/components/admin/icons";
import { siteConfig } from "@/lib/site";
import type { AdminPanelUser } from "@/lib/auth";

type AdminHeaderProps = {
  user: AdminPanelUser;
  onOpenSidebar: () => void;
};

/**
 * Barre d'en-tête sticky du portail Admin.
 * Menu mobile, navigation courante, recherche visuelle, profil connecté.
 */
export function AdminHeader({ user, onOpenSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const label = getCurrentAdminLabel(pathname);
  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border-soft bg-surface/95 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft text-ink lg:hidden"
        aria-label="Ouvrir le menu"
      >
        <MenuIcon />
      </button>

      <div className="ml-2 flex flex-col justify-center leading-none lg:ml-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">Administration</p>
        <span className="mt-0.5 text-sm font-extrabold tracking-tight text-ink">{label}</span>
      </div>

      <div className="ml-auto flex items-center gap-2.5 sm:ml-8 sm:flex-1 sm:max-w-md">
        <label className="relative hidden sm:block sm:flex-1">
          <span className="sr-only">Rechercher</span>
          <SearchIcon width={15} height={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            placeholder="Rechercher dans le portail…"
            className="h-10 w-full rounded-full border border-border-soft bg-surface-subtle pl-9 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          />
        </label>
      </div>

      <div className="ml-3 flex items-center gap-1.5">
        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
      </div>

      <div className="ml-1.5 hidden sm:block sm:h-6 sm:w-px sm:bg-border-soft" />

      <div className="ml-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold text-white">
          {initials || "AD"}
        </div>
        <div className="hidden flex-col leading-none md:flex">
          <span className="text-xs font-bold text-ink">{user.name}</span>
          <span className="mt-0.5 text-[11px] text-ink-muted">{user.roleLabel}</span>
        </div>
        <ChevronDownIcon width={14} height={14} className="text-ink-muted" />
      </div>

      <div className="ml-3 hidden sm:block sm:h-6 sm:w-px sm:bg-border-soft" />
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 hidden items-center gap-1.5 rounded-full border border-border-soft bg-surface px-3 py-1.5 text-xs font-bold text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink sm:inline-flex"
      >
        <ExternalLinkIcon width={14} height={14} />
        {siteConfig.companyName}
      </Link>
    </header>
  );
}