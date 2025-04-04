# 🎨 MetM-Front

Front-end du projet **MetM**, développé en **React + Vite**, avec intégration de Bootstrap pour la partie Back Office, FontAwesome, et une communication fluide avec l’API via Axios.

---

## 🧰 Technologies utilisées

- ⚛️ React 19
- ⚡ Vite 6
- 💅 Sass (SCSS)
- 🧩 React Router v7
- 🎨 Bootstrap 5
- 🎯 FontAwesome (React)
- 📦 Axios
- 🖼️ Fabric.js
- 🧱 Swiper.js
- 🗃️ ESLint (avec plugins React)
- 📂 Gestion d’images : Dropzone

---

## 📁 Arborescence du projet

```bash
metm-front/
├── public/               # Dossier public (favicon, etc.)
├── src/
│   ├── api/              # Fichiers API
│   ├── assets/           # Images, polices, fichiers statiques
│   ├── components/       # Composants réutilisables
│   │── context/          # Contexts React pour la gestion d'états globaux
│   ├── hooks/            # Hooks personnalisés
│   ├── layouts/          # Layouts de pages
│   ├── pages/            # Pages principales du site
│   ├── router/           # Configuration de la navigation
│   ├── styles/           # Fichiers SCSS (variables, mixins, etc.)
│   ├── App.jsx           # Composant racine
│   └── main.jsx          # Point d’entrée Vite
├── index.html            # Fichier HTML racine
├── package.json          # Dépendances et scripts
├── vite.config.js        # Configuration Vite
└── README.md             # Documentation (vous êtes ici)

# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Accéder à l’application
# Ouvrir http://localhost:5173 dans le navigateur

📦 Dépendances utilisées

🛠 Dépendances de production

Package	                            Version         Description

@fortawesome/fontawesome-svg-core	^6.7.2          Cœur de FontAwesome pour gérer les icônes SVG.
@fortawesome/free-regular-svg-icons	^6.7.2          Icônes régulières gratuites de FontAwesome
@fortawesome/react-fontawesome	    ^0.2.2          Intégration des icônes FontAwesome dans React.
axios	                            ^1.8.1          Client HTTP pour faire des requêtes vers une API.
bootstrap	                        ^5.3.3          Framework CSS responsive prêt à l’emploi.
fabric	                            ^6.6.1          Librairie canvas pour dessin et manipulation d’images.
glob	                            ^11.0.1         Permet de trouver des fichiers via des motifs (glob patterns)
lru-cache	                        ^11.0.2         Cache "Least Recently Used", utile pour optimiser la mémoire
react	                            ^19.0.0         Bibliothèque principale pour créer l’interface utilisateur.
react-dom	                        ^19.0.0         Permet d’attacher React à l’arbre DOM.
react-dropzone	                    ^14.3.8         Zone de dépôt de fichiers avec support glisser-déposer.
react-icons	                        ^5.5.0          Intégration simple d’icônes dans React (FA, Feather, etc.).
react-router-dom	                ^7.2.0          Gestion des routes côté client dans React.
rimraf	                            ^6.0.1          Supprime des fichiers/dossiers de façon récursive (type rm -rf).
sass	                            ^1.85.1         Préprocesseur CSS permettant l’utilisation de SCSS.
swiper	                            ^11.2.5         Slider/carrousel moderne et responsive.

🧪 Dépendances de développement

Package	                            Version         Description

@eslint/js	                        ^9.21.0         Règles de base ESLint pour JavaScript.
@types/react	                    ^19.0.10        Typages TypeScript pour React.
@types/react-dom	                ^19.0.4         Typages TypeScript pour ReactDOM.
@vitejs/plugin-react	            ^4.3.4          Plugin Vite pour supporter React avec fast refresh.
eslint	                            ^9.21.0         Linter JavaScript et TypeScript.
eslint-plugin-react-hooks	        ^5.1.0          Règles ESLint spécifiques aux hooks React.
eslint-plugin-react-refresh	        ^0.4.19         Plugin ESLint pour supporter React Fast Refresh.
globals	                            ^15.15.0        Fournit des variables globales pour les environnements.
vite	                            ^6.2.0          Build tool rapide pour projets modernes (alternative à Webpack).

🔐 Authentification

L’authentification est gérée via un AuthProvider (hook React) et protège les routes privées du back-office.

```
