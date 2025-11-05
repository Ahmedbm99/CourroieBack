module.exports = (sequelize, DataTypes) => {
  const Courroie = sequelize.define('Courroie', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    famille_courroie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Famille',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    type_courroie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Types',
        key: 'id'
      },    },

    // --- Attributs généraux ---
    matiere: DataTypes.STRING(100),
    profil: DataTypes.STRING(50),
    description: DataTypes.TEXT,
    fabricant: DataTypes.STRING(100),
    reference_fabricant: DataTypes.STRING(100),

    // --- Dimensions ---
    largeur_mm: DataTypes.FLOAT,
    hauteur_mm: DataTypes.FLOAT,
    pas_mm: DataTypes.FLOAT,
    longueur_int_mm: DataTypes.FLOAT,
    longueur_prim_mm: DataTypes.FLOAT,
    longueur_ext_mm: DataTypes.FLOAT,
    angle_trapeze_deg: DataTypes.FLOAT,
    epaisseur_mm: DataTypes.FLOAT,
    nombre_dents: DataTypes.INTEGER,
    nombre_nervures: DataTypes.INTEGER,

    // --- Propriétés mécaniques ---
    temperature_min: DataTypes.FLOAT,
    temperature_max: DataTypes.FLOAT,
    vitesse_max_m_s: DataTypes.FLOAT,
    resistance_traction_n: DataTypes.FLOAT,
    durete_shore: DataTypes.STRING(10),
    resistance_usure: DataTypes.STRING(50),
    resistance_huile: DataTypes.BOOLEAN,
    resistance_chaleur: DataTypes.BOOLEAN,
    resistance_ozone: DataTypes.BOOLEAN,
    conductivite_antistatique: DataTypes.BOOLEAN,
    resistance_chimique: DataTypes.BOOLEAN,
    allongement_max_pct: DataTypes.FLOAT,
    flexibilite: DataTypes.STRING(50),

    // --- Matériaux et construction ---
    renforcement: DataTypes.STRING(100),
    revetement: DataTypes.STRING(100),
    revetement_dents: DataTypes.STRING(100),
    forme_dent: DataTypes.STRING(50),
    type_denture: DataTypes.STRING(50),

    // --- Informations complémentaires ---
    charge_max_n: DataTypes.FLOAT,
    poids_g_m: DataTypes.FLOAT,
    tol_largeur_mm: DataTypes.FLOAT,
    tol_hauteur_mm: DataTypes.FLOAT,
    remarques: DataTypes.TEXT,
    image_url: DataTypes.STRING(255),
    fiche_technique_url: DataTypes.STRING(255),
    source_catalogue: DataTypes.STRING(255)
  }, {
    tableName: 'Courroie',
    schema: 'dbo',
    timestamps: false
  });

  Courroie.associate = models => {
    Courroie.belongsTo(models.Famille, {
      foreignKey: 'famille_courroie_id',
      as: 'Famille'
    });

    Courroie.belongsTo(models.Types, {
      foreignKey: 'type_courroie_id',
      as: 'Types'
    });
  };

  return Courroie;
};
