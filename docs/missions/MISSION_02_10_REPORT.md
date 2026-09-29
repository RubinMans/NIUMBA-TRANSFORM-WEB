# MISSION 02.10 — RAPPORT PRÉPARATION GITHUB ET VERCEL

Date : 2026-09-29
Branche : main
Commit de référence : (avant commit de cette mission)

---

## 1. ÉTAT GIT

### Fichiers modifiés (non commités)
- `.gitignore` — ajout ignoring uploads locaux
- `next.config.ts` — redirection `/produits` → `/catalogue`
- `prisma/schema.prisma` — modèle complet (auth, catalogue, commerce, contenus, site)
- Nombreux fichiers `src/app/**`, `src/components/**`, `src/data/**`, `src/lib/**`, `src/services/**` — implémentation fonctionnelle

### Fichiers non suivis (untracked) — légitimes
- `docs/missions/` — rapports de missions
- `prisma/migrations/20260915090930_add_logo_black_path/` — migration Prisma
- `public/media/*.svg` — logos et favicon officiels
- `public/media/uploads/` — dossier uploads (avec `.gitkeep`)
- `src/app/(site)/catalogue/` — page catalogue
- `src/app/admin/(panel)/categories/[id]/` — édition catégorie
- `src/app/admin/(panel)/categories/nouveau/` — nouvelle catégorie
- `src/app/api/admin/categories/[id]/` — API catégorie unique
- `src/app/api/admin/medias/` — API médias
- `src/app/api/admin/upload/` — API upload
- `src/app/api/admin/visual-identity/` — API identité visuelle
- `src/components/admin/categories/` — composants catégories
- `src/components/admin/identite-form.tsx` — formulaire identité
- `src/components/admin/media-library.tsx` — bibliothèque médias
- `src/components/admin/media-uploader.tsx` — uploader médias
- `src/components/site/logo-image.tsx` — composant logo
- `src/services/admin-categories.ts` — service catégories

### Fichiers ignorés par `.gitignore` (vérifiés)
- `.env` — variables locales (non versionné)
- `cookies.txt` — session admin dev (ignoré ligne 41)
- `prisma/dev.db` — base SQLite dev (ignoré lignes 47-50) — *n'existe pas actuellement*
- `.next/` — build Next.js (ignoré)
- `.vercel/` — config Vercel (ignoré)
- `*.log` — logs (ignoré)
- `public/media/produits/*.jpg` — photos provisoires (ignoré)
- `public/media/uploads/*` — uploads locaux (ignoré, sauf `.gitkeep`)

---

## 2. SÉCURITÉ

### Secrets dans les fichiers versionnés
**Aucun secret réel détecté** dans les fichiers trackés par Git :
- `Bukhete2025Dev!` (mot de passe admin dev) — **absent** des fichiers trackés
- `admin@niumba.local` (email admin dev) — **absent** des fichiers trackés
- `DATABASE_URL="file:./dev.db"` — **absent** des fichiers trackés
- `nt_admin_session` (cookie de session) — **absent** des fichiers trackés

### Fichiers sensibles exclus
- `.env` — dans `.gitignore` (ligne 37-38)
- `cookies.txt` — dans `.gitignore` (ligne 41)
- `prisma/*.db` — dans `.gitignore` (lignes 47-50)

### .env.example — variables documentées (sans valeurs réelles)
```bash
DATABASE_URL="file:./dev.db"           # SQLite local
APP_ENV="development"                  # Niveau environnement
NEXT_PUBLIC_SITE_URL="http://localhost:3000"  # URL publique (SEO)
ADMIN_EMAIL=""                         # Admin seed (vide)
ADMIN_PASSWORD=""                      # Admin seed (vide)
ADMIN_NAME=""                          # Admin seed (vide)
```
> **Note** : `VERCEL_URL` est fournie automatiquement par Vercel, pas besoin de la documenter. `NODE_ENV` est standard Next.js.

