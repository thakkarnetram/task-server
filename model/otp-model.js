const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
  },
  isUsed: {
    type: Boolean,
  },
});

const OtpSchema = mongoose.model("otp", otpSchema);
module.exports = OtpSchema;
