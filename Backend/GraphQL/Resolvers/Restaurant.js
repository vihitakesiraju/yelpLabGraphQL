
const login_model=require('../../models/login_credentials')

const customer_data=require('../../models/customer_data')
const restaurant_data=require('../../models/restaurant_data')
//const config = require('../../../config');
const dishes_data=require('../../models/dishes_data')
const order_data=require('../../models/orders_data')
const mongoose = require('mongoose');

module.exports = {
    createDish: async (args) => {
      return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args.createdishinput)

      let id = mongoose.Types.ObjectId()

        let dishes = new dishes_data({
        description: args.createdishinput.description,
        dish_id: id,
        dish_name: args.createdishinput.dish_name,
        image_url: args.createdishinput.image_url,
        ingredients: args.createdishinput.ingredients,
        price: args.createdishinput.price,
        description: args.createdishinput.description,
        category_id: args.createdishinput.category_id 
    })
    dishes.save((err, res) => {
        console.log("dishes saved")
        if (err) {
            console.log("error " + err);
            reject(JSON.stringify(err))
        }
        else {
            restaurant_data.findByIdAndUpdate(args.createdishinput.restaurant_id , { $addToSet: { "dishes": res._id } }, (err, result) => {
                if (err) {
                    console.log('Error ' + err)
                    reject(JSON.stringify(err))
                }
                else {
                    console.log('Menu Created' + result)
                    resolve(res)
                }
            })
        }
    
    })
      
    })
  
  }
}


module.exports = {
    getRestaurants: async (args,context) => {
      return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args.search_string)
      restaurant_data.find({
        "$or":[
            {restaurant_name:{$regex: '.*'+args.search_string+'.*',$options:'i' }},
            {restaurant_location:{$regex: '.*'+args.search_string+'.*',$options:'i' }},
            {restaurant_description:{$regex: '.*'+args.search_string+'.*',$options:'i' }},
            {restaurant_address:{$regex: '.*'+args.search_string+'.*',$options:'i' }},
            {address_city:{$regex: '.*'+args.search_string+'.*',$options:'i' }},
            {address_postal_code:{$regex: '.*'+args.search_stringy+'.*',$options:'i' }},
            {address_state:{$regex: '.*'+args.search_string+'.*',$options:'i' }},
        ]
    },(err,result)=>{
        if (err) {
            console.log('Error in fetching restaurant profile' + err)
            reject(err)
        }
        else {
            console.log(result)
            resolve(result)
        }
    })



      }
      )
  
  }
}

module.exports = {
    postOrder: async (args) => {
      return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args)
      let orderTotal = 0
      let itemsList = [];
      
      args.postorderinput.cart_items.map(async (cartItem) => {
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
                      resolve(result)
                  })

              }).catch((err) => {
                  console.log('Error occured while creating Delivery -> Delivery' + err)
                  reject(err)
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
                 resolve(result)

              }).catch((err) => {
                  console.log('Error occured while creating Order -> Pickup' + err)
                  reject(err)
              })
          }

      }).catch((err) => {
          console.log(err);
      })
      
    })
  
  }
}



module.exports = {
    getRestaurantOrders: async (args,context) => {
      return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args.restaurant_id)
     
      order_data.find({ restaurant_id: args.restaurant_id }).sort('-order_date').exec(
        (err, result) => {
            if (err) {
                console.log('Error occured while fetching Orders' + err)
               reject(err)
            }
            else {
                console.log('Orders fetched' + result)
               resolve(result)
            }
        })
      


      }
      )
  
  }
}



module.exports = {
    updateDelivery: async (args) => {
      return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args.updatedeliveryinput)
      order_data.findOneAndUpdate({ _id: args.updatedeliveryinput.order_id }, { order_status: args.updatedeliveryinput.order_status_id }, (err, result) => {
        if (err) {
            console.log('Error occured while updating order' + err)
            reject(err)
        }
        else {
            console.log('Order updated' + result)
            resolve(result)
        }
    })
})
    }
}
    


















