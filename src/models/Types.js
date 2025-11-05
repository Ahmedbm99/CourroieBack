module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('Types', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    famille_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Famille',
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    },
    usageFrancais: {
      type: DataTypes.TEXT
    },
    usageAnglais: {
      type: DataTypes.TEXT
    },
    materiauxFrancais: {
      type: DataTypes.TEXT
    },
    materiauxAnglais: {
        type: DataTypes.TEXT
    }

  }, {
    tableName: 'Types',
    timestamps: false
  });

  Types.associate = models => {
    Types.hasMany(models.Courroie, {
      foreignKey: 'type_courroie_id',
      as: 'Courroie'
    });

    Types.belongsTo(models.Famille, {
      foreignKey: 'famille_id',
      as: 'Famille'
    });
  };

  return Types;
};
