const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();
console.log("Database Host:", process.env.DB_HOST);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    logging: false,
  }
);

const db = {};
db.Famille = require('./Famille')(sequelize, DataTypes);
db.Types = require('./Types')(sequelize, DataTypes);
db.Courroie = require('./Courroie')(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
