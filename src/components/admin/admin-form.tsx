import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  hint?: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  error?: string;
};

/** Champ de formulaire Admin : label, aide, contenu et erreur éventuelle. */
export function FormField({ label, hint, htmlFor, required, children, className, error }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-bold text-ink"
      >
        {label}
        {required ? <span className="text-red-500" aria-hidden>*</span> : null}
      </label>
      {hint ? <p className="-mt-1 text-xs text-ink-muted">{hint}</p> : null}
      {children}
      {error ? (
        <p role="alert" className="text-xs font-semibold text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Styles standard des champs Admin. */
export const adminInputClass =
  "h-10 w-full rounded-xl border border-border-soft bg-surface px-3.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-ink-muted";

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(adminInputClass, props.className)} />;
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(adminInputClass, "cursor-pointer pr-8", props.className)} />;
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(adminInputClass, "h-auto py-2.5 leading-relaxed", props.className)}
    />
  );
}