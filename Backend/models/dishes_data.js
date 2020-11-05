const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const dishes_schema = new Schema({
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

module.exports = dishes_data = mongoose.model(
  "dishes_data",
  dishes_schema,
  "dishes_data"
);