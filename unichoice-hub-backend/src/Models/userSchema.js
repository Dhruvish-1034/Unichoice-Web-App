const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    hashedPassword: {
      type: String,
      require: true,
    },
    confirmpass: {
      type: String,
      require: true,
    },
    universityName: {
      type: String,
    },
    universityWebsite: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", ReactFormDataSchema);
module.exports = User;
