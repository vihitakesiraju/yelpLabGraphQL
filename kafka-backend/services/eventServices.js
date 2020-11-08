//const login=require('../models/login_credentials');
const login_model = require("../models/login_credentials");
const event_model=require("../models/events_data")
const restaurant_data=require('../models/restaurant_data');
const register_data=require('../models/registrations_data')
const { response } = require("express");
const route = require('../../Backend/config/routeConstants')
const mongoose=require('mongoose')
const customer_data=require('../models/customer_data');
//const events_data = require("../models/events_data");
function handle_request(msg,callback){
  console.log("in handle request")
    
    if(msg.api===route.GET_ALL_EVENTS){
      event_model.find({},(err,result)=>{
        if (err) {
          console.log("error " + err);
          callback(err, 'Error')
      }
      else {   
           console.log('events display' + result)
                  callback(null, result)     
          }
      })

    }
    else if(msg.api===route.POST_EVENT_REGISTRATION){
      //let customerid=customer_data.findOne({email_id:msg.body.email_id})
      let date=new Date;
      let register=new register_data({
          event_id:msg.body.event_id,
          customer_id:msg.body.customer_id,
          registration_date: date,
          registration_time:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

         
      })
      console.log("post event registration"+register)
      register.save().then((err, result) => {
        console.log("event registration saved")
        if (err) {
            console.log("error " + err);
            callback(err, 'Error')
        }
        else {   
             console.log('event Created' + result)
                   event_model.findOneAndUpdate({ _id: msg.body.event_id }, { $push: { "events_registered": register._id } }, (err, res) => {
                        if (err) {
                            console.log('Error ' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Registrations' + res)
                            callback(null, res)
                        }
                    })    
            }})
  }
    
else if(msg.api===route.POST_EVENT){

  console.log("Inside Events POST create service");
  console.log(msg.body)
  if (msg.body.image_url == undefined) {
    msg.body.image_url = "undefined";
  }

  let id=mongoose.Types.ObjectId()
  let event_details=new event_model({
    event_id:id,
    event_name: msg.body.event_name,
    event_description:msg.body.event_description,
    event_date: msg.body.event_date,
    event_time:msg.body.event_time,
    event_creator_id:msg.body.event_creator_id,
    event_latitude:msg.body.event_latitude,
    event_longitude:msg.body.event_longitude,
    event_hashtags: msg.body.event_hashtags,
    image_url:msg.body.image_url,

  })
  event_details.save().then((err,result)=>{
    if(err){
      console.log("Error in saving",err)
      callback(err, 'Error')
    }
    else
    {
      console.log("saved event")
      console.log(result)

      callback(null, result) 
    }
  })
    }

    else if(msg.api===route.GET_REGISTRATIONS_EVENT){
      console.log("Inside Events GET by restaurantID service");  
      
      event_model.find({ event_creator_id: msg.body.restaurant_id }).sort('event_id').populate('event_id').exec(
        (err, result) => {
            if (err) {
                console.log('Error occured while fetching Registrations' + err)
                callback(err, 'Error')
            }
            else {
                console.log('Registrations fetched' + result)
                callback(null, result)
            }
        }
    )
      }
      
      else if(msg.api===route.GET_EVENT_BY_RESTAURANT){
        console.log("Inside Events GET by restaurantID service");  
        
        event_model.find({ event_creator_id: msg.body.restaurant_id }).sort('-event_date').populate('event_id').exec(
          (err, result) => {
              if (err) {
                  console.log('Error occured while fetching Registrations' + err)
                  callback(err, 'Error')
              }
              else {
                  console.log('Registrations fetched' + result)
                  callback(null, result)
              }
          }
      )
        } 

    
    else if(msg.api===route.GET_REGISTRATIONS_CUSTOMER){
      register_data.find({ customer_id: msg.body.customer_id },
        (err, result) => {
            if (err) {
                console.log('Error occured while fetching Registrations' + err)
                callback(err, 'Error')
            }
            else {
                console.log('get registrations by customer' + result)
                callback(null, result)
            }
        }).populate('event_id')
    }

    else if(msg.api===route.GET_REGISTRATIONS_RESTAURANT){
      event_model.find({ event_creator_id: msg.body.event_id },
        (err, result) => {
            if (err) {
                console.log('Error' + err)
                callback(err, 'Error')
            }
            else {
                console.log('get registrations by restaurant ' + result)
                callback(null, result)
            }
        })



}
}


exports.handle_request=handle_request