const { verifyCaptcha } = require("../config/verifyCaptcha");
const { sendWhatsappOTP } = require("../config/whatsupService");
const { otpStore } = require("../store/otpStore");

/* ================= SEND OTP ================= */
const sendOTP = async (req, res) => {
  try {
    const { phone, captchaToken } = req.body;

    if (!phone || !captchaToken) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const valid = await verifyCaptcha(captchaToken, "whatsapp_otp");
    if (!valid) {
      return res.status(403).json({ message: "Captcha invalide" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(phone, {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    await sendWhatsappOTP(phone, otp);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ================= VERIFY CONTACT ================= */
const verifyContact = async (req, res) => {
  try {
    const { phone, otp, captchaToken } = req.body;

    if (!phone || !otp || !captchaToken) {
      return res.status(400).json({ message: "Données manquantes" });
    }

    const validCaptcha = await verifyCaptcha(captchaToken, "contact_submit");
    if (!validCaptcha) {
      return res.status(403).json({ message: "Captcha invalide" });
    }

    const data = otpStore.get(phone);

    if (!data || Date.now() > data.expires) {
      otpStore.delete(phone);
      return res.status(400).json({ message: "OTP expiré" });
    }

    if (data.otp !== otp) {
      return res.status(400).json({ message: "OTP incorrect" });
    }

    otpStore.delete(phone);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  sendOTP,
  verifyContact,
};
