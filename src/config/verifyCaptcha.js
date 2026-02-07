const axios = require("axios");

const verifyCaptcha = async (captchaToken, actionExpected) => {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );

    const data = response.data;
    console.log("Captcha verification response:", data);
    return (
      data.success === true &&
      data.score >= 0.2 &&
      data.action === actionExpected
    );
  } catch (error) {
    console.error("Captcha verification error:", error.message);
    return false;
  }
};

module.exports = { verifyCaptcha };
