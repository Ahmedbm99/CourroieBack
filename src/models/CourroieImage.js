module.exports = (sequelize, DataTypes) => {
  const CourroieImage = sequelize.define('CourroieImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    courroie_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING(255), allowNull: false }
  }, {
    tableName: 'Courroie_Images',
    
    timestamps: false
  });

  CourroieImage.associate = models => {
    CourroieImage.belongsTo(models.Courroie, { foreignKey: 'courroie_id', as: 'Courroie' });
  };

  return CourroieImage;
};
