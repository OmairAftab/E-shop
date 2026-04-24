const nodemailer = require("nodemailer");

const sendMail = async (options) => {
 

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.elasticemail.com",
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
  });

  const mailOptions = {
    from: `"E-SHOP SUPPORT" <mohammadomair4519@gmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent:", result);
  } catch (err) {
    console.error("❌ Mail error:", err);
  }
};

module.exports = sendMail;