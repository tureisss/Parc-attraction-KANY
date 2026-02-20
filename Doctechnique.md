## 🎢 Documentation Technique : Parc d'attraction KANY

Cette application est une plateforme Full-Stack permettant de visualiser, filtrer et comparer des attractions (montagnes russes). Elle intègre une gestion multilingue native (i18n), une interface modernisée et une architecture conteneurisée robuste.

---

## 🏗 1. Architecture du Système

L'application repose sur une architecture **micro-services** orchestrée par Docker :

* **Frontend** : Angular 17+ (Material Design, SCSS, i18n native).
* **Backend** : API REST développée avec Python Flask.
* **Base de données** : MariaDB pour le stockage persistant.
* **Serveur Proxy / HTTPS** : Nginx pour la gestion du certificat SSL et le routage des noms de domaine.

---

## ⚙️ 2. Installation et Configuration

### 2.1 Configuration du DNS Local (Fichier Hosts)
Pour simuler un environnement de production avec HTTPS, modifiez votre fichier hosts Windows (`C:\Windows\System32\drivers\etc\hosts`) en mode **Administrateur** :


`127.0.0.1`  parcattraction

`127.0.0.1`  api

### 2.2 Lancement des ServicesDéployez l'ensemble de la pile technologique avec Docker 

 `compose up --build -d`
 
Interface Web : `https://parcattraction/accueilPoint`
 d'entrée API : `https://api/attraction`

## 3. Internationalisation (i18n)

L'application utilise le système de localisation natif d'Angular. 

Elle génère des builds séparés pour chaque langue.Langues supportées : Français (fr) et Anglais (en).Extraction des messages :`docker exec -it parc-attraction-kany-web-1 npx ng extract-i18n --output-path src/locale`

Build de production multilingue :La commande `ng build --localize` crée deux répertoires (/fr/ et /en/) dans le dossier de build, servis dynamiquement par Nginx.

## 🎨 4. Design & Interface

### 4.1 Charte GraphiqueThème :

 "Modern Theme Park" (Sombre/Indigo).Palette : Dégradé Indigo vers Violet (#4f46e5 → #7c3aed).
 
 Effet Visuel : Glassmorphism (flou d'arrière-plan sur les cartes et le header).
 
 Typographie : Plus Jakarta Sans.4.2 Gestion des MédiasLes icônes des attractions sont des fichiers SVG stockés dans src/assets/coasters/.
 
 L'affichage est automatisé via une fonction utilitaire dans les composants :Le nom de l'attraction (ex: "Silver Star") est converti en nom de fichier (ex: silver-star.svg) pour un chargement dynamique.
 
 ## 🗄️ 5. Structure de la Base de Données (MariaDB)
 
 TableColonnes PrincipalesDescriptionattractionid, nom, description, vitesse, hauteur, longueur, duree, difficulteDétails techniques des coasters.critiqueid, attraction_id, texte, note, nom, prenom, anonymeAvis des utilisateurs.usersid, name, passwordIdentifiants administrateurs.
 
 ## 📡 6. Endpoints API (Backend Flask)
 
 ### MéthodeRouteDescription : 
 
 `GET/attraction` Liste toutes les attractions.
 
 `POST/attraction` Ajouter une attraction (Admin).
 
 `DELETE/attraction/`Supprimer une attraction.
 
 `GET/critiques/`Récupérer les avis d'un coaster spécifique.
 
 `POST/critique` Enregistrer un nouvel avis utilisateur.
 
 `POST/connexion`
 Authentification administrateur (Token-based).
 
 ## 🛠 7. Maintenance et DépannageProblème de permissions Docker (EACCES)
 
 Si le conteneur Angular refuse d'installer des packages à cause de Windows :Supprimez le dossier node_modules sur votre machine hôte.Exécutez l'installation en mode root via Docker :PowerShelldocker compose run --user root web npm install


Nettoyage Complet Pour vider les caches, supprimer les volumes et reconstruire proprement `compose down -v`
`docker compose up --build`

Développeur : Thomas

SAE : Parc d'attraction KANY

Dernière mise à jour : 20 Février 2026