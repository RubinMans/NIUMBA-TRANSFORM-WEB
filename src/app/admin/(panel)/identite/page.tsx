import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminPanel } from "@/components/admin/admin-panel";
import { DemoBadge } from "@/components/admin/demo-badge";
import { AdminButton } from "@/components/admin/admin-button";
import { MediaPreview } from "@/components/admin/media-preview";
import { PaletteIcon, UploadIcon } from "@/components/admin/icons";
import { demoLogoVariants } from "@/data/admin-demo";
import { siteConfig } from "@/lib/site";
import { adminInputClass } from "@/components/admin/admin-form";

export const metadata: Metadata = {
  title: "Identité visuelle",
};

const brandColors = [
  { name: "Vert forêt", hex: "#0E4B2A" },
  { name: "Vert émeraude", hex: "#008751" },
  { name: "Accent citron", hex: "#F59E0B" },
  { name: "Le texte", hex: "#0F172A" },
];

export default function AdminIdentitePage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Identité visuelle"
        subtitle="Logos, variantes, couleurs et éléments d'identité de la marque (cahier § 27, § 39)."
        demo
        actions={
          <AdminButton variant="outline" size="md" icon={<UploadIcon width={15} height={15} />}>
            Intégrer le logo officiel
          </AdminButton>
        }
      />

      {/* Avertissement logo officiel */}
      <div className="flex items-start gap-3 rounded-2xl border border-tertiary/50 bg-tertiary-soft/50 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tertiary-soft text-tertiary">
          <PaletteIcon />
        </span>
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-extrabold">Logo officiel à intégrer</p>
          <p className="mt-0.5 text-ink-muted">
            Aucun ASSET OFFICIEL n&apos;est encore disponible localement. L&apos;allège « NT » utilisée
            sur le portail est un placeholder provisoire — elle sera remplacée par le logo
            officiel dès sa fourniture, sans déformation (SVG transparent prioritaire).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <AdminPanel title="Variantes du logo" description="Emplacements préparés pour les fichiers officiels.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {demoLogoVariants.map((variant) => (
                <MediaPreview
                  key={variant.id}
                  label={variant.label}
                  meta={variant.status}
                  pending
                />
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-surface-subtle px-4 py-3 text-xs leading-relaxed text-ink-muted">
              Gestion prévue : logo principal, logo pour fond clair, logo pour fond sombre,
              favicon et variantes nécessaires — avec respect des proportions et de
              l&apos;espace de sécurité (cahier § 27).
            </p>
          </AdminPanel>

          <AdminPanel title="Couleurs principales" description="Tokens du design système Stitch, déjà implémentés dans le projet.">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {brandColors.map((color) => (
                <div key={color.hex} className="flex flex-col gap-2">
                  <div
                    className="h-16 rounded-2xl border border-border-soft"
                    style={{ backgroundColor: color.hex }}
                    role="img"
                    aria-label={`Couleur ${color.name}, ${color.hex}`}
                  />
                  <div className="text-center">
                    <p className="text-xs font-bold text-ink">{color.name}</p>
                    <p className="font-mono text-[11px] text-ink-muted">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </AdminPanel>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <AdminPanel title="Informations d'identité" description="Champs administrables (cahier § 39).">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="brandName" className="mb-1.5 block text-sm font-bold text-ink">
                  Nom de l&apos;entreprise
                </label>
                <input id="brandName" className={adminInputClass} defaultValue={siteConfig.companyName} />
              </div>
              <div>
                <label htmlFor="brandCommercial" className="mb-1.5 block text-sm font-bold text-ink">
                  Nom commercial (marque)
                </label>
                <input id="brandCommercial" className={adminInputClass} defaultValue={siteConfig.brandName} />
              </div>
              <div>
                <label htmlFor="brandSlogan" className="mb-1.5 block text-sm font-bold text-ink">
                  Slogan
                </label>
                <input id="brandSlogan" className={adminInputClass} defaultValue={siteConfig.tagline} />
              </div>
              <div>
                <label htmlFor="brandFavicon" className="mb-1.5 block text-sm font-bold text-ink">
                  Favicon
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border-soft bg-surface-subtle px-3.5 py-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white" aria-hidden>
                    NT
                  </span>
                  <span className="text-xs text-ink-muted">favicon.ico — à remplacer par le logo officiel</span>
                </div>
              </div>
            </div>
            <div className="mt-5 border-t border-border-soft pt-4">
              <AdminButton size="sm" className="w-full">
                Enregistrer l&apos;identité
              </AdminButton>
            </div>
          </AdminPanel>

          <DemoBadge className="self-start">
            Toutes les valeurs proviennent des sources (cahier / site.ts) — aucune invention
          </DemoBadge>
        </div>
      </div>
    </div>
  );
}