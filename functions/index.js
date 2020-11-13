const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs=require('fs'); 
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = "goonlinetools@gmail.com";
const gmailPassword = "ThisIsTh3Ultim@t3Prot3ct3d@ccount";
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

var htmlmail=fs.readFileSync("welcome.html","utf-8").toString();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const recipent_email = user.email; 
   
    const mailOptions = {
        from: '"GoOnlineTools" <admin@goonlinetools.com>',
        to: recipent_email,
        subject: 'Welcome to GoOnlineTools',
         html: htmlmail
    };
    
  try {
    mailTransport.sendMail(mailOptions);
    console.log('email send');
    
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
return null; 
  });