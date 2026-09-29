"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BrandAssets } from "@/lib/site-types";
import { AdminPanel } from "@/components/admin/admin-panel";
import { AdminButton } from "@/components/admin/admin-button";
import { MediaUploader } from "@/components/admin/media-uploader";
import { CheckIcon, AlertIcon } from "@/components/admin/icons";
import { adminInputClass } from "@/components/admin/admin-form";

type IdentiteFormProps = {
  initialIdentity: BrandAssets;
  initialSettings: { companyName: string; brandName: string; tagline: string };
};

/**
 * Formulaire d'identité visuelle (mission 02.9).
 * Téléversement des logos officiels (couleur / blanc / noir / favicon)
 * puis enregistrement en base — propagation immédiate sur le site public.
 */
export function IdentiteForm({ initialIdentity, initialSettings }: IdentiteFormProps) {
  const router = useRouter();
  const [identity, setIdentity] = useState<BrandAssets>(initialIdentity);
  const [companyName, setCompanyName] = useState(initialSettings.companyName);
  const [brandName, setBrandName] = useState(initialSettings.brandName);
  const [tagline, setTagline] = useState(initialSettings.tagline);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const identityResponse = await fetch("/api/admin/visual-identity", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logoPath: identity.logoPath,
          logoDarkPath: identity.logoDarkPath,
          logoBlackPath: identity.logoBlackPath,
          logoSquarePath: identity.logoSquarePath,
          faviconPath: identity.faviconPath,
        }),
      });
      const identityData = await identityResponse.json().catch(() => ({}));
      if (!identityResponse.ok) {
        setMessage({
          type: "error",
          text: typeof identityData.error === "string" ? identityData.error : "Enregistrement impossible.",
        });
        setSaving(false);
        return;
      }

      const settingsResponse = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, brandName, tagline }),
      });
      if (!settingsResponse.ok) {
        setMessage({
          type: "error",
          text: "Logos enregistrés mais les textes d'identité n'ont pas pu être mis à jour.",
        });
        setSaving(false);
        return;
      }

      setMessage({ type: "success", text: "Identité enregistrée. Le site public est à jour." });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Erreur réseau pendant l'enregistrement." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <AdminPanel
            title="Logos officiels"
            description="Téléversez l'identité officielle NIUMBA TRANSFORM (logo couleur, blanc, noir, favicon)."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MediaUploader
                value={identity.logoPath ?? ""}
                onChange={(url) => setIdentity((i) => ({ ...i, logoPath: url }))}
                folder="logos"
                label="Logo couleur"
                hint="Utilisé en tête de site (fond clair)."
                logoVariant
              />
              <MediaUploader
                value={identity.logoBlackPath ?? ""}
                onChange={(url) => setIdentity((i) => ({ ...i, logoBlackPath: url }))}
                folder="logos"
                label="Logo noir"
                hint="Variante pour fond très clair (si nécessaire)."
                logoVariant
              />
              <MediaUploader
                value={identity.logoDarkPath ?? ""}
                onChange={(url) => setIdentity((i) => ({ ...i, logoDarkPath: url }))}
                folder="logos"
                label="Logo blanc"
                hint="Utilisé en pied de page (fond sombre)."
                logoVariant
              />
              <MediaUploader
                value={identity.logoSquarePath ?? ""}
                onChange={(url) => setIdentity((i) => ({ ...i, logoSquarePath: url }))}
                folder="logos"
                label="Logo carré"
                hint="Variante compacte (administration, cartes)."
                logoVariant
              />
            </div>
            <div className="mt-5 border-t border-border-soft pt-4">
              <MediaUploader
                value={identity.faviconPath ?? ""}
                onChange={(url) => setIdentity((i) => ({ ...i, faviconPath: url }))}
                folder="logos"
                label="Favicon"
                hint="Icône d'onglet du navigateur."
                logoVariant
              />
            </div>
          </AdminPanel>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <AdminPanel
            title="Informations d'identité"
            description="Textes affichés dans l'en-tête et le pied de page."
          >
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="companyName" className="mb-1.5 block text-sm font-bold text-ink">
                  Nom de l&apos;entreprise
                </label>
                <input
                  id="companyName"
                  className={adminInputClass}
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="brandName" className="mb-1.5 block text-sm font-bold text-ink">
                  Nom commercial (marque)
                </label>
                <input
                  id="brandName"
                  className={adminInputClass}
                  value={brandName}
                  onChange={(event) => setBrandName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tagline" className="mb-1.5 block text-sm font-bold text-ink">
                  Slogan
                </label>
                <input
                  id="tagline"
                  className={adminInputClass}
                  value={tagline}
                  onChange={(event) => setTagline(event.target.value)}
                />
              </div>
            </div>
          </AdminPanel>

          {message ? (
            <p
              role="alert"
              className={`flex items-start gap-2 rounded-xl px-4 py-3 text-xs font-semibold ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckIcon width={15} height={15} className="mt-0.5 shrink-0" />
              ) : (
                <AlertIcon width={15} height={15} className="mt-0.5 shrink-0" />
              )}
              {message.text}
            </p>
          ) : null}

          <AdminButton type="submit" disabled={saving} icon={saving ? undefined : <CheckIcon width={15} height={15} />}>
            {saving ? "Enregistrement…" : "Enregistrer l’identité"}
          </AdminButton>
        </div>
      </div>
    </form>
  );
}