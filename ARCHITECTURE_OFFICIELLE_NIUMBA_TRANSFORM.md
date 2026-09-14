# ARCHITECTURE OFFICIELLE — NIUMBA TRANSFORM

> **Document de référence pour toutes les missions à venir.**
>
> - Statut : **APPROUVÉ POUR RÉFÉRENCE** (mission 02.6 — conception, sans modification de code)
> - Version : 1.0
> - Date : 13/09/2026
> - Portée : arborescence, routes, Admin, backend, Prisma, validation, assets, médias,
>   composants, design system, conventions, sécurité, Git, données, plan de normalisation.
> - Règle de priorité des sources (cahier des charges § 51) :
>   **1. Cahier des charges → 2. Stitch/maquette → 3. Assets officiels → 4. Décisions techniques.**

---

## 1. OBJECTIF

Définir **une architecture officielle, cohérente et durable** pour NIUMBA TRANSFORM afin d'éliminer :

- les sources concurrentes de vérité ;
- les fichiers placés au mauvais endroit ;
- les anciennes versions et les doublons ;
- les routes incohérentes ;
- le mélange assets officiels / assets de démonstration ;
- le mélange composants réels / composants de démo ;
- les données statiques là où Prisma doit servir ;
- les modules Admin fictifs présentés comme fonctionnels ;
- les secrets présents dans le projet (ex. `cookies.txt`) ;
- les conventions qui changent d'une mission à l'autre.

La cible est une structure professionnelle capable d'évoluer :
**LOCAL → PRÉVISUALISATION CLIENT → VERCEL → PRODUCTION → E-COMMERCE → INDUSTRIALISATION.**

Règle absolue : **ne pas repartir de zéro**. Le projet conserve ses fondations solides :
Next.js App Router, TypeScript, Tailwind v4, Prisma, SQLite (dev), authentification réelle,
sessions persistées, catalogue DB, CRUD produits, architecture public/admin, système Stitch.

---

## 2. SOURCES DE VÉRITÉ (hiérarchie officielle)

| Rang | Source | Rôle |
| --- | --- | --- |
| 1 | `CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md` | Fonctionnel : ce que le système doit faire (§ 51). |
| 2 | `STITCH_EXPORT/` + `DESIGN.md` | Visuel : direction artistique, layout, composants (§ 49). |
| 3 | `ASSETS_OFFICIELS/` (à créer) | Identité réelle : logos, produits, documents (§ 50). |
| 4 | Décisions techniques documentées (cette architecture) | Implémentation : Next.js / Prisma / conventions. |
| — | `docs/ARCHITECTURE.md` | Historique, **remplacé** par le présent document à terme. |
| — | Rapport « MISSION 02.5 » | Introuvable dans `docs/` et à la racine — audité par inspection réelle (cf. § 16). |

### 2.1 Constat d'audit sur les sources

- `MISSION_00_INITIALISATION_PROJET.md` : **fichier vide (0 octet)** → décisions à confirmer ou archiver.
- Rapport « MISSION 02.5 » : **absent du dépôt** (vérification : `docs/`, racine, glob `*02*`). L'état réel
  a donc été établi par inspection directe du code pour cette mission.
- Le footer de la maquette Stitch (`code.html`) contient des **données légales fictives contradictoires**
  avec celles du cahier des charges (RCCM `CD/KNG/RCCM/19-B-01429`, Id.Nat `01-G4701-N82914K`,
  NIF `A1829472H`, « © 2025 Niumba Transform SARL », « BUKHETE est une marque déposée »).
  → **Ne jamais copier les textes de la maquette Stitch tels quels.** Les valeurs officielles sont celles
  du cahier des charges (§ 1) et de `src/lib/site.ts`.

---

## 3. PRINCIPES D'ARCHITECTURE

1. **Sources de vérité uniques** : chaque information (identité, produits, statuts, tokens) a **une**
   définition officielle, référencée par les autres.
2. **Données via Prisma en priorité** ; les données statiques ne sont que des **repli sûrs**
   (build sans base, erreur temporaire) ou des **références d'énumérations**.
3. **Séparation public / Admin / API** : `(site)`, `admin/`, `api/` sont cloisonnés ; robots exclut `/admin`.
4. **Un composant = une responsabilité** ; primitives dans `components/ui`, blocs publics dans
   `components/site`, chrome Admin dans `components/admin`.
5. **Routes canoniques françaises stables** (cf. § 6) ; les anciennes routes sont redirigées, jamais
   dupliquées simultanément.
6. **Sécurité par défaut** : secrets hors Git, cookies HTTP-only, mots de passe hachés, validation
   systématique des entrées (Zod), permissions vérifiées côté serveur.
7. **Stitch est une référence visuelle, pas un fournisseur de code.** STITCH = source visuelle ;
   Next.js = implémentation. Aucun `code.html`, aucune valeur arbitraire, aucune URL externe
   (images Google, icônes Material) ne doit être copiée dans le projet.
8. **Anti-invention** (cahier § 52) : valeurs inconnues → `[À CONFIRMER]`. Aucun prix, numéro,
   certification ou donnée réglementaire inventée.
9. **Traçabilité** : chaque fonctionnalité doit pouvoir renvoyer vers une section du cahier des charges.

---

## 4. ARBORESCENCE ACTUELLE (résumé d'audit)

```
NIUMBA-TRANSFORM-WEB/
├── .env / .env.example / .gitignore / cookies.txt ⚠️ / AGENTS.md / CLAUDE.md
├── CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md   # source fonctionnelle (racine)
├── MISSION_00_INITIALISATION_PROJET.md      # vide (0 octet)
├── MISSION_01_5_PORTAIL_ADMIN.md            # rapport mission 01.5 (racine)
├── README.md / next.config.ts / tsconfig.json / eslint.config.mjs / postcss.config.mjs
├── stitch_niumba_transform_design_system.zip # 6 Mo, archive source
├── STITCH_EXPORT/stitch_niumba_transform_design_system/
│   └── 13 écrans (code.html + screen.png) + DESIGN.md (racine océane)
├── prisma/
│   ├── schema.prisma / seed.ts / create-admin.ts / create-admin.mjs (référencé mais absent ⚠️)
│   ├── dev.db (ignoré) / migrations/20260912153137_mission02_init/
├── public/media/.gitkeep                    # médias publics VIDE (logos attendus)
├── docs/
│   ├── ARCHITECTURE.md (obsolète à terme) / MISSION_01_REPORT.md
└── src/
    ├── app/
    │   ├── (site)/  accueil·entreprise·produits·categorie/[slug]·produit/[slug]·videos·
    │   │            actualites·innovation-ecologie·commander·devenir-distributeur·contact·
    │   │            politique-de-confidentialite·conditions-utilisation
    │   ├── admin/
    │   │   ├── connexion/page.tsx            # connexion RÉELLE
    │   │   └── (panel)/  dashboard + 13 modules  # dont produits 100% CRUD
    │   ├── api/auth/login · api/auth/logout  # RÉEL
    │   ├── api/admin/products(/[id]) · categories · settings   # RÉEL
    │   ├── layout.tsx · globals.css · not-found.tsx · robots.ts · sitemap.ts · icon.svg · favicon.ico
    ├── components/  ui/ · layout/ · site/(catalogue,forms) · home/ · admin/(products/…)
    ├── data/        catalogue.ts (fallback+types+statuts) · admin.ts · admin-demo.ts · navigation.ts
    ├── services/    catalogue.ts (DB+fallback) · site-settings.ts · admin-products.ts
    ├── db/          client.ts (singleton Prisma)
    ├── validation/  VIDE (.gitkeep)
    └── lib/         auth.ts · password.ts · site.ts · site-types.ts · site-fallback.ts · utils.ts · icons.tsx
```

