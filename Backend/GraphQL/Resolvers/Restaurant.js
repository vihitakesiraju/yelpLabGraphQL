
const login_model=require('../../models/login_credentials')

const customer_data=require('../../models/customer_data')
const restaurant_data=require('../../models/restaurant_data')
//const config = require('../../../config');
const dishes_data=require('../../models/dishes_data')

module.exports = {
    createDish: async (args) => {
      return new Promise((resolve, reject) => {

        console.log("createDish"+args.createdishinput)
      }
   
      )}
    }



    // let dishes = new dishes_data({
    //     description: args.createdishinput.description,
    //     dish_name: args.createdishinput.dish_name,
    //     image_url: args.createdishinput.image_url,
    //     ingredients: args.createdishinput.ingredients,
    //     price: args.createdishinput.price,
    //     description: args.createdishinput.description,
    //     category_id: args.createdishinput.category_id 
    // })
    // dishes.save((err, res) => {
    //     console.log("dishes saved")
    //     if (err) {
    //         console.log("error " + err);
    //         reject(JSON.stringify(err))
    //     }
    //     else {
    //         restaurant_data.findByIdAndUpdate(args.createdishinput.restaurant_id , { $addToSet: { "dishes": res._id } }, (err, result) => {
    //             if (err) {
    //                 console.log('Error ' + err)
    //                 reject(JSON.stringify(err))
    //             }
    //             else {
    //                 console.log('Menu Created' + result)
    //                 resolve(result)
    //             }
    //         })
    //     }
    
    // })







