const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  //Gmail
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "pradeep.9997@gmail.com",
    pass: "zmwrwjvnefcmjwvm",
  },
});

module.exports={transporter}