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