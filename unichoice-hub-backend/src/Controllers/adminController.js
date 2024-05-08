const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            email,
        });
        if (user) {
            if (user.password === password) {
                const id = user._id;
                const role = user.role;
                const adminData = { id, role }
                let jwtsecretkey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(adminData, jwtsecretkey);
                return res.json({
                    code: 200,
                    message: "Login Successfull",
                    authToken: token,
                    data: adminData,
                })
            } else {
                return res.json({
                    code: 401,
                    message: "Invalid Password"
                })
            }
        } else if (!user) {
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