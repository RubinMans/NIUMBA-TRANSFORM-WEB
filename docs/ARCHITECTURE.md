# Architecture technique — NIUMBA TRANSFORM

> Source : cahier des charges (fonctionnel), Stitch `STITCH_EXPORT/` (visuel).
> Version : mission 01 — mise à jour au fil des missions.

## 1. Stack validée

| Domaine | Choix | Justification |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Stack validée mission 00, compatible Vercel |
| Langage | TypeScript 5 | Typage et maintenabilité |
| Styling | Tailwind CSS v4 (design tokens CSS) | Tokens issus du `DESIGN.md` Stitch |
| Typographie | Plus Jakarta Sans (`next/font`) | Décision Stitch |
| ORM | Prisma 6 | Préparé ; SQLite en dev, PostgreSQL en prod |
| Validation | Zod | Préparé dans `src/validation/` (missions suivantes) |
| Bases de données | SQLite (dev) → PostgreSQL (prod Vercel) | Conforme au cahier des charges |

## 2. Arborescence

```
NIUMBA-TRANSFORM-WEB/
├── CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md   # source de vérité fonctionnelle
├── MISSION_00_INITIALISATION_PROJET.md       # décisions initiales (à compléter)
├── STITCH_EXPORT/                            # export Stitch : référence visuelle
│   └── stitch_niumba_transform_design_system/
├── docs/
│   ├── ARCHITECTURE.md                       # présent document
│   └── MISSION_01_REPORT.md                  # rapport d'audit et décisions
├── prisma/
│   └── schema.prisma                         # client + datasource (SQLite dev)
├── public/
│   └── media/                                # médias publics (photos, logos…)
└── src/
    ├── app/                                  # ROUTES (App Router)
    │   ├── (site)/                           # APPLICATION PUBLIQUE
    │   │   ├── layout.tsx                    # header + footer + bandeau dev
    │   │   ├── page.tsx                      # Accueil
    │   │   ├── entreprise/…
    │   │   ├── produits/…
    │   │   ├── commander/…  videos/…
    │   │   └── … (pages au fil des missions)
    │   ├── admin/                            # ADMINISTRATION (back-office)
    │   ├── layout.tsx                        # racine : fonts, metadata, html/body
    │   ├── globals.css                       # tokens de design (Tailwind v4)
    │   ├── not-found.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── components/                           # COMPOSANTS
    │   ├── ui/                               # design system (Button, Badge, Container…)
    │   ├── layout/                           # Header, Footer, DevBanner…
    │   ├── site/                             # éléments transverses (Logo, gabarits)
    │   └── home/…                            # sections de la page d'accueil
    ├── data/                                 # DONNÉES statiques (navigation…)
    ├── services/                             # SERVICES métier (API, accès données)
    ├── validation/                           # VALIDATION (schémas Zod)
    ├── db/                                   # BASE DE DONNÉES (client Prisma)
    └── lib/                                  # CONFIGURATION & UTILITAIRES
        ├── site.ts                           # configuration centrale de l'entreprise
        ├── icons.tsx                         # icônes SVG
        └── utils.ts                          # helpers (cn)
```

## 3. Principes d'organisation

- **Application publique** : route group `(site)` — tout ce qui est visible en front-office.
- **Administration** : route `admin/` — isolée du site public, `robots.txt` l'exclut du
  référencement ; authentification à venir.
- **Design system** : composants primitifs dans `components/ui/` (couleurs, formes, espacements
  conformes à Stitch). Les pages les assemblent.
- **Données** : constantes/énumérations dans `src/data/`.
- **Services** : logique métier, appels API, accès Prisma — dans `src/services/`.
- **Validation** : schémas Zod des formulaires dans `src/validation/`.
- **Configuration** : `src/lib/site.ts` centralise les informations de l'entreprise
  (cahier § 28 : téléphone, adresse, coordonnées, statut…), réutilisées par Header,
  Footer, Contact, Commandes, Distributeurs.
- **Médias** : `public/media/` pour les fichiers publics ; l'admin disposera d'une
  médiathèque (cahier § 37).

## 4. Branding

- NIUMBA TRANSFORM = **entreprise** ; BUKHETE = **marque commerciale** (cahier § 26).
- Logo : en attente des ASSETS OFFICIELS → monogramme provisoire « NT » conforme Stitch,
  remplacé dès réception du logo officiel (cahier § 27).

## 5. Correspondance cahier des charges → routes actuelles

| Exigence (cahier) | Route | Statut mission 01 |
| --- | --- | --- |
| § 10 Accueil | `/` | Base minimale livrée |
| § 11 Entreprise | `/entreprise` | Page « en construction » |
| § 12-14 Catalogue/Produits | `/produits` | Page « en construction » |
| § 16-17 Vidéos | `/videos` | Page « en construction » |
| § 21 Actualités | `/actualites` | Page « en construction » |
| § 18-20 Commande/Distributeurs | `/commander`, `/devenir-distributeur` | Pages « en construction » |
| § 23 Contact | `/contact` | Page « en construction » |
| § 29-41 Administration | `/admin` | Emplacement préparé |
| § 44 SEO | `robots.ts`, `sitemap.ts`, metadata | Préparé |