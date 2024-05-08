const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: true,
      enum: ['Student', 'University']
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
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
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", ReactFormDataSchema);
module.exports = User;
