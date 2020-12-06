const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const events_schema = new Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    event_name: {
        type: String,
   
    },
    event_description: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    event_time: {
        type: String,
        required: true,
        default: `${Date.now().getHours}:${Date.now().getMinutes}:${Date.now().getSeconds}`
    },
    event_creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant_data',
        required: true
    },
    event_latitude: {
        type: Number,
        required: true,
    },
    event_longitude: {
        type: Number,
        required: true,
    },
    event_hashtags: {
        type: String,
        
    },
    image_url: 
        [{type:String}]
    ,
    events_registered:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'registrations_data'
    }]

 
});

module.exports = events_data = mongoose.model(
  "events_data",
  events_schema,
  "events_data"
);
