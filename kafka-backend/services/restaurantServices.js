const restaurant_data=require('../models/restaurant_data');
const { response } = require("express");
const route = require('../../Backend/config/routeConstants');
const login_credentials = require('../models/login_credentials');
const menus_data=require('../models/menus_data')
const dishes_data=require('../models/dishes_data')
const mongoose = require('mongoose');

function handle_request(msg,callback){
  console.log("in handle request restaurant kafka");
 if(msg.api===route.POST_RESTAURANT_SIGNUP){
    console.log("Inside Customer Create POST service"+JSON.stringify(msg.body));
    let logindetails=new login_credentials({
        email_id: msg.body.email,
        user_password: msg.body.password,
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
console.log("restaurantdetails"+restaurantdetails)
restaurantdetails.save().then((res)=>{
    console.log("in c")
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
     console.log("in post menu item")
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
                    console.log("dishes saved")
                    if (err) {
                        console.log("error " + err);
                        callback(err, 'Error')
                    }
                    else {
                        restaurant_data.findOneAndUpdate({ email: msg.body.email }, { $push: { "dishes": dishes } }, (err, result) => {
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
     restaurant_data.findOne({email:msg.body.email},
        (err,result)=>{
            console.log(result)
            if(err){
            callback(err,'Error')
            }
            else{
                dishes_data.find({"_id":{"$in":result["dishes"]}},(err,results)=>{
                    console.log(results)
                    if(err){
                        callback(err,'Error')
                    }
                else{
                callback(null,results)
                }
                })
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
    console.log(msg.body)

    restaurant_data.find({
        "$or":[
            {restaurant_name:{$regex: '.*'+msg.body.search_string+'.*',$options:'i' }},
            {restaurant_location:{$regex: '.*'+msg.body.search_string+'.*',$options:'i' }},
            {restaurant_description:{$regex: '.*'+msg.body.search_string+'.*',$options:'i' }},
            {restaurant_address:{$regex: '.*'+msg.body.search_string+'.*',$options:'i' }},
            {address_city:{$regex: '.*'+msg.body.search_string+'.*',$options:'i' }},
            {address_postal_code:{$regex: '.*'+msg.body.search_stringy+'.*',$options:'i' }},
            {address_state:{$regex: '.*'+msg.body.search_string+'.*',$options:'i' }},
        ]
    },(err,result)=>{
        if (err) {
            console.log('Error in fetching restaurant profile' + err)
            callback(err, 'Error')
        }
        else {
            
            callback(null, result)
        }
    })
  
 }

 else if(msg.api===route.GET_RESTAURANT_PROFILE){
     console.log("restaurant search in kafka")
    restaurant_data.find({ email: msg.body.email }, (err, result) => {
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
    console.log("inside update restaurant profile"+JSON.stringify(msg.body))
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
       restaurant_data.findOneAndUpdate({ email: msg.body.email }, {...restaurantdetails}, (err, result) => {
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