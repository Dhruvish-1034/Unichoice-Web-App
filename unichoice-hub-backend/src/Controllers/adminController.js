const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const userEmail = await User.findOne({
            email,
        });
        if (userEmail) {
            const userPassword = await User.findOne({
                password
            })
            if (userPassword) {
                const id = userEmail._id;
                const role = userEmail.role;
                const adminData = { id, role }
                let jwtsecretkey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(adminData, jwtsecretkey);
                return res.json({
                    code: 200,
                    message: "Login Successfull",
                    data: token
                })
            } else {
                return res.json({
                    code: 401,
                    message: "Invalid Password"
                })
            }
        } else if (!userEmail) {
            return res.json({
                code: 401,
                message: "Invalid Email"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in inserting data..");
    }
};

module.exports = { adminLogin };