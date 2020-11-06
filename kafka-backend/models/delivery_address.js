const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const delivery_schema= new Schema({
    delivery_address: {
        type: String,
        required: true,
    },
    address_city: {
        type: String,
        required: true,
    },
    address_state: {
        type: String,
    },
    address_postal_code: {
        type: Number,
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
});

module.exports = delivery_data = mongoose.model(
  "delivery_data",
  delivery_schema,
  "delivery_data"
);



//delivery_address
//order_items
