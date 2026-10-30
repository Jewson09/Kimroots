# Rendre le site modifiable par Kimberlie (à faire une seule fois)

Principe : le site est stocké sur GitHub (gratuit). Kimberlie modifie le contenu depuis
un panneau web (Pages CMS). Chaque modification est publiée toute seule par Netlify en ~1 minute.

## 1. Mettre le site sur GitHub (10 min)
1. Crée un compte sur https://github.com (gratuit).
2. Clique sur « + » en haut à droite → New repository → nom : `kimroots` → Public ou Private → Create repository.
3. Sur la page du dépôt vide, clique sur « uploading an existing file ».
4. Ouvre le dossier `kimroots` sur ton PC, sélectionne TOUT ce qu'il contient (index.html, css, js, img,
   contenido, .pages.yml…) et glisse-le dans la page. Puis « Commit changes ».
   ⚠️ Vérifie que `.pages.yml` et le dossier `contenido` sont bien dans la liste.

## 2. Relier Netlify à GitHub (5 min)
1. Netlify → ton projet `beamish-concha-e9d19a` → Project configuration → Build & deploy.
2. Section « Continuous deployment » → Link repository → GitHub → choisis `kimroots`.
3. Build command : laisse vide. Publish directory : laisse vide (ou `.`). → Deploy.
   L'adresse du site ne change pas.

## 3. Activer le panneau de modification (5 min)
1. Va sur https://app.pagescms.org → Sign in with GitHub.
2. Autorise / installe l'application Pages CMS sur le dépôt `kimroots`.
3. Ouvre le dépôt dans Pages CMS : tu dois voir « Contenido del sitio ».
4. Dans les réglages du dépôt dans Pages CMS (Settings / Collaborators), invite Kimberlie avec son email.
   Elle n'a PAS besoin de compte GitHub : elle reçoit un lien de connexion par email.

## 4. Envoie-lui le fichier GUIA-KIMBERLIE.md (en espagnol).

Remarques
- Plus besoin de glisser le dossier dans Netlify : tout passe par GitHub maintenant.
- Pour tes propres modifs de code (design…), modifie les fichiers sur GitHub ; Netlify republie tout seul.
- Kimberlie peut modifier le contenu, pas le design ni le code : elle ne peut rien casser.
