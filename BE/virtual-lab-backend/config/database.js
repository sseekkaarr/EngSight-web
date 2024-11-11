const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database.'))
    .catch((err) => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
