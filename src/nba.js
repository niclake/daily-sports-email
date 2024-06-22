require('dotenv').config();
var tools = require('./tools');
const fetch = require('node-fetch');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_USER_EMAIL,
    pass: process.env.MAIL_USER_PASSWORD,
  },
});

(async function run() {
  console.log('Running NBA generation');

})();