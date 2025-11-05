module.exports = (sequelize, DataTypes) => {
  const Famille = sequelize.define('Famille', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nomFrancais: {
      type: DataTypes.STRING(100),
      allowNull: false,
   
    },
    nomAnglais: {
      type: DataTypes.STRING(100),
      allowNull: false,
    
    },
    descriptionFrancais: {
      type: DataTypes.TEXT
    },
    descriptionAnglais: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'Famille',
    timestamps: false
  });

    Famille.associate = models => {
    Famille.hasMany(models.Types, {
      foreignKey: 'famille_id',
      as: 'Types'
    });
    Famille.hasMany(models.Courroie, {
      foreignKey: 'famille_courroie_id',
      as: 'Courroie'
    })
  };


  return Famille;
};
