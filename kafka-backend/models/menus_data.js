const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const menus_schema = new Schema({
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
},
restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurants',
    required: true
},

});

module.exports = menus_data = mongoose.model(
  "menus_data",
  menus_schema,
  "menus_data"
);
