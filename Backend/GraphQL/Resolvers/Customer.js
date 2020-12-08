

const customer=require('../../models/customer_data')
const restaurant_data=require('../../models/restaurant_data')

const dishes_data=require('../../models/dishes_data')
const mongoose = require('mongoose');

module.exports = {
    getCustomer: async (args,context) => {
    return new Promise((resolve, reject) => {
      console.log("user login")
      console.log(args.customer_email)

      customer.findOne({email_id: args.customer_email},
        (err,result)=>{
            if(err){
            //return new err
            }
            else{
                console.log(result.about)
                console.log(result.customer_name)
                //return {customer_name: result.customer_name,about:result.about}
                resolve({  customer_name: result.customer_name,
                    birthday: result.birthday,
                    contact_number: result.contact_number,
                    blog_ref: result.blog_ref,
                    things_loved:result.things_loved,
                    find_me: result.find_me,
                    about: result.about,
                    yelping_since: result.yelping_since})
            }
        })

             })
        }
    
    }
      
    
    module.exports = {
        postCustomer: async (args) => {
          return new Promise((resolve, reject) => {
          console.log("user login")
          console.log(args.postcustomerinput)
    
          try {
    
            let cust_update={

                customer_name: args.postcustomerinput.customer_name,
                birthday: args.postcustomerinput.birthday,
                contact_number: args.postcustomerinput.contact_number,
                blog_ref: args.postcustomerinput.blog_ref,
                things_loved: args.postcustomerinput.things_loved,
                find_me: args.postcustomerinput.find_me,
                about: args.postcustomerinput.about,
                yelping_since: args.postcustomerinput.yelping_since
           
             }
             console.log(cust_update)
            
             customer.findOneAndUpdate({customer_id:args.postcustomerinput.customer_id},cust_update,(err,result)=>{
                if(err){
                    reject (err)
                    }
                    else{
                        resolve({  customer_name: result.customer_name,
                            birthday: result.birthday,
                            contact_number: result.contact_number,
                            blog_ref: result.blog_ref,
                            things_loved:result.things_loved,
                            find_me: result.find_me,
                            about: result.about,
                            yelping_since: result.yelping_since})
                    }
             })
            
      
      }
      catch(e){

      }
    })
    }
}


