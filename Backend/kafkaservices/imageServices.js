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
  
  POST_IMAGE_USER_PROFILE,
} = require("../config/routeConstants");
var kafka = require('../kafka/client');


module.exports.uploadUserProfile = (req, res) => {
  console.log("Inside customer picture service");
  console.log(req.body);
  data={
    api:POST_IMAGE_USER_PROFILE,
    body: req.body
  }
  kafka.make_request('image_data', data, function(err,results){
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

 module.exports.uploadMenuItem = (req, res) => {
  console.log("Inside Events POST registration service");
  console.log(req.body);
//   data={
//     api:POST_EVENT_REGISTRATION,
//     body: req.body
//   }
//   kafka.make_request('event_data', data, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//         console.log("Inside else");
//         console.log(results)
//             res.json(results);

//             res.end();
//         }
    
// });
 };
 module.exports.uploadEvent = (req, res) => {
   console.log("Inside Events POST create service");
  console.log(req.body)
//   data={
//     api:POST_EVENT,
//     body: req.body
//   }
//   kafka.make_request('event_data', data, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//         console.log("Inside else");
//         console.log(results)
//             res.json(results);

//             res.end();
//         }
    
// });
 };

 module.exports.getEventsByRestaurantID = (req, res) => {
  console.log("Inside Events GET by restaurantID service");

//   data={
//     api:GET_REGISTRATIONS_EVENT,
//     body: req.query
//   }
//   kafka.make_request('event_data', data, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//         console.log("Inside else");
//         console.log(results)
//             res.json(results);

//             res.end();
//         }
    
// });
};
 module.exports.getRegistrationsByCustomerID = (req, res) => {
   console.log("Inside Events GET registrations by customer service");
 console.log(req.query);
//   data={
//     api:GET_REGISTRATIONS_CUSTOMER,
//     body: req.query
//   }
//   kafka.make_request('event_data', data, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//         console.log("Inside else");
//         console.log(results)
//             res.json(results);

//             res.end();
//         }
    
// });
 };

 module.exports.getRegistrationsByEventId = (req, res) => {
   console.log("Inside Events GET registrations by eventid service");
  console.log(req.query);
//   data={
//     api:GET_REGISTRATIONS_EVENT,
//     body: req.query
//   }
//   kafka.make_request('event_data', data, function(err,results){
//     console.log('in result');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//         console.log("Inside else");
//         console.log(results)
//             res.json(results);

//             res.end();
//         }
    
// });
};
