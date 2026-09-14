# Rapport — MISSION 02.7 · Sécurité, nettoyage Git et premier commit propre

Date : 14/09/2026
Exécutant : agent ingénierie (OpenCode)
Projet : NIUMBA TRANSFORM — `D:\Dévellopement\NIUMBA-TRANSFORM-WEB`
Référence : `ARCHITECTURE_OFFICIELLE_NIUMBA_TRANSFORM.md` (§ 16, § 17)

> ⚠️ Aucune valeur sensible (mot de passe, token, cookie, clé API) n'est reproduite dans ce rapport.

---

## A. État initial

- Dépôt Git initialisé sur `main`, **aucun commit** (fenêtre idéale pour partir propre).
- Aucun dépôt distant configuré (`git remote` vide), aucun push effectué.
- 149 fichiers prêts à être versionnés après verrouillage de `.gitignore`.
- Rapport 02.6 signalait `cookies.txt` à la racine contenant un token de session réel :
  le fichier **n'était plus présent sur le disque** au début de cette mission
  (supprimé entre les deux missions), mais la session associée devait être révoquée.

## B. Problèmes de sécurité détectés

| # | Problème | Gravité | Traitement |
| --- | --- | --- | --- |
| 1 | `cookies.txt` (token de session `nt_admin_session`) — signalé 02.6 | Critique | Fichier déjà absent ; token **révoqué** (purge de la table `sessions`) ; `.gitignore` verrouille le nom |
| 2 | `.env` contenant un mot de passe administrateur local | Haute | Jamais versionné (déjà ignoré par `.env*`) — vérifié dans l'index Git |
| 3 | Mot de passe de démonstration en dur dans `src/data/admin.ts` | Basse | Credential **fictif de prévisualisation** (mission 01.5), affiché explicitement comme « Connexion simulée uniquement ». Non réutilisé par l'authentification. Conservé : supprimer casserait la prévisualisation du portail |
| 4 | Valeur ressemblant à un mot de passe dans le mockup Stitch de connexion | Basse | Donnée **fictive de maquette design** (référence visuelle). À ne **JAMAIS** réutiliser comme mot de passe réel (règle anti-invention, cahier § 52). Stitch n'a pas été modifié |
| 5 | 12 photos produit provisoires dans `src/app/admin/(panel)/produits/` | Basse | Déplacées hors de l'arborescence source vers `public/media/produits/` et **exclues du versionnage** (placeholders non référencés, en attente des ASSETS OFFICIELS) |

## C. Actions réalisées

1. Inspection complète du dépôt (git, fichiers, scripts, secrets, base, Stitch).
2. Révocation du token de session : **purge de la table `sessions`** (`prisma/dev.db`), compteur vérifié à 0.
3. `.gitignore` complété : ajout de `dist/` et exclusion des photos produit provisoires
   (`/public/media/produits/*.jpg`).
4. Déplacement des 12 photos produit non référencées de la zone source vers `public/media/produits/`.
5. Recherche exhaustive de secrets au niveau nom de fichier **et** contenu (regex mots de passe,
   tokens, JWT, clés API, Bearer, intégrités) sur les **fichiers stageables**.
6. Vérification du script `db:create-admin` (voir § H) et test de la commande.
7. Jeu de tests fonctionnels complets (voir § I).
8. Purge de session post-tests, état final propre de la base.
9. Staging ciblé des fichiers whitelistés uniquement.

## D. Secrets protégés

- `.env` (mot de passe, email, base, URL) : **exclu du dépôt** — confirmé présent dans l'index Git :
  `absent`.
- `.env.example` : valeurs **vides volontairement** pour `ADMIN_EMAIL`, `ADMIN_PASSWORD` — aucun secret recopié.
- `cookies.txt` : absent du disque, absent de l'index, verrouillé dans `.gitignore`.
- `prisma/dev.db` : exclu (hashes de mots de passe et de sessions).
- `*.pem`, `*.key`, logs, archives Stitch `.zip` : exclus.
- Aucun secret réel détecté dans les fichiers versionnables (les correspondances trouvées sont des
  faux positifs : empreintes sha512 `package-lock.json`, URL Googleusercontent dans un mockup,
  noms de variables `password`, credentials fictifs de démo).

