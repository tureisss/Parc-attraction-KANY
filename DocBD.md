# 🗄️ Documentation Base de Données : Parc d'attraction KANY

Cette section détaille la structure, les relations et la gestion des données stockées dans le service **MariaDB**.

## ⚙️ Informations Techniques
* **SGBD** : MariaDB 12.1.2
* **Conteneur** : `parc-attraction-kany-database-1`
* **Port** : `3306`
* **Initialisation** : Automatisée via scripts SQL lors du lancement du Backend.

---

## 📊 Schéma de Données



### 1. Table `attraction`
Stocke les caractéristiques techniques et les informations d'affichage des montagnes russes.

| Colonne | Type | Propriétés | Description |
| :--- | :--- | :--- | :--- |
| `attraction_id` | INT | PK, Auto-inc | Identifiant unique. |
| `nom` | VARCHAR(255) | NOT NULL | Nom de l'attraction. |
| `description` | VARCHAR(255) | NOT NULL | Courte présentation. |
| `difficulte` | INT | - | Niveau de sensation (1 à 5). |
| `visible` | BOOL | DEFAULT TRUE | Statut d'affichage sur le site. |
| `hauteur` | INT | - | Hauteur maximale (m). |
| `vitesse` | INT | - | Vitesse de pointe (km/h). |
| `longueur` | INT | - | Longueur du parcours (m). |
| `duree` | INT | - | Temps de trajet (s). |
| `annee_construction` | INT | - | Année de mise en service. |

### 2. Table `critique`
Contient les avis et les notes déposés par les visiteurs.

| Colonne | Type | Propriétés | Description |
| :--- | :--- | :--- | :--- |
| `critique_id` | INT | PK, Auto-inc | ID unique de l'avis. |
| `attraction_id` | INT | FK | Lien vers l'attraction notée. |
| `texte` | VARCHAR(1000) | NOT NULL | Commentaire textuel. |
| `note` | INT | NOT NULL | Évaluation numérique. |
| `nom` / `prenom` | VARCHAR(255) | - | Identité de l'auteur. |
| `anonyme` | BOOL | DEFAULT FALSE | Option d'anonymat. |

### 3. Table `users`
Gère les accès sécurisés pour l'interface d'administration.

| Colonne | Type | Propriétés | Description |
| :--- | :--- | :--- | :--- |
| `users_id` | INT | PK, Auto-inc | ID unique de l'admin. |
| `name` | VARCHAR(255) | NOT NULL | Identifiant de connexion. |
| `password` | VARCHAR(255) | NOT NULL | Mot de passe sécurisé. |

---

## 🚀 Scripts d'Automisation

Le Backend (`api-1`) gère l'état de la base au démarrage via deux fichiers SQL :
1. **`init.sql`** : Crée la structure des tables si elles n'existent pas encore.
2. **`create.sql`** : Insère les données de base (attractions initiales et compte admin par défaut) via des instructions `INSERT IGNORE`.

---

## 🛠 Administration de la Base

### Connexion manuelle (CLI)
Pour interroger directement la base depuis votre terminal :
```powershell
docker exec -it parc-attraction-kany-database-1 mariadb -u root -p
```

## Réinitialisation Totale
Pour purger toutes les données et relancer les scripts d'initialisation :

```PowerShell
docker compose down -v
docker compose up --build
```
Note : L'option -v supprime le volume Docker contenant les données persistantes.