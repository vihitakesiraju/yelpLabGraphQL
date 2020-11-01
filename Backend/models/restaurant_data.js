const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const restaurant_data = new Schema({
    restaurant_id: {
    type: Number,
    required: true,
    unique: true,
  },
  restaurant_name: {
    type: String,
    required: true,
  },
  restaurant_location: {
    type: String,
    required: true,
  },
  restaurant_description: {
    type: String,
    required: true,
  },
  restaurant_address: {
    type: String,
    required: true,
  },
  address_city: {
    type: String,
    required: true,
  },
  address_state: {
    type: String,
    required: true,
  },
  address_postal_code: {
    type: String,
    required: true,
  },
  address_latitude: {
    type: Number,
    required: true,
  },
  address_longitude: {
    type: Number,
    required: true,
  },
  primary_phone: {
    type: Number,
    required: true,
  },
  secondary_phone: {
    type: Number,
  },
});

module.exports = login = mongoose.model(
  "login_credentials",
  login_credentials,
  "login_credentials"
);
