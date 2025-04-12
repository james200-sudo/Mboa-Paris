const app = require('./app');
const PORT = process.env.PORT || 5000;

const express = require('express');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// rendre le socket global
global.io = io;

// Map pour gérer les utilisateurs connectés (userId → socket.id)
const users = new Map();
global.connectedUsers = users;

// Connexion DB
const { connectDB } = require('./config/db');
connectDB();

// Import de tous les modèles
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');
const Event = require('./models/Event');
const ReportedMessage = require('./models/ReportedMessage');
const DeviceToken = require('./models/DeviceToken');
const Group = require('./models/Group');
const GroupMessage = require('./models/GroupMessage');
const GroupMember = require('./models/GroupMember');
const BlockedUser = require('./models/BlockedUser');
const RendezVous = require('./models/RendezVous');
const Entreprise = require('./models/Entreprise');
const Favorite = require('./models/Favorite');
const Follow = require('./models/Follow');
const Ticket = require('./models/Ticket');


// Relations claires et uniques
User.hasMany(Ticket, { foreignKey: 'userId' });
Ticket.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Ticket, { foreignKey: 'eventId' });
Ticket.belongsTo(Event, { foreignKey: 'eventId' });

// Synchronisation
Ticket.sync({ alter: true });
// Synchronisation des modèles (tu peux ajuster selon alter ou force)
User.sync();
Post.sync();
Comment.sync();
Like.sync();
Event.sync();
ReportedMessage.sync();
DeviceToken.sync();
Group.sync();
GroupMessage.sync();
GroupMember.sync();
BlockedUser.sync();
RendezVous.sync();
Entreprise.sync();
Favorite.sync();
Follow.sync();
Ticket.sync();

// WebSocket events
io.on('connection', socket => {
  console.log('✅ Client connecté via WebSocket');

  // 🔐 L’utilisateur envoie son ID juste après connection
  socket.on('identify', userId => {
    users.set(userId, socket.id);
    console.log(`👤 Utilisateur ${userId} enregistré sur socket ${socket.id}`);
  });

  // Déconnexion : on retire le user de la map
  socket.on('disconnect', () => {
    for (const [uid, sid] of users.entries()) {
      if (sid === socket.id) {
        users.delete(uid);
        console.log(`❌ Utilisateur ${uid} déconnecté`);
        break;
      }
    }
  });

  socket.on('join-group', groupId => {
    socket.join(`group-${groupId}`);
    console.log(`👥 Socket ${socket.id} joined group ${groupId}`);
  });

  socket.on('leave-group', groupId => {
    socket.leave(`group-${groupId}`);
    console.log(`👋 Socket ${socket.id} left group ${groupId}`);
  });
});

// Lancement du serveur Express + WebSocket
server.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
