const mongoose = require("mongoose");

const SignUpSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SignUpDetails = mongoose.model("SignUp", SignUpSchema);

module.exports = SignUpDetails;
