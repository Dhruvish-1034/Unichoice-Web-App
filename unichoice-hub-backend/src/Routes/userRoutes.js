const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/userController");

router.route("/login").post(login);
router.route("/signup").post(signup);

module.exports = router;
