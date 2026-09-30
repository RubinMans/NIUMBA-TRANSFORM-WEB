"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminIconButton } from "@/components/admin/admin-button";
import { EditIcon, TrashIcon, AlertIcon } from "@/components/admin/icons";

type CategoryRowActionsProps = {
  category: { id: string; label: string; productCount: number };
};

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function remove() {
    if (
      !window.confirm(
        `Supprimer définitivement la catégorie « ${category.label} » ? Cette action est irréversible.`,
      )
    ) {
      return;
    }
    setError(null);
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Suppression impossible.");
        return;
      }
      router.refresh();
    } catch {
      setError("Erreur réseau pendant la suppression.");
    }
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <span className="inline-flex items-center gap-1.5">
        <AdminIconButton
          label="Modifier la catégorie"
          icon={<EditIcon width={14} height={14} />}
          href={`/admin/categories/${category.id}/modifier`}
          tone="primary"
        />
        <AdminIconButton
          label="Supprimer la catégorie"
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
