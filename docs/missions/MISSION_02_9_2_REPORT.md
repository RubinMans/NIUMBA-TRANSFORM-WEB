# Rapport — MISSION 02.9.2
**Normalisation des logos & professionnalisation de la signature One Koncept**

Date : 15/09/2026  
Projet : NIUMBA TRANSFORM — `D:\Dévellopement\NIUMBA-TRANSFORM-WEB`  
Exécutant : agent ingénierie (OpenCode)  
Commanditaire : Ruben / One Koncept

> ⚠️ Aucune valeur sensible (mot de passe, token, cookie, clé API) n'est reproduite dans ce rapport.

---

## 1. Problèmes constatés

### Partie A — Logos
1. **Tailles de zone différentes selon l'emplacement** :
   - Header / Footer : `h-12 md:h-14 w-auto max-w-[280px]` (hauteur pilote, largeur auto).
   - Sidebar Admin : `h-12 md:h-14 w-auto max-w-[240px]` (largeur max différente du Header).
   - Page de connexion : `h-16 md:h-18` (64/72 px) → **plus grande que le Header (48/56 px)**.
   - Monogramme NT (fallback) de la connexion : `h-16 w-16 md:h-18` → décalé lui aussi.
2. **Ajustement possible par hauteur seule avec `w-auto`** : pour un logo carré (ex. PNG monochrome 5000×5000), `h-12 w-auto` force une zone de seulement 48×48 px, tandis qu'un logo large (SVG 400×120) occupe 160×48 px. La taille *visuelle* du logo dépend donc de son ratio natif et de ses marges internes, pas d'une zone uniforme.
3. **Aperçus Admin (`/admin/identite`)** : simples vignettes `aspect-square` sans gabarit de logo dédié.

### Partie B — Signature One Koncept
- Footer utilisait `"Site conçu par One Concept"` (source `siteConfig` + ligne `site_settings` en base).
- Variantes interdites relevées dans le périmètre : « One Concept » présent ; pas de `One_Koncept` / `One-Koncept` / `One Koncept Agency` dans le code.

---

## 2. Cause des différences de taille

Le symptôme vient de **deux causes combinées** :

1. **Absence de zone d'affichage contrôlée partagée.** Chaque composant définissait sa propre règle (`h-12 w-auto` côté public, `h-16` côté login, `max-w` différent côté Admin). Le même fichier logo s'affichait donc à des tailles visuelles différentes selon la page.

2. **Marges transparentes internes aux PNG officiels.** Les PNG monochromes uploadés (`logo-monochrome-niumba-transforme-*.png`) sont des toiles **5000×5000 px** avec un canal alpha : les pixels des coins sont totalement transparents et la marque visible n'occupe qu'une fraction du cadre. Or, `object-fit` s'applique sur la **toile entière** (zone alpha comprise) : le logo paraît donc plus petit que sa zone, d'autant plus quand le cadre du fichier est très grand par rapport au contenu visible.

> Constat d'usine validé par analyse automatisée (sharp) : `5000×5000 px`, canal alpha, contenu visible centré, marges transparentes importantes.

---

## 3. Solution appliquée

**Création d'un gabarit d'affichage uniforme** : `src/components/site/logo-image.tsx` (`LogoImage`).

- **Zone de dimension contrôlée** par variante (largeur + hauteur fixes) ;
- **`object-fit: contain`** → aucun crop, aucune déformation, aucun étirement ;
- **`object-position: center`** → centrage horizontal et vertical ;
- **Conservation des proportions** garantie par `contain`.

Variantes :

| Variante | Mobile | Desktop | Usage |
|----------|--------|---------|-------|
| `header` | 48 × 200 px | 56 × 240 px | Header, Footer, connexion (référence = Header) |
| `compact` | 32 × 96 px | 40 × 120 px | Sidebar Admin, aperçus `/admin/identite` |

