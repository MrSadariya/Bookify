const nodemailer = require("nodemailer");
require("dotenv").config();
const {VERIFICATION_EMAIL_TEMPLATE}=require("./emailTemplate");

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

const MailData={
    from:{
        name:"Bookify Service",
        address:process.env.NODEMAILER_MAIL,
    },
    to: "", 
    subject: "Hello ✔",  
    html: VERIFICATION_EMAIL_TEMPLATE, 
};

const getVerificationEmailTemplate=(code)=> {
    return VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code);
  }
  

const sendEMail=async(receiverEmail,OTP)=>{

    const currMailData=MailData;
    currMailData.to=receiverEmail;
    currMailData.html=getVerificationEmailTemplate(OTP);

    const info=await transporter.sendMail(currMailData);
    // console.log(info);
}

module.exports={sendEMail};

