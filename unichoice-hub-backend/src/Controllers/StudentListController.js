const User = require("../Models/userSchema");
const { param } = require("../Routes/userRoutes");


const StudentListController = async (req, res) => {
    try {
        const user = await User.find({ role: "Student" })
        if (user) {
            const page = Number(req.params) || 1
            let limit = Number(req.params) || 10
            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;

            const userData = user.slice(startIndex, endIndex)

            return res.json({ code: 200, data: userData })
        } else {
            return res.json({ code: 400, message: "something went wrong" })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await User.deleteOne({ _id: id })
        return res.json({ code: 200, message: "user successfully deleted" })
    } catch (error) {
        console.log(error)
    }
}

const viewStudent = async (req, res) => {
    try {
        const { id } = req.params
        const viewData = await User.findOne({ _id: id })
        if (viewData) {
            return res.json({ code: 200, data: viewData })
        } else {
            return res.json({ code: 200, message: "No user found" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { StudentListController, deleteStudent, viewStudent }