## E. .gitignore

Fichier présent, couvrant désormais au minimum :

```
node_modules/            .next/                 out/              dist/
*.log                    *.pem                  .DS_Store
.env*                    (avec !.env.example)
/cookies.txt
/prisma/*.db             /prisma/*.db-journal   /prisma/*.db-shm   /prisma/*.db-wal
/stitch_*.zip
/public/media/produits/*.jpg
*.tsbuildinfo            next-env.d.ts          .vercel
Thumbs.db                Desktop.ini            $RECYCLE.BIN/
```

Vérifié par `git status --ignored` : `.env`, `.next/`, `node_modules/`, `prisma/dev.db`,
`tsconfig.tsbuildinfo`, `next-env.d.ts`, zip Stitch, photos provisoires ⇒ **status ignorés**.

## F. cookies.txt

- **Statut** : fichier déjà supprimé du disque avant cette mission.
- **Validité du token** : le lien base ↔ token est révoqué (table `sessions` purgée, vérifié = 0).
  Toute session correspondante est donc invalidée.
- **Utilisation dans le code** : aucune référence à une valeur de cookie codée en dur ;
  `nt_admin_session` n'est qu'un nom de cookie (constante `src/lib/auth.ts`).
- **Décision** : le token est considéré **compromis** par précaution (le fichier a existé avec une
  valeur réelle). Aucune rotation nécessaire côté application (token aléatoire par session) ;
  le mot de passe administrateur local reste à renouveler avant toute exposition publique (§ N).

## G. SQLite

- `prisma/dev.db` : base locale de développement, **jamais commitée** (ignorée).
- Reprise reproductible pour un autre développeur : `npm install` → `npm run db:migrate` →
  `npm run db:seed` → `npm run db:create-admin` (migrations et seed versionnés).
- État vérifié : 0 session, 1 utilisateur (admin), 3 rôles, 4 catégories, 9 produits.

## H. Script create-admin

- La référence du rapport 02.6 (`create-admin.mjs`) n'était **plus** dans `package.json` :
  le script pointe déjà vers le fichier réel `prisma/create-admin.ts`
  (`db:create-admin: tsx prisma/create-admin.ts`).
- Aucun doublon `.mjs` créé (aucun fichier inutile).
- **Test** : `npm run db:create-admin` ⇒ succès (admin prêt, comportement idempotent upsert).

## I. Tests

| Vérification | Résultat |
| --- | --- |
| `npm run lint` | ✅ OK |
| `npm run typecheck` | ✅ OK |
| `npm run build` (Next.js 16.3.5, Turbopack) | ✅ 50 pages générées |
| Démarrage local (`next dev`) | ✅ HTTP 200 |
| Accès public catalogue `/produits` | ✅ 200 (contient BUKHETE) |
| Fiche produit `/produit/savon-en-barre` | ✅ 200 |
| `/categorie/nettoyage` | ✅ 200 |
| `/admin/connexion` | ✅ 200 |
| `/admin` sans session | ✅ redirigé vers `/admin/connexion` |
| `/admin/produits` sans session | ✅ redirigé vers `/admin/connexion` |
| `/api/admin/products` sans session | ✅ 401 |
| Login `POST /api/auth/login` | ✅ 200, cookie `HttpOnly; SameSite=lax` posé |
| `/admin/produits` avec session | ✅ 200 (contenu réel, pas de redirect) |
| `/api/admin/products` avec session | ✅ 200 |
| **CRUD produit** (POST 201 → GET 200 → DELETE 200) | ✅ Création, lecture, suppression (retour à 9 produits) |
| Logout `POST /api/auth/logout` | ✅ 200, session détruite |
| `/admin/produits` après logout | ✅ redirigé vers `/admin/connexion` |

Aucune régression fonctionnelle introduite.

## J. Git status final

