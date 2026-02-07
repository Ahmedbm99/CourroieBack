require("dotenv").config();
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsappOTP = async (phone, otp) => {
  console.log(process.env.TWILIO_WHATSAPP_NUMBER , phone);

  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER, 
    contentSid: process.env.CONTENT_SID, 
    contentVariables: JSON.stringify({ "1": otp }),
    to: `whatsapp:${phone}`,
  });

};

module.exports = {
  sendWhatsappOTP,
};