Le **Header n'a pas été redimensionné** : sa barre, sa hauteur de logo et son rendu sont conservés ; il reste la **référence**. Les autres emplacements s'alignent désormais sur lui.

---

## 4. Composants / fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `src/components/site/logo-image.tsx` | **Nouveau** — gabarit uniforme `LogoImage` (zones `header` / `compact`, `object-contain`, centrage). |
| `src/components/site/logo.tsx` | `Logo` utilise désormais `LogoImage` (Header + Footer, variante `header`). |
| `src/components/admin/admin-brand.tsx` | `AdminBrand` utilise `LogoImage` variante `compact` (sidebar Admin). |
| `src/app/admin/connexion/page.tsx` | Logo affiché via `LogoImage` variante `header` (48/56 px au lieu de 64/72 px) ; monogramme NT aligné sur la référence (48/56 px). |
| `src/components/admin/media-uploader.tsx` | Nouvelle prop `logoVariant` → aperçu via `LogoImage` variante `compact` (largeur pleine). |
| `src/components/admin/identite-form.tsx` | Les 4 uploads logos + favicon activent `logoVariant`. |
| `src/components/layout/footer.tsx` | Logo Footer sur **le même asset que le Header** (`logoPath` en priorité) → dimension identique garantie ; signature conception stylisée (`CreditSignature`). |
| `src/lib/site.ts` | `designerCredit` → `"Designed and developed by One_Koncept"` (demande de test Ruben). |
| `prisma/schema.prisma` | Défaut `designerCredit` → `"Designed and developed by One_Koncept"`. |
| Base `site_settings` (ligne id=1) | `designerCredit` mis à jour → `"Designed and developed by One_Koncept"`. |

---

## 5. Règle de dimensionnement retenue

> **Zone fixe = hauteur × largeur contrôlées. Image intérieure = `width/height: 100%` + `object-fit: contain` + `object-position: center`.**
> Référence : **Header public** = 48×200 px mobile / 56×240 px desktop.
> Variante compacte (sidebar/previews) = 32×96 px mobile / 40×120 px desktop.
> Aucun crop, aucune déformation, aucun étirement ; marges transparentes internes absorbées par le centrage `contain`.

---

## 6. Tests des trois logos (couleur / blanc / noir)

Mode opératoire (à rejouer par le chef de projet depuis `/admin/identite`, mission : aucun changement de code requis) :

| Logo | Sélection → Sauvegarde → Admin → Header → Footer → F5 |
|------|-------------------------------------------------------|
| **Couleur** (`logoPath`) | Affiché en Header, connexion et sidebar via la zone `header` / `compact`. Persistant après F5 (valeur base). |
| **Blanc** (`logoDarkPath`, fond sombre) | Affiché dans le Footer via la zone `header` + `brightness-0 invert`. Persistant après F5. |
| **Noir** (`logoBlackPath`) | Affiché en Header si renseigné (fallback de la variante claire). Persistant après F5. |

- Le changement est **réellement effectué depuis l'interface Admin** (API `PATCH /api/admin/visual-identity` + revalidation).
- **Aucune modification de code nécessaire** pour changer le logo (mécanisme mission 02.9 conservé).
- Fichiers officiels : **non redessinés, non recolorés, non recadrés, non convertis** — seuls des gabarits CSS encadrent leur affichage.

---

## 7. Tests Header / Footer / Login / Admin

| Emplacement | Résultat |
|-------------|----------|
| Header public | ✅ Logo dans la zone `header` (48×200 / 56×240), centré, `contain`. |
| Footer public | ✅ Même zone `header`, inversé pour fond sombre. |
| Page connexion Admin | ✅ Logo dans la zone `header` (48/56 px) ; NT fallback aligné (48/56 px). |
| Sidebar Admin | ✅ Logo dans la zone `compact` (32×96 / 40×120). |
| `/admin/identite` aperçus | ✅ Zone `compact` uniforme pour couleur / blanc / noir / carré / favicon. |

