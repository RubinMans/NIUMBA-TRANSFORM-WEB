# MISSION 01.5 — PORTAIL ADMIN : CONNEXION + PRÉVISUALISATION DU DASHBOARD

Statut : **TERMINÉE** (en attente de validation de Ruben avant la Mission 02)

---

## 1. OBJECTIF DE LA MISSION

Remplacer la carte « Accès restreint » (mission 01) par une véritable
**prévisualisation visuelle du portail d'administration** de NIUMBA TRANSFORM :

- une vraie page de connexion (`/admin/connexion`) ;
- un portail Admin complet (`/admin` + modules) doté de son propre layout
  (sidebar + header) ;
- une navigation réelle entre toutes les pages Admin ;
- des pages crédibles montrant l'intention fonctionnelle de chaque futur module.

Cette mission est **visuelle et structurelle uniquement**. Aucune
authentification réelle, base de données, API ou CRUD n'a été développée.

---

## 2. Sources consultées

1. `CAHIER_DES_CHARGES_NIUMBA_TRANSFORM.md` — source fonctionnelle (§ 27-41, § 46-53).
2. `STITCH_EXPORT/` — source visuelle (connexion sécurisée, back-office, catalogue
   admin, CMS accueil, paramètres & identité).
3. `src/lib/site.ts` — configuration existante (identité, coordonnées légales).
4. Architecture existante (route groups, design tokens Tailwind v4, composants UI).

---

## 3. Pages créées

| Route | Contenu |
| --- | --- |
| `/admin/connexion` | Page de connexion — panneau identité + formulaire (email, mot de passe, afficher/masquer, « Mot de passe oublié ? », identifiants démo). |
| `/admin` | Dashboard : statistiques démo, accès rapides, dernières commandes, candidatures distributeurs, état des modules. |
| `/admin/produits` | Gestionnaire de produits : recherche, filtres, tableau (Produit, Catégorie, Statut, MAJ, Actions), fiche produit, état vide. |
| `/admin/categories` | Catégories (nettoyage, entretien, hygiène, assainissement), association produit → catégorie. |
| `/admin/commandes` | Registre des commandes : statuts, filtres, tableau détaillé, évolution e-commerce. |
| `/admin/distributeurs` | Candidatures : statuts, validation, champs du dossier, flux de validation. |
| `/admin/videos` | Vidéothèque : miniatures, statuts, structure d'une vidéo, types de contenus. |
| `/admin/actualites` | Articles : brouillons/publications, structure, types de publications. |
| `/admin/innovation-ecologie` | Initiatives : R&D, recyclage, économie circulaire, visibilité. |
| `/admin/medias` | Médiathèque : types de fichiers, upload, emplacement logos. |
| `/admin/accueil` | CMS de la homepage : hero, sections, ordre, visibilité. |
| `/admin/identite` | Identité visuelle : variantes logo (« Logo officiel à intégrer »), couleurs, slogan, favicon. |
| `/admin/entreprise` | Informations entreprise : coordonnées `[À CONFIRMER]`, données légales réelles. |
| `/admin/utilisateurs` | Utilisateurs & rôles : comptes démo, rôles, matrice de permissions, sécurité à venir. |
| `/admin/parametres` | Paramètres généraux + **aperçu des états UI** (vide, chargement, erreur, succès, disabled, focus). |

---

## 4. Composants créés (réutilisables)

Situés dans `src/components/admin/` :

- `AdminLayout` — structure commune (sidebar + header + contenu + footer) ;
- `AdminSidebar` — navigation groupée, tiroir mobile ;
- `AdminHeader` — titre du module, recherche visuelle, notifications, profil démo ;
- `AdminPageHeader` — titre / sous-titre / actions / badge démo ;
- `AdminBrand` — bloc de marque NIUMBA TRANSFORM (monogramme « NT » provisoire) ;
- `StatCard` — carte de statistique dashboard ;
- `AdminPanel` — carte standard (titre, description, actions, footer) ;
- `AdminTable` (avec `AdminTableRow/Data/Title/Muted`) — tableau responsive ;
- `StatusBadge` — pastilles de statut (success/warning/info/danger/neutral) ;
- `EmptyState` — état vide ;
- `SearchBar` — recherche visuelle ;
- `FilterBar` — filtres en pills (interactifs visuellement) ;
- `AdminButton` / `AdminIconButton` — boutons d'action et pictogrammes ;
- `AdminQuickAction` — cartes d'accès rapide du dashboard ;
- `DemoBadge` — pastille « Données de démonstration » ;
- `MediaPreview` — zones d'aperçu média / logo ;
- `FormField`, `AdminInput`, `AdminSelect`, `AdminTextarea` — champs de formulaire ;
- `icons.tsx` — jeu d'icônes Admin (stroke, cohérent avec le design système) ;
- `admin-form.tsx`, `media-preview.tsx` — compléments formulaires / médias.

Composants conçus pour être branchés plus tard sur les vraies données Prisma/API
(architecture évolutive — cahier § 47).

---

## 5. Données mock utilisées

`src/data/admin-demo.ts` :

