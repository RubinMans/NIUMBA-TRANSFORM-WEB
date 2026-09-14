"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavGroups, findAdminNavItem } from "@/data/admin";
import { AdminBrand } from "@/components/admin/admin-brand";
import { LogoutIcon, adminIconMap, XIcon, CheckIcon } from "@/components/admin/icons";
import { logoutAction } from "@/app/admin/actions";
import type { AdminPanelUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  user: AdminPanelUser;
  open: boolean;
  onClose: () => void;
};

/**
 * Navigation latérale du portail Admin.
 * Desktop : fixe à gauche. Mobile : tiroir (drawer) avec voile de fond.
 */
export function AdminSidebar({ user, open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  const content = (
    <div className="flex h-full flex-col overflow-y-auto bg-primary-deep text-white">
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <AdminBrand href="/admin" />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white lg:hidden"
          aria-label="Fermer le menu"
        >
          <XIcon width={18} height={18} />
        </button>
      </div>

      <div className="mt-4 px-5">
        <div className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-secondary-soft" />
          <p className="text-xs leading-relaxed text-white/70">
            Session <span className="font-bold text-white">authentifiée</span> — données
            enregistrées en base de données.
          </p>
        </div>
      </div>

      <nav className="mt-5 flex-1 px-3 pb-6" aria-label="Navigation Administrateur">
        {adminNavGroups.map((group) => (
          <div key={group.label ?? "overview"} className="mb-6">
            {group.label ? (
              <p className="mb-1.5 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40">
                {group.label}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = adminIconMap[item.icon];
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      title={item.description}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        active
                          ? "bg-secondary text-white shadow-sm"
                          : "text-white/75 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <Icon width={18} height={18} className={cn(active ? "text-white" : "text-white/50 group-hover:text-tertiary")} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-xl px-3 py-2">
          <p className="mb-1 text-[11px] font-bold text-white/50">
            Connecté : {user.name}
          </p>
          <p className="mb-1 truncate text-[11px] text-white/40">{user.email}</p>
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-soft">
            {user.roleLabel}
          </p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-red-500/10 hover:text-red-300"
            >
              <LogoutIcon width={18} height={18} />
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop : barre latérale fixe */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">{content}</aside>

      {/* Mobile : tiroir */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-primary-deep/60 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={onClose}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[280px] max-w-[85vw] shadow-xl transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {content}
        </div>
      </div>
    </>
  );
}

/** Libellé du module actif (breadcrumb de l'en-tête). */
export function getCurrentAdminLabel(pathname: string): string {
  const navItem = findAdminNavItem(pathname);
  return navItem ? navItem.label : "Tableau de bord";
}