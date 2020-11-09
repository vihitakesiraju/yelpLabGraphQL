const config= require('./config')
const mongoose = require("mongoose")
//const { findOneAndRemove } = require("../models/login_credentials");
//const login = require("../models/login_credentials");
const login_credentials = require('../models/login_credentials');
const  customer_data  = require('../models/customer_data');
const db=config.URI;
mongoose.connect(db, {
 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  poolSize: 100,
});
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);
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
// findemail = async () => {
//    const login_details= await login_credentials.findOne({email_id: 'Gustavo_Monk@example.com'});
//   console.log(login_details); };
// findemail();

//  function createemail(){
//    login_credentials.create({
//     email_id: 'test96@test96.com',
//     user_password: '1234',
//     user_type: 1})
//   customer_data.create({
//         customer_id:mongoose.Types.ObjectId,
//         customer_name: 'test1',
//         email_id: 'test96@test96.com',
//         birthday:'10/10/1998',
//         contact_number:'1234667',
//         about:'fvdsvdav',
//         things_loved:'fsvdvnskv',
//         find_me:'dvasdvd',
//         blog_ref:'fsvjdnvjfsn',
//         }
// )

 
//  }
// createemail();
module.exports = mcon;