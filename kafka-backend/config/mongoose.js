const config= require('./config')
const mongoose = require("mongoose");
//const { findOneAndRemove } = require("../models/login_credentials");
//const login = require("../models/login_credentials");
const login_credentials = require('../models/login_credentials');
const db=config.URI;
mongoose.connect("mongodb://localhost/yelp", {
  useMongoClient: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise
const mcon = mongoose.connection;
mcon
  .once("open", () => console.log("connected to db!!"))
  .on("error", (error) => {
    console.log("Error", error);
  });


// login.insertMany({
//   email_id: "test@test.com",
//   user_password: "12345",
//   user_type: 1,
// });
// console.log("inserted");
findemail = async () => {
   const login_details= await login_credentials.findOne({email_id: 'Gustavo_Monk@example.com'});
  console.log(login_details); };
findemail();
module.exports = mcon;