**Doublons / incohérences détectés (détail aux § 15, 16) :**

1. `src/lib/icons.tsx` (public) **et** `src/components/admin/icons.tsx` (Admin) → deux jeux d'icônes.
2. Statuts de commande divergents : cahier § 33 (`Nouvelle, En traitement, Confirmée, Préparée, Livrée, Annulée`)
   **vs** `src/data/catalogue.ts` et `admin-demo.ts` (`En livraison, Terminée`).
3. Constantes de statuts annoncées dans `schema.prisma` sous `src/lib/constants.ts` mais **réellement
   dans `src/data/catalogue.ts`**.
4. `package.json` référence `prisma/create-admin.mjs` mais le fichier est `prisma/create-admin.ts` ⚠️.
5. 12 photographies JPG de corps réellement stockées **dans `src/app/admin/(panel)/produits/`**
   (aucune référence dans le code, aucun lien DB) — cf. § 11.
6. `docs/ARCHITECTURE.md` mentionne des routes (`commander/… videos/…`) et une organisation qui ont évolué.
7. La maquette Stitch présente des données légales fictives → risque de contamination si copiée (§ 2.1).
8. Deux conventions de « green » : DESIGN.md brut (`#003319`, `#f09a02`) vs tokens code (`#0e4b2a`, `#f59e0b`) (§ 14).
9. `MISSION_00_INITIALISATION_PROJET.md` vide ; rapport 02.5 absent.

---

## 5. ARBORESCENCE CIBLE (décision officielle)

Légende : ==✓ CONSERVÉ · → DÉPLACÉ · ⟲ RENOMMÉ · + FUSIONNÉ · ✗ SUPPRIMÉ (plus tard) · ◆ COMPLÉTÉ==

```
NIUMBA-TRANSFORM-WEB/
├── CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md          ✓  source fonctionnelle (racine, unique)
├── ARCHITECTURE_OFFICIELLE_NIUMBA_TRANSFORM.md      ✓  présent document (racine, unique)
├── AGENTS.md / CLAUDE.md / README.md                ✓  fichiers d'agent + lecture
├── .env / .env.example                              ✓  jamais versionnés (.env*)
├── .gitignore                                       ◆  compléter (cookies.txt, zips, exports…)
├── next.config.ts · tsconfig.json · eslint.config.mjs · postcss.config.mjs   ✓
│
├── ASSETS_OFFICIELS/                                ◆  À CRÉER — source maîtresse (hors rendu web)
│   ├── LOGO/                                        ◆  logo-niumba-vert-bleu.(svg|png), -blanc, -noir, favicon
│   ├── PRODUITS/<slug-produit>/                     ◆  originaux haute résolution par produit
│   └── DOCUMENTS/                                   ◆  fichiers officiels transmis par l'entreprise
│
├── STITCH_EXPORT/                                   ✓  ARCHIVE VISUELLE (lecture seule, jamais copiée)
│   └── stitch_niumba_transform_design_system/…
│
├── prisma/
│   ├── schema.prisma                                ✓
│   ├── seed.ts · create-admin.ts                    ✓  (+ créer create-admin.mjs OU corriger le script)
│   ├── migrations/                                  ✓
│   ├── dev.db  (+ -journal/-wal/-shm)               ✗  rester hors Git (déjà ignoré)
│   └── scripts/                                     ◆  futurs scripts d'audit/export (facultatif)
│
├── public/
│   ├── favicon.ico                                  ✓
│   └── media/                                       ◆  médias SERVIS (copies optimisées) — la seule zone img/* de production
│       ├── logos/         → variantes logo officiel (provisoire : monogramme NT)
│       ├── produits/      ⟲  les 12 JPG actuels y seront déplacés et renommés (slugs)
│       ├── articles/      ◆ futur
│       ├── videos/        ◆ futures miniatures
│       ├── documents/     ◆ futur
│       └── icones/        ◆ futures icônes vectorielles servies
│
├── docs/
│   ├── ARCHITECTURE.md                             ✗  archivé puis remplacé par le document officiel
│   ├── MISSION_01_REPORT.md                        ✓
│   └── missions/                                   ◆  rapports mission par mission (archivage MISSION_01_5, 02.x…)
│
├── tests/                                           ◆  futur (unit · integration · e2e)
│
└── src/
    ├── middleware.ts                                ◆  futur (optionnel : protection /admin, revalidation)
    ├── app/
    │   ├── layout.tsx · globals.css                 ✓  tokens de design (source unique, § 14)
    │   ├── not-found.tsx · robots.ts · sitemap.ts   ✓
    │   ├── (site)/                                  ✓  APPLICATION PUBLIQUE (seul contenu indexable)
    │   │   ├── page.tsx                             ✓  accueil
    │   │   ├── entreprise/                          ✓
    │   │   ├── catalogue/                           ⟲  RENOMMÉE depuis produits/ (canonical § 6)
    │   │   ├── categorie/[slug]/                    ✓
    │   │   ├── produit/[slug]/                      ✓
    │   │   ├── videos/ · video/[slug]/              ✓ + ◆ page détail à créer
    │   │   ├── actualites/ · actualite/[slug]/      ✓ + ◆ page détail à créer
    │   │   ├── innovation-ecologie/                 ✓
    │   │   ├── commander/                           ✓(+◆ formulaire réel à terme)
    │   │   ├── devenir-distributeur/                ✓(+◆ formulaire réel à terme)
    │   │   ├── contact/                             ✓
    │   │   ├── politique-de-confidentialite/        ✓
    │   │   └── conditions-utilisation/              ✓
    │   ├── admin/
    │   │   ├── connexion/                           ✓  RÉEL (layout public isolé)
    │   │   └── (panel)/                             ✓  par module (cf. § 7)
    │   │       ├── layout.tsx · page.tsx            ✓  dashboard RÉEL (compteurs DB)
    │   │       ├── produits/ (+ nouveau, [id]/modifier)  ✓  RÉEL
    │   │       ├── categories/ · commandes/ · distributeurs/ · videos/ · actualites/ ·
    │   │       │   innovation-ecologie/ · medias/ · accueil/ · identite/ ·
    │   │       │   entreprise/ · utilisateurs/ · parametres/   ✓ (↔ SIMULÉ → à connecter, § 7)
    │   └── api/
    │       ├── auth/login · auth/logout            ✓
    │       └── admin/products(/[id]) · categories · settings   ✓ (+◆ CRUD manquants, § 7)
    │
    ├── components/
    │   ├── ui/                                      ✓  PRIMITIVES du design system (public + Admin)
    │   │   (button, badge, container, card, input, select, textarea, table, tabs,
    │   │    dialog, pagination, breadcrumb, states…)    ◆ à compléter
    │   ├── layout/                                  ✓  GLOBAL CHROME : Header, Footer, DevBanner
    │   ├── site/                                    ✓  BLOCS PUBLICS
    │   │   ├── images/logo.tsx                      ⟲  logo (déplacé de site/logo.tsx → cohérence)
    │   │   ├── catalogue/ (product-card, category-card, product-visual, catalogue-explorer)  ✓
    │   │   ├── forms/ (demo-form → commander-form, distributeur-form, contact-form)   ⟲ ◆
    │   │   └── sections/                            +  FUSION de components/home/ (home-hero, brand-identity,
    │   │                                                product-highlights, roadmap, cta-banner)
    │   ├── admin/                                   ✓  CHROME + BLOCS ADMIN (admin-layout, admin-table, …)
    │   │   └── products/ (product-form, product-row-actions)  ✓
    │   └── (icons unifiés)                          +  fusion src/lib/icons.tsx + admin/icons.tsx (§ 15)
    │
    ├── data/                                        ✓  STATIQUE AUTORISÉE uniquement :
    │   ├── catalogue.ts                             ✓  types partagés + FALLBACK (liste officielle § 5)
    │   ├── navigation.ts · admin.ts                 ✓  config de navigation (pas de contenu métier)
    │   ├── constants.ts                             ⟲  statuts/énumérations canoniques (converger avec schema.prisma)
    │   └── demo/ (admin-demo.ts)                    ✗  SUPPRIMÉ une fois l'Admin réel connecté ; aujourd'hui MOCK § 18
    │
    ├── services/                                    ✓  MÉTIER (lecture/écriture Prisma + fallback sûr)
    │   ├── catalogue.ts · site-settings.ts · admin-products.ts   ✓
    │   └── (futurs) orders.ts, distributors.ts, videos.ts, articles.ts, media.ts, users.ts   ◆
    │
    ├── validation/                                  ◆  SCHÉMAS ZOD (Zod à installer) — cf. § 10
    │   ├── auth.ts · product.ts · category.ts · order.ts · distributor.ts ·
    │   ├── content.ts (video, article) · settings.ts · identity.ts · contact.ts · media.ts
    │
    ├── db/client.ts                                 ✓  singleton Prisma
    │
    └── lib/
        ├── auth.ts · password.ts                    ✓
        ├── site.ts · site-fallback.ts · site-types.ts  ✓
        ├── constants.ts                             ⟲  (futur : où les statuts vivent — cf. données)
        ├── utils.ts                                 ✓  cn()
        ├── icons.tsx                                ✓  (fusion des deux jeux à terme)
        └── env.ts                                   ◆  futur : vars d'environnement typées
```