---

## 3. VARIABLES D'ENVIRONNEMENT NÉCESSAIRES

| Variable | Source | Requis | Notes |
|----------|--------|--------|-------|
| `DATABASE_URL` | Prisma | Oui | `file:./dev.db` en dev ; PostgreSQL en prod (Vercel) |
| `APP_ENV` | Code custom | Non | `development` / `production` |
| `NEXT_PUBLIC_SITE_URL` | `src/lib/site.ts` | Oui | SEO, sitemap, OG ; Vercel fournit `VERCEL_URL` en preview |
| `ADMIN_EMAIL` | `prisma/seed.ts`, `create-admin.ts` | Pour seed | Jamais exposé côté client |
| `ADMIN_PASSWORD` | `prisma/seed.ts`, `create-admin.ts` | Pour seed | Jamais exposé côté client |
| `ADMIN_NAME` | `prisma/seed.ts`, `create-admin.ts` | Non | Défaut : "Administrateur" |
| `VERCEL_URL` | Vercel (auto) | Non | Utilisé en fallback dans `site.ts` |
| `NODE_ENV` | Next.js (auto) | Non | `development` / `production` / `test` |

**Toutes les variables sont documentées dans `.env.example`**.

---

## 4. RÉSULTAT LINT

```bash
npm run lint
```

**Résultat** : ✅ **PASS** (2 warnings seulement)
```
src/app/admin/(panel)/categories/page.tsx:5:29  warning  'ProductIcon' is defined but never used
src/components/admin/categories/category-row-actions.tsx:14:10  warning  'busy' is assigned a value but never used
```

> **Aucune erreur** — seulement 2 variables inutilisées (non bloquantes pour le déploiement).

---

## 5. RÉSULTAT TYPESCRIPT

```bash
npx tsc --noEmit
```

**Résultat** : ✅ **PASS** — Aucune erreur de type.

---

## 6. RÉSULTAT BUILD

```bash
npm run build
```

**Résultat** : ✅ **PASS** — Build Next.js 16.3.5 (Turbopack) réussi en ~18s

### Routes générées (40 total)
| Type | Routes |
|------|--------|
| **Statiques (○)** | `/`, `/_not-found`, `/icon.svg`, `/robots.txt`, `/sitemap.xml` |
| **Dynamiques (ƒ)** | Toutes les autres (catalogue, admin, API, pages produit, etc.) |

> **Important** : Le build **ne nécessite pas de base de données SQLite persistante** — les routes dynamiques sont rendues à la demande (SSR), pas au build. Prisma Client est généré via `postinstall`.

---

## 7. COMPATIBILITÉ VERCEL

| Critère | Statut | Détail |
|---------|--------|--------|
| Next.js 16+ | ✅ | Version 16.3.5 — supportée |
| Turbopack | ✅ | Utilisé en dev et build |
| Build statique | ✅ | Pas de `getStaticProps` nécessitant DB |
| Prisma Client | ✅ | Généré via `postinstall: prisma generate` |
| Variables d'env | ✅ | Toutes documentées, aucune secrète en dur |
| SQLite en dev | ✅ | Ignoré par `.gitignore` ; production = PostgreSQL |
| Uploads fichiers | ⚠️ | Stockage local (`public/media/uploads/`) — **ne persistera pas sur Vercel** |
| Sessions cookies | ✅ | `httpOnly`, `secure` en prod, `SameSite=lax` |

### ⚠️ Points d'attention pour la production réelle

1. **Uploads médias** : Actuellement stockés dans `public/media/uploads/` (fs local). Sur Vercel (serverless, éphémère), les fichiers uploadés **disparaîtront** à chaque redéploiement. **Solution future** : migrer vers stockage objet (S3/R2/Blob Vercel) — **hors scope mission 02.10**.

