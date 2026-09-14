"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, WhatsAppIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export type DemoFormField =
  | {
      name: string;
      label: string;
      type: "text" | "tel" | "email" | "textarea";
      placeholder?: string;
      required?: boolean;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: string[];
      required?: boolean;
    };

type DemoFormProps = {
  fields: DemoFormField[];
  submitLabel: string;
  note?: string;
};

/**
 * Formulaire de prévisualisation (démonstration).
 *
 * ⚠️ Aucune donnée n'est transmise ni enregistrée : les traitements réels
 * (WhatsApp, e-mail, base de données) seront développés dans la mission
 * backend. Ce composant ne sert qu'à valider l'interface formulaire
 * (cahier § 18, § 20, § 23).
 */
export function DemoForm({ fields, submitLabel, note }: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-secondary-soft bg-secondary-soft/40 p-8 md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
          <CheckIcon width={22} height={22} />
        </span>
        <h3 className="text-xl font-extrabold tracking-tight text-ink">
          Demande prête pour la démonstration
        </h3>
        <p className="max-w-lg text-sm leading-relaxed text-ink-muted">
          Votre demande a bien été préparée par l’interface de prévisualisation.
          Aucune donnée n’a été transmise : la réception réelle des demandes
          (WhatsApp officiel, e-mail, base de données) sera activée dans la
          mission backend.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => setSubmitted(false)} variant="primary">
            Nouvelle demande
          </Button>
          <Button href="/" variant="ghost">
            Retour à l’accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const isTextarea = field.type === "textarea";
          const isSelect = field.type === "select";
          const inputClasses = cn(
            "w-full rounded-2xl border border-border-soft bg-surface-subtle px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:bg-surface focus:ring-2 focus:ring-secondary/20",
            isTextarea ? "min-h-28 py-3.5" : "h-12",
          );

          return (
            <div
              key={field.name}
              className={cn(isTextarea || isSelect ? "sm:col-span-2" : "sm:col-span-1", "flex flex-col gap-1.5")}
            >
              <label htmlFor={`demo-${field.name}`} className="text-sm font-bold text-ink">
                {field.label}
                {field.required ? <span className="text-secondary"> *</span> : null}
              </label>
              {isSelect ? (
                <select id={`demo-${field.name}`} name={field.name} required={field.required} className={inputClasses} defaultValue="">
                  <option value="" disabled>
                    Sélectionner…
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : isTextarea ? (
                <textarea
                  id={`demo-${field.name}`}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={inputClasses}
                />
              ) : (
                <input
                  id={`demo-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={inputClasses}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" variant="primary" size="lg" withArrow>
          {submitLabel}
        </Button>
        <Button href="/contact" variant="whatsapp" size="lg">
          <WhatsAppIcon width={18} height={18} />
          Passer par WhatsApp
        </Button>
      </div>

      {note ? (
        <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary" />
          {note}
        </p>
      ) : null}
    </form>
  );
}