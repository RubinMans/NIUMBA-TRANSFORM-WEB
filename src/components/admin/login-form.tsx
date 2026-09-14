"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  EyeOffIcon,
  AlertIcon,
  ArrowRightIcon,
} from "@/components/admin/icons";
import { cn } from "@/lib/utils";

/**
 * Formulaire de connexion Admin (mission 02).
 * Envoie les identifiants à /api/auth/login : la vérification, le hachage
 * et la session se font UNIQUEMENT côté serveur. Aucun secret côté client.
 */
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Connexion impossible. Réessayez dans un instant.",
        );
        setSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Le serveur est injoignable. Vérifiez votre connexion puis réessayez.");
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="adminEmail" className="mb-1.5 block text-sm font-bold text-ink">
          Email / identifiant
        </label>
        <input
          id="adminEmail"
          type="email"
          autoComplete="username"
          placeholder="votre-email@entreprise.cd"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
          className="h-12 w-full rounded-2xl border border-border-soft bg-surface-subtle px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:bg-surface focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="adminPassword" className="mb-1.5 block text-sm font-bold text-ink">
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="adminPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={submitting}
            className="h-12 w-full rounded-2xl border border-border-soft bg-surface-subtle px-4 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-secondary focus:bg-surface focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
          >
            {showPassword ? <EyeOffIcon width={18} height={18} /> : <EyeIcon width={18} height={18} />}
          </button>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
        >
          <AlertIcon width={15} height={15} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "group inline-flex h-12 w-full items-center justify-between rounded-full bg-primary px-5 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:pointer-events-none disabled:opacity-70",
        )}
      >
        <span>{submitting ? "Connexion en cours…" : "Se connecter"}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
          <ArrowRightIcon width={17} height={17} />
        </span>
      </button>
    </form>
  );
}