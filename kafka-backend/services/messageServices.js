const customer_data=require('../models/customer_data');
const { response } = require("express");
const route = require('../../Backend/config/routeConstants');
const login_credentials = require('../models/login_credentials');
const restaurant_data=require('../models/restaurant_data');
const message_data=require('../models/messages_data')
const mongoose = require('mongoose');

function handle_request(msg,callback){
  console.log("in handle request messages");

 if(msg.api==="POST_MESSAGES"){
    console.log("Inside POST messages"+JSON.stringify(msg.body.message));
    if(msg.body.sender===2){
        sender="Customer"
    }
    else{
        sender="Restaurant"
    }
    let message={
        message: msg.body.message,
        time: Date.now(),
        action: sender
    }
    
    console.log("message"+message)
    message_data.findOneAndUpdate({  customer_id: msg.body.customer_id  },
                { $push: { messages: message } }, (err, result) => {
                    if (err) {
                        console.log('Error occured while Updating Conversation' + err)
                        callback(err, 'Error')
                    }
                    else {
                        console.log('Message Created' + result)
                        callback(null, result)
                    }
                })
        

    
}
 
 else if(msg.api===route.GET_CUSTOMER_MESSAGES_LIST){
    console.log("get customer messages list")
    console.log(msg.body)
    message_data.find({ customer_id: msg.body.customer_id }, (err, result) => {
        if (err) {
            console.log('Error occured while fetching Conversations' + err)
            callback(err, 'Error')
        }
        else {
            console.log('Fetching Conversations' + result)
            callback(null, result)
        }
    }).populate('restaurant_id')
    
 }
 else if(msg.api===route.GET_RESTAURANT_MESSAGES_LIST){
     console.log("in get restaurant message list")
    message_data.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
        if (err) {
            console.log('Error occured while fetching Conversations' + err)
            callback(err, 'Error')
        }
        else {
            console.log('Fetching Conversations' + result)
            callback(null, result)
        }
    }).populate({ path: 'customer_id', model: 'customer_data' }).populate({ path: 'restaurant_id', model: 'restaurant_id' })
 }
 else if(msg.api===route.POST_FIRST_MESSAGE){
    console.log("in post first message")
    let id = mongoose.Types.ObjectId()
    let messaging = new message_data({
                    message_id: id,
                    restaurant_id: msg.body.restaurant_id,
                    customer_id: msg.body.customer_id
    })
    console.log(messaging)
    message_data.findOne({ $and: [{ restaurant_id: msg.body.restaurant_id }, { customer_id: msg.body.customer_id }] }, (err, res) => {
                    console.log(res)
                    if (err) {
                        console.log('Unable to Initiate Message' + err)
                        callback(err, 'Error')
                    }
                    else if(res!== null){
                        message_data.findOneAndUpdate({ $and: [{ restaurant_id: msg.body.restaurant_id }, { customer_id: msg.body.customer_id }] },
                            { $push: { messages: [] } }, (err, result) => {
                                if (err) {
                                    console.log(' first Conversation already exists' + err)
                                    callback(err, 'Error')
                                }
                                else {
                                    console.log('Message Created' + result)
                                    callback(null, result)
                                }
                            })
                    }
                    
                    else {
                        messaging.save((err) => {
                            if (err) {
                                console.log('Unable to Initiate Message' + err)
                                callback(err, 'Error')
                            }
                            else {
                                console.log('Conversation Created ')
                                callback(null, messaging)
                            }
                        })
                    }
                })

 }
 else if(msg.api==="GET_MESSAGES"){
    console.log("in get cust profile")
    message_data.find({ _id: msg.body.conversation_id }, (err, result) => {
        if (err) {
            console.log('Error occured while fetching Conversations' + err)
            callback(err, 'Error')
        }
        else {
            console.log('Fetching Conversations' + result)
            callback(null, result)
        }
    }).populate('messages').populate('restaurant_id')
  


}
   
}





exports.handle_request=handle_request;