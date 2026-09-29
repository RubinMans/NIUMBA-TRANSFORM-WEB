"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminCategoryDetail } from "@/services/admin-categories";
import { slugify } from "@/data/catalogue";
import { AdminButton } from "@/components/admin/admin-button";
import { AlertIcon, CheckIcon } from "@/components/admin/icons";

type CategoryFormProps = {
  category?: AdminCategoryDetail;
};

const inputClass =
  "h-12 w-full rounded-2xl border border-border-soft bg-surface-subtle px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:bg-surface focus:ring-2 focus:ring-secondary/20";
const textareaClass =
  "w-full rounded-2xl border border-border-soft bg-surface-subtle px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:bg-surface focus:ring-2 focus:ring-secondary/20";

function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-bold text-ink">
        {children}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = !!category;

  const [label, setLabel] = useState(category?.label ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(category?.description ?? "");
  const [sortOrder, setSortOrder] = useState(category?.sortOrder ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleLabelChange(value: string) {
    setLabel(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    setError(null);

    const finalSlug = slug.trim() || slugify(label);
    if (!finalSlug) {
      setError("Le nom ou le slug de la catégorie est requis.");
      return;
    }

    const payload = {
      label,
      slug: finalSlug,
      description,
      sortOrder,
    };

    setSaving(true);
    try {
      const response = await fetch(
        isEdit ? `/api/admin/categories/${category.id}` : "/api/admin/categories",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Enregistrement impossible.");
        setSaving(false);
        return;
      }

      router.push("/admin/categories");
      router.refresh();
    } catch {
      setError("Erreur réseau pendant l'enregistrement.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="grid grid-cols-1 gap-5 rounded-2xl border border-border-soft bg-surface p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="text-base font-extrabold tracking-tight text-ink">Informations de la catégorie</p>
          <p className="text-sm text-ink-muted">Nom, slug et description visibles sur le site public.</p>
        </div>

        <div>
          <FieldLabel htmlFor="categoryLabel">Nom de la catégorie *</FieldLabel>
          <input
            id="categoryLabel"
            value={label}
            onChange={(event) => handleLabelChange(event.target.value)}
            required
            className={inputClass}
            placeholder="Ex. Nettoyage"
          />
        </div>

        <div>
          <FieldLabel htmlFor="categorySlug" hint="Sera utilisé dans l'URL publique (/categorie/…).">
            Slug
          </FieldLabel>
          <input
            id="categorySlug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={inputClass}
            placeholder="nettoyage"
          />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="categoryDescription">Description</FieldLabel>
          <textarea
            id="categoryDescription"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className={textareaClass}
            placeholder="Description courte de la catégorie…"
          />
        </div>

        <div>
          <FieldLabel htmlFor="categorySortOrder" hint="Ordre d'affichage sur le site public.">
            Ordre de tri
          </FieldLabel>
          <input
            id="categorySortOrder"
            type="number"
            value={sortOrder}
            onChange={(event) => setSortOrder(Number(event.target.value) || 0)}
            className={inputClass}
          />
        </div>
      </section>

      {error ? (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          <AlertIcon width={15} height={15} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <AdminButton type="submit" disabled={saving} icon={saving ? undefined : <CheckIcon width={15} height={15} />}>
          {saving ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Créer la catégorie"}
        </AdminButton>
        <AdminButton href="/admin/categories" variant="outline">
          Annuler
        </AdminButton>
      </div>
    </form>
  );
}
