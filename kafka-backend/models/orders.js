const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const orders_schema= new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers_data',
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant_data',
        required: true
    },
    order_type: {
        type: String,
        enum: ['Pickup', 'Delivery', 'Common'],
        default: 'Common',
        required: true
    },
    order_status: {
        type: String,
        enum: ['Picked Up', 'Pick Up Ready', 'Order Placed', 'On The Way', 'In the making', 'Delivered', 'Cancelled'],
        default: 'Order Placed',
        required: true
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    order_time: {
        type: String,
        required: true,
        default: `${Date.now().getHours}:${Date.now().getMinutes}:${Date.now().getSeconds}`
    },
    order_total_price: {
        type: Number,
        required: true,
        default: 0,
    },
   
    payment_card_digits: {
        type: Number,
        required: true,
    },

});

module.exports = orders_data = mongoose.model(
  "orders_data",
  orders_schema,
  "orders_data"
);



//delivery_address
//order_items
