const { Famille } = require('../models');

module.exports = {
    async updateFamille(req, res) {
        try {
            const [updated] = await Famille.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            if (updated === 0) {
                return res.status(404).send({
                    error: "Family not found."
                });
            }
            const updatedFamille = await Famille.findOne({
                where: { id: req.body.id }
            });
            res.send(updatedFamille);
        } catch (err) {
            res.status(500).send({
                error: "An error occurred when trying to update family information" + err
            });
        }
    },

    async getFamilleByID(req, res) {
        try {
            const famille = await Famille.findOne({
                where: {
                    id: req.params.id
                },
            });

            if (!famille) {
                return res.status(404).send({
                    error: "Family not found."
                });
            }
            res.send(famille);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get the famillies." + error
            });
        }
    },
    async getAllFamille(req, res) {
        try { 
            const famille = await Famille.findAll();
            if (!famille) {
                return res.status(404).send({
                    error: "Familles not found."
                });
            }
            res.send(famille);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get the famillies." + error
            });
        }
    }
};