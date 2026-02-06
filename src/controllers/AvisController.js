const { Avis } = require('../models');
const sendEmail = require('../config/sendEmail');
module.exports = {
async addFeedback(req, res) {
    try {
        console.log(req.body);

        const { question1, reponse1, question2, reponse2, question3, reponse3, avis } = req.body;
        note  = (reponse1+reponse2+reponse3)/3
        // Sequelize ajoute createdAt et updatedAt automatiquement
     /*   const newFeedback = await Avis.create({
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
*/
        await sendEmail(
          process.env.SENDER_MAIL,
          "Nouveau feedback utilisateur",
          `Feedback reçu :
Question 1: ${question1}
Réponse 1: ${reponse1}
Question 2: ${question2}
Réponse 2: ${reponse2}
Question 3: ${question3}
Réponse 3: ${reponse3}
Avis: ${avis}`,
          `<p><strong>Feedback reçu :</strong></p>
          <p><strong>Question 1:</strong> ${question1}</p>
          <p><strong>Réponse 1:</strong> ${reponse1}</p>
          <p><strong>Question 2:</strong> ${question2}</p>
          <p><strong>Réponse 2:</strong> ${reponse2}</p>
          <p><strong>Question 3:</strong> ${question3}</p>
          <p><strong>Réponse 3:</strong> ${reponse3}</p>
          <p><strong>Avis:</strong> ${avis}</p>
          <p><strong>Note:</strong> ${note}</p>`
        );
        res.status(200).send({
            message: "Feedback added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            error: "An error occurred when adding your feedback"
        });
    }
}



};
