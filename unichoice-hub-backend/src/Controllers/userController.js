const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {

  try {
    const { firstName, lastName, email, phoneNumber, password, role, universityName, universityWebsite } = req.body;
    // User already exits in DB
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.json({
        code: 400,
        message: "Email is already exists !!"
      })
    }
    const fullName = firstName + " " + lastName;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const userData = new User({
      fullName,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, salt),
      role
    })

    if (role == "University") {
      userData["universityName"] = universityName;
      userData["universityWebsite"] = universityWebsite;
    }

    const resposne = await User.create(userData);
    if (resposne) {
      return res.json({
        code: 200,
        message: "Signup Successfully !!"
      })
    }

    return res.status(400).json({ message: "Bad Request !" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error !!" })
  }

};


const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      email,
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const role = user.role;
        const data = { email, password, role };
        let jwtsecretkey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(data, jwtsecretkey);
        return res.json({
          code: 200,
          data: token,
          message: "Login Successfull"
        })
      } else {
        return res.json({
          code: 400,
          message: "Invalid Password"
        })
      }
    } else {
      return res.json({
        code: 404,
        message: "Email dosen't exists"
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in inserting data..");
  }
};

module.exports = { login, signup };
