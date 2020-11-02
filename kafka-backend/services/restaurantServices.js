const restaurant_data=require('../models/restaurant_data');
const { response } = require("express");
const route = require('../../Backend/config/routeConstants');
const login_credentials = require('../models/login_credentials');
const menus_data=require('../models/menus_data')
const dishes_data=require('../models/dishes_data')
const mongoose = require('mongoose');

function handle_request(msg,callback){
  console.log("in handle request customer");
 if(msg.api===route.POST_RESTAURANT_SIGNUP){
    console.log("Inside Customer Create POST service"+JSON.stringify(msg.body));
    let logindetails=new login_credentials({
        email_id: msg.body.EMAIL,
        user_password: msg.body.PASSWORD,
        user_type: 2
    })
    logindetails.save().then((res)=>{
        console.log("insidelogindetails")
        let id=mongoose.Types.ObjectId()
        let restaurantdetails=new restaurant_data({
            restaurant_id: id,
            restaurant_name: msg.body.restaurant_name,
            restaurant_location: msg.body.restaurant_location,
            restaurant_description: msg.body.restaurant_description,
            restaurant_address: msg.body.restaurant_address,
            address_city: msg.body.address_city,
            address_state: msg.body.address_state,
            address_postal_code: msg.body.address_postal_code,
            address_latitude: msg.body.address_latitude,
            address_longitude: msg.body.address_longitude,
            primary_phone: msg.body.primary_phone,
            secondary_phone: msg.body.secondary_phone,
            email: msg.body.email,
            open_time: msg.body.open_time,
            close_time: msg.body.close_time,
        }
)
console.log("customerdetails"+customerdetails)
restaurantdetails.save().then((res)=>{
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
 
 else if(msg.api===route.POST_MENU_ITEM){
    let id = mongoose.Types.ObjectId()

                let dishes = new dishes_data({
                    description: msg.body.description,
                    dish_name: msg.body.dish_name,
                    image_url: msg.body.image_url,
                    ingredients: msg.body.ingredients,
                    dish_id: id,
                    price: msg.body.price,
                    description: msg.body.description,
                    category_id: msg.body.category_id 
                })
                dishes.save((err, res) => {
                    if (err) {
                        console.log("error " + err);
                        callback(err, 'Error')
                    }
                    else {
                        restaurant_data.findOneAndUpdate({ email: msg.body.email }, { $push: { "dishes": dish } }, (err, result) => {
                            if (err) {
                                console.log('Error ' + err)
                                callback(err, 'Error')
                            }
                            else {
                                console.log('Menu Created' + result)
                                callback(null, result)
                            }
                        })
                    }

                })
 }
 else if(msg.api===route.GET_RESTAURANT_MENU){
     restaurant_data.findOne({email_id:msg.body.EMAIL},
        (err,result)=>{
            if(err){
            callback(err,'Error')
            }
            else{
                callback(null,result.dishes)
            }
        })
 }
 else if(msg.api===route.UPDATE_MENU_ITEM){
    let dishes = {
        description: msg.body.description,
        dish_name: msg.body.dish_name,
        image_url: msg.body.image_url,
        ingredients: msg.body.ingredients,
        price: msg.body.price,
        description: msg.body.description,
        category_id: msg.body.category_id 
    }
     dishes_data.findByIdAndUpdate({dish_id:msg.body.dish_id},dishes,(err,result)=>{
        if(err){
            callback(err,'Error')
            }
            else{
                callback(null,result)
            }
     })
  
 }

 else if(msg.api===route.GET_RESTAURANT_SEARCH){
    console.log("get_restaurant_search")
  
 }

 else if(msg.api===route.GET_RESTAURANT_PROFILE){
    restaurant_data.find({ email: msg.body.email_id }, (err, result) => {
        if (err) {
            console.log('Error in fetching restaurant profile' + err)
            callback(err, 'Error')
        }
        else {
            
            callback(null, result)
        }
    })
  
 }
 else if(msg.api===route.UPDATE_RESTAURANT_PROFILE){
    let restaurantdetails= {
        restaurant_location: msg.body.restaurant_location,
        restaurant_description: msg.body.restaurant_description,
        restaurant_address: msg.body.restaurant_address,
        address_city: msg.body.address_city,
        address_state: msg.body.address_state,
        address_postal_code: msg.body.address_postal_code,
        address_latitude: msg.body.address_latitude,
        address_longitude: msg.body.address_longitude,
        primary_phone: msg.body.primary_phone,
        secondary_phone: msg.body.secondary_phone,
        open_time: msg.body.open_time,
        close_time: msg.body.close_time,
    }
       restaurant_data.findOneAndUpdate({ email: msg.body.email }, restaurantdetails, (err, result) => {
        if (err) {
            console.log('Error in restaurant profile' + err)
            callback(err, 'Error')
        }
        else {
        
            callback(null, result)
        }
    })
  
 }
}


exports.handle_request=handle_request;