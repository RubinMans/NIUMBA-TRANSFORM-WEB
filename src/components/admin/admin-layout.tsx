"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import type { AdminPanelUser } from "@/lib/auth";

/**
 * Structure commune du portail Admin (distincte du layout public) :
 * sidebar + header sticky + zone de contenu.
 * Mission 02 : connecté à l'authentification et aux données réelles.
 */
export function AdminLayout({ user, children }: { user: AdminPanelUser; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-surface-subtle lg:pl-[264px]">
      <AdminSidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-dvh flex-col">
        <AdminHeader user={user} onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">{children}</div>
        </main>
        <footer className="border-t border-border-soft px-6 py-4">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
            <span>
              {siteConfig.companyName} — Portail d’administration ({siteConfig.buildVersion})
            </span>
            <span>Données enregistrées en base (SQLite / développement)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}