const User = require("../Models/userSchema");
const universityDetail = require("../Models/universityDetail")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {

  try {
    const { firstName, lastName, email, phoneNumber, password, role, universityName, universityWebsite, status } = req.body;
    // User already exits in DB
    const isEmail = await User.findOne({ email });
    const isWebsite = await universityDetail.findOne({ universityWebsite })
    const isUniversityName = await universityDetail.findOne({ universityName })
    if (isEmail) {
      return res.json({
        code: 400,
        message: "Email already exists !!"
      })
    }

    if (isUniversityName) {
      return res.json({
        code: 400,
        message: "Univeristy Name already taken !!"
      })
    }

    if (isWebsite) {
      return res.json({
        code: 400,
        message: "Website already register !!"
      })
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const userData = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, salt),
      role,
      status
    })

    if (role == "University") {
      const response1 = await User.create(userData);

      if (response1) {
        const universityData = new universityDetail({
          universityName,
          universityWebsite,
          userId: response1._id
        })
        const response2 = await universityDetail.create(universityData);
        if (response1 && response2) {
          return res.json({
            code: 200,
            message: "Signup Successfully !!"
          })
        }
      }
    } else {
      const response = await User.create(userData);
      if (response) {
        return res.json({
          code: 200,
          message: "Signup Successfully !!"
        })
      }
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

    const universityData = await universityDetail.findOne({ userId: user._id })

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userId = user._id
        const role = user.role;
        const universityId = universityData._id;
        const data = { userId, role, universityId };
        let jwtsecretkey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(data, jwtsecretkey);
        return res.json({
          code: 200,
          data,
          authToken: token,
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
