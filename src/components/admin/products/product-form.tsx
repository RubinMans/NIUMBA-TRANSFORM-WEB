"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminProductDetail } from "@/services/admin-products";
import type { CategoryOption } from "@/services/admin-products";
import { slugify, PRODUCT_STATUSES } from "@/data/catalogue";
import { AdminButton } from "@/components/admin/admin-button";
import { AlertIcon, PlusIcon, TrashIcon, CheckIcon } from "@/components/admin/icons";
import { cn } from "@/lib/utils";

type ProductFormProps = {
  categories: CategoryOption[];
  product?: AdminProductDetail;
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

const STATUS_OPTIONS: { value: string; label: string }[] = PRODUCT_STATUSES.map((status) => ({
  value: status,
  label: status === "Publié" ? "Publié (visible sur le site)" : status,
}));

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [brand, setBrand] = useState(product?.brand ?? "BUKHETE");
  const [reference, setReference] = useState(product?.reference ?? "");
  const [categoryId, setCategoryId] = useState(product?.categorySlug ? findCategoryId(product.categorySlug) : "");
  const [status, setStatus] = useState(product?.status ?? "Brouillon");
  const [active, setActive] = useState(product?.active ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [shortDescription, setShortDescription] = useState(product?.shortDescription ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [composition, setComposition] = useState(product?.composition ?? "");
  const [certifications, setCertifications] = useState(product?.certifications ?? "");
  const [packaging, setPackaging] = useState(product?.packaging ?? "");
  const [instructions, setInstructions] = useState(product?.instructions ?? "");
  const [precautions, setPrecautions] = useState(product?.precautions ?? "");
  const [additionalInfo, setAdditionalInfo] = useState(product?.additionalInfo ?? "");
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(product?.images.map((item) => item.url) ?? []);
  const [galleryInput, setGalleryInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function findCategoryId(slugValue: string): string {
    return categories.find((category) => category.slug === slugValue)?.id ?? "";
  }

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function addGalleryItem() {
    const url = galleryInput.trim();
    if (!url) return;
    setGallery((items) => [...items, url]);
    setGalleryInput("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    setError(null);

    const finalSlug = slug.trim() || slugify(name);
    if (!finalSlug) {
      setError("Le nom ou le slug du produit est requis.");
      return;
    }

    const payload = {
      name,
      brand,
      reference,
      categoryId,
      status,
      active,
      featured,
      shortDescription,
      description,
      composition,
      certifications,
      packaging,
      instructions,
      precautions,
      additionalInfo,
      videoUrl,
      image,
      gallery: gallery.filter((url) => url.trim().length > 0),
    };

    setSaving(true);
    try {
      const response = await fetch(
        isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products",
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

      router.push("/admin/produits");
      router.refresh();
    } catch {
      setError("Erreur réseau pendant l'enregistrement.");
      setSaving(false);
    }
  }

    return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sections de base */}
      <section className="grid grid-cols-1 gap-5 rounded-2xl border border-border-soft bg-surface p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="text-base font-extrabold tracking-tight text-ink">Informations principales</p>
          <p className="text-sm text-ink-muted">Identité, référence et catégorie du produit.</p>
        </div>

        <div>
          <FieldLabel htmlFor="productName">Nom du produit *</FieldLabel>
          <input
            id="productName"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            required
            className={inputClass}
            placeholder="Ex. Savon en barre"
          />
        </div>

        <div>
          <FieldLabel htmlFor="productSlug" hint="Sera utilisé dans l'URL publique (/produit/…).">
            Slug
          </FieldLabel>
          <input
            id="productSlug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={inputClass}
            placeholder="savon-en-barre"
          />
        </div>

        <div>
          <FieldLabel htmlFor="productBrand">Marque</FieldLabel>
          <input
            id="productBrand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className={inputClass}
            placeholder="BUKHETE"
          />
        </div>

        <div>
          <FieldLabel htmlFor="productReference">Référence</FieldLabel>
          <input
            id="productReference"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            className={inputClass}
            placeholder="Ex. BUK-001"
          />
        </div>

        <div>
          <FieldLabel htmlFor="productCategory">Catégorie</FieldLabel>
          <select
            id="productCategory"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className={cn(inputClass, "appearance-none bg-surface-subtle")}
          >
            <option value="">Aucune catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <FieldLabel htmlFor="productStatus">Statut de publication</FieldLabel>
          <select
            id="productStatus"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={cn(inputClass, "appearance-none bg-surface-subtle")}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) => setActive(event.target.checked)}
              className="h-4 w-4 rounded border-border-soft accent-secondary"
            />
            Produit actif
          </label>
          <label className="flex items-center gap-2.5 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 rounded border-border-soft accent-secondary"
            />
            Mis en avant (accueil)
          </label>
        </div>
      </section>

      {/* Descriptions */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border-soft bg-surface p-5">
        <div>
          <p className="text-base font-extrabold tracking-tight text-ink">Descriptions</p>
          <p className="text-sm text-ink-muted">Textes visibles sur la fiche produit du site.</p>
        </div>

        <div>
          <FieldLabel htmlFor="productShort">Description courte</FieldLabel>
          <textarea
            id="productShort"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            rows={2}
            className={textareaClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="productFull">Description complète</FieldLabel>
          <textarea
            id="productFull"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            className={textareaClass}
          />
        </div>
      </section>

      {/* Visuels */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border-soft bg-surface p-5">
        <div>
          <p className="text-base font-extrabold tracking-tight text-ink">Visuels produits</p>
          <p className="text-sm text-ink-muted">
            Chemins publics des visuels officiels (ex. /media/produits/savon-en-barre.jpg).
          </p>
        </div>

        <div>
          <FieldLabel htmlFor="productImage">Image principale</FieldLabel>
          <input
            id="productImage"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            className={inputClass}
            placeholder="/media/produits/…"
          />
        </div>

        <div>
          <FieldLabel htmlFor="productVideo">Vidéo associée (URL)</FieldLabel>
          <input
            id="productVideo"
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            className={inputClass}
            placeholder="https://…"
          />
        </div>

        <div>
          <FieldLabel htmlFor="galleryInput">Galerie d&apos;images (URLs)</FieldLabel>
          <div className="flex gap-2">
            <input
              id="galleryInput"
              value={galleryInput}
              onChange={(event) => setGalleryInput(event.target.value)}
              className={inputClass}
              placeholder="/media/produits/…"
            />
            <button
              type="button"
              onClick={addGalleryItem}
              className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-secondary px-4 text-sm font-bold text-white transition-colors hover:bg-secondary-dark"
            >
              <PlusIcon width={15} height={15} />
              Ajouter
            </button>
          </div>
          {gallery.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2">
              {gallery.map((url, index) => (
                <li key={`${url}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-surface-subtle px-3.5 py-2.5">
                  <span className="truncate font-mono text-xs text-ink-muted">{url}</span>
                  <button
                    type="button"
                    onClick={() => setGallery((items) => items.filter((_, i) => i !== index))}
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                    aria-label={`Retirer ${url}`}
                  >
                    <TrashIcon width={13} height={13} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* Contenus complémentaires */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border-soft bg-surface p-5">
        <div>
          <p className="text-base font-extrabold tracking-tight text-ink">Contenus complémentaires</p>
          <p className="text-sm text-ink-muted">
            Informations détaillées. Tout élément non confirmé doit rester « [À CONFIRMER] ».
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="productPackaging">Conditionnement</FieldLabel>
            <textarea id="productPackaging" value={packaging} onChange={(event) => setPackaging(event.target.value)} rows={3} className={textareaClass} />
          </div>
          <div>
            <FieldLabel htmlFor="productComposition">Composition (si confirmée)</FieldLabel>
            <textarea id="productComposition" value={composition} onChange={(event) => setComposition(event.target.value)} rows={3} className={textareaClass} />
          </div>
          <div>
            <FieldLabel htmlFor="productCertifications">Certifications</FieldLabel>
            <textarea id="productCertifications" value={certifications} onChange={(event) => setCertifications(event.target.value)} rows={3} className={textareaClass} />
          </div>
          <div>
            <FieldLabel htmlFor="productInstructions">Instructions</FieldLabel>
            <textarea id="productInstructions" value={instructions} onChange={(event) => setInstructions(event.target.value)} rows={3} className={textareaClass} />
          </div>
          <div>
            <FieldLabel htmlFor="productPrecautions">Précautions d&apos;usage</FieldLabel>
            <textarea id="productPrecautions" value={precautions} onChange={(event) => setPrecautions(event.target.value)} rows={3} className={textareaClass} />
          </div>
          <div>
            <FieldLabel htmlFor="productAdditional">Informations complémentaires</FieldLabel>
            <textarea id="productAdditional" value={additionalInfo} onChange={(event) => setAdditionalInfo(event.target.value)} rows={3} className={textareaClass} />
          </div>
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
          {saving ? "Enregistrement…" : isEdit ? "Enregistrer les modifications" : "Créer le produit"}
        </AdminButton>
        <AdminButton href="/admin/produits" variant="outline">
          Annuler
        </AdminButton>
      </div>
    </form>
  );
}