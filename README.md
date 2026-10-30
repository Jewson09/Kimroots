# KimRoots — Site vitrine (version espagnole)

> **Nouveau** : le contenu (textes, photos, services, prix, FAQ, contact) est maintenant dans
> `contenido/sitio.json` et se modifie sans code via Pages CMS. Voir **GUIDE-INSTALLATION.md**.
> Les instructions ci-dessous (photos foto1.jpg…) restent valables comme solution de secours.

Site statique (HTML/CSS/JS, sans backend, sans coût d'hébergement) prêt à publier sur Netlify.

## Structure des fichiers

```
kimroots/
├── index.html        → toutes les sections du site (héro, à propos, services, galerie, contact)
├── css/styles.css     → couleurs, typographies, mise en page, responsive
├── js/script.js       → menu mobile, effets d'apparition au scroll, année du pied de page
└── README.md          → ce guide
```

## Publier le site sur Netlify (gratuit)

1. Va sur https://app.netlify.com et crée un compte (gratuit).
2. Clique sur **"Add new site" → "Deploy manually"**.
3. Fais glisser le dossier **kimroots** (celui qui contient `index.html`) dans la zone de dépôt.
4. Netlify publie le site en quelques secondes et te donne une adresse du type
   `https://kimroots-xxxx.netlify.app`.
5. Optionnel : dans **Site settings → Change site name**, choisis une adresse plus lisible,
   par exemple `kimroots.netlify.app`. Un nom de domaine personnalisé (ex. `kimroots.com`)
   peut aussi être ajouté depuis **Domain settings**.

## Ajouter tes vraies photos dans la galerie

Dans `index.html`, cherche la section `<!-- ===== GALERÍA ===== -->`.
Chaque bloc ressemble à ceci :

```html
<div class="gallery-swatch swatch-1"><span>Box Braids</span></div>
```

Remplace-le par une vraie image :

```html
<figure class="gallery-photo">
  <img src="images/tresse-1.jpg" alt="Box braids realizadas por KimRoots" loading="lazy">
  <figcaption>Box Braids</figcaption>
</figure>
```

Crée un dossier `images/` à côté de `index.html`, dépose tes photos dedans, puis republie
le dossier sur Netlify (glisser-déposer à nouveau, ou connecter un dépôt GitHub pour des
mises à jour automatiques).

## Modifier les textes ou les coordonnées

- Numéro WhatsApp / téléphone : cherche `18094454151` dans `index.html` et remplace-le partout
  si le numéro change.
- Adresse : section `<!-- ===== CONTACTO / CTA ===== -->`.
- Services proposés : section `<!-- ===== SERVICIOS ===== -->`, un bloc `<article class="service-card">` par prestation.
- Prix : ajoute `<p class="service-price">Desde RD$ ____</p>` dans la carte du service.
- FAQ : section `<!-- ===== PREGUNTAS FRECUENTES ===== -->`, un bloc `<details>` par question.

## Personnaliser les couleurs

Toutes les couleurs sont centralisées en haut de `css/styles.css` :

```css
--espresso: #1F1410;   /* fond sombre / titres */
--parchment: #F7EEE2;  /* fond clair */
--clay: #B5541F;       /* accent principal (boutons, icônes) */
--gold: #C79A4B;       /* accent secondaire */
--moss: #6B7A4F;       /* accent croissance */
```

Changer une seule valeur ici met à jour toute la couleur sur l'ensemble du site.
