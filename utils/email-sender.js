const nodemailer = require("nodemailer");

exports.sendOtp = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mail = process.env.GMAIL_ID;
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Your OTP Code",
    html: `
        <h2>Hi ${email},</h2>
        <h3>Your OTP Code is: <strong>${otp}</strong></h3>
        <p>Please use this code to complete your verification process. This OTP is valid for 10 minutes.</p>
        <h4>Thank you!</h4>
        <h5>Contact Developer: <a href="mailto:${mail}">${mail}</a></h5>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to ", email);
  } catch (error) {
    console.log("Error sending OTP: ", error);
  }
};
