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
  GET_CUSTOMER_PROFILE,
  POST_CUSTOMER_SIGNUP,
  UPDATE_CUSTOMER_PROFILE,
  GET_ALL_CUSTOMER_PROFILES,
} = require("../config/routeConstants");

const multer = require("multer");
var kafka = require('../kafka/client');

module.exports.createCustomer=(req,res)=>{
  console.log("req.body"+JSON.stringify(req.body))
  data={
    api:POST_CUSTOMER_SIGNUP,
    body: req.body
  }
  kafka.make_request('customer_data', data, function(err,results){
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
            res.json(results);

            res.end();
        }
    
});
}

module.exports.getCustomer=(req,res)=>{
  data={
    api:GET_CUSTOMER_PROFILE,
    body: req.query
  }
  kafka.make_request('customer_data', data, function(err,results){
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
            res.json(results);

            res.end();
        }
    
});
}

module.exports.updateCustomerprofile=(req,res)=>{
  data={
    api:UPDATE_CUSTOMER_PROFILE,
    body: req.body
  }
  kafka.make_request('customer_data', data, function(err,results){
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
            res.json(results);

            res.end();
        }
    
});
}

module.exports.getAllCustomers=(req,res)=>{
  data={
    api:GET_ALL_CUSTOMER_PROFILES,
    body: req.body
  }
  kafka.make_request('customer_data', data, function(err,results){
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
            res.json(results);

            res.end();
        }
    
});
}

