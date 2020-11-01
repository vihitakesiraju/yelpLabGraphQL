const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const customer_primary_data = new Schema({
  customer_id: {
    type: Number,
    required: true,
    unique: true,
    seq:{type}
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

});

module.exports = customer_primary_data = mongoose.model(
  "customer_primary_data",
  customer_primary_data,
  "customer_primary_data"
);