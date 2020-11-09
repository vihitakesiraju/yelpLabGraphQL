//const login=require('../models/login_credentials');
//const login_model = require("../models/login_credentials");
//const event_model=require("../models/events_data")
//const restaurant_data=require('../models/restaurant_data');
//const register_data=require('../models/registrations_data')
const { response } = require("express");
const route = require('../../Backend/config/routeConstants')
const mongoose=require('mongoose')
const customer_data=require('../models/customer_data');
//const events_data = require("../models/events_data");
function handle_request(msg,callback){
  console.log("in handle request")
    
    if(msg.api===route.POST_IMAGE_USER_PROFILE){
      customer_data.find({customer_id:msg.body.customer_id},(err,result)=>{
        if (err) {
          console.log("error " + err);
          callback(err, 'Error')
      }
      else {   
           console.log('events display' + result)
           customer_data.findOneAndUpdate({customer_data},{$push:{profile_image_link: msg.body.file}},(err,res)=>{
               if(err){
                console.log("error " + err);
                callback(err, 'Error')
               }
               else{
                console.log("image updated")
                callback(null, result)
               }
                  
                  
                })
          }
      })

    }
    
}


exports.handle_request=handle_request