### 5.1 Règles d'emplacement (que placer où)

| Dossier | Rôle | On y place | On n'y place PAS |
| --- | --- | --- | --- |
| `src/app/(site)/` | pages publiques de l'application | pages, layouts de segment public | composants réutilisables, logique métier, données |
| `src/app/admin/` | back-office | pages + layout Admin | composants du site public |
| `src/app/api/` | route handlers (API JSON) | endpoints `auth`, `admin/*` | pages, composants |
| `src/components/ui/` | design system | primitives sans métier (Button, Badge, Input…) | composants liés à un module métier |
| `src/components/layout/` | chrome global public | Header, Footer, DevBanner | contenus de page, composants Admin |
| `src/components/site/` | blocs du site public | catalogue, sections, formulaires publics, logo | composants Admin, primitives UI |
| `src/components/admin/` | back-office | chrome Admin + blocs modules | composants publics |
| `src/data/` | statique métier | fallbacks, navigation, énumérations, config | mock de démo (→ `data/demo` et suppression), secrets |
| `src/services/` | accès aux données / logique métier | fonctions Prisma, appels API serveur | JSX, composants |
| `src/validation/` | validation | schémas Zod uniquement | logique, types de réponse |
| `src/db/` | base | client Prisma (et futur client pool Postgres) | modèle métier (→ prisma/schema) |
| `src/lib/` | utilitaires + config | auth, password, site, utils, icons | accès Prisma (→ services), composants |
| `prisma/` | modèle de données | schema, migrations, seed, scripts | fichiers média, code applicatif |
| `public/media/` | médias générés/servis | images, logos, documents optimisés référencés par `/media/…` | fichiers sources non optimisés, originaux (→ ASSETS_OFFICIELS) |
| `ASSETS_OFFICIELS/` | assets maîtres | logos/produits/documents officiels originaux | captures d'écran, exports Stitch, médias du site |
| `STITCH_EXPORT/` | référence visuelle figée | écrans + DESIGN.md (lecture) | code copié dans `src/` |

---

## 6. ROUTES OFFICIELLES

### 6.1 Décision majeure : `/produits` → `/catalogue`

- Le cahier des charges (§ 12) nomme la page **« Catalogue BUKHETE »** ; la convention officielle est
  donc **`/catalogue`**.
- `/produits` reste **redirigé en 308** vers `/catalogue` (permanence, SEO) et n'est **jamais** servi
  en doublon : un seul titre H1, une seule URL canonique, un seul sitemap.
- Le segment intérieur famille `produit/[slug]` (au singulier) est **conservé tel quel**.

### 6.2 Tableau actuel → cible → décision

**Public (front-office) :**

| Actuel | Cible | Décision |
| --- | --- | --- |
| `/` | `/` | CONSERVÉ (accueil, § 10) |
| `/entreprise` | `/entreprise` | CONSERVÉ (§ 11) |
| `/produits` | `/catalogue` | RENOMMÉ + redirection 308 `/produits → /catalogue` (§ 12) |
| — | `/catalogue/recherche` (filtres/URL) | OPTIONNEL futur (recherche/filtrage côté URL) |
| `/categorie/[slug]` | `/categorie/[slug]` | CONSERVÉ (canonique, singulier français, § 13) |
| `/produit/[slug]` | `/produit/[slug]` | CONSERVÉ (§ 14) |
| `/videos` (page « en construction ») | `/videos` | CONSERVÉ + développement (§ 16) |
| — | `/video/[slug]` | À CRÉER (page vidéo, § 17) |
| `/actualites` (page « en construction ») | `/actualites` | CONSERVÉ + développement (§ 21) |
| — | `/actualite/[slug]` | À CRÉER (page article, § 21) |
| `/innovation-ecologie` | `/innovation-ecologie` | CONSERVÉ (§ 22) |
| `/commander` | `/commander` | CONSERVÉ + formulaire réel à terme (§ 18) |
| `/devenir-distributeur` | `/devenir-distributeur` | CONSERVÉ + formulaire réel à terme (§ 20) |
| `/contact` | `/contact` | CONSERVÉ (§ 23) |
| `/politique-de-confidentialite` | `/politique-de-confidentialite` | CONSERVÉ |
| `/conditions-utilisation` | `/conditions-utilisation` | CONSERVÉ |
| `not-found.tsx` (404) | idem + 403/500 | CONSERVÉ + compléter états système (§ 53) |

**Admin (back-office) :**

| Actuel | Cible | Décision |
| --- | --- | --- |
| `/admin/connexion` | `/admin/connexion` | CONSERVÉ (RÉEL) |
| `/admin` | `/admin` | CONSERVÉ (RÉEL, compteurs DB) |
| `/admin/produits`, `/admin/produits/nouveau`, `/admin/produits/[id]/modifier` | idem | CONSERVÉS (RÉELS) |
| `/admin/categories` | `/admin/categories` | CONSERVÉ (interface à connecter au CRUD) |
| `/admin/commandes` | idem | CONSERVÉ (à connecter aux `Order`) |
| `/admin/distributeurs` | idem | CONSERVÉ (à connecter aux `DistributorRequest`) |
| `/admin/videos` | idem | CONSERVÉ (à connecter aux `Video`) |
| `/admin/actualites` | idem | CONSERVÉ (à connecter aux `Article`) |
| `/admin/innovation-ecologie` | idem | CONSERVÉ (contenu à définir) |
| `/admin/medias` | idem | CONSERVÉ (médiathèque à connecter, uploads) |
| `/admin/accueil` | idem | CONSERVÉ (CMS accueil à connecter) |
| `/admin/identite` | idem | CONSERVÉ (VisualIdentity à connecter) |
| `/admin/entreprise` | idem | CONSERVÉ (SiteSettings à connecter au formulaire) |
| `/admin/utilisateurs` | idem | CONSERVÉ (gestion à connecter) |
| `/admin/parametres` | idem | CONSERVÉ (à connecter) |

**API :**

