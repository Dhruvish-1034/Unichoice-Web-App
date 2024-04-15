const express = require("express")
const router = express.Router();
const { StudentListController, deleteStudent, viewStudent } = require("../../src/Controllers/StudentListController")

router.route("/studentlist").get(StudentListController);
router.route("/deletestudent/:id").delete(deleteStudent);
router.route("/viewstudent/:id").get(viewStudent);

module.exports = router;