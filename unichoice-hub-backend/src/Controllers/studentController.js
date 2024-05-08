const User = require("../Models/userSchema");
const bcrypt = require('bcrypt');

const getAllStudent = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || '';
        const status = req.query.status || '';
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const query = {
            role: "Student", $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        };

        if (status) {
            query.status = status;
        }

        const totalpage = await User.countDocuments({
            ...query,
        });

        const data = await User.find({
            ...query,
        });

        const pageCount = Math.ceil(totalpage / limit);

        const userData = data.slice(startIndex, endIndex);

        return res.json({ code: 200, data: userData, page, limit, pageCount })
    } catch (error) {
        console.log(error)
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await User.deleteOne({ _id: id })
        return res.json({ code: 200, message: "User is Successfully Deleted" })
    } catch (error) {
        console.log(error)
    }
}

const addStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, role, status } = req.body
        const isEmail = await User.findOne({ email })
        if (isEmail) {
            return res.json({
                code: 400,
                message: "Email already exists !!"
            })
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const userData = new User({
            firstName,
            lastName,
            email,
            status,
            phoneNumber,
            password: await bcrypt.hash(password, salt),
            role
        })

        const resposne = await User.create(userData)

        if (resposne) {
            return res.json({
                code: 200,
                message: "Successfully added Student!!"
            })
        }

        return res.status(400).json({ message: "Bad Request !" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server error !!" })
    }
}

const updateStudent = async (req, res) => {
    try {
        const { _id, firstName, lastName, phoneNumber, status } = req.body
        const updatedStudent = await User.updateOne({ _id }, { $set: { firstName, lastName, phoneNumber, status } })
        return res.json({
            code: 200,
            data: updatedStudent,
            message: "Successfully updated"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllStudent, deleteStudent, addStudent, updateStudent }