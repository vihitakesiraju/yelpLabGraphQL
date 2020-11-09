const { response } = require("express");
//const login_model = require("../models/login_credentials");
//const con = require("../config/dbConnection");
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
  POST_LOGIN,
} = require("../config/routeConstants");
var kafka = require('../kafka/client');
const jwt = require('jsonwebtoken');
const { auth } = require('../config/passport')
const config=require('../../kafka-backend/config/config')
auth();


module.exports.login=(req,res)=>{
  data={
    api:POST_LOGIN,
    body: req.body
  }
  kafka.make_request('post_login', data, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
        console.log(results)
        const token = jwt.sign({ username: req.body.username }, config.JWTPASSWORD, {
          expiresIn: 10000000
      });
     
            res.status(RES_SUCCESS).send({ data: results, token: "JWT"+ " " + token });
        }
    
});
}


