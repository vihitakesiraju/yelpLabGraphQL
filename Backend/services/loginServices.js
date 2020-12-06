const { response } = require("express");
//const login_model = require("../models/login_credentials");
const con = require("../config/dbConnection");
const login_model = require("../models/login_credentials");
const restaurant_data= require("../models/restaurant_data");
const customer_data=require("../models/customer_data");
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

  login_model.findOne({
    email_id: user_name,
  },function(err,result){
    console.log("result"+result)
    if(err){
      res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
    }
   else{
    if(result.user_password === user_password){
      if(result.user_type === 1){
        customer_data.findOne({email_id:result.email_id},(error,results)=>{
          if(error){
            console.log('error'+error)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
          }
          else{
            console.log('result in customer login'+results)
            let login={
              cred: result,
              customer: results
            }
            res.status(RES_SUCCESS).send(JSON.stringify(login));
          }
        })

      }
      else{
        console.log(result.email_id)
        restaurant_data.findOne({_id:"5f9fbb5c1f10b3733b54331e"},(error,results)=>{
          if(error){
            console.log('error'+error)
            res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(error));
          }
          else{
            console.log('result in restaurant login'+results)
            let login={
              cred: result,
              restaurant:results
            }
            console.log(JSON.stringify(login))
            res.status(RES_SUCCESS).send(JSON.stringify(login));
          }
        })

      }
      //callback(null,result);
    }
  }
  })
}

