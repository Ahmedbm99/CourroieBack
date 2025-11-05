const { where } = require('sequelize');
const { Types } = require('../models');

module.exports = {
    async updateType(req, res) {
        try {
            const [updated] = await Types.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            if (updated === 0) {
                return res.status(404).send({
                    error: "Type not found."
                });
            }
            const updatedTypes = await Famille.findOne({
                where: { id: req.body.id }
            });
            res.send(updatedTypes);
        } catch (err) {
            res.status(500).send({
                error: "An error occurred when trying to update type information" + err
            });
        }
    },

    async getTypesByID(req, res) {
        try {
            const types = await Types.findOne({
                where: {
                    id: req.params.id
                },
            });

            if (!types) {
                return res.status(404).send({
                    error: "Types not found."
                });
            }
            res.send(types);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get the types." + error
            });
        }
    },
    async getAllTypes(req, res) {
        try { 
            const types = await Types.findAll();
            console.log(types);
            if (!types) {
                return res.status(404).send({
                    error: "Types not found."
                });
            }
            res.send(types);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred when trying to get types." + error
            });
        }
    },
    async getTypesByFamily(req, res) {
    try {
        const types = await Types.findAll({
            where: { famille_id: req.params.famille_id }
        });

        console.log(types);

        if (!types || types.length === 0) {
            return res.status(404).send({
                error: "Types not found."
            });
        }

        res.send(types);
    } catch (error) {
        res.status(500).send({
            error: "An error occurred when trying to get types: " + error.message
        });
    }
}

};