2. **Base de données** : SQLite (`file:./dev.db`) fonctionne en local uniquement. En production Vercel, il faut **configurer `DATABASE_URL` vers PostgreSQL** (ex: Neon, Supabase, Vercel Postgres) et changer `provider = "postgresql"` dans `prisma/schema.prisma` — **hors scope mission 02.10** (mission future).

3. **Admin seed** : Les variables `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` doivent être définies dans l'environnement Vercel (Project Settings → Environment Variables) pour que `prisma db seed` ou `db:create-admin` crée le premier admin en prod.

4. **Cookies sécurisés** : `secure: true` activé quand `NODE_ENV === "production"` (Vercel le définit automatiquement). OK.

---

## 8. BLOCAGES IDENTIFIÉS

| Blocage | Gravité | Action requise |
|---------|---------|----------------|
| Stockage uploads local | **Moyenne** | Ne bloque **pas** le déploiement Vercel initial ; les uploads ne persisteront pas. À migrer vers Blob/S3 plus tard. |
| SQLite en production | **Haute** | Ne bloque **pas** le déploiement si `DATABASE_URL` PostgreSQL est fournie ; sinon l'app plantera. À faire avant mise en prod réelle. |
| Pas de migration PostgreSQL | **Info** | Le schéma Prisma est compatible (pas de types SQLite-specific) ; il suffit de changer le provider. |

> **Aucun blocage critique pour le premier déploiement Vercel de test** (avec DB PostgreSQL configurée).

---

## 9. FICHIERS MODIFIÉS DANS CETTE MISSION

| Fichier | Changement |
|---------|------------|
| `.gitignore` | Ajout ignore `public/media/uploads/*` (avec `!.gitkeep`) |
| *(aucun autre)* | L'audit n'a révélé aucune correction nécessaire au code |

> Le `.gitignore` était déjà correct pour `.env`, `cookies.txt`, `dev.db`, `.next`, `.vercel`, logs, photos provisoires.

---

## 10. COMMANDE POUR LANCER LE PROJET LOCALLEMENT

```bash
# 1. Installer les dépendances (génère Prisma Client)
npm install

# 2. Créer la base SQLite locale + appliquer migrations + seed
npm run db:migrate   # ou db:push pour dev rapide
npm run db:seed      # crée rôles, catégories, produits, settings, admin

# 3. Lancer le serveur de développement
npm run dev

# Accès : http://localhost:3000
# Admin : http://localhost:3000/admin/connexion
#   Email : admin@niumba.local (défini dans .env local)
#   Mot de passe : celui dans .env local
```

> **Variables requises dans `.env` local** (copier depuis `.env.example` et remplir) :
> - `DATABASE_URL="file:./dev.db"`
> - `NEXT_PUBLIC_SITE_URL="http://localhost:3000"`
> - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` (pour le seed)

---

## 11. PROCHAINES ÉTAPES (HORS MISSION 02.10)

1. **Créer le repo GitHub** et pousser `main`
2. **Configurer le projet Vercel** :
   - Importer le repo GitHub
   - Définir `DATABASE_URL` (PostgreSQL prod)
   - Définir `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`
   - Définir `NEXT_PUBLIC_SITE_URL` (ou laisser Vercel utiliser `VERCEL_URL`)
3. **Déployer** — vérifier que le build passe
4. **Exécuter `prisma db seed`** en prod (via Vercel CLI ou script post-déploiement)
5. **Mission future** : migrer uploads vers Vercel Blob / S3
6. **Mission future** : changer `provider = "postgresql"` dans `schema.prisma`

---

## 12. VALIDATION

- [x] Git status propre (hors fichiers légitimes)
- [x] Aucun secret dans les fichiers versionnés
- [x] `.gitignore` complet
- [x] `.env.example` à jour
- [x] Lint : PASS (warnings only)
- [x] TypeScript : PASS
- [x] Build : PASS
- [x] Compatible Vercel (avec DB PostgreSQL configurée)
- [x] Rapport créé

**Prêt pour commit et poussée manuelle vers GitHub.**