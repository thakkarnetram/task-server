const express = require("express");
const serverController = require("../controllers/server-status");

const router = express.Router();

router.route("/").get(serverController.status);

module.exports = router;
