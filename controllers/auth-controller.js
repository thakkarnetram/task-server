const OtpModel = require("../model/otp-model");

exports.login = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log(otp);

    if (!otp) {
      return res.status(400).json({ messag: "Otp is required" });
    }
    const otpRecord = await OtpModel.findOne({ otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpRecord.isUsed) {
      return res.status(400).json({ message: "OTP has already been used" });
    }
    otpRecord.isUsed = true;
    await otpRecord.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};
