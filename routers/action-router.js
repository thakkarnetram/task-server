const express = require("express");
const actionController = require("../controllers/action-controller");

const router = express.Router();

router.route("/otp").post(actionController.createAndSendOtp);

module.exports = router;
