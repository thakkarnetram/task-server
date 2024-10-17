const OtpModel = require("../model/otp-model");
const emailSender = require("../utils/email-sender");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.createAndSendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  if (!email) {
    return res.status(400).json({ message: "Email cant be empty" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  const otpRecord = new OtpModel({
    otp: otp,
    isUsed: false,
  });

  try {
    await otpRecord.save();
    console.log(`Generated OTP for ${email}: ${otp}`);
    await emailSender.sendOtp(email, otp);
    return res.status(200).json({ message: "OTP SENT" });
  } catch (error) {
    console.error("Error generating OTP: ", error);
  }
};
