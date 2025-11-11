module.exports = (sequelize, DataTypes) => {
  const CourroieMatiere = sequelize.define('CourroieMatiere', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    courroie_id: { type: DataTypes.INTEGER, allowNull: false },
    matiere: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    tableName: 'Courroie_Matiere',
    
    timestamps: false
  });

  CourroieMatiere.associate = models => {
    CourroieMatiere.belongsTo(models.Courroie, { foreignKey: 'courroie_id', as: 'Courroie' });
  };

  return CourroieMatiere;
};
