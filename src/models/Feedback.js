module.exports = (sequelize, DataTypes) => {
  const Avis = sequelize.define('Avis', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    note: DataTypes.INTEGER,
    question1 :DataTypes.STRING(100),
    reponse1 :DataTypes.STRING(100),
    question2 :DataTypes.STRING(100),
    reponse2 :DataTypes.STRING(100),
    question3 :DataTypes.STRING(100),
    reponse3 :DataTypes.STRING(100),
    
    avis: DataTypes.TEXT,

  },
{
    tableName: 'Avis',
    timestamps: true
  });
  return Avis;
 };
