# 💼 Mboa Paris – Backend API

Backend Node.js complet pour la plateforme communautaire Mboa Paris : gestion des utilisateurs, messagerie, événements, entreprises, favoris, support, etc.

🔧 Stack technique

- Node.js + Express
- Sequelize (ORM)
- MySQL / PostgreSQL
- JWT Auth
- Nodemailer
- Socket.io (WebSocket)
- Firebase Cloud Messaging (FCM)
- Google Maps API

---

## 🚀 Lancer le projet en local

1. Clone le repo


git clone https://github.com/tonprofil/mboa-paris-backend.git
cd mboa-paris-backend


## Installe les dépendances

- npm install
- Configure les variables d’environnement

## Crée un fichier .env à la racine :


- PORT=5000
- JWT_SECRET=ton_secret_jwt
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=
- DB_NAME=mboa_db

- SUPPORT_EMAIL=tonemail@gmail.com
- SUPPORT_PASS=motdepasse_gmail

- GOOGLE_MAPS_API_KEY=ta_clé_google_maps
## Lance le serveur


- npm run dev
- Le serveur est accessible sur http://localhost:5000

## 📁 Structure du projet


    src/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/
    ├── utils/
    ├── config/
    │   ├── db.js
    │   └── firebase.js
    ├── app.js
    └── server.js
## ✨ Fonctionnalités principales
    🔐 Authentification JWT + Forgot/Reset Password

    💬 Messagerie privée et groupes (en temps réel)

    🎟️ Événements & Billetterie avec QR code

    🏢 Annuaire des entreprises & rendez-vous

    🌟 Favoris : posts, événements, entreprises

    👥 Suivi d'entreprises

    🔕 Signalement & Blocage

    🔔 Notifications Push (Firebase)

    🗺️ Localisation via Google Maps

    🧾 À propos + contact support

## 📚 Endpoints principaux
- /api/auth

- /api/users

- /api/messages

- /api/group-messages

- /api/events

- /api/tickets

- /api/entreprises

- /api/favorites

- /api/follows

- /api/reports/messages

- /api/support

- /api/about

## 🧠 WebSocket
Intégré avec Socket.io

Chaque utilisateur est mappé à son socket.id

Messagerie privée et de groupe en live

Statut de connexion en temps réel

## 🔔 Notifications Push
Firebase Cloud Messaging

Envoi automatique lors de nouveaux messages

Supprime automatiquement les tokens invalides

Désactive l’envoi si l’utilisateur est déjà connecté

## 🗺️ Google Maps
Chaque entreprise contient latitude & longitude

Le front peut afficher une carte interactive

Géocodage possible via Google Maps API

## 🧾 Support et À propos
/api/about → infos de la plateforme

/api/support → envoie un message au support (Nodemailer)

## 🛠️ À faire (améliorations possibles)
Intégration Swagger (OpenAPI)

Ajout de tests unitaires

Pagination et recherche avancée

Upload d’images via Cloudinary / S3

## 🙋‍♂️ Auteur
Projet réalisé par [Amengle James / GitHub Handle]
© Mboa Paris – 2025



## 📝 Tu peux bien sûr :

- Changer l’URL Git dans git clone
- Modifier l’auteur, les emails, etc.
- Ajouter un badge ou une image si tu veux décorer







