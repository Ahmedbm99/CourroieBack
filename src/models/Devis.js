module.exports = (sequelize, DataTypes) => {
  const Devis = sequelize.define(
    'Devis', // Model name
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      courroie_list: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'Devis',
      timestamps: true
    }
  );

  return Devis;
};
