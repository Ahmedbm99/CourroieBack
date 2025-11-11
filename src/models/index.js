const { Sequelize, DataTypes } = require('sequelize');
require("tedious");
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectModule: require("tedious"),
    logging: false,
    pool: {
      max: 10,
      min: 1,
      acquire: 30000, 
      idle: 10000     
    }
  }
);

const db = {};
db.Famille = require('./Famille')(sequelize, DataTypes);
db.Types = require('./Types')(sequelize, DataTypes);
db.Courroie = require('./Courroie')(sequelize, DataTypes);
db.CourroieFiche = require('./CourroieFiche')(sequelize, DataTypes);
db.CourroieImage = require('./CourroieImage')(sequelize, DataTypes);
db.CourroieMatiere = require('./CourroieMatiere')(sequelize, DataTypes);


Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
