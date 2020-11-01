const { response } = require("express");
const login_model = require("../models/login_credentials");
const con = require("../config/dbConnection");
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");



module.exports.login = async (req, res) => {
  console.log("Inside Login POST service");
  console.log("req body" + JSON.stringify(req.body));
  const user_name = req.body.username;
  const user_password = req.body.password;
  try {
    console.log("inside try" + user_name);
    //console.log(login.findOne({ email_id: username }));
    const login_details = await login_model.findOne({
      email_id: user_name,
    });
    //console.log(login_details);
    console.log("login_details" + " " + login_details);
    if (!login_details) {
      //console.log(login_details.email_id);
      //console.log("error" + error);
      res.status(400).end(JSON.stringify(error));
    }
    //console.log(login_details[0]);
    if (login_details.user_password === user_password) {
      console.log("correct pwd");
      console.log("login_details" + JSON.stringify(login_details));
      res.status(200).send({
        user_type: login_details.user_type.toString(),
        email_id: login_details.email_id,
      });
    }
  } catch (e) {
    //console.log("login_details" + JSON.stringify(login_details));
    res.status(500).end(JSON.stringify(e));
  }

};
