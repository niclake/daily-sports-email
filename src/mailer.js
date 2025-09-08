require('dotenv').config();
const config = require("./config");
const nodemailer = require("nodemailer");

async function sendEmail(subject, bodyText) {
  const transporter = nodemailer.createTransport({
    host: config.email_client.host,
    port: config.email_client.port,
    secure: config.email_client.secure === "true",
    auth: {
      user: process.env.MAIL_USER_EMAIL,
      pass: process.env.MAIL_USER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: subject,
    text: bodyText,
    html: bodyText,
  });
}

module.exports = {
  sendEmail,
};
