require('dotenv').config()
const nodemailer = require("nodemailer");

function getTheDate() {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${nthNumber(day)}, ${year}`;
};

(async function run() {
  console.log('Running email report');

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_USER_EMAIL,
      pass: process.env.MAIL_USER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: `
      Daily Sports Schedule for ${getTheDate()}
    `, // Subject line
    text: `
      Hello World
    `, // plain text body
    html: `
      <b>Hello world?</b>
    `, // html body
  });
  
  console.log("Message sent");
})();