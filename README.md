# NIUMBA TRANSFORM — Plateforme web

Site corporate, catalogue BUKHETE, commande et administration de **NIUMBA TRANSFORM**
(entreprise industrielle congolaise) et de sa marque commerciale **BUKHETE**.

> **Statut : en cours de développement (mission 01 — fondations techniques).**
> Bandeau « Site en cours de développement » visible sur le site public.

## Sources de vérité

| Source | Rôle |
| --- | --- |
| `CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md` | Besoins fonctionnels |
| `STITCH_EXPORT/` | Direction visuelle et UI (design system, DESIGN.md) |
| `ASSETS_OFFICIELS/` | Logos et produits officiels (non encore fournis) |

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Prisma (SQLite en dev,
PostgreSQL en production) · Zone compatible Vercel.

## Démarrage local

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run db:generate` | Régénérer le client Prisma |
| `npm run db:push` | Appliquer le schéma à la base SQLite |
| `npm run db:studio` | Interface Prisma Studio |
| `npm run db:migrate` | Créer une migration Prisma |

## Déploiement

- **Prévisualisation en ligne** : GitHub → Vercel. Chaque push génère une URL de
  prévisualisation partageable.
- **Production** : uniquement après validation du responsable (voir `docs/MISSION_01_REPORT.md`).

## Documentation

- Architecture : `docs/ARCHITECTURE.md`
- Rapport mission 01, audit et workflow : `docs/MISSION_01_REPORT.md`