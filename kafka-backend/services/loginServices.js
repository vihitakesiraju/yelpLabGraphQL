//const login=require('../models/login_credentials');
const login_model = require("../models/login_credentials");
const restaurant_data= require("../models/restaurant_data");
const customer_data=require("../models/customer_data");
const { response } = require("express");
const route = require('../../Backend/config/routeConstants')
function handle_request(msg,callback){
  console.log("in handle request")
    const user_name = msg.body.username;
    const user_password = msg.body.password;

   
    if(msg.api===route.POST_LOGIN){

      login_model.findOne({
        email_id: user_name,
      },function(err,result){
        console.log("result"+result)
        if(err){
          callback(err,"error");
        }
       else{
        if(result.user_password === user_password){
          if(result.user_type === 1){
            customer_data.findOne({email_id:result.email_id},(error,results)=>{
              if(error){
                console.log('error'+error)
                callback(error,'Error')
              }
              else{
                console.log('result in customer login'+results)
                let login={
                  cred: result,
                  customer: results
                }
                callback(null,login);
              }
            })

          }
          else{
            restaurant_data.findOne({email:result.email_id},(error,results)=>{
              if(error){
                console.log('error'+error)
                callback(error,'Error')
              }
              else{
                console.log('result in restaurant login'+results)
                let login={
                  cred: result,
                  restaurant:results
                }
                callback(null,login);
              }
            })

          }
          //callback(null,result);
        }
      }
      })

    //   const login_details = login_model.findOne({
    //     email_id: user_name,
    //   });

    // }
    // if (!login_details) {
    //       //console.log(login_details.email_id);
    //       //console.log("error" + error);
    //       callback(null,{status: 400, responseMessage: { msg: 'Invalid Login' }})
    //       //res.status(400).end(JSON.stringify(error));
    // }
    //     //console.log(login_details[0]);
    //     if (login_details.user_password === user_password) {
    //       console.log("correct pwd");
    //       console.log("login_details" + JSON.stringify(login_details));
    //       callback(null,{status: 200, responseMessage:{}})
    //       res.status(200).send({
    //         user_type: login_details.user_type.toString(),
    //         email_id: login_details.email_id,
    //       });
    //     }
    //     else
    //     {
    //       callback(null,{status: 400,responseMessage:{msg: 'Password Incorrect'}});
    //     }
    //   }
    //   catch(e){
        
    //  } 
    }
}


exports.handle_request=handle_request;