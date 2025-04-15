const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/post');
const postInteractionRoutes = require('./routes/postInteraction');
const userRoutes = require('./routes/user');
const ticketRoutes = require('./routes/ticket');
const messageRoutes = require('./routes/message');
const groupMessageRoutes = require('./routes/groupMessage');
const groupRoutes = require('./routes/group');
require('dotenv').config();

const eventRoutes = require('./routes/event');
const blockRoutes = require('./routes/block');
const notificationRoutes = require('./routes/notification');
const entrepriseRoutes = require('./routes/entreprise');
const favoriteRoutes = require('./routes/favorite');
const followRoutes = require('./routes/follow');
const app = express();


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml'); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Mboa Paris 🚀 de james');
});
const aboutRoutes = require('./routes/about');const supportRoutes = require('./routes/support');
app.use('/api/support', supportRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', postInteractionRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/group-messages', groupMessageRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/moderation', blockRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/entreprises', entrepriseRoutes);





module.exports = app;