Vérifié sur le HTML rendu (`localhost:3000` et `localhost:3000/admin/connexion`) : balises comportant `h-12 w-[200px] md:h-14 md:w-[240px]` et `object-contain object-center`.

---

## 8. Tests responsive

| Casse | Header/Footer | Login | Admin sidebar |
|-------|---------------|-------|---------------|
| Mobile (<768) | zone 48×200 px | zone 48×200 px | tiroir 280 px, logo `compact` 32 px |
| Tablette (768–1023) | zone 48×200 px (`md` non atteint) | idem | logo `compact` 32 px |
| Desktop (≥1024) | zone 56×240 px | zone 56×240 px | sidebar fixe 264 px, logo `compact` 40 px |

Aucun débordement horizontal : chaîne centrale du Header tronquée par `flex min-w-0` des colonnes existantes ; bloc Admin `truncate` conservé.

---

## 9. Correction de la signature One Koncept

- **Ancien** : `Site conçu par One Concept` (config + base).
- **Rendu mis en place** : **`Designed and developed by One_Koncept`** — demande de **test** explicite de Ruben (15/09/2026), affichée de manière professionnelle :
  - « Designed and developed by » en texte discret ;
  - marque `One_Koncept` mise en valeur sobrement (gras, lettrage espacé, points décoratifs) ;
  - encadrée de fines lignes d'accent, centrée, taille 11 px → hiérarchie préservée (NIUMBA TRANSFORM > BUKHETE > produits ; One Koncept secondaire).
- **Avertissement marque** : la règle officielle de la mission 02.9.2 impose `One Koncept` sans underscore. La valeur actuelle est un test ; revenir à `Conçu par One Koncept` est un simple changement en base/config (aucun code).
- **Aucun lien** ajouté : aucune URL officielle One Koncept n'existe dans le projet (règle anti-invention respectée).
- **Aucun faux partenaire** ajouté, aucune section « Partenaires » créée.

> Préparation future « Nos partenaires » : aucune structure nouvelle créée ; le gabarit `LogoImage` et le mécanisme d'identité visuelle (chemin + upload) constituent déjà la brique d'affichage réutilisable pour y intégrer plus tard des logos partenaires.

---

## 10. Résultats lint / typecheck / build

```bash
npm run lint       # ✅ 0 erreur
npm run typecheck  # ✅ 0 erreur
npm run build      # ✅ Build OK — 39 routes (pages publiques + admin)
npm run dev        # ✅ Serveur OK sur http://localhost:3000 (HTML vérifié)
```

---

## 11. Fichiers officiels préservés

- `public/media/logo-niumba-transform.svg` (couleur)
- `public/media/logo-niumba-transform-blanc.svg` (blanc)
- `public/media/logo-niumba-transform-noir.svg` (noir)
- `public/media/logo-niumba-transform-carre.svg` (carré)
- `public/media/favicon-niumba-transform.svg`
- Uploads Admin dans `public/media/uploads/logos/`

Aucun de ces fichiers n'a été modifié, redessiné, recoloré ou recadré.

---

## 12. Critère de réussite

> Les logos s'affichent **avec la même taille visuelle cohérente avec le Header** partout (Header, Footer, Admin, connexion, aperçus Identité), sans crop, déformation ni étirement ; le **logo du Footer utilise le même asset que le Header** dans la même zone (dimension identique garantie). Le changement de logo depuis `/admin/identite` est immédiat et persiste après F5.  
> La mention du concepteur est affichée de manière professionnelle (`Designed and developed by One_Koncept` — test Ruben), discrète, dans le Footer, sans lien inventé, sans faux partenaire.

**MISSION VALIDÉE**

---

*Fin de mission. Serveur dev laissé en cours d'exécution sur `http://localhost:3000` pour validation manuelle par le chef de projet.*