"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminIconButton } from "@/components/admin/admin-button";
import {
  EditIcon,
  TrashIcon,
  EyeOffIcon,
  EyeIcon,
  AlertIcon,
} from "@/components/admin/icons";

type ProductRowActionsProps = {
  product: { id: string; active: boolean };
};

/** Actions d'une ligne produit : activer/désactiver, modifier, supprimer. */
export function ProductRowActions({ product }: ProductRowActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleActive() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !product.active }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(typeof data.error === "string" ? data.error : "Mise à jour impossible.");
      } else {
        router.refresh();
      }
    } catch {
      setError("Erreur réseau pendant la mise à jour.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Supprimer définitivement ce produit ? Cette action est irréversible.")) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(typeof data.error === "string" ? data.error : "Suppression impossible.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Erreur réseau pendant la suppression.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <span className="inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleActive}
          disabled={busy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-soft bg-surface text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink disabled:opacity-50"
          aria-label={product.active ? "Désactiver le produit" : "Activer le produit"}
          title={product.active ? "Désactiver" : "Activer"}
        >
          {product.active ? <EyeOffIcon width={14} height={14} /> : <EyeIcon width={14} height={14} />}
        </button>
        <AdminIconButton
          label="Modifier le produit"
          icon={<EditIcon width={14} height={14} />}
          href={`/admin/produits/${product.id}/modifier`}
          tone="primary"
        />
        <AdminIconButton
          label="Supprimer le produit"
          icon={<TrashIcon width={14} height={14} />}
          onClick={remove}
          tone="danger"
        />
      </span>
      {error ? (
        <span className="inline-flex max-w-[220px] items-start gap-1 text-[11px] font-semibold text-red-600">
          <AlertIcon width={12} height={12} className="mt-0.5 shrink-0" />
          {error}
        </span>
      ) : null}
    </div>
  );
}