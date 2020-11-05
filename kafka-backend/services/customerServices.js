const customer_data=require('../models/customer_data');
const { response } = require("express");
const route = require('../../Backend/config/routeConstants');
const login_credentials = require('../models/login_credentials');
const mongoose = require('mongoose');

function handle_request(msg,callback){
  console.log("in handle request customer");
 if(msg.api===route.POST_CUSTOMER_SIGNUP){
    console.log("Inside Customer Create POST service"+JSON.stringify(msg.body.EMAIL));
    let logindetails=new login_credentials({
        email_id: msg.body.EMAIL,
        user_password: msg.body.PASSWORD,
        user_type: 1
    })
    logindetails.save().then((res)=>{
        console.log("insidelogindetails")
        let id=mongoose.Types.ObjectId()
        let customerdetails=new customer_data({
        customer_id: id,
        customer_name: msg.body.NAME,
        email_id: msg.body.EMAIL,
        birthday:msg.body.BIRTHDAY,
        contact_number:msg.body.PHONE,
        about:msg.body.ABOUT,
        things_loved:msg.body.THINGS_LOVED,
        find_me:msg.body.FIND_ME,
        blog_ref:msg.body.BLOG_REF,
        }
)
console.log("customerdetails"+customerdetails)
customerdetails.save().then((res)=>{
    callback(null,response)
}).catch(err=>{
    login_credentials.findOneAndDelete({email_id:msg.body.EMAIL}).then(
        callback(err,'Error')
    )
})
    }).catch(err=>{
        login_credentials.findByIdAndDelete({email_id:msg.body.EMAIL}).then(
            callback(err,'Error')
        )
    })
    }
 
 else if(msg.api===route.GET_ALL_CUSTOMER_PROFILES){
    console.log("get all customer profiles")
    customer.find({},
        (err,result)=>{
            if(err){
            callback(err,'Error')
            }
            else{
                callback(null,result)
            }
        })
 }
 else if(msg.api===route.GET_CUSTOMER_PROFILE){
    customer.findOne({email_id:msg.body.EMAIL},
        (err,result)=>{
            if(err){
            callback(err,'Error')
            }
            else{
                callback(null,result)
            }
        })
 }
 else if(msg.api===route.UPDATE_CUSTOMER_PROFILE){
     let cust_update={
        customer_name: msg.body.NAME,
        birthday:msg.body.BIRTHDAY,
        contact_number:msg.body.PHONE,
        about:msg.body.ABOUT,
        things_loved:msg.body.THINGS_LOVED,
        find_me:msg.body.FIND_ME,
        blog_ref:msg.body.BLOG_REF,
   
     }
     customer.findByIdAndUpdate({customer_id:msg.body.customer_id},customer,(err,result)=>{
        if(err){
            callback(err,'Error')
            }
            else{
                callback(null,result)
            }
     })
  
 }
}


exports.handle_request=handle_request;