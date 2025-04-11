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

// Sync models
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');
const User = require('./models/User');
const Event = require('./models/Event');
const ReportedMessage = require('./models/ReportedMessage');
const DeviceToken = require('./models/DeviceToken');
const GroupMember = require('./models/GroupMember');
const RendezVous = require('./models/RendezVous');
const Entreprise = require('./models/Entreprise');
const Favorite = require('./models/Favorite');
const Follow = require('./models/Follow');

Favorite.sync({ alter: true });
Follow.sync({ alter: true });

Entreprise.sync({ alter: true });
RendezVous.sync({ alter: true });


GroupMember.sync({ alter: true });
Post.sync();
Comment.sync();
Like.sync();
Event.sync();
User.sync({  force: true });
ReportedMessage.sync({ force: true });
DeviceToken.sync({ alter: true });

// WebSocket
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
  console.log(`✅ Server + WebSocket started on http://localhost:${PORT}`);
});
