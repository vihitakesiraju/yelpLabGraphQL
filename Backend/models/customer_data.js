const mongoose = require("mongoose");
let Schema = mongoose.Schema;
//autoIncrement=require('mongoose-auto-increment')
//autoIncrement.initialize(mongoose.connection)
const customer_schema = new Schema({
  customer_id:{
   //type:mongoose.Schema.Types.ObjectId,
   type: Number,
   required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  contact_number: {
    type: Number,
    required: true,
  
  },
  email_id: {
    type: String,
    required: true,
    
  },
  about: {
    type: String,
  },

  review_count: {
    type: Number,

  },
  yelping_since: {
    type: Number,
 
  },
  things_loved: {
    type: String,  
  },
  find_me: {
    type: String,
    
  },
  blog_ref: {
    type: String,
  },
  signup_date: {
    type: Date,

  },

  profile_image_link: {
    type: String,

  },

});
//customer_schema.plugin(autoIncrement.plugin,{model:'customer_data',field: 'customer_id'})
module.exports = customer_data = mongoose.model(
  "customer_data",
  customer_schema,
  "customer_data"
);