| Actuel | Cible | Décision |
| --- | --- | --- |
| `POST /api/auth/login` · `POST /api/auth/logout` | idem | CONSERVÉS (RÉELS) + rate limiting à terme |
| `GET/POST /api/admin/products` · `GET/PATCH/DELETE /api/admin/products/[id]` | idem | CONSERVÉS (RÉELS) |
| `GET /api/admin/categories` | + POST/PATCH/DELETE | CONSERVÉ + CRUD à compléter |
| `GET/PATCH /api/admin/settings` | idem | CONSERVÉ (RÉEL) |
| — | `/api/admin/identity` | À CRÉER (VisualIdentity) |
| — | `/api/admin/media` | À CRÉER (uploads contrôlés) |
| — | `/api/public/orders`, `/api/public/distributors`, `/api/public/contact` | À CRÉER (formulaires publics réels) |

### 6.3 Règles de routage

- Les **redirections** se placent avec `redirect()`/`next.config.ts` (`redirects`) en 308 pour la
  permanence ; jamais deux pages de contenu équivalent servies en simultané.
- Le **sitemap** et les **canonical** utilisent uniquement les routes canoniques (`/catalogue`, pas `/produits`).
- Les slugs sont générés par `slugify()` (déjà en place dans `src/data/catalogue.ts`) : minuscules,
  sans accents, tirets, kebab-case, uniques.

---

## 7. ARCHITECTURE ADMIN

### 7.1 Cartographie des 15 routes Admin

| Module | Route | RÉEL | SIMULÉ | PARTIEL | FUTUR | Backend actuel |
| --- | --- | --- | --- | --- | --- | --- |
| Connexion | `/admin/connexion` | ✓ | | | | `api/auth/login`, sessions DB |
| Dashboard | `/admin` | ✓ (compteurs DB) | (sections démo) | | | `prisma.*.count()` |
| Produits | `/admin/produits` (+ nouveau/modifier) | ✓ CRUD complet | | | | products API + ProductForm réels |
| Catégories | `/admin/categories` | | ✓ interface | GET réel | POST/PATCH/DELETE | api GET seul |
| Commandes | `/admin/commandes` | | ✓ demo | | Modèle Order en base | — |
| Distributeurs | `/admin/distributeurs` | | ✓ demo | | Modèle DistributorRequest en base | — |
| Vidéos | `/admin/videos` | | ✓ demo | | Modèle Video en base | — |
| Actualités | `/admin/actualites` | | ✓ demo | | Modèle Article en base | — |
| Innovation & écologie | `/admin/innovation-ecologie` | | ✓ demo | | contenu à définir | — |
| Médias | `/admin/medias` | | ✓ demo | | Modèle Media + uploads | — |
| Accueil | `/admin/accueil` | | ✓ demo | | CMS homepage (future table/sections) | — |
| Identité visuelle | `/admin/identite` | | ✓ demo | | Model VisualIdentity + réser. de candidats logo dans `site-settings.ts` | assets candidates déjà lus |
| Informations entreprise | `/admin/entreprise` | | ✓ read-only | GET réel | formulaire à connecter à PATCH settings | api settings GET/PATCH existent |
| Utilisateurs | `/admin/utilisateurs` | | ✓ demo | | Rôles existants en base, gestion à créer | Role/User en base |
| Paramètres | `/admin/parametres` | | ✓ demo | | config système | — |

### 7.2 Ce qui doit être partagé

- **Layout** : `(panel)/layout.tsx` + `AdminLayout`/`AdminSidebar`/`AdminHeader` — une seule implémentation.
- **Composants Admin partagés** : `AdminPageHeader`, `AdminPanel`, `AdminTable*`, `StatusBadge`,
  `SearchBar`, `FilterBar`, `AdminButton*`, `EmptyState`, `DemoBadge`, `MediaPreview`, `admin-form`.
- **Services** : un premier service par domaine (`src/services/*.ts`) utilisé par les pages ET les
  routes API (pas de `prisma` direct dans les pages — exception : compteurs du dashboard, à migrer).
- **Validations** : schémas Zod par domaine (§ 10), partagés entre formulaires client et réception serveur.
- **Types** : types sérialisables partagés (`AdminProductListItem`, `AdminProductDetail`, …).
- **Permissions** : rôles RÉELS en base (`Role.permissions`, JSON), vérifiées **côté serveur** dans
  chaque route handler/page (helper `requirePermission` à créer). Le layout protège l'ensemble, chaque
  module contrôle ensuite son périmètre.
- **Tokens/design** : même design system que le public (mêmes primitives `ui/*`).
- **Icons** : à terme un seul jeu d'icônes (§ 15).

### 7.3 Principe de présentation

Un module Admin n'est **présenté comme fonctionnel que s'il écrit/lit vraiment Prisma**.
Tant que ce n'est pas le cas, il affiche le badge « Données de démonstration » (`DemoBadge`) ou un
**état clair de non-activation** (règle anti-fiction Admin). Le Dashboard liste l'état réel des modules.

---

## 8. ARCHITECTURE BACKEND

### 8.1 Couches

```
Pages (Server Components)  ──►  Services (src/services/*)  ──►  Prisma (src/db/client.ts)  ──►  SQLite (dev) → PostgreSQL (prod)
          ▲                         │                                                               ▲
Routes API (src/app/api/**)  ──────┘                                                                 │
Validation : schémas Zod (src/validation/*)  appliqués dans les routes API (serveur)                   │
Auth : lib/auth + lib/password  ──►  sessions en base, cookie HTTP-only, contrôle d'accès par rôle      │
Médias : public/media/ (lu par les pages) + ASSETS_OFFICIELS/ (maîtres hors rendu)                      
```

- **Pages** : Server Components par défaut ; composants clients uniquement pour l'interactivité
  (explorateur catalogue, formulaires). Les pages lisent via les **services**, jamais directement Prisma.
- **Routes API** : route handlers Node (explicites `runtime = "nodejs"`). Chaque handler :
  1. valide l'authentification (401 si aucune session) ;
  2. vérifie la permission du rôle (403 si non autorisé) ;
  3. valide le corps avec son schéma Zod (400 si invalide) ;
  4. fait l'opération via un **service** ;
  5. renvoie une réponse JSON typée.
- **Erreurs** : `notFound()`, états 400/401/403/500 explicites ; messages génériques de sécurité
  (ex. connexion « Identifiants incorrects » — déjà en place, ne pas révéler l'existence d'un email).
- **Client Prisma** : singleton (déjà en place `src/db/client.ts`), compatible hot-reload.

### 8.2 Évolutions prévues

- Validation Zod systématique ; rate limiting sur `/api/auth/login` ; CSRF pour les mutations
  (sameSite=lax atténue, à renforcer pour les mutations sensibles) ; journalisation des actions sensibles.
- Migration provider `sqlite → postgresql` (schéma restant compatible) : prévoir une instance Postgres
  hébergée (Neon/Supabase/Vercel Postgres) dès les prévisualisations client avec données réelles,
  car un fichier SQLite **n'est pas persistant** sur Vercel.

---

## 9. ARCHITECTURE PRISMA (cartographie)

### 9.1 Modèles actuels et responsabilités