- **Produits** : la liste OFFICIELLE du cahier des charges (§ 5) — savon en barre,
  savon en poudre, savon liquide pour les mains, liquide vaisselle, lessive
  automatique, super détergent, esprit de sel, eau de Javel, balais écologiques.
- **Catégories** : nettoyage, entretien, hygiène, assainissement (§ 13).
- **Commandes** : 4 commandes fictives (préfixées « Démo ») avec références, statuts.
- **Distributeurs** : 3 candidatures fictives.
- **Vidéos / Actualités / Utilisateurs / Rôles / Sections accueil / Logos** : données
  fictives, préfixées « Démo ».

Toutes les données fictives sont **clairement identifiées** (badge
« Données de démonstration », préfixe « Démo », mentions explicitement non réelles).

---

## 6. Ce qui est RÉEL

- Styles et tokens du design système (palette forêt/émeraude/citron, Plus Jakarta Sans) ;
- Informations d'identité issues du cahier des charges et de `src/lib/site.ts` :
  nom, nom légal « NIUMA TRANSFORM », marque BUKHETE, slogan, RCCM, ID Nat, NIF,
  date de création, adresse, site industriel, description ;
- La navigation réelle entre les pages Admin (routes Next.js) ;
- Layout, sidebar, header, responsive, états UI de base ;
- Les valeurs `[À CONFIRMER]` (téléphone, WhatsApp, email, réseaux sociaux) — non inventées.

## 7. Ce qui est SIMULÉ

- **Connexion** : identifiants `admin@exemple.local` / `bukhete2025` acceptés et
  redirection vers `/admin`. Aucune session, aucun cookie, aucun chiffrement.
  Message clair sur la page : « Aucune authentification réelle ».
- **Toutes les données commerciales/statistiques** des tableaux et cartes (produits,
  commandes, distributeurs, vidéos, articles, utilisateurs) ;
- Recherche (champ visuel), filtres (état visuel), boutons d'action non câblés ;
- Uploads et médias (zones d'attente, « Logo officiel à intégrer ») ;
- États succès/erreur/chargement affichés à titre de préfiguration
  (page `/admin/parametres`).

---

## 8. Identifiants de démonstration

- Email : `admin@exemple.local`
- Mot de passe : `bukhete2025`
- Bouton « Remplir automatiquement » disponible sur `/admin/connexion`.

---

## 9. Vérifications effectuées

### Commandes

- `npm run lint` — **0 erreur, 0 warning**
- `npm run typecheck` — **OK**
- `npm run build` — **OK** (32 routes générées, toutes statiques)

### Navigation & rendu (serveur local http://localhost:3000)

Toutes les routes Admin testées via HTTP avec vérification du code **200** et du
contenu attendu (titres, champs, badges, tableaux) :

```
/admin/connexion           200 OK
/admin                     200 OK
/admin/produits            200 OK
/admin/categories          200 OK
/admin/commandes           200 OK
/admin/distributeurs       200 OK
/admin/videos              200 OK
/admin/actualites          200 OK
/admin/innovation-ecologie 200 OK
/admin/medias              200 OK
/admin/accueil             200 OK
/admin/identite            200 OK
/admin/entreprise          200 OK
/admin/utilisateurs        200 OK
/admin/parametres          200 OK
```

Pages publiques vérifiées intactes : `/`, `/produits`, `/entreprise`, `/actualites`, `/contact` (200).

### Responsive (revue de code + classes Tailwind)

- Desktop : sidebar fixe (264 px) + header sticky + contenu centré.
- Tablette : grilles adaptées, sidebar masquée, tiroir activable.
- Mobile : bouton menu hamburger, sidebar en drawer + voile, tableaux scrollables
  (`overflow-x-auto`), cartes réorganisées (grid mono/multi-colonnes), boutons
  à hauteur tactile (h-9/h-10), aucun débordement horizontal de page.

---

## 10. Problèmes rencontrés et corrigés

| Problème | Solution |
| --- | --- |
| Ancienne page `/admin` (mission 01) en conflit avec la nouvelle `(panel)/page.tsx` → erreur de routes | Suppression de `src/app/admin/page.tsx` |
| Types de routes stalés (`.next/dev/types`) | Nettoyage du dossier `.next` puis régénération (build) |
| Type `adminIconMap` manquant `settings` | Ajout de `settings` à la clé et au type de la nav |
| Type `tone` non valide dans `status-badge` | Ajustement des tons (`success`/`neutral`) |
| 19 erreurs ESLint : apostrophes non échappées dans du texte JSX | Remplacement par `&apos;` |
| 5 warnings ESLint (imports/variables inutilisés) | Suppression/nettoyage des imports |
| Composants d'icônes locaux inventés dans certaines pages | Remplacement par les icônes du jeu Admin partagé |
| Port 3000 déjà occupé | Utilisation du serveur de dev déjà actif (vérification via HTTP) |

---

## 11. Prochaines étapes

- Validation de cette prévisualisation par Ruben (navigation, design, contenu).
- **Mission 02** : authentification réelle, modèles Prisma, API métier, CRUD —
  à lancer uniquement après accord.

---

*Mission 01.5 terminée. En attente de validation de Ruben avant la Mission 02.*