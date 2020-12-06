const mongoose = require("mongoose");
let Schema = mongoose.Schema;
//autoIncrement=require('mongoose-auto-increment')
//autoIncrement.initialize(mongoose.connection)
const cart_schema = new Schema({
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dishes_data',
        required: true
    },
    count: {
        type: Number,
        required: true,
    },

});
//customer_schema.plugin(autoIncrement.plugin,{model:'customer_data',field: 'customer_id'})
module.exports = cart_data = mongoose.model(
  "cart_data",
  cart_schema,
  "cart_data"
);