| Modèle | Table | Domaine | Rôle | État |
| --- | --- | --- | --- | --- |
| `Role` | `roles` | Auth | définition des rôles + permissions (JSON `*`/`products.*`…) | PRÊT |
| `User` | `users` | Auth | comptes Admin (`roleKey`, `active`) | PRÊT |
| `Session` | `sessions` | Auth | sessions persistées (`tokenHash` sha256, `expiresAt`, `lastUsedAt`) | PRÊT |
| `Category` | `categories` | Catalogue | catégories officielles (slug unique, `sortOrder`) | PRÊT |
| `Product` | `products` | Catalogue | références BUKHETE (slug unique, statut, actif, fiche complète, `image`, `featured`) | PRÊT |
| `ProductImage` | `product_images` | Catalogue | galerie produit (`url`, `alt`, `position`) | PRÊT |
| `Media` | `media` | Médias | bibliothèque média (type IMAGE/VIDEO/DOCUMENT) — **modèle minimal** | MINIMAL |
| `Order` | `orders` | Commerce | commandes (`reference` unique, client, coordonnées, statut, `items`) | PRÊT (non utilisé) |
| `OrderItem` | `order_items` | Commerce | lignes de commande (`productName` figé, `quantity`) | PRÊT (non utilisé) |
| `DistributorRequest` | `distributor_requests` | Commerce | candidatures distributeur (`companyName`, contact, `zone`, `message`, statut) | PRÊT (non utilisé) |
| `Video` | `videos` | Contenus | vidéothèque (titre, url, durée, description, statut) | MINIMAL |
| `Article` | `articles` | Contenus | actualités (`title`, `slug` unique, `category`, `excerpt`, `content`, statut) | MINIMAL |
| `SiteSettings` | `site_settings` | Site | paramètres entreprise, singleton `id=1`, `social` en JSON | PRÊT |
| `VisualIdentity` | `visual_identity` | Site | chemins des assets officiels (logo variants, favicon), singleton `id=1` | PRÊT |

### 9.2 Relations

```
Role 1──* User 1──* Session
Category 1──* Product 1──* ProductImage      Product 1──* OrderItem *──1 Order
                                              *──1 DistributorRequest          (lignes)
(site_settings / visual_identity : singletons)

Video       (aucune relation produit — à prévoir : `productId?` optionnel)
Article     (aucune relation auteur/catégorie en base — `category` chaine, pas d'auteur)
Media       (autonome, non relié aux products)
```

### 9.3 Problèmes / écarts relevés (à corriger lors d'une mission données, PAS maintenant)

1. **Statuts de commande non alignés** : cahier § 33 (6 statuts : Nouvelle, En traitement, Confirmée,
   Préparée, Livrée, Annulée) vs code (`En livraison`, `Terminée`) → définir **une liste canonique**
   (`src/data/constants.ts`), la réutiliser partout (seed, API, badges, filtre).
2. `Role.permissions` et `SiteSettings.social` stockés en JSON-TEXT → valider le JSON à l'écriture
   (Zod), documenter le format.
3. `Video` : ajouter plus tard `thumbnail`, `productId?`, `category?`.
4. `Article` : ajouter plus tard `author`, `category` en FK optionnelle, champs SEO
   (`metaTitle`, `metaDescription`), `publishedAt` déjà présent.
5. `DistributorRequest` : ajouter plus tard `internalNotes`, adresse/localité distinctes.
6. `Media` : minimal — à étendre (dimensions, taille, mimeType, utiliséPar) pour la médiathèque.
7. Commerce futur : comptes clients, panier, prix/stock, facturation, historique livraison
   (ne PAS les ajouter avant que la phase commande le demande — principe de simplicité).
8. `Order.status`/`Product.status` en TEXT : acceptable en SQLite ; possibilité d'enums PostgreSQL
   lors de la migration (à décider, sans urgence).

### 9.4 Ce qui reste simple pour la phase actuelle

- Pas de prix, de stock ni de paiement tant que l'entreprise ne les a pas fournis (anti-invention § 52).
- Pas de table de traductions ; pas de CMS riche (markdown simple suffit).
- Pas de migration Postgres tant que la prévisualisation client ne l'exige pas.

---

## 10. ARCHITECTURE VALIDATION (Zod)

`src/validation/` est actuellement vide (Zod non installé). Architecture recommandée — **un schéma par domaine** :