```
FILES À VERSIONNER : 149 (code source, prisma, public/, docs, STITCH_EXPORT/, config)
FILES IGNORÉS        : .env, .next/, node_modules/, prisma/dev.db, next-env.d.ts,
                       tsconfig.tsbuildinfo, stitch_niumba_transform_design_system.zip,
                       public/media/produits/*.jpg
FILES SUPPRIMÉS      : aucuns (cookies.txt déjà absent avant la mission)
FILES MODIFIÉS       : .gitignore (ajouts dist/, photos provisoires)
```

Contrôles de sécurité sur l'index Git :
- `.env` **non staged** ✅
- `cookies.txt` **non staged** ✅
- `dev.db` **non staged** ✅
- `node_modules` **non staged** ✅
- `.next` **non staged** ✅
- `tsconfig.tsbuildinfo`, `next-env.d.ts`, zip Stitch **non staged** ✅

## K. Premier commit

Message : `chore: initialize secure NIUMBA TRANSFORM project`

Périmètre : code source, `package.json`, `package-lock.json`, schéma + migrations + seed Prisma,
documentation et rapports de mission, architecture officielle, extraction Stitch (référence
visuelle), `AGENTS.md`, `CLAUDE.md`, témoignages de lecture, configuration Next/TS/ESLint/PostCSS.

Aucun push effectué. Aucun dépôt distant créé. Aucun déploiement.

## L. Hash du commit

Renseigné dans le log Git du dépôt local après création (réf. `git log -1 --format=%H`).

## M. Ce qui n'a PAS été fait

- Pas de nouveau design, page, API ou fonctionnalité.
- Aucune modification fonctionnelle de Prisma ou de l'authentification.
- Pas d'e-commerce, pas d'intégration visuelle des produits.
- `Stitch` **non modifié** (référence visuelle conservée intégralement).
- Aucun push vers GitHub, aucun repository créé, Vercel non connecté, aucun déploiement.
- `MISSION 02.8` **non lancée** — en attente de l'accord du chef de projet.
- Fichiers temporaires de travail (photos placeholders) **non supprimés** : déplacés et ignorés.

## N. Risques restants

1. **Mot de passe de démonstration en dur** (`src/data/admin.ts`) : fictif et isolé du SSO réel,
   mais à remplacer par un mécanisme sans valeur en clair lors de la mission d'authentification réelle.
2. **Valeur de maquette Stitch (connexion)** : ne doit jamais devenir un mot de passe applicatif ;
   à écarter définitivement lors de la mise en production.
3. **Mot de passe administrateur local (`.env`)** : à **renouveler** avant toute exposition publique
   du projet (Vercel), car présent en clair sur la machine.
4. **Absence d'un scanner de secrets automatisé** : recommandation d'un hook de pré-commit
   (grep token/password/`ADMIN_PASSWORD=`) et d'un `npm audit` avant production.
5. **Sessions local** : le cookie `secure` ne s'applique qu'en production (normal en dev local).
6. **Durcissements à venir** (§ 16.3 architecture) : rate limiting login, validation Zod partielle,
   CSRF renforcé, headers CSP/X-Frame-Options, journalisation des actions sensibles, audit npm.

## O. Recommandation pour MISSION 02.8

- Configurer le hook de sécurité Git (lint des secrets en pré-commit) et inscrire `npm audit`
  dans le workflow.
- Préparer le dépôt distant GitHub et Vercel (variables d'environnement dans le tableau de bord :
  `DATABASE_URL` PostgreSQL, `NEXT_PUBLIC_SITE_URL`, nouveaux `ADMIN_*` forts), **sans** recopier
  les valeurs du `.env` local.
- Renouveler le mot de passe administrateur avant tout partage/prévisualisation.
- Proposer la rotation du mot de passe `.env` et la neutralisation définitive de la valeur de maquette Stitch.
- Après accord du chef de projet : lancer la mission suivante (authentification / portail admin réel).

---

*Validation MISSION 02.7 · Sécuriser → Vérifier → Versionner → Valider → Attendre.*