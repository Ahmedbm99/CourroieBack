require("dotenv").config();
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsappOTP = async (phone, otp) => {
  console.log(`Sending WhatsApp OTP to ${phone}`);
  console.log(`Using Twilio Account SID: ${client.accountSid}`)
  ;
  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER, // numéro sandbox Twilio
    contentSid: process.env.CONTENT_SID, // template WhatsApp
    contentVariables: JSON.stringify({ "1": otp }),
    to: `whatsapp:${phone}`,
  });

};

module.exports = {
  sendWhatsappOTP,
};
