/**
 * Validation des variables d'environnement NIUMBA TRANSFORM.
 *
 * Distinction importante :
 * - Variables de BUILD : nécessaires pendant `next build` (ex. NEXT_PUBLIC_SITE_URL pour sitemap/robots)
 * - Variables de RUNTIME : nécessaires uniquement à l'exécution (ex. DATABASE_URL, BLOB_READ_WRITE_TOKEN, ADMIN_*)
 *
 * En production (Vercel), le build s'exécute SANS base de données ni Blob.
 * Cette validation NE CASSE PAS le build si les variables runtime sont absentes.
 * Elle lève une erreur claire au PREMIER ACCÈS runtime si une variable critique manque.
 */

type EnvVarSpec = {
  name: string;
  requiredAtBuild: boolean;
  requiredAtRuntime: boolean;
  description: string;
};

const ENV_SPECS: EnvVarSpec[] = [
  {
    name: "DATABASE_URL",
    requiredAtBuild: false,
    requiredAtRuntime: true,
    description: "Connexion PostgreSQL (requise en production, optionnelle en build Vercel)",
  },
  {
    name: "BLOB_READ_WRITE_TOKEN",
    requiredAtBuild: false,
    requiredAtRuntime: true,
    description: "Token Vercel Blob pour les uploads (requis en production)",
  },
  {
    name: "ADMIN_EMAIL",
    requiredAtBuild: false,
    requiredAtRuntime: true,
    description: "Email du premier administrateur (requis pour seed/create-admin)",
  },
  {
    name: "ADMIN_PASSWORD",
    requiredAtBuild: false,
    requiredAtRuntime: true,
    description: "Mot de passe du premier administrateur (requis pour seed/create-admin)",
  },
  {
    name: "ADMIN_NAME",
    requiredAtBuild: false,
    requiredAtRuntime: false,
    description: "Nom de l'administrateur (optionnel, défaut: 'Administrateur')",
  },
  {
    name: "NEXT_PUBLIC_SITE_URL",
    requiredAtBuild: true,
    requiredAtRuntime: true,
    description: "URL publique du site (SEO, sitemap, robots, Open Graph)",
  },
  {
    name: "APP_ENV",
    requiredAtBuild: false,
    requiredAtRuntime: true,
    description: "Niveau d'environnement (development | production)",
  },
];

let validated = false;
let validationError: Error | null = null;

function isBuildTime(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build" || process.env.NODE_ENV === "production" && process.env.VERCEL === "1";
}

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value !== undefined && value !== "" ? value : undefined;
}

export function validateEnv(): { ok: boolean; missing: string[] } {
  if (validated) {
    return { ok: !validationError, missing: validationError ? validationError.message.split(", ") : [] };
  }

  const isBuild = isBuildTime();
  const missing: string[] = [];

  for (const spec of ENV_SPECS) {
    const required = isBuild ? spec.requiredAtBuild : spec.requiredAtRuntime;
    if (required && !getEnv(spec.name)) {
      missing.push(spec.name);
    }
  }

  if (missing.length > 0) {
    validationError = new Error(missing.join(", "));
  }

  validated = true;
  return { ok: missing.length === 0, missing };
}

export function assertEnv(): void {
  const result = validateEnv();
  if (!result.ok) {
    const missing = result.missing.join(", ");
    throw new Error(`Variables d'environnement manquantes : ${missing}`);
  }
}

export function getRequiredEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    const spec = ENV_SPECS.find((s) => s.name === name);
    const context = spec ? ` (${spec.description})` : "";
    throw new Error(`Variable d'environnement manquante : ${name}${context}`);
  }
  return value;
}

export function getOptionalEnv(name: string, fallback?: string): string | undefined {
  return getEnv(name) ?? fallback;
}

export function getAppEnv(): "development" | "production" {
  const env = getOptionalEnv("APP_ENV", "development");
  return env === "production" ? "production" : "development";
}

export function isProduction(): boolean {
  return getAppEnv() === "production";
}

export function isDevelopment(): boolean {
  return getAppEnv() === "development";
}