const { Devis } = require('../models');
const sendEmail = require('../config/sendEmail');
module.exports = {
async addDevis(req,res){
    try{

        
        console.log(req.body)
        const { name, email, phone, message, products, company } = req.body;
            sendEmail(
            email,
            `Nouveau devis reçu du client ${name}`,
            `
            Nouveau devis reçu !

            Informations client :
            - Nom : ${name}
            - Email : ${email}
            - Société : ${company || 'N/A'}
            - Téléphone : ${phone}

            Produits commandés :
            ${products.map((p, idx) => `${idx + 1}. ${p.name} - Quantité: ${p.quantity}`).join("\n")}

            Message du client :
            ${message || 'Aucun message fourni'}

            Merci de traiter ce devis rapidement.
            `,
            // === version HTML ===
            `
            <h2>Nouveau devis reçu</h2>
            <p><strong>Client :</strong></p>
            <ul>
                <li>Nom : ${name}</li>
                <li>Email : ${email}</li>
                <li>Société : ${company || 'N/A'}</li>
                <li>Téléphone : ${phone}</li>
            </ul>
            <p><strong>Produits commandés :</strong></p>
            <ul>
                ${products.map(p => `<li>${p.name} - Quantité: ${p.quantity}</li>`).join('')}
            </ul>
            <p><strong>Message du client :</strong></p>
            <p>${message || 'Aucun message fourni'}</p>
            <p>Merci de traiter ce devis rapidement.</p>
            `
            );

        
         res.status(200).send({
                message: "Devis added successfully"
            });
    }catch(error)
    {
        res.status(400).send({
                error: "An error occured when adding your devis " + error.message
            });
    }

}


};
