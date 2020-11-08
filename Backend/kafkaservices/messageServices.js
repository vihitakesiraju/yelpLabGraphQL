const {response}=require('express')
const mongoose=require('mongoose')

const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    GET_MESSAGES,
    GET_CUSTOMER_MESSAGES_LIST,
    POST_MESSAGES,
    GET_RESTAURANT_MESSAGES_LIST,
    POST_FIRST_MESSAGE,
  } = require("../config/routeConstants");
  
  const multer = require("multer");
  var kafka = require('../kafka/client');
  
  module.exports.getMessages=(req,res)=>{
    console.log("inside get messages")
    console.log("req.body"+JSON.stringify(req.query))
    data={
      api:"GET_MESSAGES",
      body: req.query
    }
    kafka.make_request('message_data', data, function(err,results){
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
  
  module.exports.customerMessagelist=(req,res)=>{
    console.log("in get customer messages")
    console.log(req.query)
    data={
      api:GET_CUSTOMER_MESSAGES_LIST,
      body: req.query
    }
    kafka.make_request('message_data', data, function(err,results){
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
  
  module.exports.postMessages=(req,res)=>{
    console.log("post messages")
    console.log(req.body)
    data={
      api:"POST_MESSAGES",
      body: req.body
    }
    kafka.make_request('message_data', data, function(err,results){
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
  
  module.exports.restaurantMessagelist=(req,res)=>{
    console.log("in get restaurant messages")
    console.log(req.body)
    data={
      api:GET_RESTAURANT_MESSAGES_LIST,
      body: req.query
    }
    kafka.make_request('message_data', data, function(err,results){
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

  module.exports.postFirstmessage=(req,res)=>{
    console.log("inside post firtst message")
    
    data={
      api:POST_FIRST_MESSAGE,
      body: req.body
    }
    kafka.make_request('message_data', data, function(err,results){
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