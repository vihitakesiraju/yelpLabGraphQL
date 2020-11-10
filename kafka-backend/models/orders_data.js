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
    delivery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'delivery_address'
    },
    cart_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart_data'
    }]
});

module.exports = orders_data = mongoose.model(
  "orders_data",
  orders_schema,
  "orders_data"
);



//delivery_address
//order_items
