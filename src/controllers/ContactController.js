const sendEmail = require('../config/sendEmail');

module.exports = {
  async sendMessageContact(req, res) {
    try {
      console.log(req.body);

      const { name, email, phone, message, subject } = req.body;

      const contactEmail = process.env.SENDER_MAIL;

      await sendEmail(
        contactEmail,
        `Nouveau message de contact reçu de ${name}`,
        `
        Nouveau message de contact reçu !

        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone}
        Sujet: ${subject}
        Message: ${message}
        `
      );

      res.status(200).json({ message: "Message envoyé avec succès" });

    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
  }
};
