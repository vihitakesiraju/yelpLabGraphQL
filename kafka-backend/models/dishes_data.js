const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const dishes_schema = new Schema({
    
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
        type: String,
        required: true
    },


});

module.exports = dishes_data = mongoose.model(
    "dishes_data",
    dishes_schema,
  );