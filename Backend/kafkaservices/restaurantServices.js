const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
  POST_RESTAURANT_SIGNUP,
  UPDATE_RESTAURANT_PROFILE,
  GET_RESTAURANT_MENU,
  GET_RESTAURANT_SEARCH,
  GET_ALL_RESTAURANTS,
  GET_RESTAURANT_PROFILE,
  UPDATE_MENU_ITEM,
  POST_MENU_ITEM,
} = require("../config/routeConstants");
var kafka = require('../kafka/client');
module.exports.createRestaurant = (req, res) => {
  console.log("Inside Restaurant Create POST service");
  console.log("req body" + JSON.stringify(req.body));
  data={
    api:POST_RESTAURANT_SIGNUP,
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

module.exports.getMenuByEmail = (req, res) => {
  console.log("Inside Restaurant GET menu service");
  console.log(req.query);
  kafka.make_request('restaurant_data', {
    api: GET_RESTAURANT_MENU,
    body: req.query
}, function (err, results) {
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

module.exports.getAllRestaurants = (req, res) => {
  console.log("Inside Restaurant GET menu service");
  console.log(req.query);
  kafka.make_request('restaurant_data', {
    api: GET_ALL_RESTAURANTS,
    body: req.query
}, function (err, results) {
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

module.exports.getRestaurantProfile = (req, res) => {
  console.log("Inside Restaurant GET Profile service");
  console.log(req.query);
  kafka.make_request('restaurant_data', {
    api: GET_RESTAURANT_PROFILE,
    body: req.query
}, function (err, results) {
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

module.exports.updateRestaurantProfile = (req, res) => {
  console.log("Inside Restaurant PUT profile service");
  console.log("req body" + JSON.stringify(req.body));
  kafka.make_request('restaurant_data', {
    api: UPDATE_RESTAURANT_PROFILE,
    body: req.body
}, function (err, results) {
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

module.exports.updateMenuItem = (req, res) => {
  console.log("Inside Restaurant PUT menuItem service");
  console.log("req body" + JSON.stringify(req.body));
  kafka.make_request('restaurant_data', {
    api: UPDATE_MENU_ITEM,
    body: req.body
}, function (err, results) {
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

module.exports.createMenuItem = (req, res) => {
  console.log("Inside Restaurant POST menuItem service");
  console.log("req body" + JSON.stringify(req.body));
  kafka.make_request('restaurant_data', {
    api: POST_MENU_ITEM,
    body: req.body
}, function (err, results) {
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

module.exports.getRestaurantSearch = (req, res) => {
  console.log("Inside Restaurant GET Search service");
  console.log(req.query);
  kafka.make_request('restaurant_data', {
    api: GET_RESTAURANT_SEARCH,
    body: req.query
}, function (err, results) {
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
