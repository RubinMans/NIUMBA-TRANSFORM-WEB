import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminButton } from "@/components/admin/admin-button";
import { BuildingIcon, CheckIcon, InfoIcon } from "@/components/admin/icons";
import { siteConfig } from "@/lib/site";
import { adminInputClass } from "@/components/admin/admin-form";

export const metadata: Metadata = {
  title: "Informations entreprise",
};

export default function AdminEntreprisePage() {
  const legal = [
    { label: "Nom officiel enregistré", value: siteConfig.legalName },
    { label: "Nom utilisé dans la communication", value: siteConfig.companyName },
    { label: "RCCM", value: siteConfig.rccm },
    { label: "ID Nat", value: siteConfig.idNat },
    { label: "NIF", value: siteConfig.nif },
    { label: "Date de création", value: siteConfig.foundedAt },
    { label: "Adresse actuelle", value: siteConfig.address },
    { label: "Implantation industrielle", value: siteConfig.industrialSite },
  ];

  const contact = [
    { label: "Téléphone", value: siteConfig.phone },
    { label: "WhatsApp", value: siteConfig.whatsapp },
    { label: "Email", value: siteConfig.email },
    { label: "Facebook", value: siteConfig.social.facebook },
    { label: "Instagram", value: siteConfig.social.instagram },
    { label: "TikTok", value: siteConfig.social.tiktok },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Informations de l'entreprise"
        subtitle="Nom, contact, adresses, horaires, réseaux sociaux et données légales (cahier § 28, § 40)."
        demo
        actions={
          <AdminButton size="md" icon={<CheckIcon width={15} height={15} />}>
            Enregistrer
          </AdminButton>
        }
      />

      <div className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary-soft/50 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <InfoIcon />
        </span>
        <p className="text-sm leading-relaxed text-ink">
          Les valeurs ci-dessous proviennent des sources officielles (cahier des charges et
          configuration du site). Les coordonnées non confirmées restent affichées
          <span className="font-bold"> [À CONFIRMER]</span> — aucune donnée n&apos;est inventée.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminPanel
          title="Coordonnées & contact"
          description="Réutilisées automatiquement dans le header, footer, contact et formulaire de commande."
        >
          <div className="flex flex-col gap-4">
            {contact.map((field) => (
              <div key={field.label}>
                <label htmlFor={`contact-${field.label}`} className="mb-1.5 block text-sm font-bold text-ink">
                  {field.label}
                </label>
                <input
                  id={`contact-${field.label}`}
                  className={adminInputClass}
                  defaultValue={field.value}
                  readOnly={field.value === "[À CONFIRMER]"}
                  aria-readonly={field.value === "[À CONFIRMER]"}
                />
              </div>
            ))}
            <div>
              <label htmlFor="contact-horaires" className="mb-1.5 block text-sm font-bold text-ink">
                Horaires
              </label>
              <input id="contact-horaires" className={adminInputClass} defaultValue="[À CONFIRMER]" readOnly />
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-tertiary-soft/60 px-4 py-3 text-xs leading-relaxed text-ink">
            Les champs <span className="font-bold">[À CONFIRMER]</span> seront renseignés par
            l&apos;équipe NIUMBA TRANSFORM puis saisis ici.
          </p>
        </AdminPanel>

        <div className="flex flex-col gap-6">
          <AdminPanel
            title="Données légales"
            description="Informations officielles (cahier § 1) — déjà exploitées sur le site."
          >
            <dl className="flex flex-col gap-3">
              {legal.map((field) => (
                <div key={field.label} className="flex items-start justify-between gap-4 border-b border-border-soft pb-2.5">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">{field.label}</dt>
                  <dd className="text-right text-sm font-bold text-ink">{field.value}</dd>
                </div>
              ))}
            </dl>
          </AdminPanel>

          <AdminPanel
            title="Adresses"
            description="Adresse actuelle et site industriel envisagé."
          >
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink">
              <div className="rounded-xl bg-surface-subtle p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Adresse (bureau)</p>
                <p className="mt-1 font-semibold">{siteConfig.address}</p>
              </div>
              <div className="rounded-xl bg-surface-subtle p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Site industriel</p>
                <p className="mt-1 font-semibold">{siteConfig.industrialSite}</p>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border border-dashed border-border-soft px-4 py-3 text-xs text-ink-muted">
                <BuildingIcon width={15} height={15} className="mt-0.5 shrink-0 text-secondary" />
                Les coordonnées de l&apos;usine et les horaires seront confirmés dès la mise en
                service officielle du site de Kimwenza.
              </div>
            </div>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}