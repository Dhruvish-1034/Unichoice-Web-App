const express = require("express")
const router = express.Router();
const { getAllStudent, deleteStudent, addStudent, updateStudent } = require("../Controllers/studentController")

router.route("/getAllStudent").get(getAllStudent);
router.route("/addstudent").post(addStudent);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);

module.exports = router;