| Fichier | Apports |
| --- | --- |
| `validation/auth.ts` | `loginSchema` (email, password), `changePasswordSchema` |
| `validation/product.ts` | création/mise à jour produit (+ galerie = array d'URL), statuts canoniques |
| `validation/category.ts` | slug/label/description/sortOrder |
| `validation/order.ts` | commande publique (produit, quantité, nom, téléphone, WhatsApp, adresse, notes) |
| `validation/distributor.ts` | candidature distributeur (champs § 20) |
| `validation/content.ts` | video + article (titre, contenu, statut, slug, image…) |
| `validation/settings.ts` | SiteSettings (coordonnées, social JSON) |
| `validation/identity.ts` | VisualIdentity (chemins logo) |
| `validation/contact.ts` | formulaire contact |
| `validation/media.ts` | upload média (type, taille, mimeType) |

Règles :
- Les schémas sont utilisés **côté serveur** (routes API, services) — source de vérité.
- Réutilisables côté client pour les formulaires (zod + erreurs lisibles) via une couche légère (`zod` standard).
- Liste unique des statuts venant de `data/constants.ts`, injectée dans les schémas (pas de duplication).
- Pas d'accès Prisma dans `validation/` ; pas de types de réponse — uniquement des schémas d'entrée.

---

## 11. ASSETS OFFICIELS & PHOTOS PRODUITS

### 11.1 Dossier `ASSETS_OFFICIELS/` (à créer)

```
ASSETS_OFFICIELS/
├── LOGO/
│   ├── logo-niumba-transform-vert-bleu.svg|png    # logo principal (fond clair)
│   ├── logo-niumba-transform-blanc.svg|png        # variante fond sombre
│   ├── logo-niumba-transform-noir.svg|png         # variante fond clair
│   └── favicon.ico|svg
├── PRODUITS/
│   └── <slug-produit>/
│       ├── bouteille-1.jpg  · bouteille-2.jpg  · …
└── DOCUMENTS/                                     # documents officiels (PDF…) — à trier
```

**Règles :**
- **ASSETS_OFFICIELS = source maîtresse** (hors rendu) ; il n'est PAS servi par le web.
- Les fichiers réellement rendus par le site vivent dans **`public/media/`** (logos → `media/logos/`,
  produits → `media/produits/`), en versions optimisées (webp/JPEG compressé, dimensions limitées).
- **Aucune image de la maquette Stitch n'est un asset officiel** NIUMBA TRANSFORM (§ 50).
- Séparer : assets officiels / exports Stitch / captures d'écran / médias temporaires / assets techniques.
- Règle anti-falsification (cahier § 15) : ne jamais retoucher, déformer ou recréer emballages,
  étiquettes, logos et proportions officiels. Pas de citrons/fruits décoratifs non justifiés.
- PNG haute résolution transparent si pas de SVG ; privilégier le SVG (§ 27).

### 11.2 Les 12 JPG dans `src/app/admin/(panel)/produits/`

| Élément | Constat |
| --- | --- |
| Nature | Photographies réelles de bouteilles BUKHETE (lave-mains, vaisselle, lessive, sol, multi-usages), ~450-615 Ko, 1107×960 (quelques formats verticaux/carrés) |
| Emplacement actuel | Dossier de routes App Router (`admin/(panel)/produits/`) ⇒ fichiers morts, jamais servis ni référencés |
| Liens DB | Aucun : ni `Product.image` ni `ProductImage` (seed sans image) |
| Statut | **PROVISOIRE** : premier lot de photographies fournies, mais `ASSETS_OFFICIELS/` absent → à valider comme officiel une fois l'entreprise confirmée |
| Noms | Contiennent des fautes/originales (« pouer », « pouer Multi usages », « lave-mains.02 »…) |
| Décision de placement (MISSION 02.8) | ⟲ Déplacer vers `public/media/produits/` avec **noms de fichiers normalisés** en `slug-produit_NN.jpg` (kebab-case), ⟲ renommer les slugs, ⟲ renseigner `Product.image` / `ProductImage.url` dans la base, ✗ puis retirer les originaux du dossier `admin/(panel)/produits/` |
| Préparation arrivée des autres produits | Convention de dossier par slug (`media/produits/savon-en-barre/…`), upload via Admin → Médias → produit lié ; `ASSETS_OFFICIELS/PRODUITS/<slug>/` pour les originaux ; scripts d'optimisation (taille/format) à prévoir |

> ⚠️ **Non exécuté durant la mission 02.6** (analyse uniquement). Aucun déplacement effectué.

---

## 12. ARCHITECTURE MÉDIAS

- **Dépôt** : `public/media/` (seule arborescence média *servie*) avec sous-dossiers métiers :
  `logos/`, `produits/`, `articles/`, `videos/`, `documents/`, `icones/`.
- **Référencement** : les champs `image` (Product), `url` (ProductImage/Media/Video), chemins
  `VisualIdentity` pointent toujours vers des URL publiques `/media/…`.
- **Médiathèque Admin** : connectée au modèle `Media` (upload serveur, contrôle type/taille,
  aperçu, recherche, suppression). Uploads **jamais dans `src/`**, toujours sous `public/media/`,
  avec noms slugifiés et horodatés si besoin pour éviter les collisions.
- **Originaux vs rendu** : `ASSETS_OFFICIELS/` = maîtres ; `public/media/` = fichiers rendus optimisés.
- **Police de contenu** : un fichier média d'un type donné n'existe qu'à exactement une URL ; pas de
  doublons de fichiers à des emplacements différents.

---

## 13. ARCHITECTURE COMPOSANTS

### 13.1 Découpage (cf. § 5)

- `components/ui/` — **primitives** du design system, sans logique métier : `Button`, `Badge`,
  `Container`, et à venir `Card`, `Input`, `Select`, `Textarea`, `Table`, `Tabs`, `Dialog`,
  `Pagination`, `Breadcrumb`, `State*` (loading/empty/error). Utilisées par le public ET l'Admin.
- `components/layout/` — chrome global public : `Header`, `Footer`, `DevBanner`.
- `components/site/` — blocs publics : `logo.tsx`, `catalogue/*`, `sections/*` (ex‑`home/*`),
  `forms/*` (commander/distributeur/contact, remplacement du `DemoForm` à terme).
- `components/admin/` — chrome + blocs Admin : `admin-layout`, `admin-sidebar`, `admin-header`,
  `admin-table`, `admin-form`, `status-badge`, `products/*`, etc.

### 13.2 Règles

- Une primitive `ui/*` ne connaît pas les modèles métier. Un bloc `site/*`/`admin/*` consomme des
  primitives et des données (services/types).
- Toutes les classes visuelles passent par les **tokens** (§ 14) : pas de hex/ombres arbitraires
  sauf liste contrôlée d'ombres documentées.
- Un composant client porte `"use client"` uniquement si nécessaire (interactivité/état local).
- Icônes : **un seul jeu à terme** (fusion `lib/icons.tsx` + `admin/icons.tsx`) ; aujourd'hui deux
  jeux compatibles stroke — documenter et converger progressivement.
- Naming : composants en `PascalCase.tsx` ; exports nommés ; fichiers de dossier (`index` non imposé).

---

## 14. DESIGN SYSTEM (gouvernance)

### 14.1 Constat d'écart

| Rôle | DESIGN.md (Stitch brut) | Tokens code (`globals.css`) | Écart |
| --- | --- | --- | --- |
| Primaire / forêt | `primary: #003319`, container `#0e4b2a` | `--color-primary #0e4b2a` | Vert différent signalé à l'audit |
| Secondaire / émeraude | `secondary: #006d40`, container `#8af5b4` | `--color-secondary #008751`, `-dark #006d40` | rendition plus vive |
| Accent citron | `tertiary-container #f09a02` | `--color-tertiary #f59e0b` | tonalité citron retenue |
| Neutres / texte / bordure | `#faf8ff`–surfaces Material | `#ffffff/#f8fafc`, `#0f172a/#475569`, `#e2e8f0` | choix éditorial Stitch (§ narrative) |
| WhatsApp | `#25D366` | `#25d366` | conforme |
| Typo | Plus Jakarta Sans 400–800 | Plus Jakarta Sans (`next/font`) | conforme |
| Boutons / rayons / layout | pill, radius 12–32px, max 1280px | tokens + classes approximantes | conforme |

### 14.2 Règle officielle (décision)

1. **Source unique des tokens** = `src/app/globals.css` (`@theme` Tailwind v4). Toute couleur,
   rayon, ombre, espacement utilisé dans les composants **doit** référencer un token.
2. **Palette officielle validée** (pour les composants sans arbitraire) :
   `primary #0E4B2A` · `primary-dark #0A341D` · `primary-deep #062816` · `primary-soft #E8F5E9` ·
   `secondary #008751` · `secondary-dark #006D40` · `secondary-soft #D1FAE5` ·
   `tertiary #F59E0B` · `tertiary-soft #FEF3C7` · `whatsapp #25D366` · `whatsapp-dark #1DA851` ·
   `ink #0F172A` · `ink-muted #475569` · `ink-soft #64748B` · `surface #FFFFFF` ·
   `surface-subtle #F8FAFC` · `border-soft #E2E8F0` · `emploi #1D4ED8` · `emploi-soft #EFF6FF`.
   → Les valeurs brutales DES MATERIAL de Stitch (`#003319`, `#f09a02`, surfaces lavande Material)
   sont **écartées** ; seul le DESIGN.md *narratif* (forêt #0E4B2A, émeraude #008751, citron #F59E0B)
   fait foi (cohérent avec le code actuel — « le vert » de l'audit est neutralisé).
3. **Typographie** : échelle documentée (display-hero 52/60 extrabold −0.03em ; headline-xl 36/44 ;
   headline-lg 24/32 ; headline-md 20/28 ; headline-sm 16/24 ; body-lg 18/28 ; body-md 15/22 ;
   body-sm 13/18 ; label-lg 14/20 ; label-md 12/16 ; label-sm 11/14) — à traduire en tokens
   Tailwind (`--text-*`) ou classes composants.
4. **Spacing** : échelle xs .25 / sm .5 / md 1 / lg 1.5 / xl 2.5 rem en tokens (`--space-*`) + gutter
   container 1280px, marges mobiles 16px.
5. **Radius** : `rounded-full` (boutons/chips), `rounded-2xl` (cartes), `rounded-xl` (vignettes),
   `rounded-3xl` (conteneurs hero). Tokens (`--radius-sm/md/lg/xl/full`) à formaliser.
6. **Ombres** : hiérarchie Stitch (niveaux 0→4) traduite en tokens :
   lev1 `0 2px 8px -2px rgba(15,23,42,.04)` ; lev2 `0 12px 24px -6px rgba(14,75,42,.08), 0 4px 8px
   -2px rgba(0,0,0,.04)` ; lev3 flou 12px blanc/92 ; lev4 panneaux inversés.
7. **Composants officiels** : boutons (primary/outline/secondary/ghost/WhatsApp), badges/chips,
   cartes produit, catégories, tableaux Admin, formulaires, table, états (vide/chargement/erreur/
   succès/disabled/focus) — les primitives `ui/*` sont l'unique implémentation autorisée.
8. **Responsive** : 12 col desktop, 8 col tablette, 4 col mobile (Stitch) ; le responsive est conçu
   dès la conception d'un composant (cahier § 42), jamais par simple zoom.
9. **Interdits** : valeurs hex/nbsp arbitraires dans les composants (sauf ombres documentées),
   classes arbitraires `bg-[…]`/`shadow-[…]` non contrôlées, forks de palette locale.

---

## 15. CONVENTIONS OFFICIELLES

| Élément | Convention |
| --- | --- |
| Langue des noms | Code en anglais technique (identifiants, fonctions) ; **texte et slugs en français** (contenu). Slugs : kebab-case, minuscules sans accents (`slugify()`). |
| Fichiers | `*.ts`/`*.tsx`, PascalCase pour composants, camelCase pour fonctions/variables, UPPER_SNAKE pour constantes |
| Routes | kebab-case, singulier français (`categorie`, `produit`, `video`, `actualite`) ; les listes au pluriel (`produits`→`catalogue`, `videos`, `actualites`) |
| Composants | un composant par fichier, export nommé, `PascalCase.tsx` dans le bon bucket (§ 13) |
| Fonctions | `camelCase`, verbe d'action (`get*`, `create*`, `update*`, `delete*`, `require*`, `is*`, `to*`) |
| Services | `src/services/<domaine>.ts`, fonctions async, retour de types métier sérialisables, jamais de JSX |
| API | `src/app/api/<domaine>/<action>/route.ts` ; handlers `GET/POST/PATCH/DELETE` ; code 401/403/400/404/500 |
| Modèles | `PascalCase` singulier (Prisma), `@@map` snake_case pluriel (`products`, `order_items`) |
| Slugs | `slugify()` unique obligatoire (« produit-2 » en cas de collision) |
| Variables d'environnement | `DATABASE_URL`, `APP_ENV`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAIL/PASSWORD/NAME` (serveur), préfixe `NEXT_PUBLIC_` interdit pour les secrets |
| Imports | alias absolu `@/*` → `./src/*` ; ordre : react/next → libs → `@/lib` → `@/data` → `@/services` → composants |
| Dossiers | chaque chose au bon endroit (§ 5.1) ; aucune donnée de démo dans `data/` permanent (→ `data/demo`) |
| Secrets | jamais dans le code, jamais commités ; `.env*` ignoré ; cookies/tokens jamais versionnés |
| Date/heure | ISO UTC en base, formatage fr-FR à l'affichage |
| Erreurs | messages utilisateur français, génériques côté sécurité ; `throwing`/`notFound()` côté page |

Objectif : **un développeur ou agent doit savoir immédiatement où placer un nouveau fichier**
(fichier page → app/<segment> ; composant → components/<bucket> ; service → services/ ; schéma →
validation/ ; donnée statique → data/ ; util → lib/ ; média → public/media/).

---

## 16. SÉCURITÉ (audit et actions futures)

### 16.1 Situation relevée

- `cookies.txt` à la racine : fichier de cookies au format Netscape contenant un **token de session
  réel** (`nt_admin_session`) — **CRITIQUE** : un cookie de session valide volé/publié permet
  d'usurper la session de l'administrateur sur le serveur local et sa traçabilité est celle du thème
  par défaut des navigateurs. Il n'est **pas** dans `.gitignore`.
- `.env` : contient `DATABASE_URL`, `APP_ENV`, `ADMIN_EMAIL` et **`ADMIN_PASSWORD`** (valeurs non
  vides). Correctement ignoré par `.env*` → **ne sera pas commité**. Ne jamais le recopier/partager.
- Haute qualité déjà en place : hachage scrypt (`timingSafeEqual`), cookie `httpOnly + sameSite=lax +
  secure en prod`, sessions persistées en base (token stocké **haché** sha256), messages de connexion
  génériques, `robots` exclut `/admin`.
- `prisma/dev.db` : contient des hashes de mots de passe et des hashes de sessions — ignoré,
  mais ne doit jamais être transmis hors machine.
- Après un login, des données session sont en base ; en développement local les protections
  `secure` ne s'appliquent pas (attendu).

### 16.2 Actions — MISSION 02.7 (ordonnées)

1. **Supprimer `cookies.txt`** (fichier à purger de la machine).
2. **Révoquer la session associée** (supprimer la ligne correspondante dans `prisma/dev.db`
   ou régénérer la base en dev) — par sécurité, supprimer le fichier + les sessions ou se reconnecter.
3. **Ajouter à `.gitignore`** : `/cookies.txt`, `*.txt` ciblés (cookies), logs (`*.log`),
   export zips Stitch (`/stitch_*.zip`), éventuels fichiers session/cookies locaux
   (`.vercel` déjà présent).
4. **Vérifier Git** : aucun commit n'existe ; vérifier `git status`/`git ls-files` avant le premier
   commit (aucun secret, aucun `.env`, aucune base).
5. **Avant le premier commit** : confirmer que ni `.env`, ni `cookies.txt`, ni `dev.db`, ni
   `*.tsbuildinfo`, ni `.next` ne seront ajoutés ; ajouter explicitement ce qui doit être suivi.
6. **Avant Vercel** : paramétrer les variables d'environnement **dans le tableau de bord Vercel**
   (jamais dans le code) : `DATABASE_URL` (Postgres), `NEXT_PUBLIC_SITE_URL` (URL de la prévisualisation),
   `ADMIN_*` (nouveaux identifiants forts, **pas** ceux du `.env` local) ; NODE_ENV=production géré
   par Vercel (`secure` cookies actifs).
7. **Contrôle permanent** : helper Git « lint des secrets » (grep `ADMIN_PASSWORD=`, token,
   `password`, `SESSION`…) à passer avant chaque push ; rotation des mots de passe si le repo a été
   exposé un jour.

### 16.3 Durcissement futur (missions suivantes)

- Rate limiting sur `/api/auth/login` et formulaires publics (anti brute-force / anti-spam).
- Validation Zod sur 100 % des entrées (§ 10) ; contrôle des uploads (type/taille mime côté serveur).
- CSRF renforcé pour les mutations; `__Host-` prefix cookie si faisable; périmètre des permissions
  par route (`requirePermission`).
- Headers de sécurité globaux (CSP, X-Frame-Options, Referrer-Policy) via `next.config.ts`.
- Journalisation des actions sensibles (produits supprimés, paramètres modifiés, connexions).
- Audit de dépendances (`npm audit`) avant mise en production.

---

## 17. GIT (stratégie)

État : branche `main`, **aucun commit** enregistré (20 entrées non suivies). Fenêtre idéale pour
partir propre.

### 17.1 Fichiers à exclure (`.gitignore` à compléter)

```
# déjà présents
node_modules, .next/, out/, build/, .DS_Store, *.pem, logs, .env*, prisma/*.db*, .vercel
*.tsbuildinfo, next-env.d.ts, coverage

# à AJOUTER (mission 02.7)
/cookies.txt
*.log
/stitch_niumba_transform_design_system.zip   # ou tout /stitch_*.zip (archive lourde)
```

### 17.2 Premier commit recommandé (à l'accord du chef de projet)

1. Nettoyage sécurité (§ 16.2) : suppression `cookies.txt` ; purge de session ; `.gitignore` complété.
2. `git add` ciblé des fichiers whitelistés : config (next/ts/eslint/postcss), `src/`, `prisma/`
   (hors `dev.db`), `public/`, `docs/`, rapports de mission, `STITCH_EXPORT/` (extraits), README,
   AGENTS.md, cahier des charges, présent document.
3. `.env.example` oui (modèle) ; `.env` non.
4. Message en français, style du projet (ex. `feat: fondations NIUMBA TRANSFORM — stack, catalogue, admin`) ;
   un commit initial unique suffit ; suivre ensuite `feat/fix/chore/docs/refactor`.
5. Pousser sur GitHub (dépôt `niumba-transform-web`, compte configuré) puis importer dans Vercel
   pour la prévisualisation (# workflow LOCAL → GitHub → Vercel du rapport MISSION_01).

### 17.3 Principes

- Jamais de secrets, jamais de base locale, jamais de médias inutilement lourds dans l'historique.
- `ASSETS_OFFICIELS/` : optionnel en Git (si volumineux/confidentiel → **ignoré**) ; l'essentiel pour
  Vercel est `public/media/` qui lui est suivi.
- Un commit = un changement cohérent ; messages PRÉCIS en français ; ne pas committer des états
  cassants (lint/typecheck verts).
- Tags de version (`v0.2.0`…) alignés sur `buildVersion` de `src/lib/site.ts`.

---

## 18. DONNÉES RÉELLES vs MOCK (classification officielle)

| Zone | État | Détail |
| --- | --- | --- |
| Identité (siteConfig) | **RÉEL** | valeurs cahier des charges § 1-2, § 5, `[À CONFIRMER]` pour contact/social |
| Catégories officielles | **RÉEL** | § 13, seed + DB |
| Produits (9 références) | **RÉEL (liste)** | § 5, en base ; images/prix/compositions : **PROVISOIRE / [À CONFIRMER]** |
| Catalogue public | **RÉEL (DB)+fallback** | `services/catalogue.ts` |
| Authentification / sessions | **RÉEL** | base + cookies HTTP-only |
| Produits Admin CRUD | **RÉEL** | API + formulaires |
| Paramètres entreprise (API) | **RÉEL** | GET/PATCH `site_settings` (interface page encore lue seule) |
| Dashboard (compteurs) | **RÉEL** | `prisma.*.count()` |
| Header/Footer | **RÉEL (DB)+fallback** | SiteSettings + assets candidats |
| Logo « NT » | **PROVISOIRE** | monogramme Stitch en attendant ASSETS_OFFICIELS |
| `ProductVisual` (« Visuel officiel à venir ») | **PROVISOIRE** | panneau neutre anti-invention |
| 12 photos JPG | **PROVISOIRE** | première remise, placements hors norme (§ 11.2) |
| Commandes/demandes (Admin) | **SIMULÉ** | `demoOrders`, `demoDistributors` |
| Vidéos / Actualités (Admin) | **SIMULÉ** | `demoVideos`, `demoArticles` |
| Catégories (page Admin) | **SIMULÉ** | `demoCategories` (API GET réelle seulement) |
| Utilisateurs/Rôles (page Admin) | **SIMULÉ** | `demoUsers`, `demoRoles` (rôles réels en base) |
| Médias / Accueil / Identité (pages Admin) | **SIMULÉ** | `demoLogoVariants`, `demoHomeSections` |
| Entreprise / Paramètres (pages Admin) | **SIMULÉ (lecture)/à connecter** | formulaires non câblés aux PATCH existants |
| Formulaires publics (commander/distributeur) | **SIMULÉ** | `DemoForm` : aucune transmission |
| Pages sous « en construction » (videos, actualites, légales) | **PROVISOIRE** | gabarit `PageUnderConstruction` |
| Pages Entreprise / Contact / Innovation | **RÉEL (statique)** | contenu du cahier, données non inventées |
| Données de la maquette Stitch (RCCM/NIF fictifs, urls externes) | **À NE JAMAIS COPIER** | ©, SARL, chiffres inventés |
| Sitemap / robots | **PROVISOIRE** | liste statique à faire évoluer (DB + routes canoniques) |

Règle : une donnée affichée **public/admin réelle** doit venir de Prisma (ou du cahier des charges
en attendant le modèle). Toute donnée de démo reste **clairement marquée** (`DemoBadge`, préfixe
« Démo », message explicite) et sera supprimée à la connexion du module correspondant.

---

## 19. PLAN DE NORMALISATION (ordre de missions — à valider par le chef de projet)

### MISSION 02.7 — Sécurité & Git (URGENT, CRITIQUE)
- Supprimer `cookies.txt` ; révoquer la session ; purger `.env` de tout secret réel superflus (ou garder local, jamais partagé).
- Compléter `.gitignore` ; vérifier `git ls-files`/`git status` ; **premier commit propre**.
- Vérifier dépendances (`npm audit`), préparer Vercel (variables d'env, zéro secret en code).
- Intro : pas de fonctionnalité nouvelle.

### MISSION 02.8 — Normalisation arborescence & assets
- Déplacer/renommer les 12 JPG → `public/media/produits/` (slugs canoniques), lier `Product.image`/`ProductImage`.
- Créer `ASSETS_OFFICIELS/` (LOGO/PRODUITS/DOCUMENTS) ; intégrer logos officiels dès réception.
- Purger les doublons (`MISSION_00` vide, rapports → `docs/missions/`, suppression fichiers morts).
- Fusion icons, corriger `create-admin.mjs`/`.ts` + script package.json.

### MISSION 02.9 — Harmonisation routes & navigation
- `/catalogue` canonical + redirection 308 `/produits` ; sitemap/canonical alignés.
- Créer les pages `/video/[slug]`, `/actualite/[slug]` (stubs) ; aligner la navigation (data/navigation) sur l'officiel.
- Unifier les statuts de commande sur le cahier § 33.

### MISSION 02.10 — Design system & tokens officiels
- Formaliser tokens (palette validée, typo, spacing, radius, shadows) dans `globals.css`.
- Compléter les primitives `ui/*` (Card, Input, Select, Textarea, Table, Tabs, Dialog, Pagination, Breadcrumb, états).
- Remplacer les classes arbitraires ; fusion des jeux d'icônes.

### MISSION 03.0 — Validation & Backend réel
- Installer Zod ; créer `src/validation/*` ; brancher les routes API existantes + nouvelles.
- Créer `data/constants.ts` (statuts canoniques) ; services `orders`, `distributors`, `videos`, `articles`.
- Connexion réelle des formulaires publics (commander → Order + WhatsApp, distributeur → DistributorRequest, contact).

### MISSION 03.5 — Admin réel (modules)
- Catégories CRUD complet ; commandes ; distributeurs ; vidéos ; actualités ; utilisateurs/rôles + permissions serveur.
- Suppression du `DemoBadge` au fur et à mesure de l'activation réelle ; suppression de `data/admin-demo.ts`.

### MISSION 03.8 — Médias & CMS
- Médiathèque (`Media` + uploads contrôlés) ; intégration des assets logo ; CMS accueil + identité + entreprise
  connectés aux modèles/settings ; formulaire d'entreprise branché sur PATCH settings.

### MISSION 04.0 — Commandes publiques & e-commerce
- V1 commande via WhatsApp (numéro officiel), panier léger ; API sécurisée ; journalisation.
- Préparation de comptes clients, paiement Mobile Money, stock, facturation (architecture seulement si demandé).

### MISSION 04.5 — Qualité, SEO, perf, accessibilité
- Sitemap dynamique (DB), données structurées produits, canonical ; tests (unitaire sur services/validations,
  e2e parcours commande) ; audit perf/accessibilité (cahier § 43-45).

### MISSION 04.9 — PostgreSQL & déploiement prévisualisation/production
- Migration provider → PostgreSQL (schéma compatible), migration des données.
- Vercel : prévisualisation client → validation → production ; variables d'env de production.

---

## 20. ORDRE RECOMMANDÉ DES PROCHAINES MISSIONS (synthèse)

```
02.7 Sécurité & Git          (bloquant — affecte tout le reste)
02.8 Arborescence & assets   (structure propre avant d'ajouter)
02.9 Routes & navigation     (URLs stables avant SEO/publication)
02.10 Design system          (cohérence visuelle avant nouveaux composants)
03.0 Validation & backend    (formulaires publics réels)
03.5 Admin réel              (modules administratifs connectés)
03.8 Médias & CMS            (médiathèque, identité, accueil, entreprise)
04.0 Commandes & e-commerce  (V1 WhatsApp → évolutions)
04.5 Qualité, SEO, tests
04.9 PostgreSQL & déploiement (prévisualisation client puis production)
```

> Validation : chaque mission se clôt par lint + typecheck + build verts, rapport dans `docs/missions/`,
> et accord explicite du chef de projet avant la suivante (aucun enchaînement automatique).

---

*Document de conception produit par la mission 02.6. Aucun code fonctionnel n'a été modifié durant
cette mission.*