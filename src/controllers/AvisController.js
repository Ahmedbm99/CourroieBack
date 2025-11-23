const { Avis } = require('../models');
module.exports = {
async addFeedback(req, res) {
    try {
        console.log(req.body);

        const { question1, reponse1, question2, reponse2, question3, reponse3, avis } = req.body;
        note  = (reponse1+reponse2+reponse3)/3
        // Sequelize ajoute createdAt et updatedAt automatiquement
        const newFeedback = await Avis.create({
            question1,
            reponse1,
            question2,
            reponse2,
            question3,
            reponse3,
            avis,
            note
        });

        res.status(201).send(newFeedback);

    } catch (error) {
        console.error(error);
        res.status(400).send({
            error: "An error occurred when adding your feedback"
        });
    }
}



};
