//const customer_data=require('../models/customer_data');
const { response } = require("express");
const route = require('../../Backend/config/routeConstants');
//const login_credentials = require('../models/login_credentials');
const mongoose = require('mongoose');
const review_data=require('../models/reviews_data')
  

function handle_request(msg,callback){
  console.log("in handle request customer");
 if(msg.api===route.GET_REVIEWS_BY_RESTAURANT){
    console.log("Inside Customer Create POST service"+JSON.stringify(msg.body.EMAIL));
    review_data.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
        if (err) {
            console.log('Error occured while fetching Reviews' + err)
            callback(err, 'Error')
        }
        else {
            console.log('reviews' + result)
            callback(null, result)
        }
    }).populate('customer_id')
    }
 
 else if(msg.api===route.POST_REVIEW_CUSTOMER){
    console.log("get all customer profiles")
    let review_id = mongoose.Types.ObjectId();

                let review = new Reviews({
                    review_id: review_id,
                    customer_id: msg.body.customer_id,
                    restaurant_id: msg.body.restaurant_id,
                    stars: msg.body.stars,
                    review_date: Date.now(),
                    review_text: msg.body.review_text
                })

                review.save().then((result) => {
                    console.log('Review saved' + result)
                    callback(null, result)
                }).catch((err) => {
                    console.log('Error occured while saving Review' + err)
                    callback(err, 'Error')
                })
 }
 else if(msg.api===route.GET_REVIEWS_ID_RESTAURANT){
     console.log("in get cust profile")
     console.log("to be edited")
     review_data.find({ restaurant_id: msg.body.restaurant_id }, (err, result) => {
        if (err) {
            console.log('Error occured while fetching Reviews' + err)
            callback(err, 'Error')
        }
        else {
            console.log('reviews' + result)
            callback(null, result)
        }
    }).populate('customer_id')
 }
 else if(msg.api===route.GET_REVIEWS_BY_CUSTOMER){
    review_data.find({ customer_id: msg.body.customer_id }, (err, result) => {
        if (err) {
            console.log('Error occured while fetching Reviews' + err)
            callback(err, 'Error')
        }
        else {
            console.log('reviews' + result)
            callback(null, result)
        }
    }).populate('restaurant_id')
}

}
exports.handle_request=handle_request;