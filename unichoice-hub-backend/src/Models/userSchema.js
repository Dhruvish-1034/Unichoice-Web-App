const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: true,
      enum: ['Student', 'University']
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
    password: {
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
