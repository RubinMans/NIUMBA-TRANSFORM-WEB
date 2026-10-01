import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getBrandAssets } from "@/services/site-settings";
import { LoginForm } from "@/components/admin/login-form";
import { LogoImage } from "@/components/site/logo-image";
import {
  ArrowLeftIcon,
  ShieldIcon,
  LockIcon,
  CheckIcon,
} from "@/components/admin/icons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Page de connexion réelle (mission 02).
 * Visible par tout visiteur ; dès qu'une session valide existe, le visiteur
 * est redirigé vers le tableau de bord.
 */
export default async function AdminConnexionPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/admin");
  }

  const assets = await getBrandAssets();

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-surface-subtle px-4 py-8">
      {/* Halos d'ambiance */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-secondary-soft/60 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Retour au site public */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-sm font-semibold text-ink-muted shadow-sm transition-colors hover:text-primary"
          >
            <ArrowLeftIcon width={16} height={16} className="transition-transform group-hover:-translate-x-0.5" />
            Retour au site public
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-xs font-bold text-ink-muted shadow-sm sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
            Kinshasa, République Démocratique du Congo
          </span>
        </div>

        {/* Cadre principal */}
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-surface shadow-xl lg:grid-cols-12">
          {/* Panneau identité */}
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-primary-deep via-primary to-primary-dark p-8 text-white lg:col-span-5">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,224,111,0.14),transparent_62%)]"
              aria-hidden
            />

            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-secondary-soft backdrop-blur-sm">
                <ShieldIcon width={14} height={14} />
                Portail de gestion NIUMBA
              </p>

              <div className="mt-8 flex items-center gap-4">
                {assets.logoDarkPath ? (
                  <LogoImage src={assets.logoDarkPath} alt="NIUMBA TRANSFORM" />
                ) : assets.logoPath ? (
                  <LogoImage src={assets.logoPath} alt="NIUMBA TRANSFORM" />
                ) : (
                  <span className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-base font-extrabold tracking-tight text-primary">
                    NT
                  </span>
                )}
                <div className="leading-none">
                  <p className="text-xl md:text-2xl font-extrabold tracking-tight">NIUMBA TRANSFORM</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">Marque BUKHETE</p>
                </div>
              </div>

              <h1 className="mt-8 text-[26px] font-extrabold leading-tight tracking-tight md:text-3xl">
                Espace d’administration
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Centre de contrôle du site NIUMBA TRANSFORM : produits, commandes,
                contenus et informations de l’entreprise.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <ShieldIcon width={15} height={15} className="text-secondary-soft" />
                  </span>
                  Accès exclusif au personnel autorisé
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <LockIcon width={15} height={15} className="text-secondary-soft" />
                  </span>
                  Session sécurisée — mot de passe haché (scrypt)
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <CheckIcon width={15} height={15} className="text-secondary-soft" />
                  </span>
                  RCCM : CDKNG/RCCM/25-A-02289
                </li>
              </ul>
            </div>

            <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="flex items-center gap-2 text-xs font-bold text-secondary-soft">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary-soft" aria-hidden />
                Connexion réelle — donnez aucun identifiant à un tiers
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                Les sessions sont stockées côté serveur. En cas d’identifiants perdus,
                contactez votre administrateur système.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="flex flex-col justify-between bg-surface p-8 md:p-12 lg:col-span-7">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-secondary">
                <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
                Accès restreint
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
                Connexion administrateur
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Identifiez-vous pour rejoindre le centre de contrôle du site
                NIUMBA TRANSFORM.
              </p>

              <LoginForm />

              <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-ink-soft">
                <LockIcon width={13} height={13} className="mt-0.5 shrink-0 text-secondary" />
                Connexion sécurisée : transmission côté serveur, hachage scrypt,
                cookie HTTP-only. Aucune donnée n’est exposée dans le navigateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}