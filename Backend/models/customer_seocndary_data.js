const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const customer_secondary_data = new Schema({
  customer_id: {
    type: Number,
    required: true,
    unique: true,
   
  },
  review_count: {
    type: Number,
    required: true,
    default:0,
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
    required: true,
  },

  profile_image_link: {
    type: String,
    required: true,
  },
});

module.exports = customer_secondary_data = mongoose.model(
  "customer_secondary_data",
  customer_secondary_data,
  "customer_secondary_data"
);