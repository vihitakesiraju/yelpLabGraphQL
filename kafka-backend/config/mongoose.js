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

module.exports = mcon;