const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const login_credentials = new Schema({
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_type: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = login = mongoose.model(
  "login_credentials",
  login_credentials,
  "login_credentials"
);
