module.exports = (sequelize, DataTypes) => {
  const CourroieFiche = sequelize.define('CourroieFiche', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    courroie_id: { type: DataTypes.INTEGER, allowNull: false },
    fiche_technique_url: { type: DataTypes.STRING(255), allowNull: false }
  }, {
    tableName: 'Courroie_Fiches',
    
    timestamps: false
  });

  CourroieFiche.associate = models => {
    CourroieFiche.belongsTo(models.Courroie, { foreignKey: 'courroie_id', as: 'Courroie' });
  };

  return CourroieFiche;
};
