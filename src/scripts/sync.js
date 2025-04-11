const sequelize = require('../config/db');
const models = require('../models');

sequelize.sync({ alter: true }).then(() => {
  console.log('All models synced ✨');
  process.exit();
});
