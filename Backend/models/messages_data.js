const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const messages_schema = new Schema({
    message_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'restaurant_data',
    required: true,
  },
customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'customer_data',
    required: true,
  },
messages:[{
    message:{
        type: String,
    },
    time:{
        type: Date
    },
    action:{
        type: String,
    }

    }

]
});

module.exports = messages_data = mongoose.model(
  "messages_data",
  messages_schema,

);
