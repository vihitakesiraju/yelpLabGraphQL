const { response } = require("express");
const con = require("../config/dbConnection");
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
  GET_REVIEWS_BY_RESTAURANT,
  POST_REVIEW_CUSTOMER,
  GET_REVIEWS_ID_RESTAURANT,
  GET_REVIEWS_BY_CUSTOMER
} = require("../config/routeConstants");
const kafka = require('../kafka/client')
module.exports.getReviewsByRestaurant = (req, res) => {
  console.log("Inside Reviews GET by Restaurant service");
  console.log("inside reviews", req.query);
  data={
    api:GET_REVIEWS_BY_RESTAURANT,
    body: req.query
  }
  kafka.make_request('review_data', data, function(err,results){
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
    
});
};

module.exports.postReviewCustomer = (req, res) => {
  console.log("Inside Reviews POST customer service");

  data={
    api:POST_REVIEW_CUSTOMER,
    body: req.body
  }
  kafka.make_request('review_data', data, function(err,results){
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
    
});
};

module.exports.getReviewsByIDRestaurant = (req, res) => {
  console.log("Inside Reviews GET by Restaurant service");
  console.log(req.query);
  data={
    api:GET_REVIEWS_ID_RESTAURANT,
    body: req.query
  }
  kafka.make_request('review_data', data, function(err,results){
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
    
});
};

module.exports.getReviewsByCustomer = (req, res) => {
  console.log("Inside Reviews GET by Customer service");
  console.log(req.query);
  data={
    api:GET_REVIEWS_BY_CUSTOMER,
    body: req.body
  }
  kafka.make_request('review_data', data, function(err,results){
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
    
});
};
