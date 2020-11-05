const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const registrations_schema = new Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events_data',
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer_data',
        required: true
    },
    registration_date:{
       type:Date,
       required:true,
       
    },

    registration_time: {
        type: String,
        required: true,
       
    },

});

module.exports = registrations_data = mongoose.model(
    "registrations_data",
  registrations_schema,
    "registrations_data"
  );