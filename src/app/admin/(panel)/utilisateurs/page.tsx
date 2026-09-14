import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { StatusBadge } from "@/components/admin/status-badge";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton, AdminIconButton } from "@/components/admin/admin-button";
import {
  AdminTable,
  AdminTableRow,
  AdminTableData,
  AdminTableTitle,
} from "@/components/admin/admin-table";
import { PlusIcon, UsersIcon, EditIcon, TrashIcon, ShieldIcon } from "@/components/admin/icons";
import { adminDemoCredentials, adminNavGroups } from "@/data/admin";
import { demoUsers, demoRoles } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Utilisateurs & rôles",
};

export default function AdminUtilisateursPage() {
  const moduleCount = adminNavGroups.reduce((total, group) => total + group.items.length, 0);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Utilisateurs & rôles"
        subtitle="Comptes, rôles et permissions du portail (cahier § 41). Authentification réelle à venir."
        demo
        actions={
          <AdminButton icon={<PlusIcon width={15} height={15} />}>Inviter un utilisateur</AdminButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminPanel bodyClassName="py-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Utilisateurs</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">{demoUsers.length}</p>
          <p className="text-xs text-ink-muted">Comptes de démonstration</p>
        </AdminPanel>
        <AdminPanel bodyClassName="py-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Rôles</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">{demoRoles.length}</p>
          <p className="text-xs text-ink-muted">Permissions granulaires à venir</p>
        </AdminPanel>
        <AdminPanel bodyClassName="py-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Modules couverts</p>
          <p className="mt-1 text-2xl font-extrabold text-ink">{moduleCount}</p>
          <p className="text-xs text-ink-muted">Depuis la navigation Admin</p>
        </AdminPanel>
      </div>

      <AdminPanel
        title="Comptes utilisateurs"
        description="Activation, désactivation et changement de mot de passe."
        footer={<DemoBadge>Utilisateurs fictifs — remplacés par les comptes réels</DemoBadge>}
      >
        <AdminTable columns={["Utilisateur", "Email", "Rôle", "Statut", "Actions"]}>
          {demoUsers.map((user) => (
            <AdminTableRow key={user.id}>
              <AdminTableData>
                <AdminTableTitle>{user.name}</AdminTableTitle>
              </AdminTableData>
              <AdminTableData>
                <span className="font-mono text-xs text-ink-muted">{user.email}</span>
              </AdminTableData>
              <AdminTableData>
                <span className="rounded-full bg-secondary-soft px-3 py-1 text-xs font-bold text-secondary-dark">
                  {user.role}
                </span>
              </AdminTableData>
              <AdminTableData>
                <StatusBadge status={user.status} tone={user.status === "Actif" ? "success" : "neutral"} pulse={user.status === "Actif"} />
              </AdminTableData>
              <AdminTableData align="right">
                <AdminIconButton label="Modifier" icon={<EditIcon width={14} height={14} />} tone="primary" />
                <AdminIconButton label="Supprimer" icon={<TrashIcon width={14} height={14} />} tone="danger" />
              </AdminTableData>
            </AdminTableRow>
          ))}
        </AdminTable>
      </AdminPanel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <AdminPanel title="Rôles & permissions" description="Modèles de rôles préparés pour le futur système.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {demoRoles.map((role) => (
                <div key={role.name} className="rounded-2xl border border-border-soft bg-surface-subtle/50 p-4">
<span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <ShieldIcon width={18} height={18} />
                </span>
                  <p className="mt-3 text-sm font-extrabold text-ink">{role.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{role.scope}</p>
                </div>
              ))}
            </div>
          </AdminPanel>

          <AdminPanel title="Permissions par module" description="Matrice d'accès envisagée (cahier § 41, § 46).">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    <th className="pb-2.5">Module</th>
                    <th className="pb-2.5 text-center">Super admin</th>
                    <th className="pb-2.5 text-center">Rédacteur</th>
                    <th className="pb-2.5 text-center">Commercial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft text-sm">
                  {[
                    ["Produits", "Oui", "Oui", "Non"],
                    ["Commandes", "Oui", "Non", "Oui"],
                    ["Actualités", "Oui", "Oui", "Non"],
                    ["Paramètres", "Oui", "Non", "Non"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <td className="py-3 font-bold text-ink">{row[0]}</td>
                      {row.slice(1).map((value, index) => (
                        <td key={index} className="py-3 text-center">
                          <span className={value === "Oui" ? "font-bold text-secondary-dark" : "text-ink-soft"}>
                            {value}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminPanel>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <AdminPanel title="Sécurité à venir" description="Éléments prévus par le cahier des charges (§ 46).">
            <ul className="flex flex-col gap-2.5 text-sm text-ink-muted">
              {[
                "Authentification sécurisée",
                "Mots de passe hashés",
                "Gestion sécurisée des sessions",
                "Contrôle des permissions",
                "Validation des données",
                "Protection contre les injections",
                "Protection CSRF",
                "Validation des uploads",
                "Journalisation des actions sensibles",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 rounded-xl bg-surface-subtle px-3.5 py-2.5">
                  <ShieldIcon width={15} height={15} className="shrink-0 text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </AdminPanel>

          <AdminPanel title="Compte de démonstration" description="Identifiants utilisables pour la prévisualisation.">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <UsersIcon />
              </span>
              <div className="text-sm">
                <p className="font-extrabold text-ink">Administrateur démo</p>
                <p className="mt-1 font-mono text-xs text-ink-muted">{adminDemoCredentials.email}</p>
                <p className="font-mono text-xs text-ink-muted">{adminDemoCredentials.password}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  Connexion simulée uniquement — la vraie gestion des utilisateurs arrive
                  avec la mission d&apos;authentification.
                </p>
              </div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}