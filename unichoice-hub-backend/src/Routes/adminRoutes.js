const express = require("express");
const router = express.Router();
const { adminLogin } = require("../Controllers/adminController")

router.route("/login").post(adminLogin);

module.exports = router;