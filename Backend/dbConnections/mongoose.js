const mongoose = require("mongoose");
const { findOneAndRemove } = require("../models/login_credentials");
const login = require("../models/login_credentials");
mongoose.connect("mongodb://localhost/yelp", {
  useMongoClient: true,
});

const mcon = mongoose.connection;
mcon
  .once("open", () => console.log("connected to mongoose!!"))
  .on("error", (error) => {
    console.log("Error", error);
  });

// login.insertMany({
//   email_id: "test@test.com",
//   user_password: "12345",
//   user_type: 1,
// });
// console.log("inserted");
// findemail = async () => {
//   const login_details = await login.findOne({
//     email_id: "test123@test.com",
//   });
//   console.log("login_details" + login_details.user_password);
// };
// findemail();
module.exports = mcon;
