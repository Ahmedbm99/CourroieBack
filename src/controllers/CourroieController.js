const { CourroieImage,CourroieFiche,CourroieMatiere,Courroie } = require('../models');

module.exports = {
   async updateCourroie(req, res) {
        try {
            const [updated] = await Courroie.update(req.body, {
                where: { id: req.body.id }
            });

            if (updated === 0) {
                return res.status(404).send({ error: "Belt not found." });
            }

            const updatedCourroie = await Courroie.findOne({
                where: { id: req.body.id },
                include: [
                    { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
                    { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
                    { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
                ]
            });

            res.send(updatedCourroie);
        } catch (err) {
            res.status(500).send({
                error: "An error occurred when trying to update belt information: " + err
            });
        }
    },

    async getBeltByID(req, res) {
        try {
            const courroie = await Courroie.findOne({
                where: { id: req.params.id },
                include: [
                    { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
                    { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
                    { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
                ]
            });

            if (!courroie) {
                return res.status(404).send({ error: "Belt not found." });
            }
            res.send(courroie);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get the belt: " + error
            });
        }
    },
async getAllBelts(req, res) {
    try {
        const belts = await Courroie.findAll({
            include: [
                {
                    model: CourroieImage,
                    as: 'Images',
                    attributes: ['id', 'image_url']
                },
                {
                    model: CourroieMatiere,
                    as: 'Matieres',
                    attributes: ['id', 'matiere']
                },
                {
                    model: CourroieFiche,
                    as: 'Fiches',
                    attributes: ['id', 'fiche_technique_url']
                }
            ]
        });

        if (!belts || belts.length === 0) {
            return res.status(404).send({
                error: "Aucune courroie trouvée."
            });
        }

        res.status(200).send(belts);
    } catch (error) {
        console.error("Erreur lors de la récupération des courroies :", error);
        res.status(500).send({
            error: "Erreur lors de la récupération des courroies : " + error.message
        });
    }
},
async createBelt(req, res) {
  const {
    nom,
    famille_courroie_id,
    type_courroie_id,
    profil,
    description,
    fabricant,
    reference_fabricant,
    largeur_mm,
    epaisseur_mm,
    nombre_dents,
    nombre_nervures,
    temperature_min,
    temperature_max,
    type_denture,
    remarques,
    tol_largeur_mm,
    tol_hauteur_mm,
    renforcement,
    vitesse_max_m_s,
    resistance_traction_n,
    durete_shore,
    charge_max_n,
    conductivite_antistatique,
    resistance_chimique,
    flexibilite,
    forme_dent,
    hauteur_mm,
    pas_mm,
    longueur_int_mm,
    longueur_prim_mm,
    longueur_ext_mm,
    angle_trapeze_deg,
    poids_g_m,
    application,
    images,
    matieres,
    fiches
  } = req.body;
  console.log("Creating belt with data:", req.body);
  try {
    // Create the belt itself
    const newBelt = await Courroie.create({
      nom,
      famille_courroie_id,
      type_courroie_id,
      application,
      profil,
      description,
      epaisseur_mm,
      fabricant,
      reference_fabricant,
      largeur_mm,
      hauteur_mm,
      pas_mm,
      poids_g_m,
      longueur_int_mm,
      longueur_prim_mm,
      longueur_ext_mm,
      angle_trapeze_deg,
      resistance_chimique,
      forme_dent,
      renforcement,
      flexibilite,
      conductivite_antistatique,
      vitesse_max_m_s,
      charge_max_n,
      durete_shore,
      resistance_traction_n,
      tol_hauteur_mm,
      tol_largeur_mm,
      type_denture,
      temperature_max,
      temperature_min,
      nombre_nervures,
      nombre_dents,
      remarques
    });

    // Add associated Images if provided
    if (images && Array.isArray(images)) {
      await Promise.all(
        images.map(img =>
          CourroieImage.create({
            courroie_id: newBelt.id,
            image_url: img.image_url
          })
        )
      );
    }

    // Add associated Matières if provided
    if (matieres && Array.isArray(matieres)) {
      await Promise.all(
        matieres.map(mat =>
          CourroieMatiere.create({
            courroie_id: newBelt.id,
            matiere: mat.matiere
          })
        )
      );
    }

    // Add associated Fiches if provided
    if (fiches && Array.isArray(fiches)) {
      await Promise.all(
        fiches.map(f =>
          CourroieFiche.create({
            courroie_id: newBelt.id,
            fiche_technique_url: f.fiche_technique_url
          })
        )
      );
    }

    const createdBelt = await Courroie.findByPk(newBelt.id, {
      include: [
        { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
        { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
        { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
      ]
    });

    res.status(201).send(createdBelt);
  } catch (error) {
    console.error("Erreur lors de la création de la courroie :", error);
    res.status(500).send({
      error: "Erreur lors de la création de la courroie : " + error.message
    });
  }
},

  async getBeltsByFamily(req, res) {
        try {
            const belts = await Courroie.findAll({
                where: { famille_courroie_id: req.params.famille_id },
                include: [
                    { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
                    { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
                    { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
                ]
            });

            if (!belts.length) {
                return res.status(404).send({ error: "No belts found for the specified family." });
            }

            res.send(belts);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get belts by family: " + error
            });
        }
    },

 async getBeltsByType(req, res) {
        try {
            const belts = await Courroie.findAll({
                where: { type_courroie_id: req.params.type_id },
                include: [
                    { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
                    { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
                    { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
                ]
            });

            if (!belts.length) {
                return res.status(404).send({ error: "No belts found for the specified type." });
            }

            res.send(belts);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get belts by type: " + error
            });
        }
    },
   async getBeltsByFamilyAndType(req, res) {
        try {
            const belts = await Courroie.findAll({
                where: {
                    famille_courroie_id: Number(req.params.famille_id),
                    type_courroie_id: Number(req.params.type_id)
                },
                include: [
                    { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
                    { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
                    { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
                ]
            });

            if (!belts.length) {
                return res.status(404).send({
                    error: "No belts found for the specified family and type."
                });
            }

            res.send(belts);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get belts by family and type: " + error
            });
        }
    },
  async getBeltsByProfile(req, res) {
        try {
            const belts = await Courroie.findAll({
                where: { profil: req.params.profil }, // 🧩 correction ici
                include: [
                    { model: CourroieImage, as: 'Images', attributes: ['id', 'image_url'] },
                    { model: CourroieMatiere, as: 'Matieres', attributes: ['id', 'matiere'] },
                    { model: CourroieFiche, as: 'Fiches', attributes: ['id', 'fiche_technique_url'] }
                ]
            });

            if (!belts.length) {
                return res.status(404).send({
                    error: "No belts found for the specified profile."
                });
            }

            res.send(belts);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get belts by profile: " + error
            });
        }
    },
async getBeltsByDimensions(req, res) {
    try {
        const {
            largeur_mm,
            hauteur_mm,
            pas_mm,
            longueur_int_mm,
            longueur_prim_mm,
            longueur_ext_mm,
            angle_trapeze_deg,
            epaisseur_mm,
            nombre_dents,
            nombre_nervures
        } = req.query; 

        let conditions = {};

        if (largeur_mm) conditions.largeur_mm = largeur_mm;
        if (hauteur_mm) conditions.hauteur_mm = hauteur_mm;
        if (pas_mm) conditions.pas_mm = pas_mm;
        if (longueur_int_mm) conditions.longueur_int_mm = longueur_int_mm;
        if (longueur_prim_mm) conditions.longueur_prim_mm = longueur_prim_mm;
        if (longueur_ext_mm) conditions.longueur_ext_mm = longueur_ext_mm;
        if (angle_trapeze_deg) conditions.angle_trapeze_deg = angle_trapeze_deg;
        if (epaisseur_mm) conditions.epaisseur_mm = epaisseur_mm;
        if (nombre_dents) conditions.nombre_dents = nombre_dents;
        if (nombre_nervures) conditions.nombre_nervures = nombre_nervures;

        const belts = await Courroie.findAll({
            where: conditions
        });

        if (belts.length === 0) {
            return res.status(404).send({
                error: "No belts found matching the specified dimensions."
            });
        }

        res.send(belts);
    } catch (error) {
        res.status(500).send({
            error: "An error occurred when trying to get belts by dimensions: " + error
        });
    }
},

async getBeltsByProfileAndDimensions(req, res) {
    try {
        const belts = await Courroie.findAll({
            where: {
                profile: req.params.profile,
                dimension: req.params.dimension
            }
        });
        if (!belts) {
            return res.status(404).send({
                error: "No belts found for the specified profile and dimensions."
            });
        }
        res.send(belts);
    } catch (error)
    {
        res.status(500).send({
            error: "An error occurred when trying to get belts by profile and dimensions." + error
        });
    }
},
async getBeltsByProfileDimensionsAndType(req, res) {
    try {
        const belts = await Courroie.findAll({
            where: {
                profile: req.params.profile,
                dimension: req.params.dimension,
                type_courroie_id: req.params.type_id
            }
        });
        if (!belts) {
            return res.status(404).send({
                error: "No belts found for the specified profile, dimensions, and type."
            });
        }
        res.send(belts);
    } catch (error)
    {
        res.status(500).send({
            error: "An error occurred when trying to get belts by profile, dimensions, and type." + error
        });
    }
},
async getBeltsByProfileDimensionsTypeAndFamily(req, res) {
    try {
        const belts = await Courroie.findAll({
            where: {
                profile: req.params.profile,
                dimension: req.params.dimension,
                type_courroie_id: req.params.type_id,
                famille_courroie_id: req.params.famille_id
            }
        });
        if (!belts) {
            return res.status(404).send({
                error: "No belts found for the specified profile, dimensions, type, and family."
            });
        }
        res.send(belts);
    } catch (error)
    {
        res.status(500).send({
            error: "An error occurred when trying to get belts by profile, dimensions, type, and family." + error
        });
    }
},
 async getAllBeltsProfile(req, res) {
        try {
            const belts = await Courroie.findAll({
                attributes: ['profil'],
                group: ['profil']
            });

            if (!belts || !belts.length) {
                return res.status(404).send({ error: "Belt profiles not found." });
            }

            res.send(belts);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get belt profiles: " + error
            });
        }
    }

};