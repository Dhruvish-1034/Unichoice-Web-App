const express = require("express")
const router = express.Router();
const { universityAdmission } = require("../Controllers/admissionInformationController")

router.route("/").put(universityAdmission);

module.exports = router;