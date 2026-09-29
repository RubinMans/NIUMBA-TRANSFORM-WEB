"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AdminButton } from "@/components/admin/admin-button";
import { LogoImage } from "@/components/site/logo-image";
import { ImageIcon, UploadIcon, CheckIcon, AlertIcon, XIcon } from "@/components/admin/icons";

type MediaUploaderProps = {
  /** Chemin public actuel (ex. /media/uploads/produits/xxx.jpg). */
  value: string;
  /** Appelé avec le chemin public après upload. */
  onChange: (url: string) => void;
  /** Dossier de destination : logos | produits | medias. */
  folder?: "logos" | "produits" | "medias";
  label?: string;
  hint?: string;
  /** Aperçu dans un gabarit de logo uniforme (mission 02.9.2). */
  logoVariant?: boolean;
  /** Autorise la suppression de l'image courante. */
  removable?: boolean;
  className?: string;
};

/**
 * Téléversement d'image (mission 02.9).
 * Uploade un fichier image via /api/admin/upload puis transmet le chemin
 * public. Affiche un aperçu, l'état de chargement et les erreurs.
 */
export function MediaUploader({
  value,
  onChange,
  folder = "medias",
  label = "Image",
  hint,
  logoVariant = false,
  removable = true,
  className,
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justUploaded, setJustUploaded] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setJustUploaded(false);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Upload impossible.");
        return;
      }
      onChange(typeof data.url === "string" ? data.url : "");
      setJustUploaded(true);
    } catch {
      setError("Erreur réseau pendant l'upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex gap-3">
        {/* Aperçu */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border-soft bg-surface-subtle text-ink-soft transition-colors hover:border-secondary hover:text-primary",
            logoVariant ? "h-24 w-full max-w-[240px]" : "aspect-square h-24",
          )}
          aria-label={`Choisir l'image — ${label}`}
        >
          {value ? (
            logoVariant ? (
              <LogoImage src={value} alt={label} size="compact" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt={label} className="h-full w-full object-contain" />
            )
          ) : (
            <ImageIcon width={22} height={22} />
          )}
          {uploading ? (
            <span className="absolute inset-0 flex items-center justify-center bg-surface/80 text-xs font-bold text-primary">
              Envoi…
            </span>
          ) : null}
        </button>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
          <div>
            <p className="text-sm font-bold text-ink">{label}</p>
            {hint ? <p className="mt-0.5 text-xs text-ink-muted">{hint}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <AdminButton
              type="button"
              size="sm"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              icon={<UploadIcon width={14} height={14} />}
              className={cn(value && "border-secondary text-primary hover:bg-primary-soft")}
            >
              {value ? "Remplacer" : "Choisir un fichier"}
            </AdminButton>
            {removable && value ? (
              <AdminButton
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  onChange("");
                  setJustUploaded(false);
                }}
                disabled={uploading}
                icon={<XIcon width={14} height={14} />}
              >
                Retirer
              </AdminButton>
            ) : null}
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/x-icon,image/avif"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </div>
        </div>
      </div>

      {justUploaded && !error ? (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-secondary-dark">
          <CheckIcon width={14} height={14} />
          Image enregistrée. N&apos;oubliez pas de sauvegarder le formulaire.
        </p>
      ) : null}

      {error ? (
        <p role="alert" className="flex items-start gap-1.5 text-xs font-semibold text-red-600">
          <AlertIcon width={14} height={14} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}