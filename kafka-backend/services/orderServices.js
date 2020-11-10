//const login=require('../models/login_credentials');


const restaurant_data=require('../models/restaurant_data');
const order_data=require('../models/orders_data')
const cart_data=require('../models/cart_data')
const delivery_data=require('../models/delivery_address')
const dishes_data=require('../models/dishes_data')

const { response } = require("express");
const route = require('../../Backend/config/routeConstants')
const mongoose=require('mongoose')

function handle_request(msg,callback){
  console.log("in handle request orders")
    
    if(msg.api==="POST_ORDER"){
        console.log("in post order")
        console.log(msg.body)
        let orderTotal = 0
        let itemsList = [];
        
        msg.body.cart_items.map(async (cartItem) => {
            console.log(cartItem)
            let temp = new cart_data({
                dish_id: cartItem.dish_id,
                // dish_name
                count: cartItem.count
            })
            itemsList.push(temp)
        })
        let savedList = [];
        cart_data.insertMany(itemsList).then((result) => {

            savedList = result
            console.log("Result" + savedList)
            let deliveryAddress
            if (msg.body.order_type === "Delivery") {
                console.log("testing")
                del_address = new delivery_data({
                    delivery_address: msg.body.delivery_address,
                    address_city: msg.body.address_city,
                    // address_state: msg.body.address_state,
                    address_postal_code: msg.body.address_postal_code,
                    address_latitude: msg.body.address_latitude,
                    address_longitude: msg.body.address_longitude,
                    primary_phone: msg.body.primary_phone,
                })
                del_address.save().then((res) => {


                    let oId = mongoose.Types.ObjectId()
                    let date = new Date();
                    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                    let order = new order_data({
                        order_id: oId,
                        customer_id: msg.body.customer_id,
                        restaurant_id: msg.body.restaurant_id,
                        payment_card_digits: msg.body.payment_card_digits,
                        cart_items: itemsList,
                        order_type: msg.body.order_type,
                        order_status: "Order Placed",
                        order_total_price: msg.body.order_total_price,
                        order_time: time,
                        order_date: date,
                        delivery_address: deliveryAddress,
                        cart_items: itemsList
                    })
                    order.save().then((result) => {

                        console.log('Order Created' + result)
                        callback(null, result)
                    })

                }).catch((err) => {
                    console.log('Error occured while creating Delivery -> Delivery' + err)
                    callback(err, 'Error')
                });
            }
            else {
                let oId = mongoose.Types.ObjectId()
                let date = new Date();
                let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                let order = new order_data({
                    order_id: oId,
                    customer_id: msg.body.customer_id,
                    restaurant_id: msg.body.restaurant_id,
                    payment_card_digits: msg.body.payment_card_digits,
                    cart_items: savedList,
                    order_type: msg.body.order_type,
                    order_status: "Order Placed",
                    order_total_price: msg.body.order_total_price,
                    order_time: time,
                    order_date: date,
                    delivery_address: deliveryAddress,
                    cart_items: itemsList
                })
                order.save().then((result) => {

                    console.log('Order Created' + result)
                    callback(null, result)

                }).catch((err) => {
                    console.log('Error occured while creating Order -> Pickup' + err)
                    callback(err, 'Error')
                })
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    else if(msg.api===route.GET_ORDER_BY_CUSTOMER){
      //let customerid=customer_data.findOne({email_id:msg.body.email_id})
      order_data.find({ customer_id: msg.body.customer_id }).sort('-order_date').exec(
        (err, result) => {
            if (err) {
                console.log('Error occured while fetching Orders' + err)
                callback(err, 'Error')
            }
            else {
                console.log('Orders fetched' + result)
                callback(null, result)
            }
        })
 
  }
    
else if(msg.api===route.GET_ORDER_BY_RESTAURANT){

  console.log("Inside get order by restaurant");
  console.log(msg.body)
  order_data.find({ restaurant_id: msg.body.restaurant_id }).sort('-order_date').exec(
    (err, result) => {
        if (err) {
            console.log('Error occured while fetching Orders' + err)
            callback(err, 'Error')
        }
        else {
            console.log('Orders fetched' + result)
            callback(null, result)
        }
    })
  
    }

    else if(msg.api===route.GET_ORDER_BY_ID){
      console.log("Inside Events GET by restaurantID service");  
      
      order_data.findOne({ order_id: msg.body.order_id }).populate({ path: 'cart_items', populate: { path: 'dish_id' } })
                    .populate('delivery_address').populate('restaurant_id').populate({ path: 'cart_items.dishes', model: 'dishes_data' }).exec((err, result) => {
                        if (err) {
                            console.log('Error occured while fetching Order details' + err)
                            callback(err, 'Error')
                        }
                        else {
                            console.log('Order details fetched' + result)
                           
                        }
                   
                        callback(null, result)
           
                    })
      }
      
    
    else if(msg.api==="UPDATE_ORDER"){
        console.log("in update order")
        order_data.findOneAndUpdate({ _id: msg.body.order_id }, { order_status: msg.body.order_status_id }, (err, result) => {
            if (err) {
                console.log('Error occured while updating order' + err)
                callback(err, 'Error')
            }
            else {
                console.log('Order updated' + result)
                callback(null, result)
            }
        })
    }

  
}


exports.handle_request=handle_request