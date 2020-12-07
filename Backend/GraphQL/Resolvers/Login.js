

const login_model=require('../../models/login_credentials')

const customer_data=require('../../models/customer_data')
const restaurant_data=require('../../models/restaurant_data')
//const config = require('../../../config');


module.exports = {
    userLogin: async (args) => {
      return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args.userlogininput.email_id)

      try {

        const user_name = args.userlogininput.email_id;
        const user_password = args.userlogininput.user_password
        console.log(user_name)
        login_model.findOne({
            email_id: user_name,
          },function(err,result){
            console.log("result"+result)
            if(err){
              reject(JSON.stringify(err))
            }
           else{
            if(result.user_password === user_password){
              if(result.user_type === 1){
                customer_data.findOne({email_id:result.email_id},(error,results)=>{
                  if(error){
                    console.log('error'+error)
                    reject(JSON.stringify(error))
                  }
                  else{
                    console.log('result in customer login'+results)
                    
                   // res.status(RES_SUCCESS).send(JSON.stringify(login));
             
                    resolve( {_id: result._id, email_id: results.email_id,user_password : result.user_password, user_type:result.user_type,user_id: results._id})
                  }
                })
        
              }
              else{
                console.log(result.email_id)
                restaurant_data.findOne({email:result.email_id},(error,results)=>{
                  if(error){
                    console.log('error'+error)
                    reject(JSON.stringify(error))
                  }
                  else{
                    console.log('result in restaurant login'+results)
                    resolve( {_id: result._id, email_id: result.email_id,user_password : result.user_password, user_type:result.user_type, user_id:results._id})
                  }
                })
        
              }
              //callback(null,result);
            }
          }
          })

        }
        catch{e}{
          reject(JSON.stringify(e))
        }
    })
  
  }
}