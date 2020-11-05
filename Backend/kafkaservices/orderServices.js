//const con = require("../config/dbConnection");
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
  GET_ORDER_BY_CUSTOMER,
  POST_ORDER,
  UPDATE_ORDER,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_RESTAURANT,
} = require("../config/routeConstants");
var kafka = require('../kafka/client');
module.exports.createOrder = (req, res) => {
  console.log("Inside Order Create POST service");
  console.log("req body" + JSON.stringify(req.body.cart_items[0]));
  data={
    api:POST_ORDER,
    body: req.body
  }
  kafka.make_request('restaurant_data', data, function(err,results){
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
  
})
};

module.exports.getOrdersByCustomerID = (req, res) => {
  console.log("Inside Orders GET customer all orders service");
  console.log(req.query);
  data={
    api:GET_ORDER_BY_CUSTOMER,
    body: req.body
  }
  kafka.make_request('restaurant_data', data, function(err,results){
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
  
})
};

module.exports.getOrdersByRestaurantID = (req, res) => {
  console.log("Inside Orders GET restaurant all orders service");
  console.log(req.query);
  data={
    api:GET_ORDER_BY_RESTAURANT,
    body: req.body
  }
  kafka.make_request('restaurant_data', data, function(err,results){
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
  
})
};

module.exports.getOrdersByOrderID = (req, res) => {
  console.log("Inside Orders GET order service");
  console.log(req.query);
  data={
    api:GET_ORDER_BY_ID,
    body: req.body
  }
  kafka.make_request('restaurant_data', data, function(err,results){
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
  
})
};

module.exports.updateOrderStatus = (req, res) => {
  console.log("Inside Orders PUT update status service");
  console.log(req.body);

  data={
    api:UPDATE_ORDER,
    body: req.body
  }
  kafka.make_request('restaurant_data', data, function(err,results){
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
  
})
};
