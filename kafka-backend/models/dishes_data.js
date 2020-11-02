const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const dishes_schema = new Schema({
    menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'menu_data',
        required: true
    },
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
  
    dish_name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
      
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        enum: [1,2,3,4,5],
        required: true
    },


});

module.exports = dishes_data = mongoose.model(
    "dishes_data",
    dishes_schema,
    "dishes_data"
  );