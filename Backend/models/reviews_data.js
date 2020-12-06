const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const reviews_schema = new Schema({
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer_data',
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant_data",
        required: true
    },
    stars: {
        type: Number,
        required: true,
        default: 0
    },
    review_date: {
        type: Date,
        required: true
    },
    review_text: {
        type: String,
    }

});

module.exports = reviews_data = mongoose.model(
    "reviews_data",
    reviews_schema,
    "reviews_data"
  );