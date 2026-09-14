# Rapport — Mission 01 · Initialisation technique

Date : 12/09/2026
Exécutant : agent technique (OpenCode)

## 1. Sources analysées

1. `CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md` — lu intégralement (source de vérité fonctionnelle).
2. `MISSION_00_INITIALISATION_PROJET.md` — **fichier vide (0 octet)** : aucune décision antérieure
   à récupérer. Les choix documentés ici sont donc les choix qui font foi.
3. `MAQUETTE_REFERENCE.png` — **introuvable**.
4. `STITCH_EXPORT/` — **créé** : extraction du fichier
   `stitch_niumba_transform_design_system.zip`, contenant 13 écrans (code + capture) et le
   plan de style `DESIGN.md`. Source de vérité visuelle.
5. `ASSETS_OFFICIELS/` — **introuvable**. Aucun logo/produit officiel disponible à ce stade.

## 2. Audit de l'environnement

| Élément | Statut | Notes |
| --- | --- | --- |
| Node.js | v25.2.1 | OK |
| npm | 11.6.2 | utilisé |
| pnpm | 11.24.0 | disponible, non retenu (npm par défaut Vercel) |
| yarn | absent | non nécessaire |
| Git | 2.55.0 | config globale présente (nom + email), branche par défaut non définie |
| Projet Next.js | absent | initialisé par la mission (à partir du dossier racine) |
| Stitch | zip présent | extrait dans `STITCH_EXPORT/` |
| ASSETS OFFICIELS | absent | en attente d'un dossier fourni par l'entreprise |
| `package.json` | absent | créé |
| TypeScript / Next / Tailwind | absent | configurés (Next 16.3.5, TS 5, Tailwind v4) |
| ESLint | absent | configuré (eslint-config-next 16) |
| Prisma | absent | installé (6.19.3), client généré, `dev.db` créé |
| `.env` / `.env.example` | absent | créés |

## 3. Décisions techniques

- Stack respectée : Next.js App Router + TypeScript + Tailwind CSS + Prisma + architecture
  modulaire (aucune décision contraire trouvée dans Mission 00, vide).
- Base de données : **SQLite** pour le développement local, **PostgreSQL** prévu en production
  (Vercel). Le provider Prisma est pour l'instant SQLite ; la migration PostgreSQL sera traitée
  dans la mission dédiée aux données.
- Palette et typographie : reprises **strictement** du `DESIGN.md` Stitch :
  - forêt profonde `#0E4B2A` (primaire / header / footer),
  - émeraude `#008751` (actions / accents),
  - citron `#F59E0B` (repères développement / promotions),
  - WhatsApp `#25D366`,
  - neutres `#FFFFFF`, `#F8FAFC` ; texte `#0F172A`, `#475569` ; bordure `#E2E8F0`,
  - Plus Jakarta Sans (400/600/700/800), boutons pill, conteneur max 1280 px.
- Logo : **pas d'asset officiel** → monogramme provisoire « NT » conforme au design Stitch,
  clairement destiné à être remplacé. Aucun logo inventé.
- Produits : aucune image ni information commerciale inventée. Les produits BUKHETE ne sont
  **pas** encore affichés (photographies officielles attendues). Toute information non confirmée
  utilise « [À CONFIRMER] » (règle anti-invention, cahier § 52).
- Bandeau « Site en cours de développement » : affiché en haut du site public.

## 4. Livrables de la mission

- Project Next.js 16 initialisé à `http://localhost:3000`, scripts npm (`dev`, `build`, `start`,
  `lint`, `typecheck`, `db:*`).
- Design tokens Tailwind v4 conforme Stitch (`src/app/globals.css`).
- Architecture modulaire documentée (`docs/ARCHITECTURE.md`).
- Header, navigation, footer et identité visuelle de base conformes Stitch.
- 12 pages publiques matérialisant l'arborescence du cahier des charges (la plupart en
  « page en construction ») + espace admin isolé (`/admin`) + page 404.
- SEO préparé : metadata, Open Graph, `robots.ts`, `sitemap.ts`, favicon « NT ».
- Prisma + SQLite de développement prêts (`prisma/dev.db`), scripts associés.
- Fichiers `.env` / `.env.example`.
- Fichiers `.gitignore`, `README.md`, documentation.

## 5. Workflow local → GitHub → Vercel (mode prévisualisation)

1. **Local** : `npm run dev` → `http://localhost:3000`.
2. **Git** : `git init -b main` (fait), puis à la demande du responsable : premier commit.
3. **GitHub** : créer un dépôt (ex. `niumba-transform-web`) et pousser la branche `main`.
   Le compte Git configuré localement : « Ruben mansiantima » / « Rubinmansiantima@gmail.com ».
4. **Vercel** : importer le dépôt GitHub → `npx vercel` ou interface vercel.com.
   - Build : `next build` (détection automatique).
   - Ne pas définir de variables de production avant la mission compatible.
   - Chaque push génère une **URL de prévisualisation** partageable au client.
5. **Validation puis production** : uniquement après validation (cahier § 11).

## 6. Points d'attention pour les prochaines missions

- Récupérer les **ASSETS OFFICIELS** (logo NIUMBA TRANSFORM, logo BUKHETE, photographies des
  produits) pour remplacer le monogramme et peupler le catalogue.
- Compléter `MISSION_00_INITIALISATION_PROJET.md` (fichier vide) ou le remplacer par le
  présent rapport comme référence des décisions.
- Définir le numéro WhatsApp officiel, l'email et le numéro de téléphone.
- Introduire les modèles Prisma (produits, catégories, commandes, distributeurs…) mission par
  mission, puis migrer vers PostgreSQL pour la production Vercel.