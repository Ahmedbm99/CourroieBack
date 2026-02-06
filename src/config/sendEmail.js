const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,       
  secure: false,   
  auth: {
    user: process.env.AUTH_USERNAME,      
    pass: process.env.AUTH_PASSWORD           
  }
});

const sendEmail = async (from, subject, textMessage, htmlMessage) => {
  try {
    await transporter.sendMail({
      from: `Kortibelt <${from}>`, 
      to: process.env.SENDER_MAIL,                    
      subject,
      text: textMessage,
      html: htmlMessage,
    });

    console.log(`Email envoyé de ${from} avec succès`);
  } catch (error) {
    console.error("Erreur email :", error);
  }
};


module.exports = sendEmail;
