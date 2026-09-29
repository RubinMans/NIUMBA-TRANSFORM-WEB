"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AdminPanel } from "@/components/admin/admin-panel";
import { UploadIcon, ImageIcon, CheckIcon, AlertIcon, TrashIcon } from "@/components/admin/icons";

export type MediaItem = {
  id: string;
  title: string;
  url: string;
  type: string;
  alt: string | null;
  createdAt: string;
};

type MediaLibraryProps = {
  initialMedia: MediaItem[];
};

/**
 * Médiathèque minimale (mission 02.9) : upload, aperçu et copie du chemin
 * public d'une image pour l'utiliser dans un produit. Pas de dossiers,
 * tags, recherche avancée ni gestion éditoriale (hors périmètre).
 */
export function MediaLibrary({ initialMedia }: MediaLibraryProps) {
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setMessage(null);
    setUploading(true);
    const added: MediaItem[] = [];
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", "medias");
        const response = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          setMessage({
            type: "error",
            text: typeof data.error === "string" ? data.error : `Échec de l'upload de ${file.name}.`,
          });
          continue;
        }
        added.push({
          id: `${Date.now()}-${file.name}`,
          title: file.name,
          url: String(data.url),
          type: "IMAGE",
          alt: null,
          createdAt: new Date().toISOString(),
        });
      }
      if (added.length > 0) {
        setMedia((current) => [...added, ...current]);
        setMessage({ type: "success", text: `${added.length} image(s) importée(s).` });
        router.refresh();
      }
    } catch {
      setMessage({ type: "error", text: "Erreur réseau pendant l'upload." });
    } finally {
      setUploading(false);
    }
  }

  async function copyPath(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Presse-papier indisponible : le chemin reste visible à l'écran.
    }
  }

  return (
    <AdminPanel
      title="Bibliothèque média"
      description="Images importées, utilisables dans les produits (copiez leur chemin public)."
      actions={
        <label className={cn("inline-flex", uploading && "pointer-events-none opacity-60")}>
          <span className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-all hover:bg-secondary-dark">
            <UploadIcon width={15} height={15} />
            {uploading ? "Import en cours…" : "Importer une image"}
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/x-icon,image/avif"
            className="hidden"
            multiple
            onChange={(event) => handleUpload(event.target.files)}
          />
        </label>
      }
      footer={`${media.length} fichier(s) · stockage local public/media/uploads/medias/`}
    >
      {message ? (
        <p
          role="alert"
          className={`mb-4 flex items-start gap-2 rounded-xl px-4 py-3 text-xs font-semibold ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
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

      {media.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-subtle text-ink-soft">
            <ImageIcon />
          </span>
          <p className="text-base font-bold text-ink">Aucune image importée</p>
          <p className="max-w-sm text-sm text-ink-muted">
            Importez vos images (logos, visuels produits) : elles seront disponibles pour le
            catalogue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-sm"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.alt ?? item.title} className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <p className="truncate text-xs font-bold text-ink" title={item.title}>
                  {item.title}
                </p>
                <button
                  type="button"
                  onClick={() => copyPath(item.url)}
                  className="inline-flex items-center gap-1 text-left text-[11px] font-semibold text-secondary hover:underline"
                >
                  {copied === item.url ? (
                    <>
                      <CheckIcon width={12} height={12} />
                      Chemin copié
                    </>
                  ) : (
                    "Copier le chemin"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface-subtle px-4 py-3 text-xs leading-relaxed text-ink-muted">
        <TrashIcon width={14} height={14} className="mt-0.5 shrink-0 text-secondary" />
        La suppression, la recherche et l&apos;organisation en dossiers viendront dans une mission
        ultérieure. Pour cette présentation, import et réutilisation suffisent.
      </p>
    </AdminPanel>
  );
}