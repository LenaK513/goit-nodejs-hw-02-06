const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { API_KEY_SG } = process.env;

sgMail.setApiKey(API_KEY_SG);

const sendEmail = async (data) => {
  const email = { ...data, from: "kryvtsovaolena@gmail.com" };
  try {
    const result = await sgMail.send(email);
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
module.exports = sendEmail;
